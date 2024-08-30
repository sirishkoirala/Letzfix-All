import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { InvoiceItemsService } from './invoice-items.service';
import { InvoiceItemsController } from './invoice-items.controller';
import { InvoiceItem } from './entities/invoice-item.entity';

@Module({
  imports: [SequelizeModule.forFeature([InvoiceItem])],
  providers: [InvoiceItemsService],
  controllers: [InvoiceItemsController],
})
export class InvoiceItemsModule {}
