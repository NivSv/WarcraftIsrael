import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { UserDto } from '../users/dtos/user.dto';
import { refreshTokenExpiryTime } from './jwt.constants';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, password: string): Promise<User|null> {
    const user = await this.usersService.findOne(username);
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      return user;
    }
    return null;
  }
  async login(userDto: UserDto): Promise<string> {
    const {id , ...info} = userDto;
    const payload = { sub: userDto.id , ...info};
    this.jwtService.sign(payload,{expiresIn:refreshTokenExpiryTime})
    return this.jwtService.sign(payload);
  }

  async checkUserExists(username:string): Promise<boolean>{
    const user = await this.usersService.findOne(username);
    if(user) return true;
    return false;
  }

  async createUser(username:string, password:string): Promise<User|null>{
    const user = await this.usersService.create(username,password);
    return user;
  }

  async markAsLogin(user:User){
    this.usersService.userLogedIn(user);
  }
}