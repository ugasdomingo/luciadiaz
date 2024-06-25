<script setup lang="ts"></script>

<template>
    <main>
        <img
            src="https://res.cloudinary.com/minteados/image/upload/v1719339604/LuciaWeb/IMG_3612_zxgkvx.webp"
            alt="img grande"
            class="hero-big-img"
        />
        <h1>Página en Construcción</h1>
        <p>Preparando material y herramientas maravillosas para ti.</p>
        <RouterLink to="/">¡Quiero Comenzar!</RouterLink>
    </main>
</template>

<style scoped lang="scss">
main {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: 100vh;
    padding: 10vh 4rem 0;
    margin: 0;
    box-sizing: border-box;
    position: relative;

    h1 {
        margin-bottom: 0.5rem;
        color: var(--color-white);
        text-shadow: 0 0 1rem rgba(0, 0, 0, 0.5);
    }

    p {
        margin: 0 0 3rem;
        color: rgba(255, 255, 255, 0.726);
        text-shadow: 0 0 0.7rem rgba(0, 0, 0, 0.9);
    }

    .hero-big-img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: top;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }

    a {
        text-decoration: none;
        margin: 0;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        background-color: var(--color-accent);
        color: var(--color-white);
        transition: background-color 0.2s ease-in-out;
        box-shadow: 10px 10px 4rem rgba(0, 0, 0, 0.7);

        &:hover {
            background-color: var(--color-accent);
            color: var(--color-white);
        }
    }
}

@media screen and (max-width: 768px) {
    main {
        padding: 10vh 2rem 0;
        align-items: left;

        h1 {
            font-size: 3rem;
        }

        p {
            font-size: 1.5rem;
        }
    }
}
</style>
