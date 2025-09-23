<script setup>
import { services } from '../../static/services.js'
</script>
<template>
    <section class="services">
        <h2>¿Que quieres hacer hoy?</h2>
        <div class="services__content">
            <div class="services__content__card" v-for="service in services" :key="service.id">
                <img :src="service.icon" :alt="service.title">
                <h4>{{ service.title }}</h4>
                <p>{{ service.description }}</p>
            </div>
        </div>
    </section>
</template>


<style scoped lang="scss">
.services {
    width: 100%;
    height: fit-content;
    margin: 0;
    padding: 8rem 4rem 10rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    h2 {
        text-align: center;
    }

    &__content {
        width: 100%;
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        justify-content: center;
        gap: 1rem;
        box-sizing: border-box;
    }

    &__content__card {
        border-radius: 1rem;
        background-color: var(--color-soft-alert);
        box-shadow: 0 8px 32px rgba(147, 112, 219, 0.15);
        border-radius: 1rem;
        padding: 1rem;

        img {
            width: 50px;
            height: 50px;
        }

        h4 {
            margin: 0;
        }
    }
}
</style>