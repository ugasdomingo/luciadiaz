<script setup>
import { useAuthStore } from '../../stores/auth-store'
import { ref } from 'vue'

const auth_store = useAuthStore()
const is_patient = ref(false)
const show_password = ref(false)

const register = async () => {
    await auth_store.register({ name: auth_store.name, email: auth_store.email, password: auth_store.password, role: is_patient.value ? 'patient' : 'user', phone: auth_store.phone, policy_accepted: auth_store.policy_accepted })
}
</script>

<template>
    <form @submit.prevent="register">
        <input type="text" v-model="auth_store.name" placeholder="Nombre" />
        <input type="email" v-model="auth_store.email" placeholder="Correo electrónico" />
        <div class="password-container">
            <input v-model="auth_store.password" placeholder="Contraseña" :type="show_password ? 'text' : 'password'" />
            <img :src="show_password ? '/icon/icon-eye-open.svg' : '/icon/icon-eye-close.svg'" alt="icon eye"
                @click="show_password = !show_password" />
        </div>
        <div class="is_patient">
            <label for="is_patient">¿Eres paciente de Lucia? Marca si es así</label>
            <input type="radio" v-model="is_patient" value="true" placeholder="¿Eres paciente de Lucia" />
        </div>
        <input type="text" v-model="auth_store.phone" placeholder="Teléfono" />
        <div class="policy">
            <input type="checkbox" v-model="auth_store.policy_accepted" placeholder="Aceptar políticas" />
            <p>He leído y acepto las <RouterLink to="/privacy-policy">políticas de privacidad</RouterLink>
            </p>
        </div>
        <button type="submit" v-if="auth_store.policy_accepted" class="action-btn">Registrarse</button>
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
    }

    button {
        margin-top: 0.5rem;
    }
}

.policy {
    width: 100%;
    max-width: 30rem;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    box-sizing: border-box;

    input {
        width: fit-content;
    }

    p {
        margin: 0;
    }
}

.is_patient {
    width: 100%;
    max-width: 30rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    input {
        width: fit-content;
    }
}
</style>
