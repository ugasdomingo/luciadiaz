<script setup lang="ts">
//Import Components
import HomeHeroComponent from '@/components/home-components/HomeHeroComponent.vue';
import HomeWellcomeComponent from '@/components/home-components/HomeWellcomeComponent.vue';
import HomeFeaturesComponent from '@/components/home-components/HomeFeaturesComponent.vue';
import HomeFormationsComponent from '@/components/home-components/HomeFormationsComponent.vue';
import HomeBlogComponent from '@/components/home-components/HomeBlogComponent.vue';
</script>

<template>
    <main class="page__home">
        <HomeHeroComponent />
        <HomeWellcomeComponent />
        <HomeFeaturesComponent />
        <HomeFormationsComponent :display="3" />
        <HomeBlogComponent :display="3" />
    </main>
</template>

<style scoped lang="scss">
.page__home {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

@media screen and (max-width: 768px) {
    .page__home {
        height: fit-content;
    }
}
</style>
