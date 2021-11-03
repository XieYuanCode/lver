import { ShareService } from './share.service';
export declare class ShareController {
    private readonly shareService;
    constructor(shareService: ShareService);
    upload(files: any): Promise<void>;
}
