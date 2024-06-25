<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../stores/user-store';
import { useUtilStore } from '../../../stores/util-store';
import { useTestStore } from '../../../stores/test-store';

//Activate tools
const router = useRouter();
const userStore = useUserStore();
const utilStore = useUtilStore();
const testStore = useTestStore();

//Data for loggin or register
const userName = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const politiquesAccepted = ref(false);

//Data for test
const objective = ref('');
const r1 = ref('');
const r2 = ref('');
const r3 = ref('');
const r4 = ref('');
const r5 = ref('');
const r6 = ref('');

//Submit form
const handleSubmit = async () => {
    try {
        utilStore.isLoading = true;

        const data = {
            objective: objective.value,
            reason1: r1.value,
            reason2: r2.value,
            reason3: r3.value,
            reason4: r4.value,
            reason5: r5.value,
            reason6: r6.value,
        };

        if (userStore.token) {
            await testStore.createTestResult('Logro de Metas', data);
            utilStore.displayAlert('¡Test enviado con éxito!', 'success');
            router.push({ name: 'Espacio Personal' });
        } else {
            await userStore.register(
                userName.value,
                email.value,
                phone.value,
                password.value,
                politiquesAccepted.value,
            );

            await testStore.createTestResult('Logro de Metas', data);
            utilStore.displayAlert('¡Test enviado con éxito!', 'success');
            router.push({ name: 'Espacio Personal' });
        }
    } catch (error) {
        utilStore.displayAlert('Fallo al enviar el test', 'error');
        console.log(error);
    } finally {
        utilStore.isLoading = false;
    }
};
</script>

<template>
    <main class="page-container">
        <section class="info-container">
            <h2>Alcanza tus metas</h2>
            <p>
                Este test tiene la finalidad de identificiar que bloquea que
                logres una meta en específico. Y le permite tener un plan de
                acción para superar el bloqueo.
            </p>
        </section>
        <section class="form-container">
            <form @submit.prevent="handleSubmit">
                <h3 v-if="userStore.token">
                    Hola {{ userStore.user.split(' ')[0] }}
                </h3>
                <div v-else class="login-container">
                    <input
                        class="input"
                        type="text"
                        placeholder="Nombre Completo"
                    />
                    <input
                        class="input"
                        type="email"
                        placeholder="Correo Electrónico"
                    />
                    <input class="input" type="tel" placeholder="Teléfono" />
                    <input
                        class="input"
                        type="password"
                        placeholder="Contraseña"
                        title="Si ya tienes una cuenta, usa tu contraseña"
                    />
                </div>
                <div class="questions-container">
                    <p>
                        Por favor escribe la meta que quieres lograr y 6 razones
                        por las que quieres lograr esa meta. Es importante
                        evitar repensar las razones, solo escribe lo primero que
                        se te venga a la mente.
                    </p>
                    <div class="question">
                        <input
                            class="input"
                            type="text"
                            id="objective"
                            v-model="objective"
                            placeholder="Escribe tu meta"
                            required
                        />
                        <input
                            class="input"
                            type="text"
                            v-model="r1"
                            placeholder="Primera razón"
                            required
                        />
                        <input
                            class="input"
                            type="text"
                            v-model="r2"
                            placeholder="Segunda razón"
                            required
                        />
                        <input
                            class="input"
                            type="text"
                            v-model="r3"
                            placeholder="Tercera razón"
                            required
                        />
                        <input
                            class="input"
                            type="text"
                            v-model="r4"
                            placeholder="Cuarta razón"
                            required
                        />
                        <input
                            class="input"
                            type="text"
                            v-model="r5"
                            placeholder="Quinta razón"
                            required
                        />
                        <input
                            class="input"
                            type="text"
                            v-model="r6"
                            placeholder="Sexta razón"
                            required
                        />
                    </div>
                    <!-- RGDP  -->
                    <div class="rgdp">
                        <input
                            type="checkbox"
                            required
                            v-model="politiquesAccepted"
                        />
                        <p>
                            Acceptar políticas de privacidad y tratamiento de
                            datos
                        </p>
                        <RouterLink to="/politicas" class="politicas">
                            Ver políticas
                        </RouterLink>
                    </div>
                    <!-- Buttons  -->
                    <div>
                        <button
                            v-if="politiquesAccepted"
                            type="submit"
                            class="register-btn"
                        >
                            Enviar
                        </button>
                        <button v-else class="disable-btn">Envia</button>
                    </div>
                </div>
            </form>
        </section>
    </main>
</template>

<style scoped lang="scss">
.page-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 8rem 4rem 2rem;
    box-sizing: border-box;

    .info-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 60%;
        margin-bottom: 2rem;

        h2 {
            text-align: center;
            color: var(--color-primary);
            margin: 0 0 2rem;
        }

        p {
            opacity: 0.8;
            text-indent: 1rem;
        }
    }

    .form-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 60%;
        box-sizing: border-box;

        h3 {
            color: var(--color-primary);
            text-align: center;
        }

        .login-container {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 2rem;
        }

        .questions-container {
            display: flex;
            flex-direction: column;
            width: 100%;

            .question {
                color: var(--color-primary);
                margin: 2rem 0 1rem;
                font-size: 1.5rem;
            }
        }

        .input {
            width: 50%;
            height: 2rem;
            margin-bottom: 0.5rem;
            padding: 0.2rem 1rem;
            border: 0px;
            border-bottom: 1px solid var(--color-primary);
            background-color: rgba(128, 128, 128, 0.055);

            &::placeholder {
                color: var(--color-primary);
            }

            &:focus {
                outline: none;

                &::placeholder {
                    color: var(--color-primary-light);
                }

                & + input {
                    margin-top: 1rem;
                }
            }
        }
    }
}
.rgdp {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 2rem 0 1rem;

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
.register-btn {
    background-color: var(--color-primary);
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    color: var(--color-white);
    font-size: 1rem;
    font-weight: 500;
    border: 1px solid transparent;
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
    border: 1px solid transparent;
    pointer-events: none;
}
</style>
