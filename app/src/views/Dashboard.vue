<template>
    <main class="pages">
        <AdminDashboardComponent v-if="auth_store.user_data.user.role === 'Admin'" />
        <UserDashboardComponent v-else />
    </main>
</template>

<script setup>
import { useAuthStore } from '../stores/auth-store';
import AdminDashboardComponent from '../components/dashboard/AdminDashboardComponent.vue'
import UserDashboardComponent from '../components/dashboard/UserDashboardComponent.vue'

const auth_store = useAuthStore()

</script>