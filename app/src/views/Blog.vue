<template>
    <main class="pages">
        <h2>Blog: aprende a usar la psicología en tu día a día</h2>
        <div class="blog__content">
            <PostCardComponent v-for="post in post_store.posts" :key="post._id" :post="post" />
        </div>
    </main>
</template>

<script setup>
import PostCardComponent from '../components/common/cards/PostCardComponent.vue'
import { usePostStore } from '../stores/post-store';
import { onBeforeMount } from 'vue';

const post_store = usePostStore()

onBeforeMount(async () => {
    if (post_store.posts.length === 0) {
        await post_store.get_all_posts('0')
    }
})
</script>

<style scoped lang="scss">
.pages {
    
    h2 {
        text-align: center;
        margin: 0 0 3rem;
    }
}

.blog__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2rem;
}
</style>