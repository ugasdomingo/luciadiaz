<script setup lang="ts">
//Import tools
import { computed, onBeforeMount, ref } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Import components
import GoalFormComponent from '../common/forms/tests/GoalFormComponent.vue';

//States
const user_store = useUserStore();
const show_more_info = ref(false);
const goal_result = computed(() =>
    user_store.all_user_data.test_results.find(
        (test: any) => test.title === 'goal'
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
        <div class="show_results" v-if="goal_result">
            <h2>
                Felicidades {{ user_store.user_name.split(' ')[0] }}
                tu inconsciente te ha escrito una carta
            </h2>
            <p class="sub_title">
                Esto es lo que tu inconsciente te ha dicho con respecto a
                <span>{{ goal_result.results.goal }}</span>
            </p>

            <h2 class="letter">
                Yo, {{ user_store.user_name }}, conscientemente quiero
                {{ goal_result.results.r1 }}, ya que rechazo en mi
                {{ goal_result.results.r3 }}. Además quisiera
                {{ goal_result.results.r4 }}, pero bloqueo en mi
                {{ goal_result.results.r6 }}.
            </h2>
            <button
                @click="show_more_info = !show_more_info"
                class="button__action"
            >
                {{
                    show_more_info
                        ? 'Ocultar información'
                        : '¿Cómo analizo esta carta?'
                }}
            </button>
            <div class="more__info__container" v-if="show_more_info">
                <h3>Esta carta se analiza de abajo hacia arriba</h3>
                <p>
                    Es decir, comenzamos por lo que bloqueas:
                    <span>{{ goal_result.results.r6 }}</span
                    >, es necesario identifica el por qué lo bloqueas, ¿Qué es
                    lo que te hace sentir incómodo con respecto a esto en tu
                    inconsciente?
                    <strong>¿A qué le tienes miedo?</strong>
                </p>
                <p>
                    Superado o entendido ese bloqueo, podrás alcanzar o lograr
                    como resultado:
                    <span>{{ goal_result.results.r4 }}</span
                    >, y esa será una herramienta o potenciador para superar el
                    rechazo que tienes con
                    <span>{{ goal_result.results.r3 }}</span
                    >.
                </p>
                <p>
                    Finalmente, el superar el rechazo por
                    <span>{{ goal_result.results.r3 }}</span> te llevará a
                    <span>{{ goal_result.results.r1 }}</span> y como
                    consecuencia
                    <strong>lograrás: {{ goal_result.results.goal }}</strong
                    >.
                </p>
                <h4>
                    Si tienes dudas o quieres un poco de ayuda para entender tu
                    carta, escríbeme y con gusto te ayudaré.
                </h4>
            </div>
        </div>
        <GoalFormComponent v-else />
    </section>
</template>

<style lang="scss" scoped>
.show_results {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    .sub_title {
        margin-bottom: 1rem;

        span {
            font-weight: bold;
            font-style: italic;
        }
    }

    .letter {
        width: 50%;
        margin-top: 1rem;
        text-align: justify;
        align-self: center;
    }

    .more__info__container {
        width: 50%;
        margin-top: 1rem;
        text-align: justify;

        h3 {
            font-size: 1.75rem;
            margin-bottom: 1rem;
            text-align: center;
        }

        p {
            font-size: 1.25rem;
            margin-bottom: 1rem;
        }

        span {
            font-style: italic;
            opacity: 0.8;
        }
    }
}

@media screen and (max-width: 768px) {
    .show_results {
        h2 {
            margin-bottom: 0;
        }

        .letter {
            width: 100%;
            font-size: 1.75rem;
            margin-bottom: 2rem;
            text-align: left;
        }

        .more__info__container {
            width: 100%;
            h3 {
                font-size: 1.5rem;
            }

            p {
                font-size: 1.25rem;
            }
        }
    }
}
</style>
