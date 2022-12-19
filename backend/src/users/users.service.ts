import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {
  @Inject(PrismaService) private readonly prisma!: PrismaService;

  async findAll(): Promise<Array<User>> {
    return this.prisma.user.findMany();
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({ where: { username } });
  }

  async userLoggedIn(user: User) {
    return this.prisma.user.update({
      where: { username: user.username },
      data: { lastLogin: new Date() },
    });
  }

  async create(username: string, password: string): Promise<User> {
    //generate a hash
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    //creating the user
    const user = await this.prisma.user.create({
      data: { username: username, password: hash },
    });
    return user;
  }

  async delete(user: User) {
    await this.prisma.user.delete({ where: { username: user.username } });
  }

  async updateRefreshToken(user: User, refreshToken: string) {
    //generate a hash
    const salt: string = await bcrypt.genSalt();
    const hash: string = await bcrypt.hash(refreshToken, salt);
    //save token
    await this.prisma.user.update({
      where: { username: user.username },
      data: { currentHashedRefreshToken: hash },
    });
  }

  async validRefreshToken(user: User, refreshToken: string): Promise<boolean> {
    //compare the token
    const isValid: boolean = await bcrypt.compare(
      refreshToken,
      user.currentHashedRefreshToken,
    );
    return isValid;
  }

  async updateInfo(
    user: User,
    firstName: string,
    lastName: string,
  ): Promise<User> {
    await this.prisma.user.update({
      where: { username: user.username },
      data: { firstName, lastName },
    });
    return user;
  }
}
