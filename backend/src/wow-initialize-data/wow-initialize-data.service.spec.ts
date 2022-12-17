import { Test, TestingModule } from '@nestjs/testing';
import { WowInitializeDataService } from './wow-initialize-data.service';

describe('WowInitializeDataService', () => {
  let service: WowInitializeDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WowInitializeDataService],
    }).compile();

    service = module.get<WowInitializeDataService>(WowInitializeDataService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
