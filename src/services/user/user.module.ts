import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { RabbiMqModule } from '../rabbitmq/rabbit.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      
    ]),
    RabbiMqModule
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
