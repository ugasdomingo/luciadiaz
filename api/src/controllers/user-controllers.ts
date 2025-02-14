//Import tools
import { User_model, IUser } from '../models/UserModel';
import { create_medical_record } from './medical-record-controllers';
import {
    get_historical_number,
    update_historical_number,
} from './historical-number-controllers';
import {
    client_response,
    internal_response,
    set_cookies,
    remove_cookies,
} from '../utils/responses';
import { create_token, create_refreshToken } from '../utils/token-manager';
import {
    email_confirmation,
    email_notification_new_user,
    send_email,
} from '../utils/mailer';
import jwt from 'jsonwebtoken';

//Helper functions
const response_data = (
    token: string,
    role: string,
    name: string,
    medical_record: string,
    verified: boolean
) => ({ token, role, name, medical_record, verified } as any);

//Create a 6 digit random number as string
const create_random_number = () =>
    Math.floor(100000 + Math.random() * 900000).toString();

//Register a new user
export const register_user = async (req: any, res: any) => {
    try {
        const user: IUser = new User_model(req.body);

        //Check if the user already exists
        const user_exists = await User_model.findOne({ email: user.email });
        if (user_exists)
            return client_response(res, 400, 'Usuario ya registrado');

        //Create historical number
        const historical_number = await get_historical_number(res);
        if (!historical_number)
            return internal_response(
                'Error while getting the historical number'
            );

        //Assign the historical number
        user.medical_record = `MR-${process.env.YEAR}-${
            historical_number + 10
        }`;

        //Create the medical record
        await create_medical_record(user.medical_record, user._id, res);

        //Update the historical number
        await update_historical_number(historical_number + 100, res);

        //Save the user
        await user.save();

        //Send email confirmation
        email_confirmation(user.email, user._id, res);
        email_notification_new_user(user.email, user.phone, user._id, res);

        //Send the response
        set_cookies(res, create_refreshToken(user._id));

        const data = response_data(
            create_token(user._id),
            user.role,
            user.name,
            user.medical_record,
            user.email_verified
        );

        return client_response(
            res,
            201,
            'Te he enviado un correo para verificar tu email',
            data
        );
    } catch (error) {
        internal_response('Error while registering the user', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//access user
export const access_user = async (req: any, res: any) => {
    try {
        const { email, password } = req.body;

        //Check if the user exists
        const user: IUser | null = await User_model.findOne({
            email,
        });
        if (!user) return client_response(res, 400, 'Credenciales incorrectas');

        //Check if the password is correct
        const password_match = await user.comparePassword(password);
        if (!password_match)
            return client_response(res, 400, 'Credenciales incorrectas');

        //Send the response
        set_cookies(res, create_refreshToken(user._id));

        const data = response_data(
            create_token(user._id),
            user.role,
            user.name,
            user.medical_record,
            user.email_verified
        );

        return client_response(res, 200, 'Bienvenido(a) de nuevo', data);
    } catch (error) {
        internal_response('Error while accessing the user', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Refresh the token
export const refresh_token = async (req: any, res: any) => {
    try {
        const { refresh_token } = req.cookies;

        //Check if the token exists
        if (!refresh_token)
            return client_response(res, 401, 'Inicio de sesión requerido');

        //Get the user id
        const { uid }: any = jwt.verify(
            refresh_token,
            process.env.JWT_REFRESH as string
        ) as any;

        //Find the user
        const user: IUser | null = await User_model.findById(uid);
        if (!user) return client_response(res, 404, 'Usuario no encontrado');

        //Send the response
        set_cookies(res, create_refreshToken(user._id));

        const data = response_data(
            create_token(user._id),
            user.role,
            user.name,
            user.medical_record,
            user.email_verified
        );

        return client_response(res, 200, 'Token refrescado', data);
    } catch (error) {
        internal_response('Error while refreshing the token', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Logout the user
export const logout_user = async (req: any, res: any) => {
    try {
        remove_cookies(res);

        return client_response(res, 200, 'Sesión cerrada, espero verte pronto');
    } catch (error) {
        internal_response('Error while logging out the user', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Confirm the email
export const confirm_email = async (req: any, res: any) => {
    try {
        const { uid } = req.params;

        //Find the user
        const user: IUser | null = await User_model.findById(uid);
        if (!user) return client_response(res, 404, 'Usuario no encontrado');

        //Verify the email
        await user.verificateEmail();

        return client_response(res, 200, 'Email confirmado, bienvenido(a)');
    } catch (error) {
        internal_response('Error while confirming the email', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Request the reset password
export const request_reset_password = async (req: any, res: any) => {
    try {
        const { email } = req.body;

        //Find the user
        const user: IUser | null = await User_model.findOne({ email });
        if (!user) return client_response(res, 404, 'Usuario no encontrado');

        //Create the reset password token
        const reset_password_token = create_random_number();
        user.reset_password_token = reset_password_token;
        await user.save();

        //Send the email
        await send_email(
            user.email,
            'Cambia tu contraseña',
            `Para cambiar tu contraseña, haz click en el siguiente enlace: <a href="${process.env.CLIENT_URL}/cambiar-contrasena/${reset_password_token}">Cambiar contraseña</a>`,
            res
        );

        return client_response(
            res,
            200,
            'Te he enviado un correo para cambiar tu contraseña'
        );
    } catch (error) {
        internal_response('Error while requesting the reset password', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Change the password
export const change_password = async (req: any, res: any) => {
    try {
        const { password, reset_password_token } = req.body;

        console.log(reset_password_token);
        //Find the user
        const user: IUser | null = await User_model.findOne({
            reset_password_token,
        });
        if (!user) return client_response(res, 404, 'Usuario no encontrado');

        //Change the password
        await user.changePassword(password);

        //Clear the reset password token
        user.reset_password_token = '';
        await user.save();

        return client_response(res, 200, 'Contraseña cambiada correctamente');
    } catch (error) {
        internal_response('Error while changing the password', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Update the user role
export const update_user_role = async (req: any, res: any) => {
    try {
        const uid = req.uid;
        const { role } = req.body;

        //Find the user
        const user: IUser | null = await User_model.findById(uid);
        if (!user) return client_response(res, 404, 'Usuario no encontrado');

        //Update the user role
        user.role = role;
        await user.save();

        return client_response(res, 200, 'Rol actualizado correctamente');
    } catch (error) {
        internal_response('Error while updating the user role', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get the user data by token
export const get_data_by_user = async (req: any, res: any) => {
    try {
        const { uid } = req.uid;

        //Find the user
        const user: IUser | null = await User_model.findById(uid);
        if (!user) return client_response(res, 404, 'Usuario no encontrado');

        //Set save user data
        const user_data = user.toJSON();

        return client_response(res, 200, 'Correcto', {
            user_data,
        });
    } catch (error) {
        internal_response('Error while getting the user data', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get the user data by Admin
export const get_data_by_admin = async (req: any, res: any) => {
    try {
        const { id } = req.params;

        //Find the user
        const user: IUser | null = await User_model.findById(id);
        if (!user) return client_response(res, 404, 'Usuario no encontrado');

        //Set save user data
        const user_data = user.toJSON();

        return client_response(res, 200, 'Correcto', {
            user_data,
        });
    } catch (error) {
        internal_response('Error while getting the user data', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};

//Get all the users
export const get_all_users = async (req: any, res: any) => {
    try {
        //Find the users
        const users: IUser[] = await User_model.find();

        //Set save user data
        const users_data = users.map((user) => user.toJSON());

        return client_response(res, 200, 'Correcto', {
            users_data,
        });
    } catch (error) {
        internal_response('Error while getting the users', error);
        return client_response(
            res,
            500,
            'Error en servidor, intente más tarde'
        );
    }
};
