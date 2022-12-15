import { Test, TestingModule } from '@nestjs/testing';
import { WowCharactersService } from './wow-characters.service';

describe('WowCharactersService', () => {
  let service: WowCharactersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WowCharactersService],
    }).compile();

    service = module.get<WowCharactersService>(WowCharactersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
