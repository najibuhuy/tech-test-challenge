import {
    Body,
    Controller,
    HttpCode,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';
import {AuthUserService} from './authUser.service';


import {ApiTags} from "@nestjs/swagger";
import { LoginUserDto, RegisterUserDto } from 'src/libs/dto/auth.dto';
import { ResponseAuthUserDto, ResponseMessageSuccessEnum } from 'src/libs/dto/response.dto';
import { UserAuthResponseDto } from 'src/libs/dto/user.dto';


@ApiTags('api/auth')
@Controller('api/auth')
export class AuthUserController {
    constructor(
        private authService: AuthUserService,
    ) {
    }

    @HttpCode(HttpStatus.OK)
    @Post('register')
    async registerMember(@Body() dto: RegisterUserDto) : Promise<ResponseAuthUserDto> {
        try {
            const registerProc : UserAuthResponseDto= await this.authService.registerUser(dto);
            return {
                statusCode: HttpStatus.OK,
                success: true,
                message: ResponseMessageSuccessEnum.SUCCESSCREATE,
                data: registerProc,
            }
        } catch (e) {
            throw new HttpException({
                statusCode: e.status,
                success: false,
                message: e.message
            }, e.status)
        }
    }

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async loginMember(@Body() dto: LoginUserDto) : Promise<ResponseAuthUserDto>{
        try{
            const loginProc : UserAuthResponseDto= await this.authService.loginUser(dto);
            return {
                statusCode: HttpStatus.OK,
                success: true,
                message: ResponseMessageSuccessEnum.SUCCESSLOGIN,
                data: loginProc,
            }
        } catch (e) {
            throw new HttpException({
                statusCode: e.status,
                success: false,
                message: e.message
            }, e.status)
        }
         
    }
}
