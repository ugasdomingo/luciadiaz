<template>
    <section class="home__block hero">
        <img src="/public/img/fondo-lucia-cafe.webp" alt="Imagen principal" class="hero__image">
        <section class="hero__content">
            <h2 class="hero__content__presentation">Hola, soy Lucia ¿Te apetece un café?</h2>
            <article class="hero__card">
                <div class="hero__card_title">
                    <h4>Etimología de la palabra café</h4>
                </div>
                <div class="hero__card__text">
                    <p>CA = Juntos</p>
                    <p>FE = Inspiración</p>
                    <p>CAFÉ = Juntos en inspiración</p>
                </div>
            </article>
            <p class="hero__content__text">Busca tu bebida favorita, yo ya tengo mi café, y vamos juntos a inspirarnos en la belleza de la vida y la felicidad, en este espacio que he creado para ti.</p>
        </section>
    </section>
</template>

<script setup>

</script>

<style scoped lang="scss">
.hero {
    position: relative;

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center 20%;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
    }

    &__content {
        width: 50%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        padding: 4rem;
        align-self: flex-end;
    }

    &__card {
        width: 275px;
        border-radius: 1rem;
        background-color: var(--color-white);
        box-shadow: 0 8px 32px rgba(147, 112, 219, 0.15);
        border: 1px solid rgba(221, 160, 221, 0.2);
    }

    &__card_title {
        background-color: var(--color-soft-alert);
        padding: 1rem 0.5rem;
        border-radius: 1rem 1rem 0 0;
        h4 {
            margin: 0;
        }
    }

    &__card__text {
        padding: 0 0.5rem;
    }

    &__card_text p {
        margin: 0.5rem 0;
    }


    &__content__presentation {
        margin: 2rem 0 ;
    }

    &__content__text {
        width: 275px;
        margin: 1.5rem 0 0;
        padding: 0.5rem;
        border-radius: 1rem;
        background-color: var(--color-white);
    }
}

@media screen and (max-width: 720px) {
    .hero {
        &__image {
            height: 40%;
            object-position: left;
            top: 4.5rem;
        }
    } 
}
</style>
