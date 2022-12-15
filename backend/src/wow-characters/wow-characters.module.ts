import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WowCharacter } from './wow-characters.entity';
import { WowCharactersService } from './wow-characters.service';

@Module({
  imports: [
    HttpModule,
    TypeOrmModule.forFeature([WowCharacter]),
  ],
  controllers: [],
  providers: [WowCharactersService],
})
export class WowCharactersModule { }
