//Import tools
import crypto from 'crypto';

//config
const algorithm = 'aes-256-cbc';
const encryption_key = process.env.ENCRYPTION_KEY as string;
const iv = process.env.ENCRYPTION_IV as string;

//Encrypt data
export const encrypt = (answers: string) => {
    const cipher = crypto.createCipheriv(
        algorithm,
        Buffer.from(encryption_key),
        Buffer.from(iv)
    );
    const encrypted = Buffer.concat([
        cipher.update(answers, 'utf8'),
        cipher.final(),
    ]);
    return encrypted.toString('hex');
};

//Decrypt data
export const decrypt = (data_encrypted: string) => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(encryption_key),
        Buffer.from(iv)
    );
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(data_encrypted, 'hex')),
        decipher.final(),
    ]);
    return decrypted.toString('utf8');
};
