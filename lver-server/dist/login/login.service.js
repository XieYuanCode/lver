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
};
LoginService = __decorate([
    (0, common_1.Injectable)()
], LoginService);
exports.LoginService = LoginService;
//# sourceMappingURL=login.service.js.map