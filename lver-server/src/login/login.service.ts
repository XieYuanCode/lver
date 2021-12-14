import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class LoginService {
  async login_github(authCode: string): Promise<any> {
    const tokenResponse = await axios({
      method: 'post',
      url:
        'https://github.com/login/oauth/access_token?' +
        `client_id=14d1f9d8eaf6722537d1&` +
        `client_secret=e431ed82e33461c2e487fc736ae32009e64ffbd0&` +
        `code=${authCode}`,
      headers: {
        accept: 'application/json',
      },
    });

    const accessToken = tokenResponse.data.access_token;
    console.log('accessToken', accessToken);

    const userInfo = await axios({
      method: 'get',
      url: `https://api.github.com/user`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`,
      },
    });

    userInfo.data['success'] = true;

    return Promise.resolve(userInfo.data);
  }

  async login_gitee(authCode: string): Promise<any> {
    console.log('authCode', authCode);
    const tokenResponse = await axios({
      method: 'post',
      url:
        'https://gitee.com/oauth/token?grant_type=authorization_code&code=' +
        `${authCode}&` +
        `client_id=1592815aa8a6d503cd041d93e6273d16f32664f85507d8b1510e43e875b473f3&` +
        `client_secret=b6153bd963fd2f230ccb7cf62caf1310ca65a2c6172636fb036344f86e730624&` +
        `redirect_uri=http://81.70.22.185:3001/login/gitee_redirect`,
      headers: {
        accept: 'application/json',
      },
    });

    const accessToken = tokenResponse.data.access_token;
    console.log('accessToken', accessToken);

    const userInfo = await axios({
      method: 'get',
      url: `https://gitee.com/api/v5/user?access_token=${accessToken}`,
      headers: {
        accept: 'application/json',
        Authorization: `token ${accessToken}`,
      },
    });

    userInfo.data['success'] = true;

    console.log(123, userInfo.data);

    return Promise.resolve(userInfo.data);
  }
}
