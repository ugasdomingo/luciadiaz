<script setup lang="ts">
//Import tools
import { onBeforeMount, ref } from 'vue';
import { useTestStore } from '../../../stores/test-store';
import { useUserStore } from '../../../stores/user-store';

//Activate tools
const testStore = useTestStore();
const userStore = useUserStore();
const goal = ref();

//Get goal
onBeforeMount(() => {
    goal.value = testStore.metas[0];
});
</script>

<template>
    <main class="result-container">
        <h4>
            Para mi meta: <span>{{ goal.answers.objective }}</span>
        </h4>
        <p>
            Yo, {{ userStore.user }}, conscientemente quiero
            {{ goal.answers.reason1 }}, ya que rechazo en mi
            {{ goal.answers.reason3 }}. Además quisiera
            {{ goal.answers.reason4 }} ya que bloqueo en mi
            {{ goal.answers.reason6 }}
        </p>
    </main>
</template>

<style scoped lang="scss">
.result-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 8rem 4rem 2rem;
    text-align: center;

    h4 {
        font-size: 2rem;
        margin-bottom: 2rem;
        text-align: center;

        span {
            text-decoration: underline;
        }
    }

    p {
        font-size: 1.75rem;
        font-weight: 100;
        margin-bottom: 2rem;
        text-align: center;
        width: 80%;

        span {
            color: var(--color-white);
            background-color: var(--color-primary);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
        }
    }
}
</style>
