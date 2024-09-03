import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { FaultsService } from './faults.service';
import { CreateFaultDto } from './dto/create-fault.dto';
import { UpdateFaultDto } from './dto/update-fault.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('faults')
export class FaultsController {
  constructor(private readonly faultsService: FaultsService) {}
  @UseGuards(JwtAuthGuard)
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
