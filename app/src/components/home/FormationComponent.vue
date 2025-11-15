<script setup>
import { useCommonStore } from '../../stores/common-store'
import FormationCardComponent from '../common/cards/FormationCardComponent.vue'
import { use_scroll_reveal } from '../../composables/use-scroll-reveal.js'

use_scroll_reveal()
const common_store = useCommonStore()
</script>

<template>
    <section class="formation">
        <div class="formation__decoratio__top__left" data-scroll-reveal></div>
        <div class="formation__decoratio__bottom__right" data-scroll-reveal></div>
        <h2 data-scroll-reveal>Próximas formaciones y talleres vivenciales</h2>
        <div class="formation__content">
            <FormationCardComponent v-for="formation in common_store.formations" :key="formation.id"
                :formation="formation" data-scroll-reveal :style="{ '--delay': `${0.6 + index * 0.15}s` }" />
        </div>
        <RouterLink to="/formaciones" class="action" data-scroll-reveal>Ver todas las formaciones</RouterLink>
    </section>
</template>


<style scoped lang="scss">
.formation {
    width: 100%;
    min-height: 70vh;
    height: fit-content;
    margin: 0;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    box-sizing: border-box;
    position: relative;

    h2 {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;

        &.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
    }

    &__decoratio__top__left {
        width: 40%;
        height: 0.25rem;
        background-color: var(--color-primary);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0;
        transform: scaleX(0);
        transform-origin: left;
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;

        &.is-visible {
            opacity: 0.5;
            transform: scaleX(1);
        }
    }

    &__decoratio__bottom__right {
        width: 40%;
        height: 0.25rem;
        background-color: var(--color-primary);
        position: absolute;
        bottom: 0;
        right: 0;
        opacity: 0;
        transform: scaleX(0);
        transform-origin: right;
        transition: opacity 0.8s ease-out, transform 0.8s ease-out;

        &.is-visible {
            opacity: 0.5;
            transform: scaleX(1);
        }
    }

    &__content {
        width: 100%;
        height: fit-content;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;

        .formation__content__card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
            transition-delay: var(--delay, 0s);

            &.is-visible {
                opacity: 1;
                transform: translateY(0);
            }
        }
    }

    .action {
        width: fit-content;
        padding: 0.5rem 1rem;
        border-radius: 1rem;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
        cursor: pointer;
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.3s ease;

        &.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        &:hover {
            box-shadow: 0 6px 20px rgba(107, 76, 147, 0.3);
            transform: translateY(-3px);
        }
    }
}

@media screen and (max-width: 720px) {
    .formation {
        height: fit-content;
        padding: 2rem 1rem;

        &__content {
            grid-template-columns: 1fr;
            gap: 1rem;
        }
    }
}
</style>