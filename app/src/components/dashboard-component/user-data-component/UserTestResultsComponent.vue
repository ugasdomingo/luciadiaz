<script setup lang="ts">
//Import tools
import { ref, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user-store';
import type { ITestResult } from '@/types/ITestResult';

//States
const user_store = useUserStore();
const archetype_test_done = ref(false);
const temperament_test_done = ref(false);
const goal_test_done = ref(false);
const test_results = ref<ITestResult[]>([]);

//Lifecycle
onBeforeMount(async () => {
    test_results.value = user_store.all_user_data.test_results;

    test_results.value.forEach((test: ITestResult) => {
        if (test.title === 'archetype') archetype_test_done.value = true;
        if (test.title === 'temperament') temperament_test_done.value = true;
        if (test.title === 'goal') goal_test_done.value = true;
    });
});
</script>

<template>
    <section class="test__results__container">
        <h3>
            Arquetipo:
            <span v-if="archetype_test_done">
                {{
                    user_store.all_user_data.test_results.find(
                        (test: any) => test.title === 'archetype'
                    ).results.archetype
                }}
            </span>
            <RouterLink to="/tests/arquetipos">
                {{
                    archetype_test_done
                        ? 'Ver resultados'
                        : 'Descubre tu Arquetipo'
                }}
            </RouterLink>
        </h3>
        <h3>
            Temperamento:
            <span v-if="temperament_test_done">
                {{
                    user_store.all_user_data.test_results.find(
                        (test: any) => test.title === 'temperament'
                    ).results.temperament
                }}
            </span>
            <RouterLink to="/tests/temperamentos">
                {{
                    temperament_test_done
                        ? 'Ver resultados'
                        : 'Descubre tu Temperamento'
                }}
            </RouterLink>
        </h3>
        <h3>
            Objetivo:
            <span v-if="goal_test_done">
                {{
                    user_store.all_user_data.test_results.find(
                        (test: any) => test.title === 'goal'
                    ).results.goal
                }}
            </span>
            <RouterLink to="/tests/meta">
                {{ goal_test_done ? 'Ver resultados' : 'Descubre tu Objetivo' }}
            </RouterLink>
        </h3>
    </section>
</template>

<style scoped lang="scss">
.test__results__container {
    display: flex;
    flex-direction: column;
    gap: 0;

    span {
        margin-right: 0.5rem;
    }
}
</style>
