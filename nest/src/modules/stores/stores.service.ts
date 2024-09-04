import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  private readonly logger = new Logger(StoresService.name);

  constructor(
    @InjectModel(Store)
    private readonly storeModel: typeof Store,
  ) {}

  async create(createStoreDto: CreateStoreDto): Promise<Store> {
    this.logger.log('Creating a new store');

    const store = new Store();
    store.name = createStoreDto.name;
    store.address1 = createStoreDto.address1;
    store.address2 = createStoreDto.address2;
    store.city = createStoreDto.city;
    store.state = createStoreDto.state;
    store.postcode = createStoreDto.postcode;
    store.phone = createStoreDto.phone;

    const newStore = await store.save();
    this.logger.log(`Store created with ID: ${newStore.id}`);
    return newStore;
  }

  async findAll(): Promise<Store[]> {
    this.logger.log('Fetching all stores');

    const stores = await this.storeModel.findAll();
    // this.logger.log(`Fetched ${stores.length} stores`);
    return stores;
  }

  async findOne(id: number): Promise<Store> {
    this.logger.log(`Fetching store with ID: ${id}`);

    const store = await this.storeModel.findByPk(id);
    if (!store) {
      this.logger.warn(`Store with ID ${id} not found`);
      throw new NotFoundException(`Store with ID ${id} not found`);
    }
    return store;
  }

  async update(id: number, updateStoreDto: UpdateStoreDto): Promise<Store> {
    this.logger.log(`Updating store with ID: ${id}`);

    const store = await this.findOne(id);
    store.name = updateStoreDto.name || store.name;
    store.address1 = updateStoreDto.address1 || store.address1;
    store.address2 = updateStoreDto.address2 || store.address2;
    store.city = updateStoreDto.city || store.city;
    store.state = updateStoreDto.state || store.state;
    store.postcode = updateStoreDto.postcode || store.postcode;
    store.phone = updateStoreDto.phone || store.phone;

    const updatedStore = await store.save();
    this.logger.log(`Store with ID ${id} updated`);
    return updatedStore;
  }

  async remove(id: number): Promise<void> {
    this.logger.log(`Removing store with ID: ${id}`);

    const store = await this.findOne(id);
    await store.destroy();
    this.logger.log(`Store with ID ${id} removed`);
  }
}
