<template>
    <main class="pages">
        <h2>{{ current_component === 'Login' ? 'Inicia sesión' : current_component === 'ForgotPassword' ? 'Recuperar contraseña' : 'Regístrate' }}</h2>
        <LoginComponent v-if="current_component === 'Login'" />
        <RegisterComponent v-if="current_component === 'Register'" />
        <ForgotPasswordComponent v-if="current_component === 'ForgotPassword'" />
        <p v-if="current_component === 'Login'" @click="current_component = 'ForgotPassword'" class="forgot-password">
            ¿Olvidaste tu contraseña? </p>
        <p>{{ current_component === 'Login' ? '¿No tienes cuenta?' : '¿Tienes cuenta?' }} <button class="nobg-btn"
                @click="toggle_component">{{ current_component === 'Login' ? 'Regístrate' : 'Inicia sesión' }}</button>
        </p>
    </main>
</template>

<script setup>
import { ref } from 'vue'
import LoginComponent from '../components/auth/LoginComponent.vue'
import RegisterComponent from '../components/auth/RegisterComponent.vue'
import ForgotPasswordComponent from '../components/auth/ForgotPasswordComponent.vue'

const current_component = ref('Login')

const toggle_component = () => {
    if (current_component.value === 'Login') {
        current_component.value = 'Register'
    } else {
        current_component.value = 'Login'
    }
}
</script>

<style scoped lang="scss">
main {
    max-height: 100vh;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    .forgot-password {
        cursor: pointer;
        display: inline-block;

        &:hover {
            scale: 1.05;
        }
    }
}
</style>
