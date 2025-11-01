<script setup>
import { useCommonStore } from '../../stores/common-store'
import FormationCardComponent from '../common/cards/FormationCardComponent.vue'
const common_store = useCommonStore()
</script>

<template>
    <section class="formation">
        <div class="formation__decoratio__top__left"></div>
        <div class="formation__decoratio__bottom__right"></div>
        <h2>Próximas formaciones y talleres vivenciales</h2>
        <div class="formation__content">
            <FormationCardComponent v-for="formation in common_store.formations" :key="formation.id"
                :formation="formation" />
        </div>
        <RouterLink to="/formaciones" class="action">Ver todas las formaciones</RouterLink>
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

    &__decoratio__top__left {
        width: 40%;
        height: 0.25rem;
        background-color: var(--color-primary);
        position: absolute;
        top: 0;
        left: 0;
        opacity: 0.5;
    }

    &__decoratio__bottom__right {
        width: 40%;
        height: 0.25rem;
        background-color: var(--color-primary);
        position: absolute;
        bottom: 0;
        right: 0;
        opacity: 0.5;
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
    }

    .action {
        width: fit-content;
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