<script setup lang="ts"></script>

<template>
    <footer>
        <p>&copy; 2021 Lucia Diaz. Colegiatura: F.P.V. - 16.657</p>
        <ul>
            <li>
                <router-link to="/terms-and-conditions"
                    >Términos y condiciones</router-link
                >
            </li>
            <li>
                <router-link to="/privacy-policy"
                    >Política de privacidad</router-link
                >
            </li>
            <li><router-link to="/legal-notice">Aviso legal</router-link></li>
        </ul>
    </footer>
</template>

<style scoped lang="scss">
footer {
    width: 100%;
    height: 3rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    opacity: 0.7;

    ul {
        display: flex;
        list-style-type: none;
        padding: 0;
        margin: 0;

        li {
            margin-left: 1rem;
        }
    }
}

@media screen and (max-width: 768px) {
    footer {
        flex-wrap: wrap;
        height: fit-content;
        font-size: 0.75rem;

        ul {
            li {
                margin-left: 0.5rem;
            }
        }
    }
}
</style>
