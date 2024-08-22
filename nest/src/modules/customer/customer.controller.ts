import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  NotFoundException,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerDetails } from './entities/customer.entity';

@Controller('customer')
export class CustomerController {
  constructor(
    private readonly customerDetailsService: CustomerService,
  ) {}

  @Get()
  async findAll(): Promise<CustomerDetails[]> {
    return this.customerDetailsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<CustomerDetails> {
    const customer = await this.customerDetailsService.findOne(id);
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  @Post()
  async create(
    @Body() customerDetails: CustomerDetails,
  ): Promise<CustomerDetails> {
    return this.customerDetailsService.create(customerDetails);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    const result = await this.customerDetailsService.delete(id);
    if (!result) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  }
}
