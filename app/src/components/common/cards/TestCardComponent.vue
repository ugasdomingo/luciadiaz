<script setup lang="ts">
//Import tools
import type { ITestInfo } from '@/static/test-info';

defineProps<{
    test: ITestInfo;
}>();
</script>

<template>
    <RouterLink class="card" :to="`${test.link}`">
        <img :src="test.image" alt="formation image" />
        <p>{{ test.brief }}</p>
    </RouterLink>
</template>

<style scoped lang="scss">
.card {
    width: 250px;
    height: fit-content;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0;
    text-decoration: none;
    color: var(--color-text);
    font-weight: 700;
    position: relative;
    box-sizing: border-box;

    img {
        width: 100%;
        height: 200px;
        object-fit: cover;
        margin-bottom: 1rem;
    }

    p {
        width: 100%;
    }
}

@media screen and (max-width: 768px) {
    .card {
        width: 100%;
        align-items: center;
        height: fit-content;
        margin: 0 0 1rem;
        padding: 1rem;
        gap: 1rem;
        border-radius: 0.5rem;
        box-shadow: 0 0 0.5rem 0 var(--color-primary-trans);

        img {
            width: 300px;
            height: 300px;
            border-radius: 0.5rem;
            margin-bottom: 0.5rem;
        }

        p {
            margin-top: 0;
        }
    }
}
</style>
