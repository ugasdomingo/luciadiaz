import crypto from 'crypto';

//Options
const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPT_KEY;
const iv = process.env.ENCRYPT_IV;

export const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
    const encrypted = Buffer.concat([cipher.update(text, 'utf-8'), cipher.final()]);
    return encrypted.toString('hex');
}

export const decrypt = (text) => {
    const decipher = crypto.createDecipheriv(
        algorithm,
        Buffer.from(key, 'hex'),
        Buffer.from(iv, 'hex')
    );
    const decrypted = Buffer.concat([
        decipher.update(Buffer.from(text, 'hex')),
        decipher.final(),
    ]);
    return decrypted.toString('utf8');
}
