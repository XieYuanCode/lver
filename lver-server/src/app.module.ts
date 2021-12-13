import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ShareController } from './share/share.controller';
import { ShareService } from './share/share.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

@Module({
  imports: [],
  controllers: [AppController, ShareController, LoginController],
  providers: [AppService, ShareService, LoginService],
})
export class AppModule {}
