<script setup lang="ts"></script>

<template>
    <section class="hero">
        <img src="/img/fondo-cafe.jpg" alt="imagen fondo" class="background" />
        <h1>Bienvenidos a mi web</h1>
        <h4>Psicología aplicada para una vida extraordinaria</h4>
    </section>
</template>

<style scoped lang="scss">
.hero {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
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
    }

    h1 {
        font-size: 4rem;
        text-align: center;
        color: var(--color-primary);
        margin-bottom: 1rem;
    }

    h4 {
        text-align: center;
        color: var(--color-white);
        font-size: 2rem;
        font-weight: 400;
        margin-top: 0;
        padding: 0.2rem 4rem;
        text-shadow: 1px 0 2px rgba(0, 0, 0, 0.3);
        background: linear-gradient(
            90deg,
            transparent 0%,
            var(--color-primary) 10%,
            var(--color-primary-trans) 90%,
            transparent 100%
        );
    }
}

@media screen and (max-width: 768px) {
    .hero {
        h1 {
            font-size: 3rem;
        }

        h4 {
            font-size: 1.5rem;
        }
    }
}
</style>
