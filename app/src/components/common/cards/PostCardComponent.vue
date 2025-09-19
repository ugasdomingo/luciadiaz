<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    post: Object
})

const max_length = 150
const truncate = (text, max_length) => {
    return text.substring(0, max_length) + '...'
}
</script>

<template>
    <RouterLink :to="`/blog/${post.slug}`" class="post__card__container">
        <img :src="post.post_cover.secure_url" alt="">
        <h4>{{ post.title }}</h4>
        <p v-html="truncate(post.content, max_length)"></p>
    </RouterLink>
</template>

<style scoped lang="scss">
.post__card__container {
    width: 100%;
    max-width: 15rem;
    border-radius: 1rem;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    color: var(--color-black);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    h4 {
        font-size: 1rem;
        margin: 0;
        padding: 0 0.5rem;
        color: var(--color-black);
    }

    img {
        width: 15rem;
        height: 15rem;
        object-fit: cover;
        margin-bottom: 1rem;
        border-radius: 0.5rem;
    }

    p {
        font-size: 0.8rem;
        margin-bottom: 1rem;
    }

    button {
        margin-top: 1rem;
    }
}
</style>
