<script setup lang="ts">
import { features } from '@/static/features';
</script>

<template>
    <section class="feature">
        <h2>
            ¿Qué quieres hacer hoy para seguir avanzando hacia tu vida
            extraordinaria?
        </h2>
        <div class="features">
            <RouterLink
                v-for="feature in features"
                :key="feature.id"
                :to="feature.link"
                class="feature-card"
            >
                <div class="feature-title">
                    <img :src="feature.img" alt="feature.icon" />
                    <h4>{{ feature.title }}</h4>
                </div>
                <p>{{ feature.description }}</p>
            </RouterLink>
        </div>
    </section>
</template>

<style scoped lang="scss">
.feature {
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem 4rem;
    margin: 0;
    box-sizing: border-box;

    h2 {
        margin: 0 0 2rem;
    }

    .features {
        width: 100%;
        display: flex;
        justify-content: space-between;
        margin-top: 1.5rem;

        .feature-card {
            width: 220px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            gap: 1rem;
            padding: 1rem;
            text-decoration: none;
            color: var(--color-text);
            border-radius: 1rem;
            box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
            box-sizing: border-box;

            .feature-title {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0;
                color: var(--color-secondary);

                img {
                    width: 50px;
                    height: 50px;
                }

                h4 {
                    margin: 0;
                }
            }

            p {
                margin: 0;
                font-size: 0.9rem;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .feature {
        height: fit-content;
        padding: 4rem 1rem;

        h2 {
            font-size: 1.5rem;
        }

        .features {
            flex-direction: column;
            gap: 1rem;

            .feature-card {
                width: 100%;
            }
        }
    }
}
</style>
