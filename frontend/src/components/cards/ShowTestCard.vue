<script setup lang="ts">
import { PropType } from 'vue';
import { ITestInfo } from '../../static/testsInfo';

defineProps({
    test: {
        type: Object as PropType<ITestInfo>,
        required: true,
    },
});
</script>

<template>
    <div class="card" :style="{ backgroundImage: `url(${test.img})` }">
        <div class="img">
            <img :src="test.img" alt="test-img" />
        </div>
        <div class="content">
            <h3>{{ test.title }}</h3>
            <h5>{{ test.short }}</h5>
            <p>{{ test.description }}</p>
            <RouterLink :to="test.link">¡Hacer Test!</RouterLink>
        </div>
    </div>
</template>

<style scoped lang="scss">
.card {
    width: 70%;
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 1rem;
    border-radius: 0.5rem;
    background-color: var(--color-white);
    color: var(--color-black);
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

    .img {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: var(--color-white);
        color: var(--color-black);
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .content {
        width: 100%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        padding: 1rem;
        border-radius: 0.5rem;
        background-color: var(--color-white);
        color: var(--color-black);

        h3 {
            font-size: 1.5rem;
            font-weight: 700;
            margin: 1rem 0;
            text-transform: uppercase;
        }

        h5 {
            font-size: 1rem;
            font-weight: 400;
            margin: 1rem 0;
        }

        p {
            font-size: 0.75rem;
            font-weight: 400;
            margin: 1rem 0;
            text-align: left;
        }

        a {
            width: 80%;
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--color-white);
            background-color: var(--color-accent);
            text-decoration: none;
            text-align: center;
            padding: 0.5rem 0;
            border-radius: 0.5rem;
            margin: 2rem 0 0;
        }

        a:hover {
            background-color: var(--color-secondary);
        }
    }
}
</style>
