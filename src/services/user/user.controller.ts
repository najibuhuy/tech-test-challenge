import { Body, Controller, Get, HttpStatus, Logger, Post, Put, UseGuards } from '@nestjs/common';
import { ResponseAuthUserDto, ResponseMessageSuccessEnum } from 'src/libs/dto/response.dto';
import { UpdateDataUserDto } from 'src/libs/dto/user.dto';
import { User } from 'src/schema/user.schema';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { UserService } from './user.service';

@Controller('/api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  @UseGuards(JwtGuard)
  async getProfile(@GetUser() user : User): Promise<ResponseAuthUserDto> {
    try{
      const getProfile = await this.userService.getProfile(user);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: ResponseMessageSuccessEnum.SUCCESSCREATE,
        data: getProfile,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }

  @Post('')
  @UseGuards(JwtGuard)
  async createProfile(@GetUser() user : User, @Body() dataUpdate : UpdateDataUserDto): Promise<ResponseAuthUserDto> {
    try{
      const getProfile = await this.userService.updateProfile(user, dataUpdate);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: ResponseMessageSuccessEnum.SUCCESSCREATE,
        data: getProfile,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }

  @Put('')
  @UseGuards(JwtGuard)
  async updateProfile(@GetUser() user : User, @Body() dataUpdate : UpdateDataUserDto): Promise<ResponseAuthUserDto> {
    try{
      const getProfile = await this.userService.updateProfile(user, dataUpdate);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: ResponseMessageSuccessEnum.SUCCESSUPDATE,
        data: getProfile,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }
}
