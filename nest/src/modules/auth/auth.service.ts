import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    this.logger.log(`Validating user with email: ${email}`);
    const user = await this.usersService.findOneByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      this.logger.log(`User with email: ${email} validated successfully`);
      const { password, ...result } = user;
      return result;
    }
    this.logger.warn(`User validation failed for email: ${email}`);
    return null;
  }

  async login(user: any) {
    this.logger.log(`Logging in user with ID: ${user.dataValues.id}`);
    const payload = {
      email: user.dataValues.email,
      sub: user.dataValues.id,
      storeId: user.dataValues.storeId,
    };
    const token = this.jwtService.sign(payload);
    this.logger.log(
      `User with ID: ${user.dataValues.id} logged in successfully`,
    );
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
    this.logger.log(`Registering user with email: ${email}`);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    try {
      const user = await this.usersService.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      this.logger.log(`User with email: ${email} registered successfully`);

      return {
        user,
        access_token: this.jwtService.sign({
          email: user.email,
          sub: user.id,
          storeId: user.storeId,
        }),
      };
    } catch (error) {
      this.logger.error(
        `Error registering user with email: ${email}`,
        error.stack,
      );
      throw new Error('Failed to register user');
    }
  }
}
