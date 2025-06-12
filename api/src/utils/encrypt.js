import crypto from 'crypto';

//Options
const algorithm = 'aes-256-cbc';
const key = process.env.ENCRYPT_KEY;
const iv = process.env.ENCRYPT_IV;

export const encrypt = (text) => {
    const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
    let encrypted = cipher.update(text, 'utf-8');
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
}

export const decrypt = (text) => {
    const iv = Buffer.from(text.split(':')[0], 'hex');
    const encryptedText = Buffer.from(text.split(':')[1], 'hex');
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}
