import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';

@Controller('auth')
export class AuthController {
  // one approache
  //   authService: AuthService;

  //   constructor(authService: AuthService) {
  //     this.authService = authService;
  //   }

  //   alternative approache
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    const token = await this.authService.register(registerUserDto);
    return token;
  }

  @Post('login')
  async login() {
    /* 
      1. Receive Email and Password
      2. Match the Email and Password
      3. Generate JWT Token
     */
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    //TODO
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    const userId = req.user.sub as string;

    const user = await this.userService.getUserById(userId);

    return {
      fname: user?.fname,
      lname: user?.lname,
      email: user?.email,
      role: user?.role,
    };
  }
}
