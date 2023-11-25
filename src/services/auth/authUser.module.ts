import { Module } from '@nestjs/common';
import { AuthUserController } from './authUser.controller';
import { AuthUserService } from './authUser.service';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';
import { ConfigModule } from '@nestjs/config';
import { UserSchema } from 'src/schema/user.schema';
import { MongooseModule } from '@nestjs/mongoose';


@Module({
  imports: [
    JwtModule.register({}), 
    ConfigModule,
    MongooseModule.forFeature([
        { name: 'User', schema: UserSchema },
      ]),
],
  controllers: [AuthUserController],
  providers: [
    AuthUserService,
    JwtStrategy,
  ],
})
export class AuthUserModule {}