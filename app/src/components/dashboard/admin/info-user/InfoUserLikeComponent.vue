<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    user_likes: {
        type: Object,
        required: true
    }
})
</script>

<template>
    <div>
        <h2>Likes</h2>
        <p>{{ user_likes }}</p>
    </div>
</template>

<style scoped lang="scss"></style>