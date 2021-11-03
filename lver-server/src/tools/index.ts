import { createHash } from 'crypto';

export const calculateHash = (buffer: Buffer) => {
  const hash = createHash('md5');
  hash.update(buffer);
  return hash.digest('hex');
};
