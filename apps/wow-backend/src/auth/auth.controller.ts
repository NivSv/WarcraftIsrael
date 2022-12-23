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
    ValidationPipe,
    UsePipes,
} from '@nestjs/common'
import { User } from '@prisma/client'
import { Response, Request } from 'express'
import { CreateUserDto } from '../users/dtos/create-user.dto'
import { UsersMapper } from '../users/users.mapper'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './guards/local-auth.guard'

@Controller('auth')
export class AuthController {
    @Inject(AuthService) private readonly authService!: AuthService

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Req() req: Request, @Res() res: Response) {
        // if (!req.user){
        //     throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED)
        // }
        // const user: Partial<User> = req.user;
        // const userDto = await UsersMapper.entityToDto(user)
        // this.authService.markAsLogin(req.user)
        // const loginTokens = await this.authService.login(userDto, req.user)
        // res.header('Authorization', `Bearer ${loginTokens.accessToken}`)
        // res.cookie('jwt', loginTokens.refreshToken, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: 'strict',
        //     maxAge: 60 * 60 * 24 * 30,
        //     path: '/',
        // })
        //     .status(200)
        //     .json(userDto)
    }

    @UsePipes(new ValidationPipe())
    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        const usernameTake = await this.authService.checkUserExists(
            createUserDto.username
        )
        if (usernameTake)
            throw new HttpException(
                'Username is already taken.',
                HttpStatus.CONFLICT
            )
        const user = await this.authService.createUser(
            createUserDto.username,
            createUserDto.password
        )
        return UsersMapper.entityToDto(user)
    }
}
