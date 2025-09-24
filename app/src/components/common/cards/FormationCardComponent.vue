<script setup>
import { RouterLink } from 'vue-router'
import { useUtilStore } from '../../../stores/util-store.js'

const util_store = useUtilStore()

defineProps({
    formation: Object
})

const max_length = 150
const truncate = (text, max_length) => {
    return text.substring(0, max_length) + '...'
}


</script>

<template>
    <RouterLink :to="`/formaciones/${formation.slug}`" class="formation__card__container">
        <img :src="formation.formation_cover.secure_url" alt="">
        <section class="formation__card__container__info">
            <h4>{{ formation.title }}</h4>
            <p id="description" v-html="truncate(formation.description, max_length)"></p>
            <div class="formation__card__container__info__types">
                <p>Modalidad: {{ formation.type }}</p>
                <p>Precio: {{ formation.price }}€</p>
                <p>{{ util_store.format_date(formation.start_date) }}</p>
            </div>
        </section>
        <button class="nobg-btn">Saber más</button>
    </RouterLink>
</template>

<style scoped lang="scss">
.formation__card__container {
    width: 100%;
    max-width: 70%;
    max-height: 10rem;
    margin: 0 auto;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.25s;

    &:hover {
        transform: translateY(-5px);
    }

    img {
        width: 10rem;
        height: 10rem;
        object-fit: cover;
        border-radius: 1rem;
    }

    &__info {
        width: 100%;
        max-width: calc(100% - 22rem);
        height: 10rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0;
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        h4 {
            margin: 0;
            padding: 0;
            color: var(--color-black);
        }

        p {
            margin: 0;
            padding: 0;
        }

        &__types {
            width: 90%;
            display: flex;
            justify-content: space-between;
            margin-top: 0;
            color: var(--color-black);
            opacity: 0.8;
        }
    }
}

.nobg-btn {
    width: 10rem;
    border-color: var(--color-black);
    color: var(--color-black);

}

@media screen and (max-width: 720px) {
    .formation__card__container {
        width: 100%;
        max-width: 100%;
        height: fit-content;
        max-height: fit-content;
        flex-direction: column;
        padding: 0;
        margin: 0;

        img {
            width: 100%;
            height: auto;
        }

        &__info {
            width: 100%;
            max-width: 100%;
            justify-content: center;
            height: fit-content;

            h4 {
                margin: 0;
                padding: 0 0 0.5rem;
            }

            p {
                margin: 0;
                padding: 0;
            }

            &__types {
                display: none;
            }
        }
    }
}
</style>