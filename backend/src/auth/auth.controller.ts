import {
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  Body,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersMapper } from '../users/users.mapper';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @Inject(AuthService) private readonly authService!: AuthService
  constructor() {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    const userDto = await UsersMapper.entityToDto(req.user);
    this.authService.markAsLogin(req.user);
    const loginTokens = await this.authService.login(userDto, req.user);
    res.header('Authorization', `Bearer ${loginTokens.accessToken}`);
    res
      .cookie('jwt', loginTokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      })
      .status(200)
      .json(userDto);
  }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    const usernameTake = await this.authService.checkUserExists(
      createUserDto.username,
    );
    if (usernameTake)
      throw new HttpException(
        'Username is already taken.',
        HttpStatus.CONFLICT,
      );
    const user = await this.authService.createUser(
      createUserDto.username,
      createUserDto.password,
    );
    return UsersMapper.entityToDto(user);
  }
}
