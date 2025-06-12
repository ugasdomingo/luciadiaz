import nodemailer from 'nodemailer';

//Create transporter
const transporter = nodemailer.createTransport({
   service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    }
});

//Send email
export const send_email = async (to, subject, html) => {
    try {
        const mailOptions = {
            from: process.env.MAIL_USER,
            to,
            subject,
            html
        };

        await transporter.sendMail(mailOptions);
    } catch (error) {
        throw error;
    }
}

//Send verification email
export const send_verification_email = async (email, login_token) => {
    const subject = 'Verificación de correo electrónico';
    const html = `
        <h1>Verificación de correo electrónico</h1>
        <p>Por favor, haga clic en el siguiente enlace para verificar su correo electrónico:</p>
        <a href="${process.env.FRONTEND_URL}/verify?token=${encodeURIComponent(login_token)}&email=${encodeURIComponent(email)}">Verificar correo electrónico</a>
    `;
    await send_email(email, subject, html);
}

//Send reset password email
export const send_reset_password_email = async (email, reset_token) => {
    const subject = 'Restablecimiento de contraseña';
    const html = `
        <h1>Restablecimiento de contraseña</h1>
        <p>Por favor, haga clic en el siguiente enlace para restablecer su contraseña:</p>
        <a href="${process.env.FRONTEND_URL}/reset-password?token=${encodeURIComponent(reset_token)}">Restablecer contraseña</a>
    `;
    await send_email(email, subject, html);
}

//Send 2FA email
export const send_2fa_email = async (email, login_token ) => {
    const subject = 'Código de autenticación de dos factores';
    const html = `
        <h1>Código de autenticación de dos factores</h1>
        <p>Por favor, use el siguiente código para autenticarse:</p>
        <p>${login_token}</p>
    `;
    await send_email(email, subject, html);
}

//Notify admin new registration
export const notify_admin_new_registration = async (email, name, username) => {
    const subject = 'Nuevo registro';
    const html = `
        <h1>Nuevo registro</h1>
        <p>Se ha registrado un nuevo usuario:</p>
        <p>Nombre: ${name}</p>
        <p>Correo electrónico: ${email}</p>
        <p>Usuario: ${username}</p>
    `;
    await send_email(process.env.MAIL_USER, subject, html);
}


