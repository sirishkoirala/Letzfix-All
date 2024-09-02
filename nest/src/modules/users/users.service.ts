
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ where: { email } });
  }

  async create(userData: CreateUserDto): Promise<User> {
    return this.userModel.create(userData);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }
  async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
