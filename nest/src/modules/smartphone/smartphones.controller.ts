import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SmartPhonesService } from './smartphones.service';
import { CreateSmartPhonesDto, UpdateSmartPhonesDto } from './dto/smartphones.dto';

@Controller('smart-phones')
export class SmartPhoneController {
  constructor(private readonly smartPhoneService: SmartPhonesService) {}

  @Post()
  create(@Body() createSmartPhoneDto: CreateSmartPhonesDto) {
    return this.smartPhoneService.create(createSmartPhoneDto);
  }

  @Get()
  findAll() {
    return this.smartPhoneService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.smartPhoneService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateSmartPhonesDto: UpdateSmartPhonesDto,
  ) {
    return this.smartPhoneService.update(id, updateSmartPhonesDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.smartPhoneService.delete(id);
  }
}
