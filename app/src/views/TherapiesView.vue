<script setup lang="ts">
//Import tools
import { therapies } from '@/static/therapies';

//Import components
import TherapyCardComponent from '@/components/common/cards/TherapyCardComponent.vue';
</script>

<template>
    <main class="page">
        <TherapyCardComponent
            v-for="therapy in therapies"
            :key="therapy.title"
            :title="therapy.title"
            :brief="therapy.brief"
            :image_url="therapy.image_url"
            :link="therapy.link"
            :cost="therapy.cost"
        />
    </main>
</template>

<style scoped lang="scss">
.page {
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    gap: 1rem;
}
</style>
