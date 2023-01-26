import { Module } from '@nestjs/common';
import { CatsService } from '../services/cats.service';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
