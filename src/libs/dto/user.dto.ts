import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString, ValidateIf } from "class-validator";

export enum UserGenderEnum {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    OTHER = 'OTHER',
}

export interface UserAuthResponseDto {
    username : string;
    email : string;
    name? : string;
    image? : string;
    dob? : string;
    gender? : string;
    horoscope? : string;
    zodiac? : string;
    height? : string;
    weight? : string;
    interest? : string[];
    token?: string;
    age? : string;
}

export class UpdateDataUserDto {
    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your name for update data, optional'})
    name? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your image for update data, optional'})
    image? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your dob for update data, optional'})
    dob? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your gender for update data, optional'})
    gender? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your height for update data, optional'})
    height? : string;

    @IsString()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your weight for update data, optional'})
    weight? : string;

    @IsArray()
    @ValidateIf((object, value) => value != null)
    @ApiProperty({type: String, description: 'fill your interest for update data, optional'})
    interest? : string[];

}