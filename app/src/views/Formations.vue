<template>
    <main class="formations-page">
        <div class="formations-page__header">
            <h1>Formaciones Vivenciales</h1>
            <p class="formations-page__subtitle">Te guío en tu aprendizaje y desarrollo personal</p>
        </div>

        <div class="formations-page__grid">
            <FormationCardComponent v-for="(formation, index) in formation_store.formations" :key="formation._id"
                :formation="formation" :style="{ '--delay': index * 0.1 + 's' }" />
        </div>
    </main>
</template>

<script setup>
import FormationCardComponent from '../components/common/cards/FormationCardComponent.vue'
import { useFormationStore } from '../stores/formation-store'
import { onBeforeMount } from 'vue'

const formation_store = useFormationStore()

onBeforeMount(async () => {
    if (formation_store.formations.length === 0) {
        await formation_store.get_all_formations('0')
    }
})
</script>

<style scoped lang="scss">
.formations-page {
    width: 100%;
    min-height: 100vh;
    padding: 8rem 4rem 4rem;
    margin: 0;
    box-sizing: border-box;

    &__header {
        text-align: center;
        margin-bottom: 4rem;

        h1 {
            margin: 0 0 1rem;
            font-size: 3.5rem;
            color: var(--color-primary);
        }
    }

    &__subtitle {
        font-size: 1.2rem;
        color: var(--color-text-dark);
        font-weight: 300;
        margin: 0;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 3rem;
        max-width: 1200px;
        margin: 0 auto;
    }
}

@media screen and (max-width: 1024px) {
    .formations-page {
        padding: 7rem 2rem 3rem;

        &__header h1 {
            font-size: 2.5rem;
        }

        &__grid {
            gap: 2.5rem;
        }
    }
}

@media screen and (max-width: 768px) {
    .formations-page {
        padding: 6rem 1rem 2rem;

        &__header {
            margin-bottom: 3rem;

            h1 {
                font-size: 2rem;
            }
        }

        &__subtitle {
            font-size: 1rem;
        }

        &__grid {
            grid-template-columns: 1fr;
            gap: 2rem;
        }
    }
}
</style>
