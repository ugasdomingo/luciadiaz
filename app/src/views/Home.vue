<template>
    <main class="home__page">
        <HeroComponent />
        <ServicesComponent />
        <FormationComponent />
        <TestComponent />
        <PostComponent />
    </main>
</template>

<script setup>
import { useCommonStore } from '../stores/common-store'
import { onBeforeMount } from 'vue'

// Import components
import HeroComponent from '../components/home/HeroComponent.vue'
import ServicesComponent from '../components/home/ServicesComponent.vue'
import FormationComponent from '../components/home/FormationComponent.vue'
import TestComponent from '../components/home/TestComponent.vue'
import PostComponent from '../components/home/PostComponent.vue'

const common_store = useCommonStore()

onBeforeMount(() => {
    if (!common_store.posts || !common_store.formations || !common_store.videos) {
        common_store.getCommon()
    }
})
</script>

<style scoped lang="scss">
.home__page {
    width: 100%;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    position: relative;
    box-sizing: border-box;
}
</style>
