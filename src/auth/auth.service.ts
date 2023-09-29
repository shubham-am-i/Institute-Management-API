import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/auth/user.entity';
import { AuthCredentialsDto } from 'src/auth/dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload, signInResponse } from 'src/auth/interface';

@Injectable()
export class AuthService {
    private users: Repository<User>;
    constructor(
        @InjectRepository(User) users: Repository<User>,
        private jwtService: JwtService
    ) {
        this.users = users;
    }

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
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

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<signInResponse> {
        const { username, password } = authCredentialsDto;
        const user = await this.users.findOneBy({ username });

        if (user && (await bcrypt.compare(password, user.password))) {
            const payload: JwtPayload = { username };
            const accessToken = await this.jwtService.sign(payload);

            return { username, accessToken };
        } else {
            throw new UnauthorizedException('invalid login credentials');
        }


    }
}
