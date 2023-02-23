import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService]
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create and query', () => {
    const catDto = {
      name: 'tom',
      age: 2,
      breed: 'Maine Coon'
    }

    it('shuld return tom', async () => {
      const response = await controller.create(catDto);

      expect(response).toEqual(catDto);
    })

    it('shuld return new tom', async () => {
      const response = await controller.create(catDto);

      expect(response).not.toBe(catDto);
    })
  })
});
