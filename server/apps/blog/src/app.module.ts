import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { CommonModule } from '@app/common';
import { AppService } from './app.service';
import { DbModule } from 'libs/db';
import { ApiModule } from './api/api.module';

@Module({
  imports: [CommonModule, DbModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
