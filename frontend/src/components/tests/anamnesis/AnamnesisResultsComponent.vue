<script setup lang="ts">
//Import tools
import { anamnesisQuestions } from './anamnesisQuestions';

defineProps({
    answers: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <ul>
        <li v-for="question in anamnesisQuestions" :key="question.key">
            <h4>{{ question.key }}</h4>
            :
            <p>{{ answers[question.key] }}</p>
        </li>
    </ul>
</template>

<style scoped lang="scss">
ul {
    list-style: none;
    padding: 0;
    margin: 0;

    li {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
    }
}
</style>
