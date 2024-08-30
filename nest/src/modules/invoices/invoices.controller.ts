import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    return this.invoicesService.create(createInvoiceDto);
  }

  @Get()
  findAll(): Promise<Invoice[]> {
    return this.invoicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Invoice> {
    return this.invoicesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    return this.invoicesService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.invoicesService.remove(id);
  }
}
