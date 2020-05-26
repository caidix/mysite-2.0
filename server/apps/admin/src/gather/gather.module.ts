import { Module } from '@nestjs/common';
import { GatherController } from './gather.controller';

@Module({
  controllers: [GatherController]
})
export class GatherModule {}
