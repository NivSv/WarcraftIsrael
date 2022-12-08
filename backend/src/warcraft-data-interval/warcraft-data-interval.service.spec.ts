import { Test, TestingModule } from '@nestjs/testing';
import { WarcraftDataIntervalService } from './warcraft-data-interval.service';

describe('WarcraftDataIntervalService', () => {
  let service: WarcraftDataIntervalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarcraftDataIntervalService],
    }).compile();

    service = module.get<WarcraftDataIntervalService>(WarcraftDataIntervalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
