import { Injectable } from '@nestjs/common';
// external imports
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// local imports
import { CreateInstituteDto } from './dto/create-institute.dto';
import { UpdateInstituteDto } from './dto/update-institute.dto';
import { Institute } from './entities/institute.entity';

@Injectable()
export class InstituteService {
  private institute: Repository<Institute>;
  // Initialize institute service via DI
  constructor(@InjectRepository(Institute) institute: Repository<Institute>) {
    this.institute = institute;
  }

  async create(createInstituteDto: CreateInstituteDto): Promise<Institute> {
    const { name, email, description, subjects } = createInstituteDto;
    const institute = this.institute.create({
      name,
      email,
      description,
      subjects
    });

    return await this.institute.save(institute);
  }

  findAll() {
    return `This action returns all institute`;
  }

  findOne(id: number) {
    return `This action returns a #${id} institute`;
  }

  update(id: number, updateInstituteDto: UpdateInstituteDto) {
    return `This action updates a #${id} institute`;
  }

  remove(id: number) {
    return `This action removes a #${id} institute`;
  }
}
