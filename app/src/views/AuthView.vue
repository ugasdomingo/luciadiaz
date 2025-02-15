<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Import components
import LoginFormComponent from '@/components/common/forms/LoginFormComponent.vue';
import RegisterFormComponent from '@/components/common/forms/RegisterFormComponent.vue';

//Use tools
const user_store = useUserStore();
const email = ref('');
const registered = ref(true);
const change_password = ref(false);

//Methods
const handdleSubmit = async () => {
    await user_store.request_reset_password(email.value);
    change_password.value = false;
};
</script>

<template>
    <main class="page">
        <h2>Qué agradable tenerte por aquí</h2>
        <section v-if="registered" class="login">
            <LoginFormComponent class="login-form" />
            <button class="button__transparent" @click="change_password = true">
                Olvidé mi contraseña
            </button>
            <button class="button__transparent" @click="registered = false">
                ¿No tienes cuenta? Regístrate
            </button>
        </section>
        <section v-else class="register">
            <RegisterFormComponent class="register-form" role="user" />
            <button class="button__transparent" @click="registered = true">
                ¿Ya tienes una cuenta? Inicia sesión
            </button>
        </section>
        <section class="reset-password" v-if="change_password">
            <h2>¿Has olvidado tu contraseña?</h2>
            <p>
                Introduce tu correo electrónico y te enviaré un enlace para
                restablecer tu contraseña
            </p>

            <form @submit.prevent="handdleSubmit">
                <input
                    type="email"
                    placeholder="Correo electrónico"
                    v-model="email"
                />
                <button type="submit" class="button__action" v-if="email">
                    Enviar
                </button>
            </form>
            <button
                v-if="change_password"
                class="button__transparent"
                @click="change_password = false"
            >
                Cancelar
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

    .reset-password {
        width: 100%;
        height: calc(100vh - 4rem);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        padding: 1rem 2rem;
        background-color: var(--color-white);
        position: absolute;
        top: 4rem;
        left: 0;
        box-sizing: border-box;

        h2 {
            margin: 0;
        }

        p {
            margin: 0 0 4rem;
        }

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }
    }
}

@media screen and (max-width: 768px) {
    .page {
        h2 {
            font-size: 2.5rem;
            text-align: center;
        }

        .login,
        .register {
            width: 90%;
        }

        .reset-password {
            width: 100%;
        }
    }
}
</style>
