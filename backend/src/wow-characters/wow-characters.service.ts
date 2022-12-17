import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WowCharacter, Prisma } from '@prisma/client';

@Injectable()
export class WowCharactersService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly httpService: HttpService
    ) { }

    public async updateCharacterData(characterName: string, realm: string, blizAccessToken: string) {
        let wowCharacter = await this.prisma.wowCharacter.findFirst({ where: { name: characterName, realm: realm } });
        if (wowCharacter == null) {
            wowCharacter = await this.prisma.wowCharacter.create({ data: { name: characterName, realm: realm } });
        }
        this.httpService.get(`https://eu.api.blizzard.com/profile/wow/character/${realm}/${characterName}`,
            {
                params: {
                    namespace: "profile-eu",
                    locale: "en_EU",
                    access_token: blizAccessToken
                }
            }).subscribe((res) => {
                this.prisma.wowCharacter.update({
                    where: { id: wowCharacter.id },
                    data: {
                        level: res.data.level,
                        realmSlug: res.data.realm.slug,
                        faction: res.data.faction.type,
                        classId: res.data.character_class.id,
                        raceId: res.data.race.id,
                        itemLevelEquipped: res.data.equipped_item_level,
                        achievement_points: res.data.achievement_points,
                        guild: res.data.guild.name,
                        gender: res.data.gender.type,
                        specId: res.data.active_spec.id,
                        blizardCharacterId: res.data.id,
                        lastLogin: new Date(res.data.last_login_timestamp),
                    }
                }).catch((err) => {
                    console.log(err);
                });
                // this.updateMythicPlusRating(wowCharacter, blizAccessToken);
            });
    }

    // private async updateMythicPlusRating(wowCharacter: WowCharacter, blizAccessToken: string) {
    //     this.httpService.get(`https://eu.api.blizzard.com/profile/wow/character/${wowCharacter.realm}/${wowCharacter.name}/mythic-keystone-profile`,
    //         {
    //             params: {
    //                 namespace: "profile-eu",
    //                 locale: "en_EU",
    //                 access_token: blizAccessToken
    //             }
    //         }).subscribe((res) => {
    //             wowCharacter.mythicPlusRating = res.data.current_mythic_rating.rating;
    //             this.wowCharactersRepository.save(wowCharacter);
    //         });
    // }
}


