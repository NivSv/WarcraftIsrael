import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WowCharacter } from './wow-characters.entity';

@Injectable()
export class WowCharactersService {
    constructor(
        @InjectRepository(WowCharacter)
        private wowCharactersRepository: Repository<WowCharacter>,
        private readonly httpService: HttpService
    ) { }

    public async updateCharacterData(characterName: string, realm: string, blizAccessToken: string) {
        let wowCharacter = await this.wowCharactersRepository.findOneBy({ name: characterName, realm: realm });
        if (wowCharacter == null) {
            wowCharacter = new WowCharacter();
            wowCharacter.name = characterName;
            wowCharacter.realm = realm;
        }
        this.httpService.get(`https://eu.api.blizzard.com/profile/wow/character/${realm}/${characterName}`,
            {
                params: {
                    namespace: "profile-eu",
                    locale: "en_EU",
                    access_token: blizAccessToken
                }
            }).subscribe((res) => {
                wowCharacter.level = res.data.level;
                wowCharacter.faction = res.data.faction.type;
                wowCharacter.classId = res.data.character_class.id;
                wowCharacter.raceId = res.data.race.id;
                wowCharacter.itemLevelEquipped = res.data.equipped_item_level;
                wowCharacter.achievement_points = res.data.achievement_points;
                wowCharacter.guild = res.data.guild.name;
                wowCharacter.gender = res.data.gender.type;
                wowCharacter.specId = res.data.active_spec.id;
                wowCharacter.blizardCharacterId = res.data.id;
                wowCharacter.lastLogin = new Date(res.data.last_login_timestamp);
                wowCharacter.level = res.data.level;
                this.wowCharactersRepository.save(wowCharacter);
                this.updateMythicPlusRating(wowCharacter, blizAccessToken);
            });
    }

    private async updateMythicPlusRating(wowCharacter: WowCharacter, blizAccessToken: string) {
        this.httpService.get(`https://eu.api.blizzard.com/profile/wow/character/${wowCharacter.realm}/${wowCharacter.name}/mythic-keystone-profile`,
            {
                params: {
                    namespace: "profile-eu",
                    locale: "en_EU",
                    access_token: blizAccessToken
                }
            }).subscribe((res) => {
                wowCharacter.mythicPlusRating = res.data.current_mythic_rating.rating;
                this.wowCharactersRepository.save(wowCharacter);
            });
    }
}


