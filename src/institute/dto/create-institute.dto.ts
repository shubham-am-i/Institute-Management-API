import { ArrayNotEmpty, IsArray, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateInstituteDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsArray()
    @ArrayNotEmpty()
    subjects: string[];
}
