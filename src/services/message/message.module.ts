import { Module } from '@nestjs/common';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from 'src/schema/message.schema';
import { JwtStrategy } from '../auth/strategy';
import { RabbiMqModule } from '../rabbitmq/rabbit.module';
import { RabbitMqService } from '../rabbitmq/rabbitmq.service';
import { UserModule } from '../user/user.module';
import { UserSchema } from 'src/schema/user.schema';


@Module({
  imports: [
    JwtModule.register({}), 
    ConfigModule,
    MongooseModule.forFeature([
        { name: 'Message', schema: MessageSchema },
        { name: 'User', schema: UserSchema },
      ]),
      UserModule,
      RabbiMqModule
],
  controllers: [MessageController],
  providers: [
    MessageService,
    JwtStrategy,
  ],
})
export class MessageModule {}