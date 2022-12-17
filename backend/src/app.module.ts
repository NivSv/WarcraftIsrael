import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios'
import { UsersModule } from './users/users.module';
import { ThrottlerModule } from "@nestjs/throttler"
import { User } from './users/user.entity';
import { AuthModule } from './auth/auth.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WowInitializeDataModule as WowInitializeDataModule } from './wow-initialize-data/wow-initialize-data.module';
import { WowCharacter } from './wow-characters/wow-characters.entity';
import { WowCharactersModule } from './wow-characters/wow-characters.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User,WowCharacter],
      synchronize: true,
    }),
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
