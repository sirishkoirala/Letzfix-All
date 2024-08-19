import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDevicesDto, UpdateDevicesDto } from './dto/devices.dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @Post()
  create(@Body() createDeviceDto: CreateDevicesDto) {
    return this.devicesService.create(createDeviceDto);
  }

  @Get()
  findAll() {
    return this.devicesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.devicesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateDevicesDto: UpdateDevicesDto) {
    return this.devicesService.update(id, updateDevicesDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.devicesService.delete(id);
  }
}
