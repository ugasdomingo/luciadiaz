<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth-store';
import { useUtilStore } from '../../stores/util-store';
import { useRoute } from 'vue-router';

const auth_store = useAuthStore()
const util_store = useUtilStore()
const route = useRoute()
const reset_password_token = route.query.token
const email = route.query.email
const password = ref('')
const confirm_password = ref('')

const handle_submit = () => {
    if (password.value !== confirm_password.value) {
        util_store.set_message('Las contraseñas no coinciden', 'error')
        return
    }
    if (!reset_password_token || !email) {
        util_store.set_message('Token o correo electrónico no encontrado', 'error')
        return
    }
    auth_store.reset_password(reset_password_token, email, password.value)
}

</script>

<template>
    <main class="pages">
        <h2>Restablecer contraseña</h2>
        <form @submit.prevent="handle_submit">
            <input type="password" v-model="password" placeholder="Contraseña" />
            <input type="password" v-model="confirm_password" placeholder="Confirmar contraseña" />
            <button type="submit" class="action-btn">Restablecer contraseña</button>
        </form>
    </main>
</template>

<style scoped lang="scss">
.pages {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;

    form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;

        button {
            margin-top: 1.5rem;
        }
    }
}
</style>

