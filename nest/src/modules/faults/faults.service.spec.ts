import { Test, TestingModule } from '@nestjs/testing';
import { FaultsService } from './faults.service';

describe('FaultsService', () => {
  let service: FaultsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FaultsService],
    }).compile();

    service = module.get<FaultsService>(FaultsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
