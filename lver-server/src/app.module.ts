import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareController } from './share/share.controller';
import { ShareService } from './share/share.service';

@Module({
  imports: [],
  controllers: [AppController, ShareController],
  providers: [AppService, ShareService],
})
export class AppModule {}
