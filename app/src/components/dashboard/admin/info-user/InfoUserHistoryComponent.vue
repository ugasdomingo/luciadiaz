<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    user_history: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>
        <h2>Historial</h2>
        <p>{{ user_history }}</p>
    </div>
</template>

<style scoped lang="scss"></style>
