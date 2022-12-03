import { Controller, Post, Req, Res, UseGuards, Body, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../users/dtos/create-user.dto';
import { UsersMapper } from '../users/users.mapper';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req, @Res() res: Response) {
        const userDto = await UsersMapper.entityToDto(req.user);
        const jwt = await this.authService.login(userDto);
        res.cookie('jwt', jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/'
        }).status(200).json(userDto);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const usernameTake = await this.authService.checkUserExists(createUserDto.username);
        if (usernameTake) throw new HttpException('Username is already taken.', HttpStatus.CONFLICT);
        const user = await this.authService.createUser(createUserDto.username, createUserDto.password);
        return UsersMapper.entityToDto(user);
    }
}