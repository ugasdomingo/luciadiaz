//Import tools
import nodemailer from 'nodemailer';
import { internal_response, client_response } from './responses';

//Create the transporter
export const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_PORT === '465',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
    },
});

//Send the email
export const send_email = async (
    to: string,
    subject: string,
    html: string,
    res: any
) => {
    try {
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            html,
        });
    } catch (error: any) {
        internal_response('Error enviando el email', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Email for confirmation
export const email_confirmation = (email: string, uid: string, res: any) => {
    const subject = 'Confirma tu email';
    const html = `
        <h1>Confirma tu email</h1>
        <p>Para confirmar tu email, haz click en el siguiente enlace:</p>
        <a href="${process.env.CLIENT_URL}/auth/confirmar-correo/${uid}">Confirmar email</a>
    `;
    send_email(email, subject, html, res);
};

//Email for notification a new user
export const email_notification_new_user = (
    email: string,
    phone: string,
    name: string,
    res: any
) => {
    const subject = `Nuevo usuario: ${name}`;
    const html = `
        <h1>Nuevo usuario</h1>
        <p>El usuario ${name} se ha registrado en la plataforma</p>
        <p>Correo: ${email}</p>
        <p>Teléfono: ${phone}</p>
    `;
    send_email(process.env.MAIL_USER as string, subject, html, res);
};
