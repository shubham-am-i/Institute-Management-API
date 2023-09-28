import { Injectable, UnauthorizedException } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";

import { User } from "./user.entity";
import { JwtPayload } from "./interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    private users: Repository<User>;
    constructor(
        @InjectRepository(User)
        users: Repository<User>
    ) {
        super({
            secretOrKey: 'myeyesdontlikelightide',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
        this.users = users;
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload;
        const user: User = await this.users.findOneBy({ username });

        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}