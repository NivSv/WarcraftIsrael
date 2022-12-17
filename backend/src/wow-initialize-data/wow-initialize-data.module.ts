import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaService } from '../prisma.service';
import { WowCharacter } from '../wow-characters/wow-characters.entity';
import { WowCharactersService } from '../wow-characters/wow-characters.service';
import { WowInitializeDataService } from './wow-initialize-data.service';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [],
  providers: [WowInitializeDataService,WowCharactersService,PrismaService],
})
export class WowInitializeDataModule { }
