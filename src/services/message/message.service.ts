import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { mongooseObjectId } from 'src/libs/helper/mongoose.helper';
import { Message } from 'src/schema/message.schema';
import { MessageResponseDto, PublishMessageDto, SendMessageUserDto } from 'src/libs/dto/message.dto';
import { ResponseMessageFailedEnum } from 'src/libs/dto/response.dto';
import { RabbitMqService } from '../rabbitmq/rabbitmq.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel('User') private UserModel: Model<User>,
    @InjectModel('Message') private MessageModel: Model<Message>,
    private readonly rabbitMqService : RabbitMqService,


) { }

  async getMessage(user: User): Promise<MessageResponseDto[]> {
    try{
        let pipeline = [
            {
              $lookup: {
                from: 'Message',
                localField: '_id',
                foreignField: 'senderId',
                as: 'messageSender'
              }
            },
            {
                $lookup: {
                  from: 'User',
                  localField: 'messageSender.receiverId',
                  foreignField: '_id',
                  as: 'userReceiver'
                }
              },
            {
                $match : {
                    'messageSender.senderId' : user._id
                  }
            },
            { $unwind: "$messageSender" },
            { $unwind: "$userReceiver" },
            {
                '$project': {
                    username: "$username",
                    receiver : "$userReceiver.name",
                    message: "$messageSender.messageText",
                    createdAt: "$createdAt",                
                }
            },
        ]
        const getHistoryMessage = await this.UserModel.aggregate(pipeline)
        return getHistoryMessage
    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

  async sendMessage(userProfile: User, sendData : SendMessageUserDto): Promise<MessageResponseDto[]> {
    try{
        //get receiver
        const getReceiver = await this.UserModel.findById(sendData.sendTo)
        if(!getReceiver)throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.NOTFOUNDRECEIVER}
        
        //send message use rabbitmq
        const messagging : PublishMessageDto= {
          sender : String(userProfile._id),
          message : sendData.message
        }
        const sendMessage = await this.rabbitMqService.PublishProcess(messagging, sendData.sendTo)
        if(!sendMessage) throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.FAILEDPROCESS}

        //save history
        await this.MessageModel.create({
            senderId: userProfile._id,
            receiverId : mongooseObjectId(sendData.sendTo),
            messageText: sendData.message
        })
        const getMessageReceiver = await this.MessageModel.find({
            receiverId : mongooseObjectId(sendData.sendTo),
            senderId : userProfile._id
        }, {_id: 0, updatedAt: 0})
        //return history with receiver as a filter    
        return getMessageReceiver
    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

}
