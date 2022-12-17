import { HttpService } from '@nestjs/axios';
import { Injectable, Scope } from '@nestjs/common';
import { WowCharactersService } from '../wow-characters/wow-characters.service';

@Injectable({ scope: Scope.DEFAULT })
export class WowInitializeDataService {
    constructor(private readonly httpService: HttpService, private readonly wowCharactersService: WowCharactersService) {
        this.initializeWowData();
    }

    public raceData = {};

    public GetRaceData(serverAccessToken: string) {
        console.log(serverAccessToken);
        
        this.httpService.get("https://eu.api.blizzard.com/data/wow/playable-race/index",
            {
                params: {
                    namespace: "static-eu",
                    locale: "en_EU",
                    access_token: serverAccessToken
                }
            }).subscribe((res) => {
                console.log(res.data);
            });
    }

    public async initializeAccessToken() {
        const client = process.env.BLIZZARD_CLIENT_ID;
        const secret = process.env.BLIZZARD_CLIENT_SECRET;
        this.httpService.post("https://oauth.battle.net/token", {
            "grant_type": "client_credentials"
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            auth: {
                username: client,
                password: secret
            }
        }).subscribe(async (res) => {
            //this.GetRaceData(res.data.access_token);
            await this.wowCharactersService.updateCharacterData("farkash", "kazzak", res.data.access_token);
            // await this.wowCharactersService.updateCharacterData("nivsvv", "kazzak", res.data.access_token);
            // await this.wowCharactersService.updateCharacterData("asmonshekel", "kazzak", res.data.access_token);
        })
    }

    public async getGuildCharacters() {
    }

    public async initializeWowData() {
        await this.initializeAccessToken();
    }
}
