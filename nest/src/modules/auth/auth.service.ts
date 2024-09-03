import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    console.log(user)
    const payload = {
      email: user.dataValues.email,
      sub: user.dataValues.id,
      storeId: user.dataValues.storeId,
    };
    const token = this.jwtService.sign(payload);
    // console.log(payload)
    // console.log('Generated Token:', token);
    return {
      access_token: token,
    };
  }

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<any> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const user = await this.usersService.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    return {
      user,
      access_token: this.jwtService.sign({
        email: user.email,
        sub: user.id,
        storeId: user.storeId,
      }),
    };
  }
}
