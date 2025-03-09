<script setup lang="ts">
//Import tools
import { features } from '@/static/features';

// States
const colors = ['blue', 'black', 'green', 'purple', 'orange'];

// Methods
const get_card_color = (index: number) => {
    return colors[index % colors.length];
};
</script>

<template>
    <section class="feature">
        <h2>¿Qué quieres hacer hoy para ti?</h2>
        <div class="features">
            <RouterLink
                v-for="(feature, index) in features"
                :key="feature.id"
                :to="feature.link"
                class="feature-card"
                :class="get_card_color(index)"
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
    padding: 0 4rem;
    gap: 2rem;
    margin: 0;
    box-sizing: border-box;

    h2 {
        margin: 0;
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
            background-color: var(--color-primary-trans);
            border-radius: 1rem;
            box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
            box-sizing: border-box;

            .feature-title {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin: 0;

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

            &.blue {
                color: var(--color-white);
                background: linear-gradient(135deg, #9b9bf8 2%, #0808c0 20%);
            }

            &.black {
                color: var(--color-white);
                background: linear-gradient(
                    135deg,
                    #333333 2%,
                    var(--color-text) 20%
                );
            }

            &.green {
                color: var(--color-white);
                background: linear-gradient(135deg, #00b300 2%, #004d00 20%);
            }

            &.purple {
                color: var(--color-white);
                background: linear-gradient(
                    135deg,
                    var(--color-primary) 2%,
                    var(--color-secondary) 20%
                );
            }

            &.orange {
                color: var(--color-white);
                background: linear-gradient(135deg, #ff9900 2%, #c07504 20%);
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
