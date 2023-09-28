import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from './user.entity';
import { JwtStrategy } from './utils/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Use the JWT secret key from env vars
        signOptions: {
          expiresIn: 3600,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User])
  ],
  providers: [AuthService, JwtStrategy, ConfigService],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule]
})
export class AuthModule {}
