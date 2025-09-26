<template>
    <section class="therapy">
        <h2>Terapias</h2>
        <div class="therapy__content">
            <TherapyCardComponent v-for="therapy in therapies" :key="therapy.id" :therapy="therapy" />
        </div>
    </section>
</template>

<script setup>
import { therapies } from '../static/therapies.js'
import TherapyCardComponent from '../components/common/cards/TherapyCardComponent.vue'
</script>

<style scoped lang="scss">
.therapy {
    width: 100%;
    height: 100vh;
    margin: 0;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    position: relative;
    box-sizing: border-box;

    h2 {
        text-align: center;
        margin: 1rem 0
    }

    &__content {
        width: 100%;
        display: flex;
        justify-content: space-around;
        gap: 3rem;
        box-sizing: border-box;

    }
}

@media screen and (max-width: 768px) {
    .therapy {
        padding: 4rem 1rem;

        &__content {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 1rem;
        }
    }
}
</style>
