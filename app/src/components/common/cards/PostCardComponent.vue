<script setup lang="ts">
//Import tools
import { usePostStore } from '@/stores/post-store';

defineProps<{
    _id: string;
    title: string;
    image: string;
    likes: number;
}>();

//state
const post_store = usePostStore();

//methods
const post_like = async (id: string) => {
    await post_store.add_like(id);
    await post_store.get_all_posts();
};
</script>

<template>
    <article class="card">
        <RouterLink :to="`/blog/${_id}`">
            <img :src="image" alt="post image" />
            <section class="title">
                <h4>{{ title }}</h4>
            </section>
        </RouterLink>
        <section class="actions">
            <div class="like">
                <img
                    src="/icon/like.svg"
                    alt="like icon"
                    @click="post_like(_id)"
                />
                <p>{{ likes }}</p>
            </div>
            <button class="button__transparent">Leer post</button>
        </section>
    </article>
</template>

<style scoped lang="scss">
.card {
    width: 350px;
    height: 400px;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    text-decoration: none;
    color: var(--color-text);
    box-sizing: border-box;

    a {
        text-decoration: none;
        color: var(--color-text);

        &:hover {
            transform: scale(1.02);
            transition: transform 0.3s;
        }

        img {
            width: 100%;
            height: 200px;
            border-radius: 0;
            object-fit: cover;
        }
        .title {
            width: 100%;
            height: 80px;
            padding: 1rem 0;
            margin: 0;

            h4 {
                margin: 0;
                padding: 0;
            }
        }
    }

    .actions {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 0.5rem;
        margin: 0;
        box-sizing: border-box;

        .button__transparent {
            margin: 0;
            padding: 0;
            height: fit-content;
            border: none;
            color: var(--color-text);
            cursor: pointer;

            &:hover {
                color: var(--color-text);
                background-color: transparent;
                transform: scale(1.2);
            }
        }

        .like {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin: 0;

            img {
                width: 1.5rem;
                height: 1.5rem;
                cursor: pointer;
            }
        }
    }
}
</style>
