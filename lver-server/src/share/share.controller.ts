import {
  Controller,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { calculateHash } from 'src/tools';
import { ShareService } from './share.service';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) { }

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  async upload(@UploadedFiles() files) {
    files &&
      this.shareService.saveLogFile(
        calculateHash(files[0].buffer),
        files[0].buffer,
      );
  }
}
