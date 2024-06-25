<template>
    <div class="Archetype-container">
        <ArchetypeResultsComponent v-if="testStore.userArchetype" />
        <ArchetypeFormComponent v-else />
    </div>
</template>

<script setup lang="ts">
//Import tools
import { onBeforeMount } from 'vue';
import { useTestStore } from '../../stores/test-store';
import { useUserStore } from '../../stores/user-store';

//Import components
import ArchetypeFormComponent from '../../components/tests/archetype/ArchetypeFormComponent.vue';
import ArchetypeResultsComponent from '../../components/tests/archetype/ArchetypeResultsComponent.vue';

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
