import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { RegisterUserDto } from 'src/auth/dto/registerUser.dto';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createUser(registerUserDto: RegisterUserDto) {
    try {
      return await this.userModel.create({
        fname: registerUserDto.fname,
        lname: registerUserDto.lname,
        email: registerUserDto.email,
        password: registerUserDto.password,
      });
    } catch (error: unknown) {
      const e = error as {
        code?: number;
        keyValue: Record<string, string>;
      };
      console.log(error);

      const duplicateKeyErrCode = 11000;
      if (e.code === duplicateKeyErrCode) {
        if ('email' in e.keyValue) {
          throw new ConflictException('Email is already exists');
        }
      }

      throw error;
    }
  }
}
