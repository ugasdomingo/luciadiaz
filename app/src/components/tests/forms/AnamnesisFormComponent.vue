<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../../stores/auth-store'
import { useTestStore } from '../../../stores/test-store'
import { anamnesis_questions } from '../../../static/questions/anamnesis-questions'

const auth_store = useAuthStore()
const test_store = useTestStore()
const answers = ref({})
const answers_length = ref(0)
const router = useRouter()

watch(() => answers.value, (
    (new_value) => {
        answers_length.value = Object.keys(new_value).length
    }
), { deep: true })

const handle_submit = async () => {
    await test_store.create_test_result('Anamnesis', answers.value)
    router.push('/mi-espacio')
}
</script>

<template>
    <section class="anamnesis__form">
        <h2>Anamnesis para niños</h2>
        <p>
            Esta información es para recoger la historia de tu peque, la
            cual sera vital para generar un panorama del comportamiento del
            niño(a) y a partir de ahí poder crear un plan de acción.
        </p>
        <p class="note">
            Nota: Recuerda que toda la información en mi web está encriptada y solo yo tengo acceso a ella.
        </p>
        <form @submit.prevent="handle_submit">
            <div v-for="(question, index) in anamnesis_questions" :key="index"
                :class="{ 'completed': answers[question.question] }">
                <label :for="question.question">{{ question.question }}</label>
                <input :type="question.type" :id="question.question" v-model="answers[question.question]">
            </div>
            <button type="submit" class="nobg-btn" v-if="answers_length == anamnesis_questions.length">Enviar</button>
        </form>
    </section>
</template>

<style scoped lang="scss">
.anamnesis__form {
    max-width: 60%;
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
        margin: 0;
    }

    p {
        width: 80%;
        margin: 0 auto;
    }

    .note {
        font-size: 0.8rem;
        font-style: italic;
        color: var(--color-primary);
    }


    form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 2rem;

        div {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.8);
            padding: 1rem;
            border-radius: 0.5rem;
            box-sizing: border-box;
            transition: all 0.25s;

            &.completed {
                background-color: var(--color-approve-alert);
            }
        }
    }

    button {
        margin: 0 auto;
    }
}

@media screen and (max-width: 768px) {
    .anamnesis__form {
        max-width: 100%;
    }
}
</style>
