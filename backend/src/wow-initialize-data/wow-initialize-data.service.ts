import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, Scope } from '@nestjs/common';
import { WowCharactersService } from '../wow-characters/wow-characters.service';
import {
  GUILDS,
  Guild_Member,
  MAX_LEVEL,
} from './wow-initialize-data.constants';

@Injectable({ scope: Scope.DEFAULT })
export class WowInitializeDataService {
  @Inject(HttpService) private readonly httpService: HttpService;
  @Inject(WowCharactersService)
  private readonly wowCharactersService: WowCharactersService;

  constructor() {
    this.initializeWowData();
  }

  public raceData = {};

  public GetRaceData(serverAccessToken: string) {
    console.log(serverAccessToken);

    this.httpService
      .get('https://eu.api.blizzard.com/data/wow/playable-race/index', {
        params: {
          namespace: 'static-eu',
          locale: 'en_EU',
          access_token: serverAccessToken,
        },
      })
      .subscribe((res) => {
        console.log(res.data);
      });
  }

  public async initializeAccessToken() {
    const client = process.env.BLIZZARD_CLIENT_ID;
    const secret = process.env.BLIZZARD_CLIENT_SECRET;
    this.httpService
      .post(
        'https://oauth.battle.net/token',
        {
          grant_type: 'client_credentials',
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          auth: {
            username: client,
            password: secret,
          },
        },
      )
      .subscribe(async (res) => {
        GUILDS.forEach(async (guild) => {
          await this.updateGuildInfo(
            guild.name,
            guild.realm,
            res.data.access_token,
          );
        });
        //this.GetRaceData(res.data.access_token);
        // await this.wowCharactersService.updateCharacterData("nivsvv", "kazzak", res.data.access_token);
        // await this.wowCharactersService.updateCharacterData("asmonshekel", "kazzak", res.data.access_token);
      });
  }

  public async updateGuildInfo(
    guildName: string,
    realm: string,
    blizardAccessToken: string,
  ) {
    //TODO: Add guild info to database
    //Adding guild members to database

    this.httpService
      .get(
        `https://eu.api.blizzard.com/data/wow/guild/${realm}/${guildName}/roster`,
        {
          params: {
            namespace: 'profile-eu',
            locale: 'en_EU',
            access_token: blizardAccessToken,
          },
        },
      )
      .subscribe({
        next: async (res) => {
          const members: Guild_Member[] = res.data.members;
          for (let member of members) {
            if (member.character.level === MAX_LEVEL) {
              await this.wowCharactersService.updateCharacterData(
                member.character.name.toLowerCase(),
                member.character.realm.slug.toLowerCase(),
                member.rank,
                blizardAccessToken,
              );
            }
          }
          // members.forEach(async (member: Guild_Member) => {
          //     if (member.character.level === MAX_LEVEL) {
          //         await this.wowCharactersService.updateCharacterData(member.character.name, member.character.realm.slug, member.rank, blizardAccessToken);
          //     }
          // });
        },
        error: (err) => console.error(err),
      });
  }

  public async initializeWowData() {
    await this.initializeAccessToken();
  }
}
