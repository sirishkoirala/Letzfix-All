import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { PhoneModelService } from './phone-models.service';
import { PhoneModelEntity } from './phone-models.entity';
import { PhoneModelDto } from './dto/phone-models.dto';

@Controller('phone-models')
export class PhoneModelController {
  constructor(private readonly phoneModelService: PhoneModelService) {}

  @Get()
  async findAll(): Promise<PhoneModelEntity[]> {
    return await this.phoneModelService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<PhoneModelEntity> {
    return this.phoneModelService.findOneById(id);
  }

  @Post()
  async create(
    @Body() phoneModelDto: PhoneModelDto,
  ): Promise<PhoneModelEntity> {
    return await this.phoneModelService.create(phoneModelDto);
  }
}
