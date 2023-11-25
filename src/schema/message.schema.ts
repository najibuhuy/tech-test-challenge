import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, now, SchemaTypes, Types } from 'mongoose';
import { User } from './user.schema';

export type MessageDocument = HydratedDocument<User>;

@Schema({collection: 'Message', versionKey: false})
export class Message {

    _id: Types.ObjectId

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    senderId: User;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    receiverId: User;

    @Prop({required: true, type: String})
    messageText: string;

    @Prop({default: now()})
    createdAt: Date;

    @Prop({default: now()})
    updatedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);