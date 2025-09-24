<template>
    <main class="pages">
        <h2>{{ post_store.post.title }}</h2>
        <div v-html="post_store.post.content"></div>
    </main>
</template>

<script setup>
import { usePostStore } from '../stores/post-store';
import { useRoute } from 'vue-router';
import { onBeforeMount } from 'vue';

const route = useRoute()
const post_store = usePostStore()

onBeforeMount(() => {
    post_store.get_post_by_slug(route.params.post_slug)
})
</script>

<style scoped lang="scss"></style>
