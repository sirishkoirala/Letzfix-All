import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { DeviceModelsService } from './device-models.service';
import { CreateDeviceModelDto } from './dto/create-device-model.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('device-models')
export class DeviceModelsController {
  constructor(private readonly deviceModelsService: DeviceModelsService) {}

  @Get()
  async findAll() {
    return this.deviceModelsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.deviceModelsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createDeviceModelDto: CreateDeviceModelDto) {
    return this.deviceModelsService.create(createDeviceModelDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.deviceModelsService.remove(+id);
  }
}
