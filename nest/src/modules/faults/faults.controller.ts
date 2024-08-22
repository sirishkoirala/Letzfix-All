import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FaultsService } from './faults.service';
import { CreateFaultDto } from './dto/create-fault.dto';
import { UpdateFaultDto } from './dto/update-fault.dto';

@Controller('faults')
export class FaultsController {
  constructor(private readonly faultsService: FaultsService) {}

  @Post()
  create(@Body() createFaultDto: CreateFaultDto) {
    return this.faultsService.create(createFaultDto);
  }

  @Get()
  findAll() {
    return this.faultsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faultsService.findOne(+id);
  }

}
