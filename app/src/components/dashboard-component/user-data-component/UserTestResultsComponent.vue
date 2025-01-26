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
        <article>
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
                    Descubre tu Arquetipo
                </RouterLink>
            </h3>
        </article>
    </section>
</template>
