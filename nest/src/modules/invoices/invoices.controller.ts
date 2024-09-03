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
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    return this.invoicesService.update(id, updateInvoiceDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.invoicesService.remove(id);
  }
}
