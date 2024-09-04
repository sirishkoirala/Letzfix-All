import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
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

  // @Get()
  // findAll(): Promise<Invoice[]> {
  //   return this.invoicesService.findAll();
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAppointments(@Request() req) {
    const storeId = req.user.storeId;
    const filteredInvoices =
      await this.invoicesService.findAllByStoreId(storeId);
    return filteredInvoices;
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number, @Request() req) {
    const storeId = req.user.storeId;
    const invoice = await this.invoicesService.findOne(+id);
    if (!invoice.storeId !== storeId) {
      throw new NotFoundException("Invouice not found for this store");
  }
  return invoice;
}

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    return this.invoicesService.update(id, updateInvoiceDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.invoicesService.remove(id);
  }
}
