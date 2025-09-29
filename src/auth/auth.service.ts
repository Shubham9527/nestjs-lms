import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async register(registerUserDto: RegisterUserDto) {
    console.log('dto', registerUserDto);

    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(
      registerUserDto.password,
      saltRounds,
    );
    // Logic for user register
    /* 
        1. Check already exists
        2. has the password
        3. store the user in db
        4. generate tokens
        5. send token in response
    */
    return this.userService.createUser({
      ...registerUserDto,
      password: hashPassword,
    });
  }
}
