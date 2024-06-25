<template>
    <section class="register-container">
        <h2>Registrarse</h2>

        <form @submit.prevent="register">
            <div class="form-group">
                <input
                    type="text"
                    onscrollend
                    v-model="userName"
                    placeholder="Nombre Completo"
                />
                <input
                    type="email"
                    id="email"
                    v-model="email"
                    placeholder="Correo Electrónico"
                />
                <input
                    type="password"
                    id="password"
                    v-model="password"
                    placeholder="Contraseña"
                />
            </div>

            <!-- RGDP  -->
            <div class="rgdp">
                <input
                    type="checkbox"
                    required
                    v-model="politiquesAcepted"
                    :value="politiquesAcepted"
                />
                <p>Acceptar políticas de privacidad y tratamiento de datos</p>
                <RouterLink to="/politicas" class="politicas">
                    Ver políticas
                </RouterLink>
            </div>
            <!-- Buttons  -->
            <div>
                <button
                    v-if="politiquesAcepted"
                    type="submit"
                    class="register-btn"
                >
                    Registrarse
                </button>
                <button v-else class="disable-btn">Registrarse</button>
            </div>

            <div class="access">
                <p>¿Ya tienes una cuenta?</p>
                <RouterLink to="/acceder">Iniciar Sesión</RouterLink>
            </div>
        </form>
    </section>
</template>

<script setup lang="ts">
//Import tools
import { useUserStore } from '../../stores/user-store';
import { ref } from 'vue';
import { useRouter, RouterLink } from 'vue-router';

//Activate tools
const userStore = useUserStore();
const router = useRouter();

//Get role at path
const role = router.currentRoute.value.params.role as string;

//Get data
const userName = ref('');
const email = ref('');
const password = ref('');
const politiquesAcepted = ref(false);

//Methods
const register = async () => {
    try {
        await userStore.register(
            userName.value,
            email.value,
            password.value,
            role,
            politiquesAcepted.value,
        );

        //Redirect
        router.push('/mi-escritorio');
    } catch (error) {
        console.log(error);
    }
};
</script>

<style scoped lang="scss">
.register-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    min-height: 100vh;
    padding: 11vh 4rem 2rem;
    margin: 0;
    box-sizing: border-box;

    h2 {
        font-size: 2rem;
        font-weight: 500;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

            input {
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                border: 1px solid #ccc;
                font-size: 1rem;
                font-weight: 500;
            }
        }

        .rgdp {
            display: flex;
            align-items: center;
            gap: 0.5rem;

            p {
                font-size: 0.6rem;
                font-weight: 500;
                opacity: 0.5;
            }

            .politicas {
                font-size: 0.6rem;
                font-weight: 500;
                opacity: 0.5;
                color: var(--color-primary);
            }
        }
    }

    .register-btn {
        background-color: var(--color-primary);
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        color: var(--color-white);
        font-size: 1rem;
        font-weight: 500;
        border: none;
        transition: background-color 0.2s ease-in-out;

        &:hover {
            background-color: transparent;
            border: 1px solid var(--color-primary);
            color: var(--color-primary);
        }
    }

    .disable-btn {
        background-color: #ccc;
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
        color: #fff;
        font-size: 1rem;
        font-weight: 500;
        border: none;
        pointer-events: none;
    }

    .access {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        p {
            font-size: 1rem;
            font-weight: 500;
            opacity: 0.5;
        }
    }
}
</style>
