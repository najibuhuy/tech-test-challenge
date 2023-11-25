import { RabbitMQModule } from '@golevelup/nestjs-rabbitmq';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RabbitMqService } from './rabbitmq.service';
import * as dotenv from 'dotenv';

dotenv.config();
@Module({
  imports: [
    ConfigModule,
    RabbitMQModule.forRoot(RabbitMQModule, {
      exchanges: [
        {
          name: process.env.EXCHANGE_NAME_RABBITMQ,
          type: "topic",
        },
      ],
      uri: process.env.CONN_RABBIT_MQ,
      enableControllerDiscovery: true,
    }),
  ],
  providers: [RabbitMqService ],
  controllers: [],
  exports : [RabbitMqService]
})
export class RabbiMqModule {}