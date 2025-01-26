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
</style>
