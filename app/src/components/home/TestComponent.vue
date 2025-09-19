<script setup>
import { test_info } from '../../static/test-info.js'
import TestCardComponent from '../common/cards/TestCardComponent.vue';
</script>

<template>
    <section class="test">
        <h2>Tests Gratuitos</h2>
        <div class="test__content">
            <TestCardComponent v-for="test in test_info" :key="test.id" :test="test" />
        </div>
    </section>
</template>


<style scoped lang="scss">
.test {
    width: 100%;
    min-height: 70vh;
    margin: 0;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    justify-content: center;
    box-sizing: border-box;
    position: relative;
    overflow-y: hidden;

    &__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}
</style>