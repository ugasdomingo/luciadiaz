<template>
    <section class="hero">
        <img src="/public/img/fondo-lucia-cafe.webp" alt="Imagen principal" class="hero__background__image">
        <div class="hero__image__content">
            <img src="https://res.cloudinary.com/minteados/image/upload/v1737180498/Lucia/Lucia_y9pfhb.png"
                alt="foto lucia" />
            <div class="hero__image__content__decoration"></div>
        </div>
        <div class="hero__content">
            <h2>Hola, soy Lucia Diaz</h2>
            <p>He preparado este rincón para que te sientes cómodamente, disfrutes tu bebida favorita y dejemos volar la
                mente juntos. Yo ya tengo mi café.
            </p>
        </div>
    </section>
</template>

<script setup>

</script>

<style scoped lang="scss">
.hero {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 4rem 0 8rem;
    gap: 2rem;
    position: relative;
    box-sizing: border-box;

    &__background__image {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        transform: scaleX(-1);
        z-index: -1;
        opacity: 0.3;
    }

    &__image__content {
        width: 30%;
        padding-top: 2rem;
        position: relative;

        img {
            width: 100%;
            height: 50vh;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            object-fit: cover;
            object-position: top;
        }

        &__decoration {
            width: 100%;
            height: calc(50vh + 4rem);
            background-color: var(--color-secondary);
            opacity: 0.2;
            position: absolute;
            top: 0;
            left: -2rem;
            border-radius: 0.5rem;
            z-index: -1;
        }
    }

    &__content {
        width: 70%;
        box-sizing: border-box;

        h2 {
            margin: 0 0 1rem 0;
            color: var(--color-text);
        }

        p {
            width: 50%;
            margin: 0;
        }
    }
}

@media screen and (max-width: 720px) {
    .hero {
        &__image__content {
            height: 40%;
            object-position: left;
            top: 4.5rem;
        }
    }
}
</style>
