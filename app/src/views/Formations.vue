<template>
    <main class="pages">
        <h2>Formaciones: te guío en tu aprendizaje</h2>
        <div class="formations__content">
            <FormationCardComponent v-for="formation in formation_store.formations" :key="formation._id" :formation="formation" />
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
.pages {
    h2 {
        text-align: center;
        margin: 0 0 3rem;
    }
}

.formations__content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    gap: 2rem;
}
</style>
