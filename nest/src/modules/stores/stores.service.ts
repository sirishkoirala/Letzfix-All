import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(
    @InjectModel(Store)
    private readonly storeModel: typeof Store,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    const store = new Store();
    store.name = createStoreDto.name;
    store.address1 = createStoreDto.address1;
    store.address2 = createStoreDto.address2;
    store.city = createStoreDto.city;
    store.state = createStoreDto.state;
    store.postcode = createStoreDto.postcode;
    store.phone = createStoreDto.phone;

    return await store.save();
  }

  async findAll(): Promise<Store[]> {
    return await this.storeModel.findAll();
  }

  async findOne(id: number): Promise<Store> {
    return await this.storeModel.findByPk(id);
  }
}
