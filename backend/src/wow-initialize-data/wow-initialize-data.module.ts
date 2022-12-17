import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
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
