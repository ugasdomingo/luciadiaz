<script setup lang="ts">
import type { IHistory } from '@/types/IPatientHistory';
defineProps<{
    patient_history: IHistory[];
}>();
</script>

<template>
    <section class="display__history__container">
        <article v-for="history in patient_history" :key="history._id">
            <h3>{{ history.title }}</h3>
            <ul>
                <li v-for="answer in history.answers" :key="answer.question">
                    <p>
                        <span>{{ answer.question }}: </span> {{ answer.answer }}
                    </p>
                </li>
            </ul>
        </article>
    </section>
</template>

<style scoped lang="scss">
.display__history__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid var(--color-primary);
    border-radius: 0.5rem;
    box-sizing: border-box;

    article {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 1rem;
        box-sizing: border-box;

        h3 {
            margin: 0 0 0.3rem;
            padding: 0;
            font-weight: bold;
        }

        ul {
            width: 100%;
            display: flex;
            flex-direction: column;
            margin: 0;
            padding: 0;
            box-sizing: border-box;

            li {
                width: 100%;
                display: flex;
                flex-direction: column;
                margin: 0;
                padding: 0;
                border-radius: 5px;
                box-sizing: border-box;

                p {
                    margin: 0.3rem 0;
                    padding: 0;
                    font-size: 0.9rem;
                    border-bottom: 1px solid #ccc;

                    span {
                        margin-right: 1rem;
                        font-weight: bold;
                    }
                }
            }
        }
    }
}
</style>
