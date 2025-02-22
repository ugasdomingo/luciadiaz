<script setup lang="ts">
//Import tools
import { test_info } from '@/static/test-info';

//Import components
import TestCardComponent from '@/components/common/cards/TestCardComponent.vue';
</script>

<template>
    <main class="page">
        <h1>Tests Gratuitos</h1>
        <p>
            Completa todos los test y te enviaré un audio para ayudarte a
            entender y utilizar tus resultados.
        </p>
        <section class="page__content">
            <TestCardComponent
                v-for="test in test_info"
                :key="test.id"
                :test="test"
            />
        </section>
    </main>
</template>

<style scoped lang="scss">
.page {
    height: calc(100vh - 8rem);

    h1 {
        align-self: center;
        margin: 0;
    }

    p {
        align-self: center;
        margin: 0 0 2rem;
        font-size: 0.9rem;
        text-align: center;
    }

    .page__content {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
}

@media screen and (max-width: 768px) {
    .page {
        height: fit-content;
        padding: 4rem 1rem;
        gap: 1rem;

        .page__content {
            flex-direction: column;
            align-items: center;
            justify-content: center;
            padding: 0;
        }
    }
}
</style>
