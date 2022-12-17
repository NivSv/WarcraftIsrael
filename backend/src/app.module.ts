import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from "@nestjs/throttler"
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WowInitializeDataModule as WowInitializeDataModule } from './wow-initialize-data/wow-initialize-data.module';
import { WowCharactersModule } from './wow-characters/wow-characters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    ScheduleModule.forRoot(),
    HttpModule,
    UsersModule,
    AuthModule,
    WowCharactersModule,
    WowInitializeDataModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
