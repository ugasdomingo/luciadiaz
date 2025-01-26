<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { usePostStore } from '@/stores/post-store';
import PostCardComponent from '../common/cards/PostCardComponent.vue';

//States
const post_store = usePostStore();
const posts = ref();

//Methods
const last_posts = () => {
    posts.value = post_store.all_posts.reverse().slice(0, 3);
};

//life cycle hook
onBeforeMount(async () => {
    await post_store.get_all_posts();
    last_posts();
});
</script>

<template>
    <section class="blog">
        <h2>Últimos Post</h2>
        <div class="blog-list">
            <PostCardComponent
                v-for="post in posts"
                :key="post._id"
                :_id="post._id"
                :title="post.title"
                :image="post.cover_image.secure_url"
                :likes="post.likes"
            />
        </div>
    </section>
</template>

<style scoped lang="scss">
.blog {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    margin: 0;

    h2 {
        margin-bottom: 3rem;
    }

    .blog-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
}
</style>
