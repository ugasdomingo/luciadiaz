//Import tools
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import { useUserStore } from '@/stores/user-store';
import HomeView from '@/views/HomeView.vue';

//Define routes
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Home',
        component: HomeView
    },
    /* GENERAL ROUTES********************** */
    {
        path: '/acceso',
        name: 'Access',
        component: () => import('@/views/AuthView.vue')
    },
    {
        path: '/cambiar-contrasena/:token',
        name: 'ChangePassword',
        component: () => import('@/views/ChangePasswordView.vue')
    },
    {
        path: '/agendar/confirmado',
        name: 'AppointmentPayed',
        component: () => import('@/views/AppoinmentView.vue')
    },
    {
        path: '/agendar/cita-confirmada',
        name: 'AppointmentConfirmed',
        component: () => import('@/views/PatientView.vue')
    },
    {
        path: '/blog',
        name: 'Blog',
        component: () => import('@/views/BlogView.vue')
    },
    {
        path: '/blog/:id',
        name: 'BlogPost',
        component: () => import('@/views/BlogOnePostView.vue')
    },
    {
        path: '/audios',
        name: 'Audios',
        component: () => import('@/views/AudiosView.vue')
    },
    {
        path: '/audios/:id',
        name: 'Audio',
        component: () => import('@/views/AudiosOneView.vue')
    },
    {
        path: '/formaciones',
        name: 'Courses',
        component: () => import('@/views/FormationsView.vue')
    },
    {
        path: '/formaciones/:landing_page',
        name: 'Course',
        component: () => import('@/views/FormationsOneView.vue')
    },
    {
        path: '/formaciones/confirmado/enrollment/:paypal_code',
        name: 'FormationPayed',
        component: () => import('@/views/EnrollmentView.vue')
    },
    {
        path: '/terapias',
        name: 'Therapies',
        component: () => import('@/views/TherapiesView.vue')
    },
    {
        path: '/terapias/:therapy',
        name: 'Therapy',
        component: () => import('@/views/TherapiesOneView.vue')
    },
    {
        path: '/tests',
        name: 'Tests',
        component: () => import('@/views/TestsView.vue')
    },
    {
        path: '/tests/:test_name',
        name: 'Test',
        component: () => import('@/views/TestsOneView.vue')
    },
    {
        path: '/area-privada',
        name: 'Dashboard',
        component: () => import('@/views/DashboardView.vue'),
        meta: { auth: true }
    },
    /* LEGAL ROUTES********************** */
    {
        path: '/aviso-legal',
        name: 'LegalNotice',
        component: () => import('@/views/legal/LegalNoticeView.vue')
    },
    {
        path: '/politica-privacidad',
        name: 'PrivacyPolicy',
        component: () => import('@/views/legal/PrivacyPolicyView.vue')
    },
    {
        path: '/terminos-y-condiciones',
        name: 'TermsAndConditions',
        component: () => import('@/views/legal/TermAndConditionsView.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/NotFoundView.vue')
    }
];

//Create router
const router = createRouter({
    history: createWebHistory(),
    routes
});

//Guards
router.beforeEach(async (to, from, next) => {
    const user_store = useUserStore();
    const requires_auth = to.meta.auth;
    const user_registered = localStorage.getItem('user');

    if (user_store.token) {
        return next();
    } else if (requires_auth) {
        user_registered ? await user_store.refresh() : next({ name: 'Access' });

        user_store.token ? next() : next({ name: 'Access' });
        console.log(from.path);
    } else {
        return next();
    }
});

//Scroll to top on route change
router.afterEach(() => {
    window.scrollTo(0, 0);
});

//Export router
export default router;
