<script setup>
import { useAuthStore } from '../../stores/auth-store';
import { useRoute } from 'vue-router';

const auth_store = useAuthStore();
const route = useRoute();
const email = route.query.email;
const token = route.query.token;

auth_store.verify_email(token, email)

</script>

<template>
    <main class="pages">
        <h1>Correo electrónico verificado</h1>
        <p>Gracias por verificar tu correo electrónico</p>
        <p class="animate">Redirigiendo a tu espacio...</p>
    </main>
</template>

<style scoped lang="scss">
.pages {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    h1 {
        margin-bottom: 1rem;
    }

    .animate {
        animation: animate 0.5s ease-in-out infinite;
    }
}

@keyframes animate {
    0% {
        opacity: 0;
    }

    50% {
        opacity: 1;
    }

    100% {
        opacity: 0;
    }
}
</style>
