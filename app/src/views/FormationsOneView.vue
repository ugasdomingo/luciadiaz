<script setup lang="ts">
//Import tools
import { onBeforeMount, ref, computed } from 'vue';
import { useFormationStore } from '@/stores/formation-store';
import { useUserStore } from '@/stores/user-store';
import { useUtilStore } from '@/stores/util-store';
import { useRoute } from 'vue-router';

//States
const formation_store = useFormationStore();
const user_store = useUserStore();
const util_store = useUtilStore();
const route = useRoute();
const formation_id = ref(route.params.id);
const formation = computed(() => formation_store.one_formation);
const starting_date = ref('');

//life cycle hook
onBeforeMount(async () => {
    if (formation_store.all_formations.length == 0) {
        await formation_store.get_one_formation(formation_id.value as string);
    } else {
        const find_formation = formation_store.all_formations.find(
            (formation) => formation._id == formation_id.value
        );
        find_formation
            ? (formation_store.one_formation = find_formation)
            : await formation_store.get_one_formation(
                  formation_id.value as string
              );
    }

    const get_date = formation.value?.date;
    if (get_date) {
        starting_date.value = new Date(get_date).toLocaleDateString();
    } else {
        starting_date.value = 'Invalid date';
    }
});
</script>

<template>
    <main class="page">
        <section class="formation__details">
            <img
                :src="formation?.cover_image.secure_url"
                alt="formation image"
                class="formation__details__image"
            />
            <div class="formation__details__content">
                <p v-html="formation?.content"></p>
            </div>
        </section>
        <aside class="formation__actions">
            <h1>{{ formation?.title }}</h1>
            <p class="formation__description">{{ formation?.description }}</p>
            <ul>
                <li>
                    Fecha de inicio: <span>{{ starting_date }}</span>
                </li>
                <li>
                    Costo: <span>{{ formation?.price }}€</span>
                </li>
                <li>
                    Duración: <span>{{ formation?.duration }}</span>
                </li>
            </ul>
            <section class="payment">
                <div class="payment__loggued" v-if="user_store.token">
                    <a
                        :href="formation?.paypal_button"
                        target="_blank"
                        class="button__action"
                        >Inscribirme</a
                    >
                    <p>
                        ¿Quieres pagar en 2 partes ?
                        <a href="https://wa.me/34624721896" target="_blank"
                            >Escríbeme</a
                        >
                    </p>
                    <button
                        class="button__transparent"
                        @click="util_store.show_other_payment_method = true"
                    >
                        Ver otros métodos de pago
                    </button>
                </div>
                <div class="payment__others" v-else>
                    <h4>Debes iniciar sesión para poder inscribirte</h4>
                    <RouterLink to="/area-privada" class="button__action">
                        Iniciar sesión
                    </RouterLink>
                </div>
            </section>
        </aside>
    </main>
</template>

<style scoped lang="scss">
.page {
    flex-direction: row;
    .formation__details {
        width: 60%;
        display: flex;
        flex-direction: column;

        .formation__details__image {
            width: 100%;
            height: 250px;
            border-radius: 1rem;
            object-fit: cover;
        }

        .formation__details__content {
            h1 {
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            p {
                font-size: 1.5rem;
                line-height: 1.5;
            }
        }
    }

    .formation__actions {
        width: 30%;
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 4rem;
        right: 4rem;

        h1 {
            margin-bottom: 1rem;
        }

        .formation__description {
            font-size: 1.2rem;
            margin-bottom: 1rem;
            font-style: italic;
        }

        ul {
            list-style: none;
            li {
                font-size: 1rem;
                margin-bottom: 1rem;
                span {
                    font-weight: bold;
                }
            }
        }

        .payment {
            margin-top: 2rem;
        }

        .payment__loggued {
            p {
                font-size: 0.8rem;
                margin-top: 1.5rem;
                a {
                    color: var(--color-primary);
                }
            }
        }
    }
}
</style>
