import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { DeviceModelsService } from './device-models.service';
import { CreateDeviceModelDto } from './dto/create-device-model.dto';

@Controller('device-models')
export class DeviceModelsController {
  constructor(private readonly deviceModelsService: DeviceModelsService) {}

  @Post()
  async create(@Body() createDeviceModelDto: CreateDeviceModelDto) {
    return this.deviceModelsService.create(createDeviceModelDto);
  }

  @Get()
  async findAll() {
    return this.deviceModelsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.deviceModelsService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deviceModelsService.remove(+id);
  }
}
