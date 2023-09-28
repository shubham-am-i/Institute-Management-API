import { Injectable, UnauthorizedException } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ConfigService } from "@nestjs/config";

import { User } from "../user.entity";
import { JwtPayload } from "../interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly users: Repository<User>,
        private readonly configService: ConfigService, // Inject ConfigService
    ) {
        super({
            secretOrKey: configService.get<string>('JWT_SECRET'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
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