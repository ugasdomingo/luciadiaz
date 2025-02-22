<script setup lang="ts">
//Import tools
import { computed, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Import components
import TemperamentFormComponent from '../common/forms/tests/TemperamentFormComponent.vue';

//States
const user_store = useUserStore();
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
            <p>Todos tus resultados:</p>
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
            <RouterLink
                to="/blog/678a587972486892f6ec7520"
                class="button__action"
            >
                Aprender más sobre tu temperamento
            </RouterLink>
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
    p {
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
}

@media screen and (max-width: 768px) {
    .show_results {
        table {
            width: 100%;
        }
    }
}
</style>
