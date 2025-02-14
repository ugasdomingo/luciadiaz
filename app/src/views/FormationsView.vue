<script setup lang="ts">
//Import components
import HomeFormationsComponent from '@/components/home-components/HomeFormationsComponent.vue';
</script>

<template>
    <main class="page">
        <h2>Cursos y Formaciones</h2>
        <p>El conocimiento es la llave para vivir una vida extraordinaria</p>
        <section class="formations__container">
            <HomeFormationsComponent :display="0" />
        </section>
    </main>
</template>

<style scoped lang="scss">
.page {
    text-align: center;

    h2 {
        margin: 0;
        padding: 0;
    }

    p {
        margin: 0.5rem 0 4rem;
        padding: 0;
    }
}
</style>
