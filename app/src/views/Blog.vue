<template>
    <main class="blog-page">
        <div class="blog-page__header">
            <h1>Blog</h1>
            <p class="blog-page__subtitle">Aprende a usar la psicología en tu día a día</p>
        </div>

        <div class="blog-page__grid">
            <PostCardComponent v-for="(post, index) in post_store.posts" :key="post._id" :post="post"
                :style="{ '--delay': index * 0.1 + 's' }" />
        </div>
    </main>
</template>

<script setup>
import PostCardComponent from '../components/common/cards/PostCardComponent.vue'
import { usePostStore } from '../stores/post-store'
import { onBeforeMount } from 'vue'

const post_store = usePostStore()

onBeforeMount(async () => {
    if (post_store.posts.length === 0) {
        await post_store.get_all_posts('0')
    }
})
</script>

<style scoped lang="scss">
.blog-page {
    width: 100%;
    min-height: 100vh;
    padding: 8rem 4rem 4rem;
    margin: 0;
    box-sizing: border-box;

    &__header {
        text-align: center;
        margin-bottom: 4rem;

        h1 {
            margin: 0 0 1rem;
            font-size: 3.5rem;
            color: var(--color-primary);
        }
    }

    &__subtitle {
        font-size: 1.2rem;
        color: var(--color-text-dark);
        font-weight: 300;
        margin: 0;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 2.5rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}

@media screen and (max-width: 1024px) {
    .blog-page {
        padding: 7rem 2rem 3rem;

        &__header h1 {
            font-size: 2.5rem;
        }

        &__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 2rem;
        }
    }
}

@media screen and (max-width: 768px) {
    .blog-page {
        padding: 6rem 1rem 2rem;

        &__header {
            margin-bottom: 3rem;

            h1 {
                font-size: 2rem;
            }
        }

        &__subtitle {
            font-size: 1rem;
        }

        &__grid {
            grid-template-columns: 1fr;
            gap: 1.5rem;
        }
    }
}
</style>