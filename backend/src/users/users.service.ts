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

    async findOne(username: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ username });
    }

    async create(username: string, password: string): Promise<User | undefined> {
        //generate a hash
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);
        //creating the user
        const user = new User()
        user.username = username;
        user.password = hash;
        this.usersRepository.manager.save(user);
        return user;
    }
}