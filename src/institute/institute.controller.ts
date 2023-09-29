import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';

import { CreateInstituteDto } from 'src/institute/dto/create-institute.dto';
import { UpdateInstituteDto } from 'src/institute/dto/update-institute.dto';
import { Institute } from 'src/institute/entities/institute.entity';
import { InstituteService } from 'src/institute/institute.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/utils/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('institute')
@UseGuards(AuthGuard())
export class InstituteController {
  constructor(private readonly instituteService: InstituteService) { }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @Body() createInstituteDto: CreateInstituteDto,
    @GetUser() user: User,
  ): Promise<Institute> {
    return this.instituteService.create(createInstituteDto, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@GetUser() user: User): Promise<Institute[]> {
    return this.instituteService.findAll(user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<Institute> {
    return this.instituteService.findOne(+id, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateInstituteDto: UpdateInstituteDto,
    @GetUser() user: User
  ): Promise<Institute> {
    return this.instituteService.update(+id, updateInstituteDto, user);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(
    @Param('id') id: string,
    @GetUser() user: User
  ): Promise<object> {
    return this.instituteService.remove(+id, user);
  }
}
