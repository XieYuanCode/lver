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
        resolve(e);
      });
    });
  }

  @Get('github_redirect/')
  github_redirect(@Req() request): any {
    return new Promise((resolve, reject) => {
      const query = request.query;

      if (query.error) {
        this._loggingEvent.emit('loggined', query);
        resolve(query.description);
      } else if (query.code) {
        this.loginService.login_github(query.code).then((e) => {
          this._loggingEvent.emit('loggined', e);
          resolve('loggin successed!');
        });
      }
    })
  }

  @Get('gitee')
  login_gitee(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._loggingEvent.on('loggined', (e) => {
        resolve(e);
      });
    });
  }

  @Get('gitee_redirect/')
  gitee_redirect(@Req() request): Promise<any> {
    return new Promise((resolve, reject) => {
      const query = request.query;

      if (query.error) {
        this._loggingEvent.emit('loggined', query);
        resolve(query.description);
      } else if (query.code) {
        this.loginService.login_gitee(query.code).then((e) => {
          this._loggingEvent.emit('loggined', e);
          resolve('loggin successed!');
        });
      }
    })
  }
}
