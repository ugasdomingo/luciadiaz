<script setup lang="ts">
//Import tools
import { useUserStore } from '@/stores/user-store';

//Import components
import AdminComponent from '@/components/dashboard-component/AdminComponent.vue';
import ShowUserComponent from '@/components/dashboard-component/ShowUserComponent.vue';

//Use tools
const user_store = useUserStore();
</script>

<template>
    <main class="page">
        <AdminComponent v-if="user_store.user_role === 'Admin'" />
        <ShowUserComponent v-else />
    </main>
</template>

<style scoped lang="scss">
@media screen and (max-width: 768px) {
    .page {
        height: fit-content;
        padding: 4rem 1rem;
        gap: 1rem;
    }
}
</style>
