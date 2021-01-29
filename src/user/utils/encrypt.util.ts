import { createCipher, createDecipher } from 'crypto';

const algorithm: string = 'aes-192-cbc';
const key: string = process.env.ENCRYPT_KEY ?? '';

export function encrypt(text: string): string {
  const cipher: any = createCipher(algorithm, key);
  const encrypted: string =
    cipher.update(text, 'utf8', 'hex') + cipher.final('hex');
  return encrypted;
}

export function decrypt(text: string): string {
  const decipher: any = createDecipher(algorithm, key);
  const decrypted: string =
    decipher.update(text, 'hex', 'utf8') + decipher.final('utf8');
  return decrypted;
}
