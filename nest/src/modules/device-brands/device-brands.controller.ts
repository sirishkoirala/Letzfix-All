import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DeviceBrandsService } from './device-brands.service';
import { CreateDeviceBrandDto } from './dto/create-device-brand.dto';


@Controller('device-brands')
export class DeviceBrandsController {
  constructor(private readonly deviceBrandsService: DeviceBrandsService) {}

  @Post()
  create(@Body() createDeviceBrandDto: CreateDeviceBrandDto) {
    return this.deviceBrandsService.create(createDeviceBrandDto);
  }

  @Get()
  findAll() {
    return this.deviceBrandsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deviceBrandsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateDeviceBrandDto: UpdateDeviceBrandDto) {
  //   return this.deviceBrandsService.update(+id, updateDeviceBrandDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.deviceBrandsService.remove(+id);
  // }
}
