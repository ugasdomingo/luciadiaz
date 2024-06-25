//Import tools
import { defineStore } from 'pinia';
import { api } from '../services/axios';
import { ref } from 'vue';

//Define store
export const useUserStore = defineStore('user', () => {
    const token = ref(null);
    const expiresIn = ref(0);
    const userRole = ref('');
    const user = ref('');

    //Define actions
    const access = async (email: string, password: string) => {
        try {
            const res = await api.post('/login', {
                email,
                password,
            });

            token.value = res.data.token;
            userRole.value = res.data.role;
            user.value = res.data.userName;

            //guardar en localstorage
            localStorage.setItem('user', res.data.userName);
            localStorage.setItem('token', res.data.refreshToken.refreshToken);
        } catch (error) {
            console.log(error);
        }
    };

    const register = async (
        userName: string,
        email: string,
        password: string,
        role: string,
        politiquesAccepted: boolean,
    ) => {
        try {
            const res = await api.post('/register', {
                userName,
                email,
                password,
                role,
                politiquesAccepted,
            });

            const expiresRefreshToken = 60 * 60 * 24 * 30;
            expiresIn.value = expiresRefreshToken;

            token.value = res.data.token;
            userRole.value = res.data.role;
            user.value = res.data.userName;

            localStorage.setItem('user', res.data.userName);
            localStorage.setItem('token', res.data.refreshToken.refreshToken);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem('token');
        try {
            const res = await api({
                url: '/refresh',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${refreshToken}`,
                },
            });

            token.value = res.data.token;
            userRole.value = res.data.role;
            user.value = res.data.userName;

            localStorage.setItem('user', res.data.userName);
            localStorage.setItem('token', res.data.refreshToken.refreshToken);
        } catch (error) {
            console.log(error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    };

    //Define getters
    const getAllUsers = async () => {
        try {
            const res = await api.get('/all-users', {
                headers: {
                    Authorization: `Bearer ${token.value}`,
                },
            });

            return res.data.users;
        } catch (error) {
            console.log(error);
        }
    };

    //Helpers funtions
    /* const setTime = () => {
        setTimeout(
            () => {
                console.log('se refrescó');
                refreshToken();
            },
            expiresIn.value * 1000 - 6000,
        );
    }; */

    const logout = async () => {
        try {
            await api.get('/logout');

            token.value = null;
            userRole.value = '';
            user.value = '';
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } catch (error) {
            console.log(error);
        }
    };

    return {
        token,
        userRole,
        user,
        access,
        register,
        refreshToken,
        getAllUsers,
        logout,
    };
});
