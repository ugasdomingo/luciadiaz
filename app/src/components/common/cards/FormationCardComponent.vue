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
            <p class="card-price">{{ price === 0 ? 'Gratis' : `${price}€` }}</p>
        </RouterLink>
        <section class="card__information">
            <h3 class="card-title">{{ title }}</h3>
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
    width: 400px;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 0;
    text-decoration: none;
    background-color: var(--color-white);
    position: relative;
    box-sizing: border-box;

    &:hover {
        transform: scale(1.02);
        transition: transform 0.3s;
    }

    .card__image {
        text-decoration: none;
        height: calc(100% - 50px);

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .card-price {
            margin: 0.5rem 0 0;
            padding: 0.5rem 1rem;
            color: var(--color-white);
            background: linear-gradient(
                180deg,
                var(--color-secondary) 12%,
                var(--color-secondary-trans) 90%,
                transparent 100%
            );
            border-radius: 10rem;
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;
            box-sizing: border-box;
        }
    }

    .card__information {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin: 0;
        padding: 0.5rem 0;
        gap: 0.5rem;
        box-sizing: border-box;

        .card-type {
            width: fit-content;
            font-size: 1rem;
            margin: 0;
            padding: 0.1rem 1.5rem;
            border-radius: 10rem;
            background: linear-gradient(
                90deg,
                transparent 2%,
                var(--color-primary-trans) 20%,
                var(--color-primary-trans) 80%,
                transparent 98%
            );
        }

        .card-title {
            background-color: transparent;
            border: 1px solid var(--color-white);
            margin: 0;
        }

        .card-social {
            display: flex;
            gap: 0.1rem;

            img {
                width: 1.5rem;
                height: 1.5rem;
                cursor: pointer;
            }
            p {
                font-size: 1rem;
                margin: 0;
            }
            .card-likes {
                background-color: transparent;
                padding: 0.1rem 0.5rem;
                border-radius: 0.5rem;
            }
        }
    }

    a {
        text-align: center;
    }
}

@media screen and (max-width: 768px) {
    .card {
        width: 100%;
        height: fit-content;
        margin: 0;
        padding: 1rem 0.5rem;
        box-sizing: border-box;

        .card__image {
            height: 50%;
            img {
                border-radius: 1rem;
            }

            .card-price {
                top: 1rem;
                right: 1rem;
            }
        }

        .card__information {
            padding: 0.5rem;
            .card-type {
                padding: 0.1rem 1rem;
            }
        }
    }
}
</style>
