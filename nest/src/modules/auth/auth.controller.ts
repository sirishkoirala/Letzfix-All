
import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  BadRequestException,
  Req,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
// import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Get('login')
  logitGet() {
    return console.log('hello');
  }

  @Post('register')
  async register(@Body() body) {
    const { firstName, lastName, email, password } = body;
    const user = await this.authService.register(
      firstName,
      lastName,
      email,
      password,
    )
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
