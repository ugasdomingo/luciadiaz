<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { useUtilStore } from '@/stores/util-store';

//Import components
import LoginFormComponent from '@/components/common/forms/LoginFormComponent.vue';
import RegisterFormComponent from '@/components/common/forms/RegisterFormComponent.vue';

//Use tools
const user_store = useUserStore();
const util_store = useUtilStore();
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
    <div class="modal__container">
        <div class="modal__content">
            <img
                src="/icon/close.svg"
                alt="close"
                @click="util_store.show_access_modal = false"
            />
            <h2>Qué agradable tenerte por aquí</h2>
            <section v-if="registered" class="login">
                <LoginFormComponent class="login-form" />
                <button class="button__simply" @click="change_password = true">
                    Olvidé mi contraseña
                </button>
                <button class="button__simply" @click="registered = false">
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
        </div>
    </div>
</template>

<style scoped lang="scss">
.modal__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    box-sizing: border-box;

    .modal__content {
        width: 60%;
        background-color: var(--color-white);
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        position: relative;

        img {
            width: 2rem;
            height: 2rem;
            position: absolute;
            top: 1rem;
            right: 1rem;
            cursor: pointer;
        }

        h2 {
            text-align: center;
            margin-bottom: 1rem;
        }

        .login,
        .register {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
        }

        .reset-password {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            padding: 1.5rem;
            background-color: var(--color-white);
            position: absolute;
            top: 3rem;
            left: 0;
            box-sizing: border-box;

            p {
                width: 70%;
                text-align: center;
            }

            form {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .modal__container {
        .modal__content {
            width: 85%;
        }
    }
}
</style>
