import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { UserDto } from '../users/dtos/user.dto';
import { refreshTokenExpiryTime } from './jwt.constants';
import { LoginTokens } from './dtos/loginTokens.interface';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  @Inject(UsersService) private readonly usersService!: UsersService;
  @Inject(JwtService) private readonly jwtService!: JwtService;

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.usersService.findOne(username);
    if(!user) return null;
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
    return null;
  }

  async login(userDto: UserDto, user: User): Promise<LoginTokens> {
    const info = (({ username, firstName, lastName }) => ({
      username,
      firstName,
      lastName,
    }))(userDto);
    const payload = { sub: userDto.id, ...info };
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: refreshTokenExpiryTime,
    });
    this.usersService.updateRefreshToken(user, refreshToken);
    return { accessToken, refreshToken };
  }

  async checkUserExists(username: string): Promise<boolean> {
    const user = await this.usersService.findOne(username);
    if (user) return true;
    return false;
  }

  async createUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.create(username, password);
    return user;
  }

  async markAsLogin(user: User) {
    this.usersService.userLoggedIn(user);
  }
}
