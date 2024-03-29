import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { accessTokenExpiryTime } from './jwt.constants';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersService } from '../users/users.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: accessTokenExpiryTime },
        };
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UsersService,
    PrismaService,
  ],
})
export class AuthModule {}
