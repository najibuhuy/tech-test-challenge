import { RabbitSubscribe, Nack, AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { PublishMessageDto } from 'src/libs/dto/message.dto';
const receiverId = '656187acea70b79409525b42'

@Injectable()
export class RabbitMqService {
  
  constructor(
    private readonly amqpConnection: AmqpConnection,
    ) {
    }
    //this is just for see rabbitmq is working or not, fill receiverId to simulate that, and see in the logging
  @RabbitSubscribe({
    exchange: 'youapp-message-exchange',
    routingKey: `youapp-message-key-${receiverId}`,
    queue: `youapp-message-queue`,
    
  })
  public async getMessageCreateEnroll(msg: PublishMessageDto) {
    try{
        if(msg){
          console.log(`message from ${msg.sender}: ${msg.message}`)
              return new Nack(false)
        }
    }catch (e){
        if (e.code === 'P2002') throw new ForbiddenException(e.message);
        else throw new BadRequestException(e.message);
    }
  }


  async PublishProcess(msg: PublishMessageDto, receiverId: string) {
    try{
      await this.amqpConnection.publish('youapp-message-exchange', `youapp-message-key-${receiverId}`, msg);
      return true
    } catch (e) {
      return false
    }
  }

}