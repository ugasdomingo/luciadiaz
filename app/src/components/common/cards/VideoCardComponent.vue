<script setup>
import { RouterLink } from 'vue-router'
import { useVideoStore } from '../../../stores/video-store.js'

defineProps({
    video: Object
})

const video_store = useVideoStore()
const max_length = 150
const truncate = (text, max_length) => {
    return text.substring(0, max_length) + '... seguir leyendo'
}
</script>

<template>
    <RouterLink :to="`/video/${video._id}`" class="video__card__container">
        <h4>{{ video.title }}</h4>
        <img :src="video.video_cover.secure_url" alt="">
        <p v-html="truncate(video.brief, max_length)"></p>
    </RouterLink>
</template>

<style scoped lang="scss">
.video__card__container {
    width: 100%;
    max-width: 300px;
    max-height: 600px;
    border-radius: 1rem;
    padding: 0;
    margin: 0; 
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    color: var(--color-black);
    background-color: var(--color-soft-alert);
    cursor: pointer;
    transition: all 0.3s ease;

    h4 {
        margin: 0;
        padding: 0.5rem;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 0;
    }

    p {
        margin: 0;
        padding: 0.5rem;
    }    
}
</style>