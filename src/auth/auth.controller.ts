import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';

@Controller('auth')
export class AuthController {
  // one approache
  //   authService: AuthService;

  //   constructor(authService: AuthService) {
  //     this.authService = authService;
  //   }

  //   alternative approache
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const token = await this.authService.register(registerUserDto);
    return token;
  }
}
