<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth-store'
import ArchetypeFormComponent from './forms/ArchetypeFormComponent.vue';
import ArchetypeResultComponent from './results/ArchetypeResultComponent.vue';
import WarningLoggingComponent from './WarningLoggingComponent.vue';

const auth_store = useAuthStore()

onMounted(async () => {
    if (!auth_store.user_data) {
        await auth_store.refresh()
    }
})
</script>

<template>
    <WarningLoggingComponent v-if="!auth_store.token" />
    <section v-else>
        <ArchetypeResultComponent v-if="auth_store.user_data.test_results.find(test => test.test_name === 'Arquetipo')"
            :archetype_results="auth_store.user_data.test_results.find(test => test.test_name === 'Arquetipo').results"
            :user_name="auth_store.user_data.user.name" />
        <ArchetypeFormComponent v-else :logged="auth_store.token ? true : false" />
    </section>
</template>

<style scoped lang="scss"></style>
