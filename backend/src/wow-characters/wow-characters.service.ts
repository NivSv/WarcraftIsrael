import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WowCharacter, Prisma } from '@prisma/client';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class WowCharactersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService
    ) { }

    public async updateCharacterData(characterName: string, realm: string, guildRank: number, blizardAccessToken: string) {
        console.log(`Updating character ${characterName} on realm ${realm}`);

        let wowCharacter = await this.prisma.wowCharacter.findFirst({ where: { name: characterName, realm: realm } });
        if (wowCharacter == null) {
            wowCharacter = await this.prisma.wowCharacter.create({ data: { name: characterName, realm: realm } });
        }
        const response = this.httpService.get(`https://eu.api.blizzard.com/profile/wow/character/${realm}/${characterName}`,
            {
                params: {
                    namespace: "profile-eu",
                    locale: "en_EU",
                    access_token: blizardAccessToken
                }
            });
        await firstValueFrom(response).then((res) => {
            this.prisma.wowCharacter.update({
                where: { id: wowCharacter.id },
                data: {
                    level: res.data.level,
                    faction: res.data.faction.type,
                    classId: res.data.character_class.id,
                    raceId: res.data.race.id,
                    itemLevelEquipped: res.data.equipped_item_level,
                    achievement_points: res.data.achievement_points,
                    guild: res.data.guild.name,
                    gender: res.data.gender.type,
                    specId: res.data.active_spec.id,
                    blizardCharacterId: res.data.id,
                    guildRank: guildRank,
                    lastLogin: new Date(res.data.last_login_timestamp),
                }
            }).catch((err) => {
                console.error(err);
            });
            this.updateImages(wowCharacter, blizardAccessToken);
        });
    }

    private async updateImages(wowCharacter: WowCharacter, blizardAccessToken: string) {
        const response = this.httpService.get(`https://eu.api.blizzard.com/profile/wow/character/${wowCharacter.realm}/${wowCharacter.name}/character-media`,
            {
                params: {
                    namespace: "profile-eu",
                    locale: "en_EU",
                    access_token: blizardAccessToken
                }
            });
        await firstValueFrom(response).then((res) => {
            this.prisma.wowCharacter.update({
                where: { id: wowCharacter.id },
                data: {
                    assets:{
                        avatar: res.data.assets[0].value,
                        inset: res.data.assets[1].value,
                        main: res.data.assets[2].value,
                        mainRaw: res.data.assets[3].value,
                    },
                }
            }).catch((err) => {
                console.error(err);
            });
        });
    }

}