import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
        const user = this.users.create({ username, password });
        try {
            await this.users.save(user);
        } catch (error) {
            if (error.code === '23505') throw new ConflictException('username already exists');
            else throw new InternalServerErrorException();
        }
        return user;
    }
}
