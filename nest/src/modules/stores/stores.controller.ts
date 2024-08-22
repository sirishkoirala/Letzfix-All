import { Body, Controller, Get, Post } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './entities/store.entity';

@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Post()
  async create(@Body() createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storesService.create(createStoreDto);
  }

  @Get()
  async findAll(): Promise<Store[]> {
    return this.storesService.findAll();
  }
}
