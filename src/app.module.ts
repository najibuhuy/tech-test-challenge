import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import * as Joi from '@hapi/joi';

import {ConfigModule} from '@nestjs/config';

import {LoggerMiddleware} from "./utils";
import { UserModule } from './services/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUserModule } from './services/auth/authUser.module';
import { MessageModule } from './services/message/message.module';
import { RabbiMqModule } from './services/rabbitmq/rabbit.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            validationSchema: Joi.object({
                DATABASE_URL: Joi.string().required(),
                DBNAME: Joi.string().required(),
                JWT_SECRET: Joi.string().required(),
                JWT_EXPIRES: Joi.string().required(),
                NODE_PORT: Joi.string().required(),
                CONN_RABBIT_MQ : Joi.string().required(),
                EXCHANGE_NAME_RABBITMQ : Joi.string().required(),
            })
        }),
        MongooseModule.forRoot(process.env.DATABASE_URL, {
            dbName: process.env.DBNAME,
          }),
        UserModule,
        AuthUserModule,
        MessageModule,
        RabbiMqModule
    ],
    controllers: [],
    providers: [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
