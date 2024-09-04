import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  private readonly logger = new Logger(CustomersService.name);

  constructor(
    @InjectModel(Customer)
    private readonly customerModel: typeof Customer,
  ) {}

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    this.logger.log('Creating a new customer');

    const customer = new Customer();
    customer.firstName = createCustomerDto.firstName;
    customer.lastName = createCustomerDto.lastName;
    customer.email = createCustomerDto.email;
    customer.phone = createCustomerDto.phone;

    const result = await customer.save();
    this.logger.log(`Customer created with ID: ${result.id}`);
    return result;
  }

  async findAll(): Promise<Customer[]> {
    this.logger.log('Fetching all customers');
    return await this.customerModel.findAll();
  }

  async findOne(id: number): Promise<Customer> {
    this.logger.log(`Fetching customer with ID: ${id}`);
    const customer = await this.customerModel.findByPk(id);
    if (!customer) {
      this.logger.warn(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  async update(
    id: number,
    updateCustomerDto: UpdateCustomerDto,
  ): Promise<Customer> {
    this.logger.log(`Updating customer with ID: ${id}`);
    const customer = await this.findOne(id);
    if (!customer) {
      this.logger.error(`Customer with ID ${id} not found`);
      throw new Error(`Customer with ID ${id} not found`);
    }
    customer.firstName = updateCustomerDto.firstName || customer.firstName;
    customer.lastName = updateCustomerDto.lastName || customer.lastName;
    customer.email = updateCustomerDto.email || customer.email;
    customer.phone = updateCustomerDto.phone || customer.phone;

    const result = await customer.save();
    this.logger.log(`Customer with ID ${id} updated`);
    return result;
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing customer with ID: ${id}`);
    const customer = await this.findOne(id);
    if (customer) {
      await customer.destroy();
      this.logger.log(`Customer with ID ${id} removed`);
    } else {
      this.logger.warn(`Customer with ID ${id} not found`);
    }
  }
}
