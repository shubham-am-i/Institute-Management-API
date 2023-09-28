import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { Institute } from './entities/institute.entity';
import { InstituteService } from './institute.service';

@Controller('institute')
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) {}

  @Post()
  create(@Body() createInstituteDto: CreateInstituteDto): Promise<Institute> {
    return this.instituteService.create(createInstituteDto);
  }

  @Get()
  findAll() {
    return this.instituteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.instituteService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInstituteDto: UpdateInstituteDto) {
    return this.instituteService.update(+id, updateInstituteDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.instituteService.remove(+id);
  }
}
