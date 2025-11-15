<script setup>
import { services } from '../../static/services.js'
import { use_scroll_reveal } from '../../composables/use-scroll-reveal.js'

use_scroll_reveal()
</script>
<template>
    <section class="services">
        <h2 data-scroll-reveal="fade-up">¿Que quieres hacer hoy?</h2>
        <div class="services__content">
            <RouterLink class="services__content__card" v-for="service in services" :key="service.id"
                :to="service.route" data-scroll-reveal :style="{ '--delay': `${0.5 + index * 0.1}s` }">
                <img :src="service.icon" :alt="service.title">
                <h4>{{ service.title }}</h4>
                <p>{{ service.description }}</p>
            </RouterLink>
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
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;

        &.is-visible {
            opacity: 1;
            transform: translateY(0);
        }
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
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        transition-delay: var(--delay, 0s);

        &.is-visible {
            opacity: 1;
            transform: translateY(0);
        }

        img {
            width: 50px;
            height: 50px;
            transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        h4 {
            margin: 0;
        }

        &:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 32px rgba(147, 112, 219, 0.25);

            img {
                transform: scale(1.1);
            }
        }
    }
}

@keyframes fade-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media screen and (max-width: 720px) {
    .services {
        padding: 4rem 1rem;

        &__content {
            grid-template-columns: repeat(1, 1fr);
        }
    }
}
</style>