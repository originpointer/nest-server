import { Injectable } from '@nestjs/common';
import { Cat } from './entities/cat.entity';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {
  private readonly cats: Cat[] = [];

  create(cat: CreateCatDto): Cat {
    const newCat = {
      ...cat,
    }
    this.cats.push(newCat);
    return newCat;
  }

  findOne(id: number): Cat {
    return this.cats[id];
  }
}
