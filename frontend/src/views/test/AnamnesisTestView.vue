<template>
    <main>
        <h1>Test Anamnesis</h1>
        <AnamnesisResultsComponent
            v-if="testStore.anamnesis[0] !== undefined"
            :answers="answers"
        />
        <AnamnesisFormComponent v-else />
    </main>
</template>

<script setup lang="ts">
//Import tools
import { onBeforeMount } from 'vue';
import { useUserStore } from '../../stores/user-store';
import { useTestStore } from '../../stores/test-store';

//Import components
import AnamnesisFormComponent from '../../components/tests/anamnesis/AnamnesisFormComponent.vue';
import AnamnesisResultsComponent from '../../components/tests/anamnesis/AnamnesisResultsComponent.vue';

//Activate tools
const userStore = useUserStore();
const testStore = useTestStore();
let answers: any = {};

//User is logued?
onBeforeMount(async () => {
    if (localStorage.getItem('token')) {
        await userStore.refreshToken();
        await testStore.getOwnTestResultByUserId();

        answers = testStore.anamnesis[0].answers;
    }
});
</script>

<style scoped lang="scss">
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    width: 100%;
    padding: 12vh 4rem 2rem;
    box-sizing: border-box;

    h1 {
        color: var(--color-primary);
        margin-bottom: 2rem;
    }

    .form {
        width: 50%;
    }
}
</style>
