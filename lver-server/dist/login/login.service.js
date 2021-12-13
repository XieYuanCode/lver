"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let LoginService = class LoginService {
    async login_github(authCode) {
        const tokenResponse = await (0, axios_1.default)({
            method: 'post',
            url: 'https://github.com/login/oauth/access_token?' +
                `client_id=14d1f9d8eaf6722537d1&` +
                `client_secret=e431ed82e33461c2e487fc736ae32009e64ffbd0&` +
                `code=${authCode}`,
            headers: {
                accept: 'application/json',
            },
        });
        const accessToken = tokenResponse.data.access_token;
        console.log('accessToken', accessToken);
        const userInfo = await (0, axios_1.default)({
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
    async login_gitee(authCode) {
        console.log('authCode', authCode);
        const tokenResponse = await (0, axios_1.default)({
            method: 'post',
            url: 'https://gitee.com/oauth/token?grant_type=authorization_code&code=' +
                `${authCode}&` +
                `client_id=1592815aa8a6d503cd041d93e6273d16f32664f85507d8b1510e43e875b473f3&` +
                `client_secret=b6153bd963fd2f230ccb7cf62caf1310ca65a2c6172636fb036344f86e730624&` +
                `redirect_uri=http://localhost:8000/login/gitee_redirect`,
            headers: {
                accept: 'application/json',
            },
        });
        const accessToken = tokenResponse.data.access_token;
        console.log('accessToken', accessToken);
        const userInfo = await (0, axios_1.default)({
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
};
LoginService = __decorate([
    (0, common_1.Injectable)()
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map