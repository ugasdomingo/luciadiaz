<script setup>
import { defineProps, reactive } from 'vue';

const props = defineProps({
    user_history: {
        type: Object,
        required: true
    }
})

const expanded_items = reactive({})

const toggle_answers = (history_id) => {
    expanded_items[history_id] = !expanded_items[history_id]
}

</script>

<template>
    <div class="history__container">
        <h2> {{ props.user_history.length < 13 ? 'Historial Pendiente' : 'Historial Completado' }} </h2>
                <article v-for="history in props.user_history" :key="history._id" class="history-item">
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
</template>

<style scoped lang="scss">
.history__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

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
</style>
