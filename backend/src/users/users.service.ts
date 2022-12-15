import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async findAll(): Promise<Array<User>> {
        return this.usersRepository.find();
    }

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ username });
    }

    async userLogedIn(user: User) {
        user.lastLogin = new Date();
        this.usersRepository.save(user);
    }

    async create(username: string, password: string): Promise<User> {
        //generate a hash
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        //creating the user
        const user = new User()
        user.username = username;
        user.password = hash;
        await this.usersRepository.manager.save(user);
        return user;
    }

    async delete(user: User) {
        await this.usersRepository.delete(user.id);
    }

    async updateRefreshToken(user: User, refreshToken: string) {
        //generate a hash
        const salt:string = await bcrypt.genSalt();
        const hash:string = await bcrypt.hash(refreshToken, salt);
        //save token
        user.currentHashedRefreshToken = hash;
        await this.usersRepository.save(user);
    }

    async validRefreshToken(user: User,refreshToken:string):Promise<boolean> {
        let isValid:boolean;
        //compare the token
        isValid = await bcrypt.compare(refreshToken,user.currentHashedRefreshToken);
        return isValid;
    }

    async updateInfo(user: User, firstName: string, lastName: string): Promise<User> {
        user.firstName = firstName;
        lastName = lastName;
        this.usersRepository.save(user);
        return user;
    }
}