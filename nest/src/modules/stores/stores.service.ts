import { Injectable, NotFoundException } from '@nestjs/common';
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
    const store = await this.storeModel.findByPk(id);
    if (!store) {
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    const store = await this.findOne(id);
    store.name = updateStoreDto.name || store.name;
    store.address1 = updateStoreDto.address1 || store.address1;
    store.address2 = updateStoreDto.address2 || store.address2;
    store.city = updateStoreDto.city || store.city;
    store.state = updateStoreDto.state || store.state;
    store.postcode = updateStoreDto.postcode || store.postcode;
    store.phone = updateStoreDto.phone || store.phone;

    return await store.save();
  }

  async remove(id: number): Promise<void> {
    const store = await this.findOne(id);
    await store.destroy();
  }
}
