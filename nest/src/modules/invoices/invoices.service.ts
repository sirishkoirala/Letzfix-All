import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectModel(Invoice)
    private invoiceModel: typeof Invoice,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoiceModel.create(createInvoiceDto);
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: string): Promise<Invoice> {
    const invoice = await this.invoiceModel.findOne({
      where: { id },
      include: { all: true },
    });

    if (!invoice) {
      throw new NotFoundException('Invoice not found');
    }

    return invoice;
  }

  async update(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    const invoice = await this.findOne(id);
    return invoice.update(updateInvoiceDto);
  }

  async remove(id: string): Promise<void> {
    const invoice = await this.findOne(id);
    await invoice.destroy();
  }
}
