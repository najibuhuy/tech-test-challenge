import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { User } from 'src/schema/user.schema';
import { mongooseObjectId } from 'src/libs/helper/mongoose.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    @InjectModel('User') private UserModel: Model<User>
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: {
    sub: string;
  }) {
    
    //check payload
    const getUser = await this.UserModel.findOne({
      _id : mongooseObjectId(payload.sub)
    })
    return getUser.toJSON()
    
  }
}
