<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    anamnesis: {
        type: Object,
        required: true
    },
    user_name: {
        type: String,
        required: true
    }

})

const anamnesis_result = Object.entries(props.anamnesis).map(([key, value]) => ({ pregunta: key, respuesta: value }))
</script>

<template>
    <section>
        <h2>Anamnesis completado por: {{ props.user_name }}</h2>
        <ul>
            <li v-for="({ respuesta, pregunta }) in anamnesis_result" :key="pregunta">
                <strong>{{ pregunta }}:</strong> {{ respuesta }}
            </li>
        </ul>
    </section>
</template>

<style scoped lang="scss">
section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;
    box-sizing: border-box;

    h2 {
        margin: 0;
    }

    ul {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        list-style: none;
        padding: 0;

        li {
            max-width: 80%;
            display: flex;
            gap: 1rem;
            margin-bottom: 1rem;
            box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
            padding: 1rem;
            border-radius: 1rem;
        }
    }
}
</style>
