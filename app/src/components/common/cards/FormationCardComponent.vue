<script setup lang="ts">
//Import tools
import { useFormationStore } from '@/stores/formation-store';

defineProps<{
    _id: string;
    title: string;
    landing_page: string;
    type: string;
    image: string;
    price: number;
    likes: number;
}>();

//state
const formation_store = useFormationStore();

//methods
const addLike = async (id: string) => {
    await formation_store.like_formation(id);
    await formation_store.get_all_formations();
};
</script>

<template>
    <article class="card">
        <RouterLink class="card__image" :to="`/formaciones/${landing_page}`">
            <img :src="image" alt="formation image" />
            <h4 class="card-title">{{ title }}</h4>
        </RouterLink>
        <section class="card__information">
            <p class="card-price">{{ price === 0 ? 'Gratis' : `${price}€` }}</p>
            <p class="card-type">{{ type }}</p>
            <div class="card-social">
                <img
                    src="/icon/like.svg"
                    alt="like icon"
                    @click="addLike(_id)"
                />
                <p class="card-likes">{{ likes }}</p>
            </div>
        </section>
    </article>
</template>

<style scoped lang="scss">
.card {
    width: 300px;
    height: 250px;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0;
    text-decoration: none;
    border-radius: 1rem;
    background-color: var(--color-white);
    position: relative;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
    box-sizing: border-box;

    .card__image {
        text-decoration: none;

        &:hover {
            transform: scale(1.02);
            transition: transform 0.3s;
        }

        img {
            width: 100%;
            height: 200px;
            border-radius: 1rem 1rem 0 0;
            object-fit: cover;
        }

        .card-title {
            width: 80%;
            margin: 0.5rem 0 0;
            padding: 0.5rem;
            color: var(--color-white);
            background: linear-gradient(
                180deg,
                var(--color-secondary) 12%,
                var(--color-secondary-trans) 90%,
                transparent 100%
            );
            border-radius: 0 10rem 10rem 0;
            position: absolute;
            top: 0.5rem;
            left: 0;
            box-sizing: border-box;
        }
    }

    .card__information {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        padding: 0 1rem;
        box-sizing: border-box;

        p {
            font-size: 1rem;
            margin: 0;
        }

        .card-price {
            background-color: transparent;
            border: 1px solid var(--color-secondary);
            color: var(--color-secondary);
            padding: 0.1rem 0.5rem;
            border-radius: 0.5rem;
        }

        .card-social {
            display: flex;
            gap: 0.1rem;

            img {
                width: 1.5rem;
                height: 1.5rem;
                cursor: pointer;
            }
            .card-likes {
                background-color: transparent;
                color: var(--color-secondary);
                padding: 0.1rem 0.5rem;
                border-radius: 0.5rem;
            }
        }
    }

    a {
        text-align: center;
    }
}
</style>
