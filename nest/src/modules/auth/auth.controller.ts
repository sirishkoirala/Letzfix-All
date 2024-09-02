import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
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
    );
    return user;
  }
}
