import { Injectable, NotFoundException } from '@nestjs/common';
// external imports
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
// local imports
import { CreateInstituteDto } from 'src/institute/dto/create-institute.dto';
import { UpdateInstituteDto } from 'src/institute/dto/update-institute.dto';
import { Institute } from 'src/institute/entities/institute.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class InstituteService {
  private institute: Repository<Institute>;
  // Initialize institute service via DI
  constructor(@InjectRepository(Institute) institute: Repository<Institute>) {
    this.institute = institute;
  }

  async create(createInstituteDto: CreateInstituteDto, user: User): Promise<Institute> {
    const { name, email, description, subjects } = createInstituteDto;
    const institute = this.institute.create({
      name,
      email,
      description,
      subjects,
      user
    });
    console.log(institute);
    return await this.institute.save(institute);
  }

  async findAll(user: User): Promise<Institute[]> {
    return await this.institute.find({ where: { user: { id: user.id } } });
  }

  async findOne(id: number, user: User): Promise<Institute> {
    const institute = await this.institute.findOne({ where: { id, user: { id: user.id } } });

    if (!institute) {
      throw new NotFoundException(`institute with id ${id} not found.`);
    }

    return institute;
  }

  async update(id: number, updateInstituteDto: UpdateInstituteDto, user: User): Promise<Institute> {
    let institute = await this.findOne(id, user);

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

  async remove(id: number, user: User): Promise<object> {
    const result = await this.institute.delete({ id, user: { id: user.id } });

    if (result.affected === 0) {
      throw new NotFoundException(`institute with id ${id} not found.`);
    }

    return result;
  }
}
