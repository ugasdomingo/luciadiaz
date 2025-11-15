<script setup>
import { test_info } from '../../static/test-info.js'
import TestCardComponent from '../common/cards/TestCardComponent.vue';
import { use_scroll_reveal } from '../../composables/use-scroll-reveal.js'

use_scroll_reveal()
</script>

<template>
    <section class="test">
        <h2 data-scroll-reveal>Tests Gratuitos</h2>
        <div class="test__content">
            <TestCardComponent v-for="test in test_info" :key="test.id" :test="test" data-scroll-reveal
                :style="{ '--delay': `${0.3 + index * 0.15}s` }" />
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

    h2 {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;

        &.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    }

    &__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;


    }
}
</style>