import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async Get(@Res() res: Response) {
    const users = await this.usersService.findAll();
    res.status(200).json(await UsersMapper.entitiesToDtos(users));
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async GetMe(@Res() res: Response) {
    const users = await this.usersService.findAll();
    res.status(200).json(await UsersMapper.entitiesToDtos(users));
  }
}