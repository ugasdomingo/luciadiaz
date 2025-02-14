<script setup lang="ts">
//Import tools
import { onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Import components
import RegisterFormComponent from '@/components/common/forms/RegisterFormComponent.vue';

//Use tools
const user_store = useUserStore();

//Methods
const program_role_udpate = () => {
    localStorage.setItem('role', 'patient');
};

//Lifecycle
onBeforeMount(async () => {
    if (user_store.token) {
        await user_store.update_user_role('patient');
    }
});
</script>

<template>
    <main class="page">
        <section class="user__registered" v-if="user_store.token">
            <h2>¡Hola {{ user_store.user_name }}!</h2>
            <p>Tu cita se ha confirmado.</p>
            <RouterLink
                to="/area-privada"
                @click="user_store.update_user_role('patient')"
                class="button__action"
            >
                Ir a mi Área Privada
            </RouterLink>
        </section>
        <section class="user__not-registered" v-else>
            <h2>¡Qué agradable tenerte por aquí!</h2>
            <p>
                Tu pago cita se ha confirmado. Ahora necesito que te registres
                en el formulario que conseguirás más abajo y, luego, en tu área
                privada completes tu historial clínico.
            </p>
            <p>
                Es importante, por favor, tener listo el historial al menos 48
                horas antes de la cita programada.
            </p>
            <div class="user__login">
                <p>¿Ya tienes cuenta?</p>
                <RouterLink
                    to="/area-privada"
                    @click="program_role_udpate"
                    class="button__action"
                >
                    Iniciar sesión
                </RouterLink>
            </div>
            <RegisterFormComponent :role="'patient'" />
        </section>
    </main>
</template>

<style scoped lang="scss">
.page {
    h2 {
        margin-bottom: 1rem;
    }
    .user__registered {
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        p {
            font-size: 1.2rem;
            margin-bottom: 3rem;
        }
    }

    .user__not-registered {
        min-height: 60vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
            font-size: 1.2rem;
            margin-bottom: 1rem;
        }
        .user__login {
            display: flex;
            align-items: center;
            gap: 2rem;
            padding: 1rem 3rem;
            margin: 2rem 0 4rem;
            border-radius: 1rem;
            border: 1px solid var(--color-primary);
            opacity: 0.6;

            p {
                font-size: 1.2rem;
                margin-bottom: 1rem;
            }
        }
    }
}
</style>
