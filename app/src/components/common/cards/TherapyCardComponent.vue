<script setup lang="ts">
//Import tools

//Props
defineProps<{
    title: string;
    image_url: string;
    link: string;
}>();
</script>

<template>
    <article class="card__container">
        <img :src="image_url" :alt="`imagen de ${title}`" />
        <h2>{{ title }}</h2>

        <RouterLink :to="link" class="button__action">
            Agendar cita
        </RouterLink>
    </article>
</template>

<style scoped lang="scss">
.card__container {
    width: 300px;
    display: flex;
    flex-direction: column;
    padding: 0;
    border-radius: 1rem;
    transition: all 0.3s;
    box-sizing: border-box;

    &:hover {
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        padding: 1rem;
        scale: 1.05;
    }

    img {
        width: 100%;
        height: 250px;
        border-radius: 1rem;
        object-fit: cover;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
    }
}

@media screen and (max-width: 768px) {
    .card__container {
        width: 100%;
        padding: 0.5rem;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);

        &:hover {
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
            scale: 1;
        }
    }
}
</style>
