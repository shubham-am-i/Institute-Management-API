import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { InstituteService } from './institute.service';
import { InstituteController } from './institute.controller';
import { Institute } from './entities/institute.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Institute])],
  controllers: [InstituteController],
  providers: [InstituteService],
})
export class InstituteModule {}
