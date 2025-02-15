<script setup lang="ts"></script>

<template>
    <footer>
        <p>
            &copy; 2021 Lucia Diaz. Todos los derechos reservados. Colegiatura:
            F.P.V. - 16.657
        </p>
    </footer>
</template>

<style scoped lang="scss">
footer {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    opacity: 0.7;
}

@media screen and (max-width: 768px) {
    footer {
        height: 2.5rem;
        font-size: 0.75rem;
    }
}
</style>
