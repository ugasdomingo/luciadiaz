<script setup>
import { ref, watch } from 'vue'
import { archetype_questions } from '../../../static/questions/archetype-questions'
import { useTestStore } from '../../../stores/test-store'

const test_store = useTestStore()

const answers = ref({})
const show_test_info = ref(false)

const answers_length = ref(0)

watch(() => answers.value, (
    (new_value) => {
        answers_length.value = Object.keys(new_value).length
    }
), { deep: true })

const handle_submit = async () => {
    try {
        //count answers
        const results = {
            archetype: '',
            wise: 0,
            warrior: 0,
            wizard: 0,
            lover: 0,
        }
        for (const key in answers.value) {
            const answer = answers.value[key]
            if (answer === 'a') results.wise++
            if (answer === 'b') results.warrior++
            if (answer === 'c') results.wizard++
            if (answer === 'd') results.lover++
        }

        //Determinig archetipe
        const max_value = Math.max(results.wise, results.warrior, results.wizard, results.lover)
        let archetype = ''
        if (results.wise === max_value) archetype = 'Sabio Rey'
        if (results.warrior === max_value) archetype = 'Guerrero'
        if (results.wizard === max_value) archetype = 'Mago'
        if (results.lover === max_value) archetype = 'Amante'

        results.archetype = archetype

        //Save test result
        await test_store.create_test_result('Arquetipo', results)
    } catch (error) {
        console.log(error)
    }
}

</script>

<template>
    <section class="archetype__form">
        <h2>Arquetipos de la personalidad</h2>
        <p class="test__show__info" @click="show_test_info = !show_test_info">
            {{
                show_test_info ? 'No ver más' : 'Ver más información de este test'
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
        <form @submit.prevent="handle_submit">
            <article v-for="(question, index) in archetype_questions" :key="index" class="question__container">
                <p class="question__container__enum">
                    {{ question.pregunta }}
                </p>
                <div class="question__container__options">
                    <label class="question__container__option">
                        <input type="radio" value="a" v-model="answers[question.key]" :name="question.key"
                            class="question__option__input">
                        {{ question.a }}
                    </label>
                    <label class="question__option">
                        <input type="radio" value="b" v-model="answers[question.key]" :name="question.key"
                            class="question__option__input">
                        {{ question.b }}
                    </label>
                    <label class="question__option">
                        <input type="radio" value="c" v-model="answers[question.key]" :name="question.key"
                            class="question__option__input">
                        {{ question.c }}
                    </label>
                    <label class="question__option">
                        <input type="radio" value="d" v-model="answers[question.key]" :name="question.key"
                            class="question__option__input">
                        {{ question.d }}
                    </label>
                </div>
            </article>

            <button type="submit" class="nobg-btn" v-if="answers_length == archetype_questions.length">Enviar
                test</button>
        </form>
    </section>
</template>

<style scoped lang="scss">
.archetype__form {
    width: 60%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 0 auto;
    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.8);
    padding: 1rem;
    border-radius: 0.5rem;
    box-sizing: border-box;

    h2 {
        text-align: center;
    }

    .test__show__info {
        cursor: pointer;
    }

    .question__container {
        margin: 2.5rem 0;

        &__enum {
            margin-bottom: 0.5rem;
            font-weight: 700;
        }

        &__options {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

        }

        .question__option {
            width: fit-content;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;

            &__input {
                width: 1rem;
                height: 1rem;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .archetype__form {
        max-width: 100%;
    }
}
</style>
