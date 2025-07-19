<script setup>
import { useAuthStore } from '../../stores/auth-store'

const auth_store = useAuthStore()

const login = async () => {
    await auth_store.login({ email: auth_store.email, password: auth_store.password })
}
</script>

<template>
    <form @submit.prevent="login">
        <input type="email" v-model="auth_store.email" placeholder="Correo electrónico" />
        <input type="password" v-model="auth_store.password" placeholder="Contraseña" />
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

    button {
        margin-top: 1.5rem;
    }
}
</style>
