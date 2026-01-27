<template>
    <section class="hero">
        <div class="hero__background">
            <img src="/public/img/fondo-lucia-cafe.webp" alt="Consulta Lucia Diaz" />
            <div class="hero__overlay"></div>
        </div>

        <div class="hero__content">
            <h2>¿Por qué amar me genera tanta ansiedad?</h2>
            <p>Descubre cómo construir relaciones seguras desde el entendimiento y la calma. He preparado este espacio
                para ti.</p>

            <button class="action-btn" style="max-width: 200px; margin-top: 2rem;">
                Agendar Sesión
            </button>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped lang="scss">
.hero {
    width: 100%;
    height: 90vh;
    /* Altura casi completa */
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    text-align: center;
    color: var(--color-white);
    /* Texto blanco sobre el fondo oscuro */

    &__background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        /* Degradado azul característico de la nueva marca */
        background: linear-gradient(180deg, rgba(42, 75, 124, 0.3) 0%, rgba(42, 75, 124, 0.85) 60%, rgba(42, 75, 124, 1) 100%);
    }

    &__content {
        position: relative;
        z-index: 2;
        max-width: 800px;
        padding: 0 2rem;
        display: flex;
        flex-direction: column;
        align-items: center;

        h2 {
            font-size: 3.5rem;
            color: var(--color-white);
            /* Forzamos blanco en el hero */
            margin-bottom: 1.5rem;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        p {
            font-size: 1.25rem;
            color: rgba(255, 255, 255, 0.9);
            max-width: 600px;
            font-weight: 400;
        }
    }
}

@media screen and (max-width: 768px) {
    .hero {
        height: 80vh;

        &__content {
            h2 {
                font-size: 2.2rem;
            }

            p {
                font-size: 1rem;
            }
        }
    }
}
</style>