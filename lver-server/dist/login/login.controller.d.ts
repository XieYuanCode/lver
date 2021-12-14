import { LoginService } from './login.service';
export declare class LoginController {
    private readonly loginService;
    constructor(loginService: LoginService);
    private _loggingEvent;
    login_github(): Promise<any>;
    github_redirect(request: any): any;
    login_gitee(): Promise<any>;
    gitee_redirect(request: any): Promise<any>;
}
