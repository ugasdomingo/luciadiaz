<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    user_formation: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>
        <h2>Cursos</h2>
        <p>{{ user_formation }}</p>
    </div>
</template>

<style scoped lang="scss"></style>