import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class RegisterUserDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your email for register, required'})
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your usename for register, required'})
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your password for register, required'})
    password: string;

}

export class LoginUserDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your username for login, required'})
    username: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({type: String, description: 'fill your password for login, required'})
    password: string;
}