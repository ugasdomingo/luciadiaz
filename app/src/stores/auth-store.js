import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const util_store = useUtilStore()
    const user_data = ref()
    const token = ref('')
    // Data for Login/Register
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const role = ref('')
    const phone = ref('')
    const policy_accepted = ref(false)
    const router = useRouter()

    const login = async (credentials) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/auth/login',
                data: credentials
            })
            util_store.set_message(response.data.message, response.data.status)
            if (response.status === 200) {
                router.push('/verify-login')
            } else {
                router.push('/go-to-email')
            }
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const register = async (user_data) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/auth/register',
                data: user_data
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const logout = async () => {
        try {
            util_store.set_loading(true)
            localStorage.removeItem('login')
            util_store.set_message('Hasta luego', 'success')
            user_data.value = null
            token.value = null
            router.push('/')
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const refresh = async () => {
        try {
            util_store.set_loading(true)
            const refresh_token = localStorage.getItem('login')
            const response = await api({
                method: 'post',
                url: '/auth/refresh',
                data: { refresh_token }
            })
            token.value = response.data.data.token
            user_data.value = response.data.data.user_data
            localStorage.setItem('login', response.data.data.refresh_token)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const verify_email = async (login_token, email) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/auth/verify-email',
                data: { login_token, email }
            })
            user_data.value = response.data.data.user_data
            token.value = response.data.data.token
            localStorage.setItem('login', response.data.data.refresh_token)
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.last_page ? router.push(util_store.last_page) : router.push('/mi-espacio')
            util_store.set_loading(false)
        }
    }

    const verify_login = async (login_token, email) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/auth/verify-login',
                data: { login_token, email }
            })
            user_data.value = response.data.data.user_data
            token.value = response.data.data.token
            localStorage.setItem('login', response.data.data.refresh_token)
            util_store.set_message(response.data.message, response.data.status)

            // If last page is set, redirect to it, else redirect to dashboard
            util_store.last_page ? router.push(util_store.last_page) : router.push('/mi-espacio')
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const forgot_password = async (email) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/auth/forgot-password',
                data: email
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const reset_password = async (reset_password_token, email, password) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/auth/reset-password',
                data: { reset_password_token, email, password }
            })
            const { user_data, token } = response.data.data
            user_data.value = user_data.user
            token.value = token
            localStorage.setItem('login', response.data.data.refresh_token)
            util_store.set_message(response.data.message, response.data.status)
            router.push('/mi-espacio')
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const change_password = async (password, new_password) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/auth/change_password',
                data: { password, new_password }
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    return {
        user_data,
        token,
        name,
        email,
        password,
        role,
        phone,
        policy_accepted,
        login,
        register,
        logout,
        refresh,
        verify_email,
        verify_login,
        forgot_password,
        reset_password,
        change_password
    }
})
