"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginController = void 0;
const common_1 = require("@nestjs/common");
const login_service_1 = require("./login.service");
const stream_1 = require("stream");
let LoginController = class LoginController {
    constructor(loginService) {
        this.loginService = loginService;
        this._loggingEvent = new stream_1.EventEmitter();
    }
    login_github() {
        return new Promise((resolve, reject) => {
            this._loggingEvent.on('loggined', (e) => {
                resolve(e);
            });
        });
    }
    github_redirect(request) {
        return new Promise((resolve, reject) => {
            const query = request.query;
            if (query.error) {
                this._loggingEvent.emit('loggined', query);
                resolve(query.description);
            }
            else if (query.code) {
                this.loginService.login_github(query.code).then((e) => {
                    this._loggingEvent.emit('loggined', e);
                    resolve({
                        message: 'loggin successed!'
                    });
                });
            }
        });
    }
    login_gitee() {
        return new Promise((resolve, reject) => {
            this._loggingEvent.on('loggined', (e) => {
                resolve(e);
            });
        });
    }
    gitee_redirect(request) {
        return new Promise((resolve, reject) => {
            const query = request.query;
            if (query.error) {
                this._loggingEvent.emit('loggined', query);
                resolve(query.description);
            }
            else if (query.code) {
                this.loginService.login_gitee(query.code).then((e) => {
                    this._loggingEvent.emit('loggined', e);
                    resolve({
                        message: 'loggin successed!'
                    });
                });
            }
        });
    }
};
__decorate([
    (0, common_1.Get)('github'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login_github", null);
__decorate([
    (0, common_1.Render)('login'),
    (0, common_1.Get)('github_redirect/'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], LoginController.prototype, "github_redirect", null);
__decorate([
    (0, common_1.Get)('gitee'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "login_gitee", null);
__decorate([
    (0, common_1.Render)('login'),
    (0, common_1.Get)('gitee_redirect/'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "gitee_redirect", null);
LoginController = __decorate([
    (0, common_1.Controller)('login'),
    __metadata("design:paramtypes", [login_service_1.LoginService])
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map