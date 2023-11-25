import { MessageResponseDto } from "./message.dto";
import { UserAuthResponseDto } from "./user.dto";

export interface ResponseAuthUserDto {
    statusCode : Number;
    success: Boolean;
    message : String;
    data? : UserAuthResponseDto;
}

export interface ResponseMessageUserDto {
    statusCode : Number;
    success: Boolean;
    message : String;
    data? : MessageResponseDto[];
}

export enum ResponseMessageSuccessEnum {
    SUCCESSCREATE = 'SUCCESS CREATE',
    SUCCESSUPDATE = 'SUCCESS UPDATE',
    SUCCESSGET = 'SUCCESS GET',
    SUCCESSLOGIN = 'SUCCESS LOGIN',
    SUCCESSSENDMESSAGE = 'SUCCESS SEND MESSAGE',


}

export enum ResponseMessageFailedEnum {
    BADREQUEST = 'BAD REQUEST',
    INTERNALSERVERERROR = 'INTERNAL SERVER ERROR',
    NOTUNIQUEEMAIL = 'EMAIL EXIST',
    NOTUNIQUEUSERNAME = 'USERNAME EXIST',
    FAILEDPROCESS = 'FAILED TO PROCESS',
    NOTFOUND = 'NOT FOUND',
    NOTFOUNDUSER = 'NOT FOUND USER',
    NOTFOUNDRECEIVER = 'NOT FOUND RECEIVER',
    WRONGPASSWORD = 'WRONG PASSWORD'

}