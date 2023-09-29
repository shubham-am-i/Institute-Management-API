import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { InstituteService } from 'src/institute/institute.service';
import { InstituteController } from 'src/institute/institute.controller';
import { Institute } from 'src/institute/entities/institute.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Institute]), AuthModule],
  controllers: [InstituteController],
  providers: [InstituteService],
})
export class InstituteModule { }
