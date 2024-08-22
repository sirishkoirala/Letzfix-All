import { Test, TestingModule } from '@nestjs/testing';
import { DeviceModelsController } from './device-models.controller';
import { DeviceModelsService } from './device-models.service';

describe('DeviceModelsController', () => {
  let controller: DeviceModelsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeviceModelsController],
      providers: [DeviceModelsService],
    }).compile();

    controller = module.get<DeviceModelsController>(DeviceModelsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
