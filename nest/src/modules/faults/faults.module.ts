import { Module } from '@nestjs/common';
import { FaultsService } from './faults.service';
import { FaultsController } from './faults.controller';

@Module({
  controllers: [FaultsController],
  providers: [FaultsService],
})
export class FaultsModule {}
