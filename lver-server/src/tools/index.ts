import { spawn } from 'child_process';

export const openDefaultBrowser = (url: string) => {
  switch (process.platform) {
    case 'darwin':
      spawn('open', [url]);
      break;
    case 'win32':
      spawn('start', [url]);
      break;
    case 'linux':
      spawn('xdg-open', [url]);
    default:
      break;
  }
};
