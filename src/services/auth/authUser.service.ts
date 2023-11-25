import { ForbiddenException, HttpCode, HttpStatus, Injectable, Logger} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import {JwtService} from '@nestjs/jwt';
import {ConfigService} from '@nestjs/config';
import { User } from 'src/schema/user.schema';
import { LoginUserDto, RegisterUserDto } from 'src/libs/dto/auth.dto';
import { UserAuthResponseDto } from 'src/libs/dto/user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResponseMessageFailedEnum } from 'src/libs/dto/response.dto';


@Injectable({})
export class AuthUserService {
    constructor(
        @InjectModel('User') private UserModel: Model<User>,
        private jwt: JwtService,
        private config: ConfigService,
    ) {
    }

    async loginUser(dto: LoginUserDto) : Promise<UserAuthResponseDto> {
        try{

            //get email exist or not
            let getExistUser = await this.UserModel.findOne({
                $or : [
                    {email : dto.username},
                    {username: dto.username}
                ]
            })
            if(!getExistUser) throw {status: HttpStatus.NOT_FOUND, message: ResponseMessageFailedEnum.NOTFOUNDUSER }
            
            //validate password
            const isMatch = await bcrypt.compare(dto.password, getExistUser.password);
            if(!isMatch) throw {status: HttpStatus.UNAUTHORIZED, message: ResponseMessageFailedEnum.WRONGPASSWORD }
            
            //create token
            const token = await this.signToken(
                String(getExistUser._id)
            );
            getExistUser = getExistUser.toJSON();
            delete getExistUser._id;
            delete getExistUser.password;
            return {
                ...getExistUser,
                token : token
            }

        } catch (e){
            Logger.log(e)
            throw { status : e.status,message : e.message}
        }
    }

    async registerUser(dto: RegisterUserDto): Promise<UserAuthResponseDto> {
        try {
            //get email exist or not
            const getExistUser : User = await this.UserModel.findOne({
                $or : [
                    {email : dto.email},
                    {username: dto.username}
                ]
            })
            if(getExistUser) {
                if(getExistUser.email === dto.email) throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.NOTUNIQUEEMAIL }
                else throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.NOTUNIQUEUSERNAME }
            }

            //hashing password
            const saltOrRound : number = 10
            const hash = await bcrypt.hash(dto.password, saltOrRound)
            if(!hash) throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.FAILEDPROCESS}

            //create user
            let createUser  = await this.UserModel.create({
                username: dto.username,
                email: dto.email,
                password: hash
            })
            if(!createUser) throw {status: HttpStatus.BAD_REQUEST, message: ResponseMessageFailedEnum.FAILEDPROCESS}

            //create token
            const token = await this.signToken(
                String(createUser._id)
            );
            createUser = createUser.toJSON();
            delete createUser._id;
            delete createUser.password;
            return {
                ...createUser,
                token : token
            }
        } catch (e) {
            Logger.log(e)
            throw { status : e.status,message : e.message}
        }
    }

    async signToken(
        userId: string,
    ): Promise<string> {
        const payload = {
            sub: userId,
        };

        const secret = this.config.get('JWT_SECRET');
        const expiresIn = this.config.get(
            'JWT_EXPIRES',
        );
        return this.jwt.signAsync(payload, {
            expiresIn: expiresIn,
            secret: secret,
        });
    }
}