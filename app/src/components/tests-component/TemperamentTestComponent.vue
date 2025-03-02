<script setup lang="ts">
//Import tools
import { computed, onBeforeMount, ref } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { temperament_results_info } from '@/static/tests-results/temperament-results';

//Import components
import TemperamentFormComponent from '../common/forms/tests/TemperamentFormComponent.vue';

//States
const user_store = useUserStore();
const show_more_info = ref(false);
const temperament_result = computed(() =>
    user_store.all_user_data.test_results.find(
        (test: any) => test.title === 'temperament'
    )
);

//Lifecycle
onBeforeMount(async () => {
    //Check if user has done the test before
    if (user_store.token && !user_store.all_user_data) {
        user_store.user_role === 'Admin'
            ? await user_store.get_data_by_admin()
            : await user_store.get_data_by_user();
    }
});
</script>

<template>
    <section>
        <div class="show_results" v-if="temperament_result">
            <h2>
                Felicidades {{ user_store.user_name.split(' ')[0] }} eres un
                <span> {{ temperament_result.results.temperament }}</span>
            </h2>
            <p class="subtitle">Todos tus resultados:</p>
            <table>
                <tr>
                    <td>Colérico</td>
                    <td>{{ temperament_result.results.results.choleric }}</td>
                </tr>
                <tr>
                    <td>Flemático</td>
                    <td>{{ temperament_result.results.results.phlegmatic }}</td>
                </tr>
                <tr>
                    <td>Melancólico</td>
                    <td>
                        {{ temperament_result.results.results.melancholic }}
                    </td>
                </tr>
                <tr>
                    <td>Sanguíneo</td>
                    <td>{{ temperament_result.results.results.sanguine }}</td>
                </tr>
            </table>
            <button
                class="button__action"
                @click="show_more_info = !show_more_info"
            >
                {{
                    show_more_info
                        ? 'Ocultar información'
                        : 'Aprender más sobre tu arquetipo'
                }}
            </button>
            <div class="more__info__container" v-if="show_more_info">
                <article
                    v-for="temperament_info in temperament_results_info"
                    :key="temperament_info.title"
                    :class="
                        temperament_info.title ===
                        temperament_result.results.temperament
                            ? 'active'
                            : null
                    "
                >
                    <h3>
                        {{ temperament_info.title }} -
                        {{ temperament_info.slogan }}
                        {{
                            temperament_info.title ===
                            temperament_result.results.temperament
                                ? '(Tu)'
                                : ''
                        }}
                    </h3>
                    <ul>
                        <li>
                            <span>Deseo:</span> {{ temperament_info.deseo }}
                        </li>
                        <li>
                            <span>Necesidades:</span>
                            {{ temperament_info.necesidades }}
                        </li>
                        <li>
                            <span>Fuerzas claves:</span>
                            {{ temperament_info.fuerzas }}
                        </li>
                        <li>
                            <span>Debilidades claves:</span>
                            {{ temperament_info.debilidades }}
                        </li>
                        <li>
                            <span>Se deprimer cuando:</span>
                            {{ temperament_info.deprime }}
                        </li>
                        <li>
                            <span>Tiene miedo de:</span>
                            {{ temperament_info.miedo }}
                        </li>
                        <li>
                            <span>Le gustan las personas:</span>
                            {{ temperament_info.gustan }}
                        </li>
                        <li>
                            <span>No le gustan las personas:</span>
                            {{ temperament_info.no_gustan }}
                        </li>
                        <li>
                            <span>Podría mejorar si:</span>
                            {{ temperament_info.mejorar }}
                        </li>
                        <li>
                            <span>Como líder:</span>
                            {{ temperament_info.lider }}
                        </li>
                        <li>
                            <span>Tiende a casarse:</span>
                            {{ temperament_info.casarse }}
                        </li>
                        <li>
                            <span>Reacción al estrés:</span>
                            {{ temperament_info.estres }}
                        </li>
                        <li>
                            <span>Se le reconoce por:</span>
                            {{ temperament_info.reconoce }}
                        </li>
                    </ul>
                </article>
            </div>
        </div>
        <TemperamentFormComponent v-else />
    </section>
</template>

<style lang="scss" scoped>
.show_results {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    h2 {
        font-size: 2rem;
        span {
            font-size: 2.5rem;
            font-weight: bold;
            color: var(--color-secondary);
        }
    }
    .subtitle {
        font-size: 1.5rem;
        margin: 1rem 0 1.5rem;
    }
    table {
        width: 30%;
        border-collapse: collapse;
        margin-bottom: 2rem;

        tr {
            border-bottom: 1px solid var(--color-secondary);
            td {
                padding: 1rem 0;
                text-align: center;
                font-size: 1.5rem;
                font-weight: 500;
                &:first-child {
                    text-align: left;
                }
            }
        }
    }

    .more__info__container {
        width: 100%;
        article {
            padding: 1rem;
            border: 1px solid var(--color-secondary);
            border-radius: 10px;
            margin: 1rem 0;
            h3 {
                font-size: 1.5rem;
                margin-bottom: 1rem;
                span {
                    font-size: 1.2rem;
                    font-weight: 500;
                }
            }
            ul {
                list-style: none;
                li {
                    margin: 0.5rem 0;
                    font-weight: 400;
                    span {
                        font-weight: 700;
                    }
                }
            }
        }
        .active {
            background-color: var(--color-secondary);
            color: white;

            span {
                color: white;
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .show_results {
        table {
            width: 100%;
        }
    }
}
</style>
