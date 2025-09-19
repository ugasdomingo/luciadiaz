<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    user_tests: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>
        <h2>Tests</h2>
        <p>{{ user_tests }}</p>
    </div>
</template>

<style scoped lang="scss"></style>