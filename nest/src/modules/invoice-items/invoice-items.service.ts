import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { InvoiceItem } from './entities/invoice-item.entity';

@Injectable()
export class InvoiceItemsService {
  constructor(
    @InjectModel(InvoiceItem)
    private invoiceItemModel: typeof InvoiceItem,
  ) {}

  async create(
    createInvoiceItemDto: CreateInvoiceItemDto,
  ): Promise<InvoiceItem> {
    return this.invoiceItemModel.create(createInvoiceItemDto);
  }

  async findAll(): Promise<InvoiceItem[]> {
    return this.invoiceItemModel.findAll({
      include: { all: true },
    });
  }

  async findOne(id: string): Promise<InvoiceItem> {
    const invoiceItem = await this.invoiceItemModel.findOne({
      where: { id },
      include: { all: true },
    });

    if (!invoiceItem) {
      throw new NotFoundException('Invoice Item not found');
    }

    return invoiceItem;
  }

  async update(
    id: string,
    updateInvoiceItemDto: UpdateInvoiceItemDto,
  ): Promise<InvoiceItem> {
    const invoiceItem = await this.findOne(id);
    return invoiceItem.update(updateInvoiceItemDto);
  }

  async remove(id: string): Promise<void> {
    const invoiceItem = await this.findOne(id);
    await invoiceItem.destroy();
  }
}
