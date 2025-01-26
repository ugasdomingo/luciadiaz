<script setup lang="ts">
//Import tools
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Import components
import ArchetypeFormComponent from '../common/forms/tests/ArchetypeFormComponent.vue';

//States
const userStore = useUserStore();
const all_ready_done = ref(false);
const archetype_results = ref();

//Lifecycle
onBeforeMount(() => {
    //Check if user has done the test before
    const user_test_results: object[] =
        userStore.all_user_data.test_results.find(
            (test: any) => test.title === 'archetype'
        );

    if (user_test_results) {
        if (user_test_results) {
            all_ready_done.value = true;
            archetype_results.value = user_test_results;
        }
    }
});
</script>

<template>
    <section>
        <div class="show_results" v-if="all_ready_done">
            <h2>
                Felicidades {{ userStore.user_name.split(' ')[0] }} eres un
                <span> {{ archetype_results.results.archetype }}</span>
            </h2>
            <p>Todos tus resultados:</p>
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
            <RouterLink
                to="/blog/678a307efda39560e5f7fced"
                class="button__action"
            >
                Aprender más sobre tu arquetipo
            </RouterLink>
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
</style>
