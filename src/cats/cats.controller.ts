import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CosService } from 'src/cos/cos.service';
import { Public } from 'src/auth/decorators/public.decorator';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly cosService: CosService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create cat' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: '2XX', description: 'success' })
  async create(@Body() createCatDto: CreateCatDto): Promise<Cat> {
    return this.catsService.create(createCatDto);
  }

  @Public()
  @Get('/test')
  test() {
    return this.cosService.cosTest();
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: Cat,
  })
  async findOne(@Param('id') id: number): Promise<Cat> {
    return this.catsService.findOne(id);
  }


}
