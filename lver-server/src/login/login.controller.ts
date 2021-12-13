import { Controller, Get, Req } from '@nestjs/common';
import { LoginService } from './login.service';
import { openDefaultBrowser } from '../tools';
import { EventEmitter } from 'stream';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }
  private _loggingEvent: EventEmitter = new EventEmitter();

  @Get('github')
  login_github(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._loggingEvent.on('loggined', (e) => {
        console.log('e', e);
        resolve(e);
      });

      openDefaultBrowser(
        `https://github.com/login/oauth/authorize?client_id=14d1f9d8eaf6722537d1&redirect_uri=http://localhost:8000/login/github_redirect`,
      );
    });
  }

  @Get('github_redirect/')
  github_redirect(@Req() request): any {
    console.log('github_redirect in!!!');
    const query = request.query;

    if (query.error) {
      this._loggingEvent.emit('loggined', query);
      return query.description;
    } else if (query.code) {
      this.loginService.login_github(query.code).then((e) => {
        this._loggingEvent.emit('loggined', e);
        return 'loggin successed!';
      });
    }
  }
}
