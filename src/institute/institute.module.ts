import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { InstituteService } from './institute.service';
import { InstituteController } from './institute.controller';
import { Institute } from './entities/institute.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Institute]), AuthModule],
  controllers: [InstituteController],
  providers: [InstituteService],
})
export class InstituteModule {}
