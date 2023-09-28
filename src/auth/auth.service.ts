import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'

import { User } from './user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
    private users: Repository<User>;
    constructor(@InjectRepository(User) users: Repository<User>) {
        this.users = users;
    }

    async signup(authCredentialsDto: AuthCredentialsDto): Promise<User> {
        const { username, password } = authCredentialsDto;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = this.users.create({ username, password: hashedPassword });
        try {
            await this.users.save(user);
        } catch (error) {
            if (error.code === '23505') throw new ConflictException('username already exists');
            else throw new InternalServerErrorException();
        }
        return user;
    }
}
