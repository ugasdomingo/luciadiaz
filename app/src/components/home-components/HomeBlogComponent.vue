<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { usePostStore } from '@/stores/post-store';
import PostCardComponent from '../common/cards/PostCardComponent.vue';

//props
const props = defineProps({
    display: {
        type: Number,
        required: true
    }
});

//States
const post_store = usePostStore();
const posts = computed(() => {
    const posts_to_show = post_store.all_posts.reverse();
    return props.display > 0
        ? posts_to_show.slice(0, props.display)
        : posts_to_show;
});

//life cycle hook
onBeforeMount(async () => {
    post_store.all_posts.length > 0 ? null : await post_store.get_all_posts();
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
    margin: 4rem 0 0;

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
