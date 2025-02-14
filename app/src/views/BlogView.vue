<script setup lang="ts">
//Import components
import HomeBlogComponent from '@/components/home-components/HomeBlogComponent.vue';
</script>

<template>
    <main class="page">
        <section class="blog__container">
            <HomeBlogComponent :display="0" />
        </section>
    </main>
</template>

<style scoped lang="scss"></style>
