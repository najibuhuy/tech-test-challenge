import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, now, SchemaTypes, Types } from 'mongoose';
import { UserGenderEnum } from 'src/libs/dto/user.dto';

export type UserDocument = HydratedDocument<User>;

@Schema({collection: 'User', versionKey: false})
export class User {

    _id: Types.ObjectId

    @Prop({required: true, type: String})
    username: string;

    @Prop({required: true, type: String})
    email: string;

    @Prop({required: true, type: String})
    password: string;

    @Prop({required: false, type: String, default: null})
    name: string;

    @Prop({required: false, type: String, default: null})
    image: string;

    @Prop({required: false})
    dob: string;

    @Prop({required: false, enum : [UserGenderEnum.FEMALE, UserGenderEnum.MALE, UserGenderEnum.OTHER], default: UserGenderEnum.MALE})
    gender: string;

    @Prop({required: false, type: String, default: null})
    horoscope: string;

    @Prop({required: false, type: String, default: null})
    zodiac: string;

    @Prop({required: false, type: String, default: null})
    height: string;

    @Prop({required: false, type: String, default: null})
    weight: string;

    @Prop({required: false, type: [String], default: []})
    interest: string[];

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);