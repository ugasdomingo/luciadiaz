<script setup lang="ts">
//Import tools
import { ref, computed } from 'vue';
import { temperament_questions } from '@/static/tests-questions/temperament-questions';
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
const form_completed = computed(
    () => Object.keys(answers.value).length === temperament_questions.length
);

//Helpers
const determine_temperament = (results: any) => {
    const max = Math.max(
        results.sanguine,
        results.choleric,
        results.melancholic,
        results.phlegmatic
    );
    if (max === results.choleric) return 'Colérico';
    if (max === results.melancholic) return 'Melancólico';
    if (max === results.phlegmatic) return 'Flemático';
    if (max === results.sanguine) return 'Sanguíneo';
};

//Methods
const handle_submit = async () => {
    try {
        //Validate form completed
        if (Object.keys(answers.value).length < temperament_questions.length) {
            util_store.display_notification(
                'Por favor, responda todas las preguntas.',
                400
            );
            return;
        }

        //Find if user did the test before
        const user_test_results: object[] =
            user_store.all_user_data.test_results;

        if (user_test_results) {
            if (
                user_test_results.find(
                    (test: any) => test.title === 'temperament'
                )
            ) {
                util_store.display_notification(
                    'Ya has realizado este test.',
                    400
                );
                return;
            }
        }

        //Handle test results
        const results = {
            sanguine: 0,
            choleric: 0,
            melancholic: 0,
            phlegmatic: 0
        };

        for (const key in answers.value) {
            const answer = answers.value[key];
            if (answer === 'a') results.sanguine++;
            if (answer === 'b') results.choleric++;
            if (answer === 'c') results.melancholic++;
            if (answer === 'd') results.phlegmatic++;
        }

        //determine temperament
        const user_temperament = determine_temperament(results);

        const final_answers = {
            temperament: user_temperament,
            results
        };

        //Save test results
        await test_store.create_test_result('temperament', final_answers);
    } catch (error) {
        console.log(error);
        util_store.display_notification(
            'Ha ocurrido un error, por favor intenta de nuevo.',
            400
        );
    }
};
</script>

<template>
    <form @submit.prevent="handle_submit">
        <h2>Test de temperamento</h2>
        <p>Selecciona la que te identifique más en cada sección.</p>
        <section
            v-for="(question, index) in temperament_questions"
            :key="index"
            class="question__container"
        >
            <div class="options">
                <label>
                    <input
                        type="radio"
                        v-model="answers[question.key]"
                        :name="question.key"
                        value="a"
                    />
                    <span>
                        {{ question.a }}
                    </span>
                </label>
                <label>
                    <input
                        type="radio"
                        v-model="answers[question.key]"
                        :name="question.key"
                        value="b"
                    />
                    <span>
                        {{ question.b }}
                    </span>
                </label>
                <label>
                    <input
                        type="radio"
                        v-model="answers[question.key]"
                        :name="question.key"
                        value="c"
                    />
                    <span>
                        {{ question.c }}
                    </span>
                </label>
                <label>
                    <input
                        type="radio"
                        v-model="answers[question.key]"
                        :name="question.key"
                        value="d"
                    />
                    <span>
                        {{ question.d }}
                    </span>
                </label>
            </div>
        </section>
        <button :class="form_completed ? 'button__action' : 'button__inactive'">
            {{
                form_completed
                    ? 'Procesar Test'
                    : 'Tienes preguntas sin responder'
            }}
        </button>
    </form>
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .question__container {
        width: 60%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        margin-bottom: 1rem;
        border-radius: 1rem;
        border: 1px solid var(--color-secondary-trans);

        .options {
            display: flex;
            gap: 1rem;

            label {
                display: flex;
                align-items: center;
                gap: 0.1rem;

                input {
                    width: 1rem;
                    height: 1rem;
                }

                span {
                    font-size: 1rem;
                }
            }
        }
    }
}
</style>
