<script setup>
import { onBeforeMount } from 'vue'
import { useCommonStore } from '../../stores/common-store'
import PostCardComponent from '../common/cards/PostCardComponent.vue'
const common_store = useCommonStore()

onBeforeMount(async () => {
    if (!common_store.posts) {
        await common_store.getCommon()
    }
})
</script>
<template>
    <section class="post">
        <h2>Últimas publicaciones</h2>
        <div class="post__content">
            <PostCardComponent v-for="post in common_store.posts" :key="post.id" :post="post" />
        </div>
        <RouterLink to="/blog" class="action">Ver todas las publicaciones</RouterLink>
    </section>
</template>


<style scoped lang="scss">
.post {
    width: 100%;
    min-height: 70vh;
    margin: 0;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;
    box-sizing: border-box;
    position: relative;
    overflow-y: hidden;

    h2 {
        text-align: center;
        margin-bottom: 4rem;
    }

    &__content {
        width: 100%;
        display: flex;
        justify-content: space-around;
        gap: 3rem;
        box-sizing: border-box;
    }

    .action {
        width: fit-content;
        align-self: center;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
        cursor: pointer;
        transition: all 0.25s;

        &:hover {
            box-shadow: 0 0 1rem rgba(0, 0, 0, 0.9);
            scale: 1.1;
        }
    }
}
</style>