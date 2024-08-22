import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStoreDto } from './dto/create-store.dto';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(Store)
    private readonly storeModel: typeof Store,
  ) {}
  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    return this.storeModel.create(createStoreDto);
  }
  async findAll(): Promise<Store[]> {
    return this.storeModel.findAll();
  }
}
