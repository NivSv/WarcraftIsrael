import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WowCharactersService } from './wow-characters.service';

@Module({
  imports: [
    HttpModule,
  ],
  controllers: [],
  providers: [WowCharactersService,PrismaService],
})
export class WowCharactersModule { }
