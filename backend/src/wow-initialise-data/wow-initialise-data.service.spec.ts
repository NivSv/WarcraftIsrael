import { Test, TestingModule } from '@nestjs/testing';
import { WowInitialiseDataService } from './wow-initialise-data.service';

describe('WowInitialiseDataService', () => {
  let service: WowInitialiseDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WowInitialiseDataService],
    }).compile();

    service = module.get<WowInitialiseDataService>(WowInitialiseDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
