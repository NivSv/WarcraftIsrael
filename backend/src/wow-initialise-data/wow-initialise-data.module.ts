import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WowCharacter } from '../wow-characters/wow-characters.entity';
import { WowCharactersService } from '../wow-characters/wow-characters.service';
import { WowInitialiseDataService } from './wow-initialise-data.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([WowCharacter]),
  ],
  controllers: [],
  providers: [WowInitialiseDataService,WowCharactersService],
})
export class WowInitialiseDataModule { }
