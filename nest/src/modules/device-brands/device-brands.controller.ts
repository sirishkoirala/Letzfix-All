import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DeviceBrandsService } from './device-brands.service';
import { CreateDeviceBrandDto } from './dto/create-device-brand.dto';

@Controller('device-brands')
export class DeviceBrandsController {
  constructor(private readonly deviceBrandsService: DeviceBrandsService) {}

  @Post()
  async create(@Body() createDeviceBrandDto: CreateDeviceBrandDto) {
    return this.deviceBrandsService.create(createDeviceBrandDto);
  }

  @Get()
  async findAll() {
    return this.deviceBrandsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.deviceBrandsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deviceBrandsService.remove(+id);
  }
}
