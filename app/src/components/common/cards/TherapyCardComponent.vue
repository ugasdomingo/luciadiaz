<script setup>
defineProps({
    therapy: Object
})
</script>

<template>
    <article class="therapy__content__card">
        <img :src="therapy.image" :alt="`Imagen de ${therapy.title}`">
        <section class="content-overlay">
            <div class="content-overlay__title">
                <h3>{{ therapy.title }}</h3>
                <p class="price">€{{ therapy.precio }}</p>
            </div>
            <p>{{ therapy.description }}</p>
            <a class="action-btn" :href="therapy.link" target="_blank">Reservar</a>
        </section>
    </article>
</template>

<style scoped lang="scss">
.therapy__content__card {
    width: 100%;
    max-width: 300px;
    min-height: 400px;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: end;
    border-radius: 1rem;
    position: relative;
    transition: all 0.25s;
    box-sizing: border-box;


    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 1rem;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }

    .content-overlay {
        width: 100%;
        max-width: 300px;
        position: relative;
        z-index: 3;
        padding: 1rem 1rem 1rem;
        border-radius: 1rem;
        box-sizing: border-box;

        &::before {
            content: '';
            position: absolute;
            height: calc(100% + 3rem);
            width: 100%;
            top: -3rem;
            left: 0;
            border-radius: 1rem;
            background: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.9) 100%);
            backdrop-filter: blur(4px) blur(10px);
            -webkit-backdrop-filter: blur(4px) blur(10px);
            mask: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 15%, rgba(0, 0, 0, 0.7) 100%);
            -webkit-mask: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 15%, rgba(0, 0, 0, 0.7) 100%);
            z-index: -1;
        }

        &__title {
            display: flex;
            justify-content: space-between;
            align-items: center;

            h3 {
                margin: 0;
                color: var(--color-white);
                text-shadow: 0 0 4px rgba(0, 0, 0, 0.9);
            }

            .price {
                margin: 0;
                padding: 0.2rem 0.5rem;
                color: var(--color-white);
                background-color: rgb(from var(--color-black) r g b / 0.8);
                border-radius: 0.5rem;
            }
        }

        p {
            margin: 0.5 0;
            font-size: 0.8rem;
            color: var(--color-white);
        }

        .action-btn {
            font-size: 0.8rem;
            width: 100%;
            max-width: 200px;
        }

    }
}
</style>
