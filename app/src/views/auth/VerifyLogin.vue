<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth-store';

const auth_store = useAuthStore();
const login_token = ref('');

const handle_submit = async () => {
    await auth_store.verify_login(login_token.value, auth_store.email)
}
</script>

<template>
    <main class="pages">
        <h2>Verificación de inicio de sesión</h2>
        <form @submit.prevent="handle_submit">
            <input type="text" v-model="login_token" placeholder="Introduce el código que te llego al correo" />
            <button type="submit" class="action-btn">Verificar</button>
        </form>
    </main>
</template>

<style scoped lang="scss">
.pages {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;

        input {
            width: 100%;
            max-width: 40rem;
            padding: 0.5rem;
            margin: 0;
            background-color: transparent;
            border-radius: 0;
            border: 1px solid transparent;
            border-bottom: 1px solid var(--color-text);
            outline: none;
            transition: border-color 0.3s ease;

            &:focus {
                border-bottom-color: var(--color-primary);
            }
        }
    }

}
</style>
