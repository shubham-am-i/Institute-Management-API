import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';

import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { Institute } from './entities/institute.entity';
import { InstituteService } from './institute.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('institute')
@UseGuards(AuthGuard())
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  @Post()
  create(@Body() createInstituteDto: CreateInstituteDto): Promise<Institute> {
    return this.instituteService.create(createInstituteDto);
  }

  @Get()
  findAll(): Promise<Institute[]> {
    return this.instituteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Institute> {
    return this.instituteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstituteDto: UpdateInstituteDto): Promise<Institute> {
    return this.instituteService.update(+id, updateInstituteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<object> {
    return this.instituteService.remove(+id);
  }
}
