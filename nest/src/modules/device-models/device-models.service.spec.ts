import { Test, TestingModule } from '@nestjs/testing';
import { DeviceModelsService } from './device-models.service';

describe('DeviceModelsService', () => {
  let service: DeviceModelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeviceModelsService],
    }).compile();

    service = module.get<DeviceModelsService>(DeviceModelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
