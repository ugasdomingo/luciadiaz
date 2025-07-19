<script setup>
import { useAuthStore } from '../../stores/auth-store'

const auth_store = useAuthStore()

const forgot_password = async () => {
    await auth_store.forgot_password({ email: auth_store.email })
}
</script>

<template>
    <form @submit.prevent="forgot_password">
        <input type="email" v-model="auth_store.email" placeholder="Correo electrónico" />
        <button type="submit" class="action-btn">Recuperar contraseña</button>
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