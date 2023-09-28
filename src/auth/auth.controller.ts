import { Body, Controller, Post } from '@nestjs/common';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { }

    @Post('/signup')
    signup(@Body() authCredentialsDto: AuthCredentialsDto): Promise<User> {
        return this.authService.signup(authCredentialsDto);
    }
}
