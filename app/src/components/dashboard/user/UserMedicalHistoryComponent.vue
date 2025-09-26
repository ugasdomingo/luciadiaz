<script setup>
import { ref, reactive, defineProps, onMounted } from 'vue'
import { useAuthStore } from '../../../stores/auth-store.js'
import { useHistoryStore } from '../../../stores/history-store.js'
import { medical_history_questions } from '../../../static/questions/medical-history-questions.js'

const props = defineProps({
    history_number_to_show: {
        type: Number,
        required: true
    }
})
const auth_store = useAuthStore()
const history_store = useHistoryStore()
const answers = ref(
    medical_history_questions[props.history_number_to_show].questions.map((pregunta) => ({
        question: pregunta.question,
        type: pregunta.type,
        answer: ''
    }))
)
const show_completed = ref(false)
const expanded_items = reactive({})

const submit_history = async () => {
    await history_store.create_history(medical_history_questions[props.history_number_to_show].title, answers.value)
    location.reload()
}
const toggle_completed = () => {
    show_completed.value = !show_completed.value
}
const toggle_answers = (history_id) => {
    expanded_items[history_id] = !expanded_items[history_id]
}
onMounted(() => {
    if (props.history_number_to_show < 13) {
        show_completed.value = false
    } else {
        show_completed.value = true
    }
})

</script>

<template>
    <section class="medical-history__container">
        <h2>{{ auth_store.user_data.history.length < 13 ? 'Historial Médico Pendiente' : 'Historial Médico Completado'
        }}</h2>
                <div class="medical-history__container__header" v-if="auth_store.user_data.history.length < 13">
                    <p>
                        Haz completado el
                        <span>{{ (Math.round(auth_store.user_data.history.length / 13 * 100)) }}%</span>
                        de tu historial médico
                    </p>
                    <button class="nobg-btn" @click="toggle_completed">{{ show_completed ? 'Seguir llenando' :
                        'Ver historial' }}</button>

                </div>
                <div class="medical-history__container__completed" v-if="show_completed">
                    <!-- TODO: que las respuesta de cada articulo se pligue y despliegue al pulsar el history.title -->
                    <article v-for="history in auth_store.user_data.history" :key="history._id" class="history-item">
                        <h4 @click="toggle_answers(history._id)" class="history-title"
                            :class="{ 'active': expanded_items[history._id] }">
                            {{ history.title }}
                            <span class="arrow" :class="{ 'rotated': expanded_items[history._id] }">
                                <img src="/icon/icon-plus.svg" alt="plus icon">
                            </span>
                        </h4>
                        <transition name="accordion" @enter="enter" @after-enter="afterEnter" @leave="leave"
                            @after-leave="afterLeave">
                            <div class="answer-container" v-show="expanded_items[history._id]">
                                <div v-for="(answer, index) in history.answers" :key="index" class="answer-item">
                                    <p>{{ answer.question }}: <strong>{{ answer.answer }}</strong></p>
                                </div>
                            </div>
                        </transition>
                    </article>
                </div>
                <form @submit.prevent="submit_history" class="medical-history__container__form" v-else>
                    <h4>{{ medical_history_questions[props.history_number_to_show].title }}</h4>
                    <div v-for="(answer, index) in answers" :key="index">
                        <label :for="answer.question">{{ answer.question }}</label>
                        <input :type="answer.type" :id="answer.question" v-model="answer.answer">
                    </div>
                    <button type="submit" class="action-btn">
                        {{ props.history_number_to_show < 13 ? 'Guardar y seguir' : 'Guardar y finalizar' }} </button>
                </form>
    </section>
</template>

<style scoped lang="scss">
.medical-history__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;
    margin-right: 0;
    box-sizing: border-box;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        margin: 0;

        p {
            margin: 0;

            span {
                font-weight: 500;
            }
        }
    }

    &__completed {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        .history-item {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 0;
            margin: 0;
            box-sizing: border-box;

            .history-title {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                cursor: pointer;
                transition: all 0.25s;

                &:hover {
                    color: var(--color-primary);
                }

                &.active {
                    color: var(--color-primary);
                }

                .arrow {
                    transition: transform 0.25s;
                    font-size: 1.5rem;

                    img {
                        width: 1rem;
                        height: 1rem;
                    }

                    &.rotated {
                        transform: rotate(225deg);
                    }
                }

                .answer-container {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.25s;
                }
            }
        }
    }

    &__form {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        div {
            max-width: 80%;
            display: flex;
            flex-direction: column;
            gap: 0.1rem;
            padding: 0.5rem 1rem;
            margin: 0 0 0 1rem;
            border-radius: 1rem;
            box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
            box-sizing: border-box;
        }
    }
}
</style>
