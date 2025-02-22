<script setup lang="ts">
//Import components
import FormationDisplayComponent from '@/components/FormationDisplayComponent.vue';
</script>

<template>
    <main class="page">
        <h2>Cursos y Formaciones</h2>
        <p>El conocimiento es la llave para vivir una vida extraordinaria</p>
        <FormationDisplayComponent />
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

@media screen and (max-width: 768px) {
    .page {
        padding: 4rem 1rem;
        gap: 1rem;
    }
}
</style>
