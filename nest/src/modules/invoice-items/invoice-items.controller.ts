import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { InvoiceItemsService } from './invoice-items.service';
import { CreateInvoiceItemDto } from './dto/create-invoice-item.dto';
import { UpdateInvoiceItemDto } from './dto/update-invoice-item.dto';
import { InvoiceItem } from './entities/invoice-item.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('invoice-items')
export class InvoiceItemsController {
  constructor(private readonly invoiceItemsService: InvoiceItemsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createInvoiceItemDto: CreateInvoiceItemDto,
  ): Promise<InvoiceItem> {
    return this.invoiceItemsService.create(createInvoiceItemDto);
  }

  @Get()
  findAll(): Promise<InvoiceItem[]> {
    return this.invoiceItemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<InvoiceItem> {
    return this.invoiceItemsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvoiceItemDto: UpdateInvoiceItemDto,
  ): Promise<InvoiceItem> {
    return this.invoiceItemsService.update(id, updateInvoiceItemDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.invoiceItemsService.remove(id);
  }
}
