import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from '../invoice-items/entities/invoice-item.entity';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';


@Module({
  imports: [SequelizeModule.forFeature([Invoice, InvoiceItem])],
  providers: [InvoicesService],
  controllers: [InvoicesController],
})
export class InvoicesModule {}
