import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    this.logger.log(`Finding user by email: ${email}`);
    return this.userModel.findOne({ where: { email } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('Creating a new user');
    const newUser = await this.userModel.create(createUserDto);
    this.logger.log(`User created with ID: ${newUser.id}`);
    return newUser;
  }

  async findAll(): Promise<User[]> {
    this.logger.log('Fetching all users');
    const users = await this.userModel.findAll({ include: ['store'] });
    return users;
  }

  async findOne(id: number): Promise<User> {
    this.logger.log(`Fetching user with ID: ${id}`);
    const user = await this.userModel.findByPk(id);
    if (!user) {
      this.logger.warn(`User with ID ${id} not found`);
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    this.logger.log(`Updating user with ID: ${id}`);
    const user = await this.findOne(id);
    const updatedUser = await user.update(updateUserDto);
    this.logger.log(`User with ID ${id} updated`);
    return updatedUser;
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing user with ID: ${id}`);
    const user = await this.findOne(id);
    await user.destroy();
    this.logger.log(`User with ID ${id} removed`);
  }
}
