import { User } from "../models/User-model.js";
import { get_login_user_data, unify_email_activity } from "../services/auth-service.js";
import { Util } from "../models/Util-model.js";
import { send_verification_email, send_reset_password_email, send_2fa_email, notify_admin_new_registration } from "../utils/mailer.js";
import { client_response } from "../utils/responses.js";
import { generate_six_digits_code } from "../utils/tokens.js";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    try {
        const { name, email, password, role, phone, policy_accepted } = req.body;
        // 1. Check if email is already registered
        const email_registered = await User.findOne({ email });
        if (email_registered) {
            throw new Error('El correo electrónico ya está registrado');
        }
        // 2. Create new user
        const user = new User({ name, email, password, role, phone, policy_accepted });

        // 3. Get last history number and create medical record
        const util = await Util.findOne();
        if (!util) {
            throw new Error('No se encontró el último número de historia');
        }
        const history_number = util.last_histoty_number + 1;
        await Util.updateOne({ _id: util._id }, { $set: { last_histoty_number: history_number } });
        user.medical_record = `HC-${new Date().getFullYear()}-${history_number}`;

        // 4. Generate login token
        const login_token = generate_six_digits_code();
        user.login_token = login_token;

        // 5. Save user
        await user.save();

        // 6. Send verification email
        await send_verification_email(email, login_token);

        // 7. unify email activity
        await unify_email_activity(user._id, email);

        // 8. Notify admin
        await notify_admin_new_registration(user.name, user.email, user.phone);

        return client_response(res, 201, 'Te envié un correo electrónico para verificar tu cuenta');
    } catch (error) {
        next(error);
    }
}

export const verify_email = async (req, res, next) => {
    try {
        const { login_token, email } = req.body;
        const login_token_int = Number(login_token);
        // 1. Find user and verify token
        const user = await User.findOne({ login_token: login_token_int, email });
        if (!user) {
            throw new Error('Token inválido');
        }
        // 2. Verify email
        user.email_verified = true;
        user.login_token = undefined;

        // 3. Save user
        await user.save();

        // 4. Send login data
        const { user_data, token, refresh_token } = await get_login_user_data(user._id);

        // 5. Return response
        return client_response(res, 200, 'Correo electrónico verificado', { user_data, token, refresh_token });
    } catch (error) {
        next(error);
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        // 2. Verify password
        const is_match = await user.comparePassword(password);
        if (!is_match) {
            throw new Error('Contraseña incorrecta');
        }

        // 3. Generate login token
        const login_token = generate_six_digits_code();
        user.login_token = login_token;
        await user.save();

        // 4. Send 2FA email // verify email
        if (!user.email_verified) {
            await send_verification_email(user.email, login_token);
        } else {
            await send_2fa_email(user.email, login_token);
        }

        const message = user.email_verified ? 'Te envié un código a tu correo electrónico' : 'Aún no has verificado tu correo electrónico, te envié un correo electrónico para verificarlo';
        const response_number = user.email_verified ? 200 : 201;
        // 5. Return response
        return client_response(res, response_number, message);
    } catch (error) {
        next(error);
    }
}

export const verify_login = async (req, res, next) => {
    try {
        const { login_token, email } = req.body;

        // 1. Find user and verify token
        const user = await User.findOne({ login_token: parseInt(login_token), email });
        if (!user) {
            throw new Error('Token inválido');
        }
        // 2. Clean login token
        user.login_token = undefined;

        // 3. Save user
        await user.save();

        // 4. Send login data
        const { user_data, token, refresh_token } = await get_login_user_data(user._id);

        // 5. Return response
        return client_response(res, 200, 'Bienvenida(o) de regreso', { user_data, token, refresh_token });
    } catch (error) {
        next(error);
    }
}

export const refresh = async (req, res, next) => {
    try {
        const { refresh_token } = req.body;

        if (!refresh_token) {
            throw new Error('Debes iniciar sesión para acceder a esta funcionalidad');
        }

        // 1. Decode refresh token
        const decoded = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);

        // 2. Find user
        const user = await User.findById(decoded.user_id.toString());
        if (!user) {
            throw new Error('Token inválido');
        }
        const { user_data, token, refresh_token: new_refresh_token } = await get_login_user_data(user._id);
        return client_response(res, 200, 'OK', { user_data, token, refresh_token: new_refresh_token });
    } catch (error) {
        next(error);
    }
}

export const forgot_password = async (req, res, next) => {
    try {
        const { email } = req.body;

        // 1. Find user
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // 2. Generate reset password token
        user.reset_password_token = generate_six_digits_code();
        await user.save();

        // 3. Send reset password email 
        await send_reset_password_email(email, user.reset_password_token);

        // 4. Return response
        return client_response(res, 200, 'Te envié un correo electrónico para restablecer tu contraseña');
    } catch (error) {
        next(error);
    }
}

export const reset_password = async (req, res, next) => {
    try {
        const { reset_password_token, email, password } = req.body;

        // 1. Find user
        const user = await User.findOne({ reset_password_token, email });
        if (!user) {
            throw new Error('Token inválido');
        }

        // 2. Update password
        user.password = password;
        user.reset_password_token = undefined;
        await user.save();

        // 3. Send login data
        const { user_data, token, refresh_token } = await get_login_user_data(user._id);
        set_cookie(res, refresh_token);

        // 4. Return response
        return client_response(res, 200, 'Contraseña restablecida', { user_data, token });
    } catch (error) {
        next(error);
    }
}

export const change_password = async (req, res, next) => {
    try {
        const { password, new_password } = req.body;

        // 1. Find user
        const user = await User.findById(req.user_id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // 2. Verify password
        const is_match = await user.comparePassword(password);
        if (!is_match) {
            throw new Error('Contraseña incorrecta');
        }

        // 3. Update password
        user.password = new_password;
        await user.save();

        // 4. Return response
        return client_response(res, 200, 'Contraseña cambiada');
    } catch (error) {
        next(error);
    }
}






