import { Controller, Get, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserDto } from './dtos/user.dto';
import { UsersMapper } from './users.mapper';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async Get():Promise<Array<UserDto>> {
    const users = await this.usersService.findAll();
    return await UsersMapper.entitiesToDtos(users);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  async GetMe():Promise<UserDto> {
    const user = await this.usersService.findOne("niv");
    return await UsersMapper.entityToDto(user);
  }
}
