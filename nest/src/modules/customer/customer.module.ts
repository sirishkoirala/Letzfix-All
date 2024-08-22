import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CustomerDetails } from './entities/customer.entity';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';

@Module({
  imports: [SequelizeModule.forFeature([CustomerDetails])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
