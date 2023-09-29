import { PartialType } from '@nestjs/mapped-types';
import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { CreateInstituteDto } from 'src/institute/dto/create-institute.dto';

export class UpdateInstituteDto extends PartialType(CreateInstituteDto) {
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    @IsOptional()
    email: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    description: string;

    @IsArray()
    @ArrayNotEmpty()
    @IsOptional()
    subjects: string[];
}
