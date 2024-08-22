import { Module } from '@nestjs/common';
import { FaultsService } from './faults.service';
import { FaultsController } from './faults.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Fault } from './entities/fault.entity';

@Module({
  imports: [SequelizeModule.forFeature([Fault])],
  controllers: [FaultsController],
  providers: [FaultsService],
})
export class FaultsModule {}
