<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../stores/user-store';
import { useTestStore } from '../../../stores/test-store';
import { useUtilStore } from '../../../stores/util-store';

//Import questions
import { archetypeQuestions } from './archetypeQuestions';

//Activate tools
const router = useRouter();
const userStore = useUserStore();
const testStore = useTestStore();
const utilStore = useUtilStore();

//Data for loggin or register
const name = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const politiquesAcepted = ref(false);

//Data for archetype
const r1 = ref('');
const r2 = ref('');
const r3 = ref('');
const r4 = ref('');
const r5 = ref('');
const r6 = ref('');
const r7 = ref('');
const r8 = ref('');
const r9 = ref('');
const r10 = ref('');

//Submit form
const handleSubmit = async () => {
    try {
        utilStore.isLoading = true;

        const allResponses = [
            r1.value,
            r2.value,
            r3.value,
            r4.value,
            r5.value,
            r6.value,
            r7.value,
            r8.value,
            r9.value,
            r10.value,
        ];

        // Funtion to count responses
        const setResults = (resp: string) => {
            return allResponses.filter((el) => el == resp).length;
        };

        // Find not answered questions
        const blanksQuestions = setResults('');

        if (blanksQuestions > 0) {
            utilStore.displayAlert(
                'Ups te quedaron preguntas sin responder',
                'error',
            );
        } else {
            const wise = setResults('a');
            const warrior = setResults('b');
            const wizard = setResults('c');
            const lover = setResults('d');

            const finalResponse = {
                wise,
                warrior,
                wizard,
                lover,
            };

            if (userStore.token) {
                await testStore.createTestResult('Arquetipo', finalResponse);

                utilStore.displayAlert('¡Registro exitoso!', 'success');
                /* router.push('/espacio-personal'); */
            } else {
                await userStore.register(
                    name.value,
                    email.value,
                    phone.value,
                    password.value,
                    politiquesAcepted.value,
                );

                await testStore.createTestResult('Arquetipo', finalResponse);

                utilStore.displayAlert('¡Registro exitoso!', 'success');

                router.push('/espacio-personal');
            }
        }
    } catch (error) {
        console.log(error);
    } finally {
        utilStore.isLoading = false;
    }
};
</script>

<template>
    <main class="page-container">
        <section class="info-container">
            <h2>Test de personalidad</h2>
            <p>
                Este test tiene la finalidad de identificiar tus modelos y
                patornes de comportamiento a través de arquetpos, permitiendo
                trabajar de manera personalizada en tu plan de desarrollo
                personal. Llevándote a conocer más tus fortalezas y las áreas a
                potenciar en tu vida.
            </p>
        </section>
        <section class="form-container">
            <form @submit.prevent="handleSubmit">
                <h3 v-if="userStore.token">
                    Hola {{ userStore.user.split(' ')[0] }}
                </h3>
                <div v-else class="login-container">
                    <input type="text" placeholder="Nombre Completo" />
                    <input type="email" placeholder="Correo Electrónico" />
                    <input type="tel" placeholder="Teléfono" />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        title="Si ya tienes una cuenta, usa tu contraseña"
                    />
                </div>

                <div class="questions-container">
                    <!-- PREGUNTA 1 -->
                    <p>
                        Por favor selecciona la opción con la que más te
                        identifique en cada caso
                    </p>
                    <p class="question">{{ archetypeQuestions[0].pregunta }}</p>
                    <div
                        class="pregunta"
                        v-for="(item, index) in [
                            archetypeQuestions[0].a,
                            archetypeQuestions[0].b,
                            archetypeQuestions[0].c,
                            archetypeQuestions[0].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r1"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 2 -->
                    <p class="question">{{ archetypeQuestions[1].pregunta }}</p>
                    <div
                        class="pregunta"
                        v-for="(item, index) in [
                            archetypeQuestions[1].a,
                            archetypeQuestions[1].b,
                            archetypeQuestions[1].c,
                            archetypeQuestions[1].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r2"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 3 -->
                    <p class="question">{{ archetypeQuestions[2].pregunta }}</p>
                    <div
                        class="pregunta"
                        v-for="(item, index) in [
                            archetypeQuestions[2].a,
                            archetypeQuestions[2].b,
                            archetypeQuestions[2].c,
                            archetypeQuestions[2].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r3"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 4 -->
                    <p class="question">{{ archetypeQuestions[3].pregunta }}</p>
                    <div
                        class="pregunta"
                        v-for="(item, index) in [
                            archetypeQuestions[3].a,
                            archetypeQuestions[3].b,
                            archetypeQuestions[3].c,
                            archetypeQuestions[3].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r4"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 5 -->
                    <p class="question">{{ archetypeQuestions[4].pregunta }}</p>
                    <div
                        class="pregunta"
                        v-for="(item, index) in [
                            archetypeQuestions[4].a,
                            archetypeQuestions[4].b,
                            archetypeQuestions[4].c,
                            archetypeQuestions[4].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r5"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 6 -->
                    <p class="question">{{ archetypeQuestions[5].pregunta }}</p>
                    <div
                        class="pregunta"
                        v-for="(item, index) in [
                            archetypeQuestions[5].a,
                            archetypeQuestions[5].b,
                            archetypeQuestions[5].c,
                            archetypeQuestions[5].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r6"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 7 -->
                    <p class="question">{{ archetypeQuestions[6].pregunta }}</p>
                    <div
                        class="pregunta"
                        v-for="(item, index) in [
                            archetypeQuestions[6].a,
                            archetypeQuestions[6].b,
                            archetypeQuestions[6].c,
                            archetypeQuestions[6].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r7"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 8 -->
                    <p class="question">{{ archetypeQuestions[7].pregunta }}</p>
                    <div
                        class="pregunta"
                        v-for="(item, index) in [
                            archetypeQuestions[7].a,
                            archetypeQuestions[7].b,
                            archetypeQuestions[7].c,
                            archetypeQuestions[7].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r8"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 9 -->
                    <p class="question">{{ archetypeQuestions[8].pregunta }}</p>
                    <div
                        class="pregunta"
                        v-for="(item, index) in [
                            archetypeQuestions[8].a,
                            archetypeQuestions[8].b,
                            archetypeQuestions[8].c,
                            archetypeQuestions[8].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r9"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 10 -->
                    <p class="question">{{ archetypeQuestions[9].pregunta }}</p>
                    <div
                        class="pregunta"
                        v-for="(item, index) in [
                            archetypeQuestions[9].a,
                            archetypeQuestions[9].b,
                            archetypeQuestions[9].c,
                            archetypeQuestions[9].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r10"
                            />
                            {{ item }}
                        </label>
                    </div>
                </div>
                <!-- RGDP  -->
                <div class="rgdp">
                    <input
                        type="checkbox"
                        required
                        v-model="politiquesAcepted"
                    />
                    <p>
                        Acceptar políticas de privacidad y tratamiento de datos
                    </p>
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
                        Enviar
                    </button>
                    <button v-else class="disable-btn">Envia</button>
                </div>
            </form>
        </section>
        <aside>
            <p :class="r1 ? 'active' : ''">1: {{ r1 }}</p>
            <p :class="r2 ? 'active' : ''">2: {{ r2 }}</p>
            <p :class="r3 ? 'active' : ''">3: {{ r3 }}</p>
            <p :class="r4 ? 'active' : ''">4: {{ r4 }}</p>
            <p :class="r5 ? 'active' : ''">5: {{ r5 }}</p>
            <p :class="r6 ? 'active' : ''">6: {{ r6 }}</p>
            <p :class="r7 ? 'active' : ''">7: {{ r7 }}</p>
            <p :class="r8 ? 'active' : ''">8: {{ r8 }}</p>
            <p :class="r9 ? 'active' : ''">9: {{ r9 }}</p>
            <p :class="r10 ? 'active' : ''">10: {{ r10 }}</p>
        </aside>
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

            input {
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

        .questions-container {
            display: flex;
            flex-direction: column;
            width: 100%;

            .question {
                color: var(--color-primary);
                margin: 2rem 0 1rem;
                font-size: 1.5rem;
            }

            .pregunta {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                width: 100%;

                label {
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;
                    width: 100%;
                    margin-bottom: 1rem;
                    opacity: 0.7;

                    input {
                        margin-right: 1rem;
                    }
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
aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.5rem;
    position: fixed;
    top: 8rem;
    right: 1rem;
    width: 3.5vw;
    margin-top: 2rem;
    padding: 0 0 0 0.5rem;
    background-color: var(--color-primary);
    border-radius: 0.5rem;
    box-sizing: border-box;

    p {
        color: var(--color-secondary);
        margin: 0;
    }

    .active {
        color: var(--color-white);
    }
}

@media screen and (max-width: 768px) {
    .page-container {
        padding: 8rem 1rem 2rem;

        .info-container {
            width: 100%;
        }

        .form-container {
            width: 100%;

            .login-container {
                input {
                    width: 80%;
                }
            }
        }
    }
    aside {
        flex-direction: row;
        gap: 0.1rem;
        justify-content: space-between;
        top: 90vh;
        left: 0.5rem;
        right: auto;
        width: 95%;
        padding: 0.5rem;

        p {
            font-size: 0.75rem;
        }
    }
}
</style>
