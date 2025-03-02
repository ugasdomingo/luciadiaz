<script setup lang="ts">
//Import tools
import { ref, computed } from 'vue';
import { archetype_questions } from '@/static/tests-questions/archetype-questions';
import { useTestStore } from '@/stores/test-store';
import { useUtilStore } from '@/stores/util-store';
import { useUserStore } from '@/stores/user-store';

//Answers interface
interface IAnswers {
    [key: string]: string;
}

//States
const test_store = useTestStore();
const util_store = useUtilStore();
const user_store = useUserStore();
const answers = ref<IAnswers>({});
const show_test_info = ref(false);
const form_completed = computed(
    () => Object.keys(answers.value).length === archetype_questions.length
);

//Helpers
const determine_archetype = (results: any) => {
    const max = Math.max(
        results.wise,
        results.warrior,
        results.wizard,
        results.lover
    );
    if (max === results.wise) return 'Sabio Rey';
    if (max === results.warrior) return 'Guerrero';
    if (max === results.wizard) return 'Mago';
    if (max === results.lover) return 'Amante';
};

//Methods
const handle_submit = async () => {
    try {
        //Validate form completed
        if (Object.keys(answers.value).length < archetype_questions.length) {
            util_store.display_notification(
                'Por favor, responda todas las preguntas.',
                400
            );
            return;
        }

        //Find if user did the test before
        const user_test_results: object[] | null =
            user_store.all_user_data.test_results;

        if (user_test_results) {
            if (
                user_test_results.find(
                    (test: any) => test.title === 'archetype'
                )
            ) {
                util_store.display_notification(
                    'Ya has realizado este test anteriormente.',
                    400
                );
                return;
            }
        }

        //Handle results
        const results = {
            wise: 0,
            warrior: 0,
            wizard: 0,
            lover: 0
        };

        //Calculate results

        for (const key in answers.value) {
            const answer = answers.value[key];
            if (answer === 'a') results.wise++;
            if (answer === 'b') results.warrior++;
            if (answer === 'c') results.wizard++;
            if (answer === 'd') results.lover++;
        }

        //Determining archetype
        const user_archetype = determine_archetype(results);

        const final_answers = {
            archetype: user_archetype,
            results
        };

        //Save results
        await test_store.create_test_result('archetype', final_answers);
    } catch (error) {
        console.log(error);
        util_store.display_notification(
            'Ha ocurrido un error, por favor intente de nuevo.',
            500
        );
    }
};
</script>

<template>
    <section class="archetype__test__container">
        <div class="test__intro">
            <h2>Arquetipos de la personalidad</h2>
            <p
                class="test__show__info"
                @click="show_test_info = !show_test_info"
            >
                {{
                    show_test_info
                        ? 'No ver más'
                        : 'Ver más información de este test'
                }}
            </p>
            <transition name="fade">
                <p class="text__info" v-if="show_test_info">
                    La teoría de arquetipos de Jung surgió de su investigación
                    sobre la estructura psíquica humana, buscando comprender los
                    patrones universales de comportamiento que trascienden
                    culturas y épocas. <br />
                    <br />
                    Este ejercicio nos servirá para identificar modelos y
                    patrones de comportamiento para poder trabajar de forma más
                    individualizada en nuestros planes de desarrollo personal,
                    una forma más de conocer nuestras fortalezas y qué podemos
                    potenciar y aportar.
                </p>
            </transition>
        </div>
        <form @submit.prevent="handle_submit">
            <div
                v-for="(question, index) in archetype_questions"
                :key="index"
                class="question__container"
            >
                <p>{{ question.pregunta }}</p>
                <div class="options">
                    <label>
                        <input
                            type="radio"
                            v-model="answers[question.key]"
                            :name="question.key"
                            value="a"
                        />
                        <span>{{ question.a }}</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            v-model="answers[question.key]"
                            :name="question.key"
                            value="b"
                        />
                        <span>{{ question.b }}</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            v-model="answers[question.key]"
                            :name="question.key"
                            value="c"
                        />
                        <span>{{ question.c }}</span>
                    </label>
                    <label>
                        <input
                            type="radio"
                            v-model="answers[question.key]"
                            :name="question.key"
                            value="d"
                        />
                        <span>{{ question.d }}</span>
                    </label>
                </div>
            </div>
            <button
                type="submit"
                :class="form_completed ? 'button__action' : 'button__inactive'"
            >
                {{
                    form_completed
                        ? 'Procesar Test'
                        : 'Tienes preguntas sin responder'
                }}
            </button>
        </form>
    </section>
</template>

<style scoped lang="scss">
.archetype__test__container {
    width: 100%;
    display: flex;
    flex-direction: column;

    .test__intro {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;

        h2 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0;
        }

        .test__show__info {
            cursor: pointer;
            color: var(--color-secondary);
            font-weight: 500;
        }

        .text__info {
            margin-top: 0;
            width: 70%;
            font-size: 1rem;
            line-height: 1.5;
            font-weight: 300;
            text-align: justify;
            align-self: center;
            color: var(--color-text);
        }
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 2rem;

        .question__container {
            width: 70%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            margin-bottom: 1rem;
            padding: 1rem;
            border: 1px solid var(--color-secondary-trans);
            border-radius: 1rem;

            p {
                font-size: 1rem;
                font-weight: 500;
                margin-bottom: 1rem;
            }

            .options {
                display: flex;
                justify-content: center;
                flex-direction: column;

                input {
                    margin-right: 0.5rem;
                }

                label {
                    font-size: 0.9rem;
                    font-weight: 300;
                }
            }
        }
    }
}
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.75s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
