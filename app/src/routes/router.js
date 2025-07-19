import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import { useAuthStore } from '../stores/auth-store'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    // Services Pages *************************************
    {
        path: '/terapias',
        name: 'Therapies',
        component: () => import('../views/Therapy.vue')
    },
    // Auth Pages *************************************
    {
        path: '/acceso',
        name: 'Acceso',
        component: () => import('../views/Access.vue')
    },
    {
        path: '/verify',
        name: 'Verify Email',
        component: () => import('../views/auth/VerifyEmail.vue')
    },
    {
        path: '/verify-login',
        name: 'Verify Login',
        component: () => import('../views/auth/VerifyLogin.vue')
    },
    {
        path: '/go-to-email',
        name: 'Go To Email',
        component: () => import('../views/auth/GoToEmail.vue')
    },
    {
        path: '/reset-password',
        name: 'Reset Password',
        component: () => import('../views/auth/ResetPassword.vue')
    },
    // Dashboard Pages *************************************
    {
        path: '/mi-espacio',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: { requires_auth: true }
    },
    {
        path: '/mi-espacio/user/:user_id',
        name: 'DashboardUserInfo',
        component: () => import('../views/DashboardUserInfo.vue'),
        meta: { requires_auth: true }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach(async (to, from, next) => {
    const auth_store = useAuthStore()
    const requires_auth = to.matched.some(record => record.meta.requires_auth)
    const login = localStorage.getItem('login')

    if (!requires_auth) {
        return next()
    } 

    if (auth_store.token) {
        return next()
    } 

    if (login) {
        try {
            await auth_store.refresh()
            if (auth_store.token) {
                return next()
            }
        } catch (error) {
            console.error('Error al refrescar token:', error)
        }
    }

    return next('/acceso', { query: { redirect: to.fullPath } })
})

export default router
