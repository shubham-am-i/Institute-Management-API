import { IsAlphanumeric, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsAlphanumeric()
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    username: string;

    @MinLength(8)
    @MaxLength(32)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is too weak' })
    password: string;
}