//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { api } from '@/services/axios';
import { useUtilStore } from './util-store';

//Import types
import type { IUser } from '@/types/IUser';

//Define store
export const useUserStore = defineStore('user', () => {
    //Use tools
    const util_store = useUtilStore();
    const router = useRouter();

    //User states
    const token = ref('');
    const user_name = ref('');
    const user_role = ref('');
    const user_medical_record = ref('');
    const user_verified = ref(false);
    const all_user_data = ref();

    //Access states
    const access_name = ref('');
    const access_email = ref('');
    const access_phone = ref('');
    const access_password = ref('');

    //Admin states
    const users = ref<IUser[]>([]);
    const user_id = ref('');

    //Helpers functions
    const handle_response_user_data = (response: any) => {
        token.value = response.data.data.token;
        user_name.value = response.data.data.name;
        user_role.value = response.data.data.role;
        user_medical_record.value = response.data.data.medical_record;
        user_verified.value = response.data.data.email_verified;
        localStorage.setItem('user', 'user');
    };

    //Methods
    const register = async (role: string, policy_accepted: boolean) => {
        try {
            const user: any = {
                name: access_name.value,
                email: access_email.value,
                phone: access_phone.value,
                password: access_password.value,
                role,
                policy_accepted
            };

            const response = await api({
                method: 'POST',
                url: '/auth/registro',
                data: user
            });

            handle_response_user_data(response);

            util_store.display_notification(
                response.data.message,
                response.status
            );

            if (response.status === 201) {
                router.push('/area-privada');
            }
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al registrarse, intente de nuevo',
                500
            );
        }
    };

    const login = async () => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/acceder',
                data: {
                    email: access_email.value as string,
                    password: access_password.value as string
                }
            });

            handle_response_user_data(response);

            util_store.display_notification(
                response.data.message,
                response.status
            );

            if (response.status === 200) {
                router.push('/area-privada');
            }
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al iniciar sesión, intente de nuevo',
                500
            );
        }
    };

    const set_time_refresh = () => {
        setTimeout(() => {
            refresh();
        }, 1000 * 60 * 50);
    };

    const refresh = async () => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/refresh',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            handle_response_user_data(response);

            util_store.display_notification(
                response.data.message,
                response.status
            );

            set_time_refresh();
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al refrescar sesión, intente de nuevo',
                500
            );
        }
    };

    const logout = async () => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/logout',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            util_store.display_notification(
                response.data.message,
                response.status
            );
            if (response.status === 200) {
                token.value = '';
                user_name.value = '';
                user_role.value = '';
                user_medical_record.value = '';
                user_verified.value = false;
                localStorage.removeItem('user');
                router.push('/');
            }
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al cerrar sesión, intente de nuevo',
                500
            );
        }
    };

    const confirm_email = async (uid: string) => {
        try {
            const response = await api({
                method: 'GET',
                url: `/auth/confirmar-correo/${uid}`
            });

            util_store.display_notification(
                response.data.message,
                response.status
            );
            if (response.status === 200) {
                user_verified.value = true;
            }
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al confirmar correo, intente de nuevo',
                500
            );
        }
    };

    const request_reset_password = async (email: string) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/restablecer-contrasena',
                data: {
                    email
                }
            });

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al solicitar restablecer contraseña, intente de nuevo',
                500
            );
        }
    };

    const change_password = async (
        password: string,
        reset_password_token: string
    ) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/auth/cambiar-contrasena',
                data: {
                    password,
                    reset_password_token
                }
            });

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al cambiar contraseña, intente de nuevo',
                500
            );
        }
    };

    const update_user_role = async (role: string) => {
        try {
            const response = await api({
                method: 'PUT',
                url: '/auth/update-role',
                data: {
                    role
                },
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al actualizar rol, intente de nuevo',
                500
            );
        }
    };

    const get_data_by_user = async () => {
        try {
            const response = await api({
                method: 'GET',
                url: '/medical-data/user',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            all_user_data.value = response.data.data;

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al obtener datos, intente de nuevo',
                500
            );
        }
    };

    //Admin methods
    const get_data_by_admin = async () => {
        try {
            const response = await api({
                method: 'GET',
                url: `/medical-data/user/${user_id.value}`,
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            all_user_data.value = response.data.data;

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al obtener datos, intente de nuevo',
                500
            );
        }
    };

    const get_all_users = async () => {
        try {
            const response = await api({
                method: 'GET',
                url: '/auth/users',
                headers: {
                    Authorization: `Bearer ${token.value}`
                }
            });

            users.value = response.data.data.users_data;

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al obtener datos, intente de nuevo',
                500
            );
        }
    };

    return {
        token,
        user_name,
        user_role,
        user_medical_record,
        user_verified,
        all_user_data,
        access_name,
        access_email,
        access_phone,
        access_password,
        users,
        user_id,
        register,
        login,
        refresh,
        logout,
        confirm_email,
        request_reset_password,
        change_password,
        update_user_role,
        get_data_by_user,
        get_data_by_admin,
        get_all_users
    };
});
