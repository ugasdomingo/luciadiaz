<template>
    <div class="Goal-container">
        <GoalResultComponent v-if="testStore.metas.length > 0" />
        <GoalFormComponent v-else />
    </div>
</template>

<script setup lang="ts">
//Import tools
import { onBeforeMount } from 'vue';
import { useTestStore } from '../../stores/test-store';
import { useUserStore } from '../../stores/user-store';

//Import components
import GoalFormComponent from '../../components/tests/goals/GoalsFormComponent.vue';
import GoalResultComponent from '../../components/tests/goals/GoalsResultComponent.vue';

//Activate tools
const testStore = useTestStore();
const userStore = useUserStore();

//User made the test
onBeforeMount(async () => {
    await userStore.refreshToken();
    await testStore.getOwnTestResultByUserId();
});
</script>

<style scoped lang="scss"></style>
