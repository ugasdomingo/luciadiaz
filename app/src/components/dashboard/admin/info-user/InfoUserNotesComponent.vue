<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    user_notes: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>
        <h2>Notas</h2>
        <p>{{ user_notes }}</p>
    </div>
</template>