<script setup lang="ts"></script>

<template>
    <footer>
        <h2 class="slogan">¡Aprende, crece y Construye!</h2>
        <p>Todos los derechos reservados</p>
    </footer>
</template>

<style scoped lang="scss">
footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    background-color: var(--color-primary);
    color: var(--color-white);
    padding: 0 4rem;
    margin: 0;
    height: 10vh;
    box-sizing: border-box;
    overflow: hidden;

    p {
        opacity: 0.5;
    }

    .slogan {
        color: var(--color-white);
        font-size: 1.25rem;
        margin: 0;
    }
}
</style>
