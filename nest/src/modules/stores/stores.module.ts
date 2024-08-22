import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { Store } from './entities/store.entity';

@Module({
  imports: [SequelizeModule.forFeature([Store])],
  providers: [StoresService],
  controllers: [StoresController],
})
export class StoresModule {}
