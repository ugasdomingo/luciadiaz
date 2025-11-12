<script setup>
import { useAuthStore } from '../../stores/auth-store'
import { ref } from 'vue'

const auth_store = useAuthStore()
const show_password = ref(false)

const login = async () => {
    await auth_store.login({ email: auth_store.email, password: auth_store.password })
}
</script>

<template>
    <form @submit.prevent="login">
        <input type="email" v-model="auth_store.email" placeholder="Correo electrónico" />
        <div class="password-container">
            <input v-model="auth_store.password" placeholder="Contraseña" :type="show_password ? 'text' : 'password'" />
            <img :src="show_password ? '/icon/icon-eye-open.svg' : '/icon/icon-eye-close.svg'" alt="icon eye"
                @click="show_password = !show_password" />
        </div>
        <button type="submit" class="action-btn">Iniciar sesión</button>
    </form>
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    width: 100%;

    .password-container {
        position: relative;

        img {
            width: 1rem;
            height: 1rem;
            position: absolute;
            right: 1rem;
            top: 50%;
            transform: translateY(-50%);
            cursor: pointer;
        }

        button {
            margin-top: 1.5rem;
        }
    }
}
</style>
