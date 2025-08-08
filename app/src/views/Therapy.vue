<template>
    <section class="therapy">
        <h2>Terapias</h2>
        <div class="therapy__content">
            <div class="therapy__content__card" v-for="therapy in therapies" :key="therapy.id">
                <img :src="therapy.image" :alt="`Imagen de ${therapy.title}`">
                <h3>{{ therapy.title }}</h3>
                <p>{{ therapy.description }}</p>
                <a :href="therapy.link" target="_blank">Reservar</a>
            </div>
        </div>
    </section>
</template>

<script setup>
import { therapies } from '../static/therapies.js'
</script>

<style scoped lang="scss">
.therapy {
    width: 100%;
    min-height: 70vh;
    margin: 0;
    padding: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    box-sizing: border-box;
    position: relative;
    overflow-y: hidden;

    h2 {
        text-align: center;
        margin-bottom: 4rem;
    }

    &__content {
        width: 100%;
        display: flex;
        justify-content: space-around;
        gap: 3rem;
        box-sizing: border-box;


        &__card {
            width: 100%;
            max-width: 20rem;
            padding: 1rem;
            border-radius: 1rem;
            box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
            transition: all 0.25s;

            &:hover {
                box-shadow: 0 0 1rem rgba(0, 0, 0, 0.9);
                scale: 1.1;
            }

            img {
                width: 5rem;
                height: 5rem;
                object-fit: cover;
                border-radius: 1rem;
            }
        }
    }
}
</style>
