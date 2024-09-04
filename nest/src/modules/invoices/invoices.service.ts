import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Appointment } from '../appointments/entities/appointment.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Store } from '../stores/entities/store.entity';
import { InvoiceItem } from '../invoice-items/entities/invoice-item.entity';

@Injectable()
export class InvoicesService {
  private readonly logger = new Logger(InvoicesService.name);

  constructor(
    @InjectModel(Invoice)
    private invoiceModel: typeof Invoice,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    this.logger.log('Creating a new invoice', JSON.stringify(createInvoiceDto));
    try {
      const invoice = await this.invoiceModel.create(createInvoiceDto);
      this.logger.log(`Invoice created successfully with ID ${invoice.id}`);
      return invoice;
    } catch (error) {
      this.logger.error('Error creating invoice', error.stack);
      throw new Error('Failed to create invoice');
    }
  }

  async findAllByStoreId(storeId: number | null): Promise<Invoice[]> {
    this.logger.log(`Fetching invoices for storeId: ${storeId}`);
    const where = storeId ? { storeId } : null;
    return await this.invoiceModel.findAll({
      where,
      include: [
        { model: Appointment },
        { model: Customer },
        { model: Store },
        { model: InvoiceItem },
      ],
    });
  }

  async findAll(): Promise<Invoice[]> {
    this.logger.log('Fetching all invoices');
    return await this.invoiceModel.findAll({
      include: [
        { model: Appointment },
        { model: Customer },
        { model: Store },
        { model: InvoiceItem },
      ],
    });
  }

  async findOne(id: number): Promise<Invoice> {
    this.logger.log(`Fetching invoice with ID ${id}`);
    const invoice = await this.invoiceModel.findByPk(id, {
      include: [
        { model: Appointment },
        { model: Customer },
        { model: Store },
        { model: InvoiceItem },
      ],
    });

    if (!invoice) {
      this.logger.warn(`Invoice with ID ${id} not found`);
      throw new NotFoundException('Invoice not found');
    }

    return invoice;
  }

  async update(
    id: number,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    this.logger.log(
      `Updating invoice with ID ${id}`,
      JSON.stringify(updateInvoiceDto),
    );
    const invoice = await this.findOne(id);

    if (!invoice) {
      this.logger.warn(`Invoice with ID ${id} not found`);
      throw new NotFoundException('Invoice not found');
    }

    try {
      const updatedInvoice = await invoice.update(updateInvoiceDto);
      this.logger.log(`Invoice with ID ${id} updated successfully`);
      return updatedInvoice;
    } catch (error) {
      this.logger.error('Error updating invoice', error.stack);
      throw new Error('Failed to update invoice');
    }
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Deleting invoice with ID ${id}`);
    const invoice = await this.findOne(id);

    if (!invoice) {
      this.logger.warn(`Invoice with ID ${id} not found`);
      throw new NotFoundException('Invoice not found');
    }

    try {
      await invoice.destroy();
      this.logger.log(`Invoice with ID ${id} deleted successfully`);
    } catch (error) {
      this.logger.error('Error deleting invoice', error.stack);
      throw new Error('Failed to delete invoice');
    }
  }
}
