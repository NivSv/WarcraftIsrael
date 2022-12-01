import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, PassportModule],
  controllers:[AuthController],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
