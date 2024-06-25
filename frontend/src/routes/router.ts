//Import tools
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '../stores/user-store';

//Import components
import HomeView from '../views/HomeView.vue';

//Create routes
const routes = [
    /* -----  Auth Routes ----- */
    {
        path: '/acceder',
        name: 'Login',
        component: () => import('../views/auth/LoginView.vue'),
    },
    {
        path: '/registro/:role',
        name: 'Register-Role',
        component: () => import('../views/auth/RegisterView.vue'),
    },

    /* -----  App Routes ----- */
    {
        path: '/',
        name: 'Inicio',
        component: HomeView,
    },
    {
        path: '/servicios/:id',
        name: 'Terapias',
        component: () => import('../views/TherapyServicesView.vue'),
    },
    {
        path: '/galeria/:id',
        name: 'Galerias',
        component: () => import('../views/GalleriesView.vue'),
    },
    {
        path: '/sobre-mi',
        name: 'About me',
        component: () => import('../views/AboutMeView.vue'),
    },
    {
        path: '/agendar-cita',
        name: 'Agendar Cita',
        component: () => import('../views/AllTherapyView.vue'),
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('../views/NotFoundView.vue'),
    },
    /* -----  Test Routes ----- */
    {
        path: '/autogestion/arquetipos',
        name: 'Test Arquetipos',
        component: () => import('../views/test/ArchetypeTestView.vue'),
    },
    {
        path: '/anamnesis',
        name: 'Anamnesis',
        component: () => import('../views/test/AnamnesisTestView.vue'),
    },
    {
        path: '/autogestion/temperamento',
        name: 'Test Temperamento',
        component: () => import('../views/test/TemperTestView.vue'),
    },
    {
        path: '/autogestion/metas',
        name: 'Test Metas',
        component: () => import('../views/test/GoalTestView.vue'),
    },
    {
        path: '/autogestion/anamnesis',
        name: 'Test Anamnesis',
        component: () => import('../views/test/AnamnesisTestView.vue'),
    },
    /* -----  Private Routes ----- */
    {
        path: '/espacio-personal',
        name: 'Espacio Personal',
        component: () => import('../views/private/PersonalSpaceView.vue'),
        meta: { auth: true },
    },
    {
        path: '/calendly-agendar-citayg76fygouyf75',
        name: 'Calendly',
        component: () => import('../views/private/CalendlyView.vue'),
    },
];

//Create router
const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    const requiredAuth = to.meta.auth;
    const userStore = useUserStore();

    if (requiredAuth) {
        if (userStore.token) {
            next();
        } else if (localStorage.getItem('user')) {
            await userStore.refreshToken();
            next();
        } else {
            next({ name: 'Login' });
        }
    }

    // use the from parameter here
    console.log(`from ${from.path} `);

    // Goto top on next route
    window.scrollTo(0, 0);

    next();
});

//Export router
export default router;
