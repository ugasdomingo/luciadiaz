<script setup lang="ts"></script>

<template>
    <section class="hero">
        <img src="/img/fondo-cafe.jpg" alt="imagen fondo" class="background" />
        <div class="img__container">
            <img
                src="https://res.cloudinary.com/minteados/image/upload/v1737180498/Lucia/Lucia_y9pfhb.png"
                alt="foto lucia"
            />
            <div class="img__decoration"></div>
        </div>
        <div class="content__container">
            <h2>Hola, soy Lucía.</h2>
            <p>
                Quiero darte la bienvenida a mi web. Un espacio que he creado
                con amor para que puedas aplicar la psicología en tu vida.
            </p>
        </div>
    </section>
</template>

<style scoped lang="scss">
.hero {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    box-sizing: border-box;

    .background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        z-index: -1;
        opacity: 0.3;
    }

    .img__container {
        position: relative;
        padding-top: 2rem;
        width: 30%;

        img {
            width: 100%;
            height: 50vh;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            object-fit: cover;
            object-position: top;
        }

        .img__decoration {
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
    .content__container {
        width: 50%;
        margin-left: 2rem;
        h2 {
            margin-bottom: 1rem;
        }
        p {
            font-size: 1.2rem;
            margin-bottom: 2rem;
        }
    }
}

@media screen and (max-width: 768px) {
    .hero {
        flex-direction: column;
        gap: 2rem;
        padding: 4rem 0.5rem 0;
        height: fit-content;

        .img__container {
            width: 100%;
            padding-top: 0;

            img {
                height: 30vh;
            }

            .img__decoration {
                height: calc(30vh + 1rem);
            }
        }
        .content__container {
            width: 100%;
            margin-left: 0;
            text-align: center;
        }
    }
}
</style>
