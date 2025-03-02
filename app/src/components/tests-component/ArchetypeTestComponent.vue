<script setup lang="ts">
//Import tools
import { computed, onBeforeMount, ref } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { archetype_results_info } from '@/static/tests-results/archetype-results';

//Import components
import ArchetypeFormComponent from '../common/forms/tests/ArchetypeFormComponent.vue';

//States
const user_store = useUserStore();
const show_more_info = ref(false);
const archetype_results = computed(() =>
    user_store.all_user_data.test_results.find(
        (test: any) => test.title === 'archetype'
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
        <div class="show_results" v-if="archetype_results">
            <h2>
                {{ user_store.user_name.split(' ')[0] }} eres un
                <span> {{ archetype_results.results.archetype }}</span>
            </h2>
            <p class="subtitle">Todos tus resultados:</p>
            <table>
                <tr>
                    <td>Sabio Rey</td>
                    <td>{{ archetype_results.results.results.wise }}</td>
                </tr>
                <tr>
                    <td>Guerrero</td>
                    <td>{{ archetype_results.results.results.warrior }}</td>
                </tr>
                <tr>
                    <td>Mago</td>
                    <td>{{ archetype_results.results.results.wizard }}</td>
                </tr>
                <tr>
                    <td>Amante</td>
                    <td>{{ archetype_results.results.results.lover }}</td>
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
                    v-for="archetype_info in archetype_results_info"
                    :key="archetype_info.archetype_name"
                    class="card__container"
                    :class="
                        archetype_info.archetype_name ===
                        archetype_results.results.archetype
                            ? 'active'
                            : null
                    "
                >
                    <h3>
                        {{ archetype_info.archetype_name }}
                        {{
                            archetype_info.archetype_name ===
                            archetype_results.results.archetype
                                ? ' - Tu'
                                : ''
                        }}
                    </h3>
                    <p>
                        Siempre quiere
                        {{ archetype_info.archetype_description }}
                    </p>
                    <p>Emociones Privadas-Contenidas:</p>
                    <ul>
                        <li
                            v-for="emotion in archetype_info.archetype_emotions"
                        >
                            {{ emotion }}
                        </li>
                    </ul>
                    <ul class="more__info">
                        <li>
                            Su máxima necesidad:
                            {{ archetype_info.archetype_necesities }}
                        </li>
                        <li>
                            {{ archetype_info.archetype_quality }}
                        </li>
                        <li>
                            {{ archetype_info.archetype_decision }}
                        </li>
                        <li>
                            {{ archetype_info.archetype_like }}
                        </li>
                    </ul>
                </article>
            </div>
        </div>
        <ArchetypeFormComponent v-else />
    </section>
</template>

<style scoped lang="scss">
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
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        width: 100%;
        padding: 2rem 0;
        box-sizing: border-box;

        .card__container {
            width: 45%;
            min-width: 250px;
            padding: 1rem;
            border: 1px solid var(--color-secondary);
            border-radius: 0.5rem;
            box-sizing: border-box;
            transition: all 0.3s;
            cursor: pointer;

            &.active {
                background-color: var(--color-secondary);
                color: var(--color-white);
            }

            h3 {
                font-size: 1.5rem;
                font-weight: bold;
                margin: 0;
            }

            p {
                font-size: 0.75rem;
                margin: 0.5rem 0;
            }

            ul {
                padding: 0 0 0 1rem;
                margin: 0;
                li {
                    font-size: 0.75rem;
                }
            }

            .more__info {
                padding: 1rem 0 0;
                font-size: 0.75rem;
                list-style: none;
                li {
                    margin: 0;
                }
            }
        }
    }
}

@media screen and (max-width: 768px) {
    .show_results {
        table {
            width: 100%;
        }

        .more__info__container {
            .card__container {
                width: 100%;
            }
        }
    }
}
</style>
