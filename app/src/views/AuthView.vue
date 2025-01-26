<script setup lang="ts">
//Import tools
import { ref } from 'vue';

//Import components
import LoginFormComponent from '@/components/common/forms/LoginFormComponent.vue';
import RegisterFormComponent from '@/components/common/forms/RegisterFormComponent.vue';

//Use tools
const registered = ref(true);
</script>

<template>
    <main class="page">
        <h2>Qué agradable tenerte por aquí</h2>
        <section v-if="registered" class="login">
            <LoginFormComponent class="login-form" />
            <button class="button__transparent" @click="registered = false">
                ¿No tienes cuenta? Regístrate
            </button>
        </section>
        <section v-else class="register">
            <RegisterFormComponent class="register-form" />
            <button class="button__transparent" @click="registered = true">
                ¿Ya tienes una cuenta? Inicia sesión
            </button>
        </section>
    </main>
</template>

<style scoped lang="scss">
.page {
    max-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h2 {
        margin: 0 0 1rem;
    }

    .login,
    .register {
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 2rem;
    }

    button {
        margin-top: 1rem;
        font-size: 1rem;
        padding: 0.2rem 1rem;
        border: 0px;
        color: var(--color-secondary);
        cursor: pointer;
    }
}
</style>
