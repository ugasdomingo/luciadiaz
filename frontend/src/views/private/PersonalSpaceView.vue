<template>
    <AdminSpaceComponent v-if="userStore.userRole === 'Admin'" />
    <PersonalSpaceComponent v-else />
</template>

<script setup lang="ts">
//Import tools
import { useUserStore } from '../../stores/user-store';

//Import components
import PersonalSpaceComponent from '../../components/private/PersonalSpaceComponent.vue';
import AdminSpaceComponent from '../../components/private/AdminSpaceComponent.vue';

//Active tools
const userStore = useUserStore();
</script>

<style scoped lang="scss">
main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background-color: #f5f5f5;
}

h1 {
    font-size: 3rem;
    font-weight: 300;
    color: var(--color-primary);
}
</style>
