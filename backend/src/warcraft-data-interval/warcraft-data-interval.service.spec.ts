import { ScheduleModule } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { WarcraftDataIntervalService } from './warcraft-data-interval.service';

const scheduleModuleMock = {};

describe('WarcraftDataIntervalService', () => {
  let service: WarcraftDataIntervalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WarcraftDataIntervalService,
        { provide: ScheduleModule, useValue: scheduleModuleMock },
      ],
    }).compile();

    service = module.get<WarcraftDataIntervalService>(
      WarcraftDataIntervalService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
