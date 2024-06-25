<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../../../stores/user-store';
import { useTestStore } from '../../../stores/test-store';
import { useUtilStore } from '../../../stores/util-store';

//Import questions
import { temperQuestions } from './temperQuestions';

//Activate tools
const router = useRouter();
const userStore = useUserStore();
const testStore = useTestStore();
const utilStore = useUtilStore();

//Data for loggin or register
const userName = ref('');
const email = ref('');
const phone = ref('');
const password = ref('');
const politiquesAccepted = ref(false);

//Data for test
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
const r11 = ref('');
const r12 = ref('');
const r13 = ref('');
const r14 = ref('');
const r15 = ref('');
const r16 = ref('');
const r17 = ref('');
const r18 = ref('');
const r19 = ref('');
const r20 = ref('');
const r21 = ref('');
const r22 = ref('');
const r23 = ref('');
const r24 = ref('');
const r25 = ref('');
const r26 = ref('');
const r27 = ref('');
const r28 = ref('');
const r29 = ref('');
const r30 = ref('');
const r31 = ref('');
const r32 = ref('');

//HandleSubmit
const handleSubmit = async () => {
    try {
        utilStore.isLoading = true;

        const answers = [
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
            r11.value,
            r12.value,
            r13.value,
            r14.value,
            r15.value,
            r16.value,
            r17.value,
            r18.value,
            r19.value,
            r20.value,
            r21.value,
            r22.value,
            r23.value,
            r24.value,
            r25.value,
            r26.value,
            r27.value,
            r28.value,
            r29.value,
            r30.value,
            r31.value,
            r32.value,
        ];

        //Function to Count responses
        const setResults = (resp: string) => {
            return answers.filter((answer) => answer === resp).length;
        };

        //Find blank responses
        const blankResponses = setResults('');

        if (blankResponses > 0) {
            utilStore.isLoading = false;
            utilStore.displayAlert(
                'Debes responder todas las preguntas',
                'error',
            );
        } else {
            const sanguine = setResults('a');
            const choleric = setResults('b');
            const melancholic = setResults('c');
            const phlegmatic = setResults('d');

            const results = {
                sanguine,
                choleric,
                melancholic,
                phlegmatic,
            };

            if (userStore.token) {
                await testStore.createTestResult('Temperamento', results);
                utilStore.displayAlert('Test enviado con éxito', 'success');
                router.push({ name: 'Espacio Personal' });
            } else {
                await userStore.register(
                    userName.value,
                    email.value,
                    phone.value,
                    password.value,
                    politiquesAccepted.value,
                );

                await testStore.createTestResult('Temperamento', results);
                utilStore.displayAlert('Test enviado con éxito', 'success');
                router.push({ name: 'Espacio Personal' });
            }
        }
    } catch (error) {
        utilStore.displayAlert('Error al eniar el test', 'error');
        console.log(error);
    } finally {
        utilStore.isLoading = false;
    }
};
</script>

<template>
    <main class="page-container">
        <section class="info-container">
            <h2>Test de Temperamento</h2>
            <p>
                Este test tiene la finalidad de identificiar tus modelos y
                patornes de comportamiento, permitiendo trabajar de manera
                personalizada en tu plan de desarrollo personal. Llevándote a
                conocer más tus fortalezas y las áreas a potenciar en tu vida.
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
                    <p>
                        Por favor selecciona la opción con la que más te
                        identifique en cada caso
                    </p>

                    <!-- PREGUNTA 1 -->
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[0].a,
                            temperQuestions[0].b,
                            temperQuestions[0].c,
                            temperQuestions[0].d,
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
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[1].a,
                            temperQuestions[1].b,
                            temperQuestions[1].c,
                            temperQuestions[1].d,
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
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[2].a,
                            temperQuestions[2].b,
                            temperQuestions[2].c,
                            temperQuestions[2].d,
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
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[3].a,
                            temperQuestions[3].b,
                            temperQuestions[3].c,
                            temperQuestions[3].d,
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
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[4].a,
                            temperQuestions[4].b,
                            temperQuestions[4].c,
                            temperQuestions[4].d,
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
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[5].a,
                            temperQuestions[5].b,
                            temperQuestions[5].c,
                            temperQuestions[5].d,
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
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[6].a,
                            temperQuestions[6].b,
                            temperQuestions[6].c,
                            temperQuestions[6].d,
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
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[7].a,
                            temperQuestions[7].b,
                            temperQuestions[7].c,
                            temperQuestions[7].d,
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
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[8].a,
                            temperQuestions[8].b,
                            temperQuestions[8].c,
                            temperQuestions[8].d,
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
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[9].a,
                            temperQuestions[9].b,
                            temperQuestions[9].c,
                            temperQuestions[9].d,
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
                    <!-- PREGUNTA 11 -->
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[10].a,
                            temperQuestions[10].b,
                            temperQuestions[10].c,
                            temperQuestions[10].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r11"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 12 -->
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[11].a,
                            temperQuestions[11].b,
                            temperQuestions[11].c,
                            temperQuestions[11].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r12"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 13 -->
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[12].a,
                            temperQuestions[12].b,
                            temperQuestions[12].c,
                            temperQuestions[12].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                :value="['a', 'b', 'c', 'd'][index]"
                                v-model="r13"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 14 -->
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[13].a,
                            temperQuestions[13].b,
                            temperQuestions[13].c,
                            temperQuestions[13].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                value="a"
                                v-model="r14"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 15 -->
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[14].a,
                            temperQuestions[14].b,
                            temperQuestions[14].c,
                            temperQuestions[14].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                value="a"
                                v-model="r15"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 16 -->
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[15].a,
                            temperQuestions[15].b,
                            temperQuestions[15].c,
                            temperQuestions[15].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                value="a"
                                v-model="r16"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 17 -->
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[16].a,
                            temperQuestions[16].b,
                            temperQuestions[16].c,
                            temperQuestions[16].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                value="a"
                                v-model="r17"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 18 -->
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[17].a,
                            temperQuestions[17].b,
                            temperQuestions[17].c,
                            temperQuestions[17].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                value="a"
                                v-model="r18"
                            />
                            {{ item }}
                        </label>
                    </div>
                    <!-- PREGUNTA 19 -->
                    <div
                        class="question"
                        v-for="(item, index) in [
                            temperQuestions[18].a,
                            temperQuestions[18].b,
                            temperQuestions[18].c,
                            temperQuestions[18].d,
                        ]"
                        :key="index"
                    >
                        <label>
                            <input
                                type="radio"
                                required
                                value="a"
                                v-model="r19"
                            />
                            {{ item }}
                        </label>
                    </div>
                </div>
            </form>
        </section>
    </main>
</template>
