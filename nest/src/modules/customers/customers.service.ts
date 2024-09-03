import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const customer = new Customer();
    customer.firstName = createCustomerDto.firstName;
    customer.lastName = createCustomerDto.lastName;
    customer.email = createCustomerDto.email;
    customer.phone = createCustomerDto.phone;

    return await customer.save();
  }

  
  async findAll(): Promise<Customer[]> {
    return await this.customerModel.findAll();
  }

  async findOne(id: number): Promise<Customer> {
    return await this.customerModel.findByPk(id);
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    const customer = await this.findOne(id);
    if (!customer) {
      throw new Error(`Customer with ID ${id} not found`);
    }
    customer.firstName = updateCustomerDto.firstName || customer.firstName;
    customer.lastName = updateCustomerDto.lastName || customer.lastName;
    customer.email = updateCustomerDto.email || customer.email;
    customer.phone = updateCustomerDto.phone || customer.phone;

    return await customer.save();
  }

  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id);
    if (customer) {
      await customer.destroy();
    }
  }
}
