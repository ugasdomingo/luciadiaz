<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth-store'
import WarningLoggingComponent from './WarningLoggingComponent.vue';
import TemperamentResultComponent from './results/TemperamentResultComponent.vue';
import TemperamentFormComponent from './forms/TemperamentFormComponent.vue';

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
        <TemperamentResultComponent
            v-if="auth_store.user_data.test_results.find(test => test.test_name === 'Temperamento')"
            :temperament_results="auth_store.user_data.test_results.find(test => test.test_name === 'Temperamento').results"
            :user_name="auth_store.user_data.user.name" />
        <TemperamentFormComponent v-else :logged="auth_store.token ? true : false" />
    </section>
</template>

<style scoped lang="scss"></style>