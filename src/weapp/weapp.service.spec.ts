import { Test, TestingModule } from '@nestjs/testing';
import { WeappService } from './weapp.service';

describe('WeappService', () => {
  let service: WeappService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeappService],
    }).compile();

    service = module.get<WeappService>(WeappService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
