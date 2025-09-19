<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    user_tasks: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>
        <h2>Tareas</h2>
        <p>{{ user_tasks }}</p>
    </div>
</template>

<style scoped lang="scss"></style>