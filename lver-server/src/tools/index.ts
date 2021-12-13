import { exec } from 'child_process';

export const openDefaultBrowser = (url: string) => {
  switch (process.platform) {
    case 'darwin':
      exec(`open ${url}`);
      break;
    case 'win32':
      exec(`start ${url}`);
      break;
    case 'linux':
      exec(`xdg-open ${url}`);
    default:
      break;
  }
};
