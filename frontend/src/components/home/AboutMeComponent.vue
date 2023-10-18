<script lang="ts" setup>
import { RouterLink } from 'vue-router';
</script>

<template>
    <div class="citas-container">
        <div class="">
            <img
                src="src/assets/fondo-lucia2.png"
                alt="Lucia"
                class="img-about-me"
            />
        </div>
        <div class="info-about-me">
            <h2>¿Quieres saber más de mi?</h2>
            <p>
                Tengo más de 5 años ejerciendo como psicóloga independiente,
                también he sido profesoria universitaria y he laborado como
                psicóloga escolar y maestra para instituciones de educación
                básica. Pero eso es sólo mi experiencia te invito a dar click en
                el botón para saber más de mi.
            </p>
            <RouterLink to="/sobre-mi" class="button-about-me">
                Saber más de Lucia
            </RouterLink>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.citas-container {
    width: 100%;
    height: 100%;
    display: flex;
    background-image: linear-gradient(
        to right,
        rgba(9, 20, 141, 0.1),
        rgba(9, 30, 141, 0.9)
    );
}
.info-about-me {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 50%;
    color: var(--color-white);
}
.button-about-me {
    width: 30%;
    color: var(--color-white);
    background-color: var(--color-accent);
    padding: 0.5rem 1rem;
    border-radius: 0.5rem;
    font-size: 1.25rem;
    text-align: center;
}
.img-about-me {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: top;
}
@media screen and (max-width: 760px) {
    .citas-container {
        display: flex;
        flex-direction: column;
        background-image: linear-gradient(
            to bottom,
            rgba(9, 20, 141, 0.1),
            rgba(9, 30, 141, 0.9)
        );
        padding: 0 4px 8px;
    }
    .info-about-me {
        width: 100%;
    }
    .button-about-me {
        width: 100%;
        border: solid 1px var(--color-white);
    }
}
</style>
