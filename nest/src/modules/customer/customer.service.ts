import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CustomerDetails } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(CustomerDetails)
    private readonly customerDetailsModel: typeof CustomerDetails,
  ) {}

  async findAll(): Promise<CustomerDetails[]> {
    return this.customerDetailsModel.findAll();
  }

  async findOne(id: number): Promise<CustomerDetails> {
    return this.customerDetailsModel.findByPk(id);
  }

  async create(customerDetails: CustomerDetails): Promise<CustomerDetails> {
    return this.customerDetailsModel.create(customerDetails);
  }

  async delete(id: number): Promise<boolean> {
    const customer = await this.customerDetailsModel.findByPk(id);
    if (!customer) {
      return false;
    }
    await customer.destroy();
    return true;
  }
}
