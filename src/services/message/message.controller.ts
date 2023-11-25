import { Body, Controller, Get, HttpStatus, Logger, Post, Put, UseGuards } from '@nestjs/common';
import { SendMessageUserDto } from 'src/libs/dto/message.dto';
import { ResponseMessageSuccessEnum, ResponseMessageUserDto } from 'src/libs/dto/response.dto';
import { User } from 'src/schema/user.schema';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { MessageService } from './message.service';

@Controller('/api/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('')
  @UseGuards(JwtGuard)
  async getMessages(@GetUser() user : User): Promise<ResponseMessageUserDto> {
    try{
      const getMessage = await this.messageService.getMessage(user);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: ResponseMessageSuccessEnum.SUCCESSGET,
        data: getMessage,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }

  @Post('send')
  @UseGuards(JwtGuard)
  async sendMessage(@GetUser() user : User, @Body() sendData : SendMessageUserDto): Promise<ResponseMessageUserDto> {
    try{
      const sendText = await this.messageService.sendMessage(user, sendData);
      return {
        statusCode: HttpStatus.OK,
        success: true,
        message: ResponseMessageSuccessEnum.SUCCESSSENDMESSAGE,
        data: sendText,
      }
    } catch(e) {
      Logger.log(e)
      throw { statusCode : e.status,message : e.message}
    }
  }
}
