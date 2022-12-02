import { Injectable } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { UsersMapper } from 'src/users/users.mapper';
import { UserDto } from 'src/users/dtos/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<UserDto|null> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const result = await UsersMapper.entityToDto(user);
      return result;
    }
    return null;
  }

  async login(user: UserDto) {
    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async createUser(username:string, password:string): Promise<User|null>{
    const user = await this.usersService.create(username,password);
    return user;
  }
}