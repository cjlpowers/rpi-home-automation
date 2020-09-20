import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Rpi } from './rpi';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, Rpi],
})
export class AppModule {}
