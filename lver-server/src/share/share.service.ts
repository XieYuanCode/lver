import { Injectable } from '@nestjs/common';
import { writeFileSync } from 'fs';

@Injectable()
export class ShareService {
  saveLogFile(fileName: string, buffer: Buffer): void {
    writeFileSync(`logs/${fileName}`, buffer.toString(), 'utf-8');
  }
}
