import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PhonesService } from './phones.service';
import { PhonesEntity } from './phones.entity';
import { PhonesDto } from './dto/phones.dto';

@Controller('phones')
export class PhonesController {
  constructor(private readonly phonesService: PhonesService) {}

  @Get()
  async findAll(): Promise<PhonesEntity[]> {
    return this.phonesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PhonesEntity> {
    return this.phonesService.findOneById(id);
  }

  @Post()
  async create(@Body() phonesDto: PhonesDto): Promise<PhonesEntity> {
    return this.phonesService.create(phonesDto);
  }
}
