import { Module } from '@nestjs/common';
import { MapperService } from './mapper.service';

@Module({
  exports: [MapperService],
  providers: [MapperService],
})
export class SharedModule {}
