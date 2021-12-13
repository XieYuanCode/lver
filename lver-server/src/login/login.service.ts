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
}
