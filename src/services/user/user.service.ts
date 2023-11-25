import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schema/user.schema';
import { mongooseObjectId } from 'src/libs/helper/mongoose.helper';
import { UpdateDataUserDto, UserAuthResponseDto } from 'src/libs/dto/user.dto';
import { getAge, getZodiacHoroscope } from 'src/libs/helper/global.helper';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private UserModel: Model<User>

) { }
  async getProfile(userProfile: User): Promise<UserAuthResponseDto> {
    try{
      //count age
      let age = null
      if(userProfile.dob) age = getAge(userProfile.dob)
      let findUser = userProfile;
      delete findUser._id;
      delete findUser.password;
      return {
        ...findUser,
        age : age
      }

    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

  async updateProfile(userProfile: User, dataUpdate: UpdateDataUserDto): Promise<UserAuthResponseDto> {
    try{
      let age = null
      let horoscope = null
      let zodiac = null
      //convert horoscope & Zodiac and count age
      if(dataUpdate.dob) {
        age = getAge(dataUpdate.dob)
        let zoho = getZodiacHoroscope(dataUpdate.dob)
        zodiac = zoho.zodiac
        horoscope  = zoho.horoscope
      }
      Logger.log(zodiac, horoscope)
      //update user data from db
      await this.UserModel.findByIdAndUpdate(
        userProfile._id,
        {
          name : dataUpdate.name ? dataUpdate.name : userProfile.name,
          image : dataUpdate.image ? dataUpdate.image : userProfile.image,
          dob : dataUpdate.dob ? dataUpdate.dob : userProfile.dob,
          gender : dataUpdate.gender ? dataUpdate.gender : userProfile.gender,
          zodiac : dataUpdate.dob ? zodiac : userProfile.zodiac,
          height : dataUpdate.height ? dataUpdate.height : userProfile.height,
          weight : dataUpdate.weight ? dataUpdate.weight : userProfile.weight,
          interest : dataUpdate.interest ? dataUpdate.interest : userProfile.interest,
          horoscope :dataUpdate.dob ? horoscope : userProfile.horoscope,
        }
      )
      let findUser = await this.UserModel.findById(userProfile._id)
      findUser = findUser.toJSON();
      delete findUser._id;
      delete findUser.password;
      return {
        ...findUser,
        age: age
      }
    }catch (e) {
      Logger.log(e)
      throw { status : e.status,message : e.message}
    }

  }

}
