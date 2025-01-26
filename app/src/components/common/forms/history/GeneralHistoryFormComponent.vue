<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { medical_history_questions } from '@/static/history-questions/medical-history-questions';
import { useHistoryStore } from '@/stores/history-store';
import { useUserStore } from '@/stores/user-store';

//Props
const props = defineProps<{
    history_number: number;
}>();

//States
const history_store = useHistoryStore();
const user_store = useUserStore();
const title = ref<string>(
    medical_history_questions[props.history_number].title
);
const answers = ref(
    medical_history_questions[props.history_number].questions.map(
        (pregunta: string) => ({
            question: pregunta,
            answer: ''
        })
    )
);

//Methods
const handdle_submit = async () => {
    await history_store.create_patient_history(title.value, answers.value);
    await user_store.get_data_by_user();
};
</script>

<template>
    <section class="history__form">
        <h3>{{ title }}</h3>
        <form @submit.prevent="handdle_submit">
            <div v-for="(answer, index) in answers" :key="index">
                <label :for="answer.question">{{ answer.question }}</label>
                <input
                    type="text"
                    :id="answer.question"
                    v-model="answer.answer"
                />
            </div>
            <button class="button__action">Guardar</button>
        </form>
    </section>
</template>

<style scoped lang="scss">
.history__form {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid var(--color-primary-trans);
    border-radius: 5px;
    box-sizing: border-box;

    h3 {
        text-align: center;
        margin-bottom: 1rem;
    }

    form {
        width: 100%;
        display: flex;
        flex-direction: column;

        div {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            label {
                width: 40%;
                font-size: 1.2rem;
                margin-bottom: 0.5rem;
            }
            input {
                width: 50%;
                padding: 0.5rem;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        }
    }
}
</style>
