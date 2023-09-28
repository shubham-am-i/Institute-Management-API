import { Injectable, NotFoundException } from '@nestjs/common';
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

  async findAll(): Promise<Institute[]> {
    return await this.institute.find();
  }

  async findOne(id: number): Promise<Institute> {
    const institute = await this.institute.findOneBy({ id });

    if (!institute) {
      throw new NotFoundException(`institute with id ${id} not found.`);
    }

    return institute;
  }

  async update(id: number, updateInstituteDto: UpdateInstituteDto): Promise<Institute> {
    let institute = await this.findOne(id);

    if (institute) {
      const updateFields = Object.keys(updateInstituteDto);
      updateFields.forEach(field => {
        if (updateInstituteDto[field] !== undefined) {
          institute[field] = updateInstituteDto[field];
        }
      });

      institute = await this.institute.save(institute);
    }

    return institute;
  }

  async remove(id: number): Promise<object> {
    const result = await this.institute.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`institute with id ${id} not found.`);
    }

    return result;
  }
}
