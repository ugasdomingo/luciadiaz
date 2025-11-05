<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth-store'
import WarningLoggingComponent from './WarningLoggingComponent.vue';
import LetterResultComponent from './results/LetterResultComponent.vue';
import LetterFormComponent from './forms/LetterFormComponent.vue';

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
        <LetterResultComponent
            v-if="auth_store.user_data.test_results.find(test => test.test_name === 'Carta del Inconsciente')"
            :letter_results="auth_store.user_data.test_results.find(test => test.test_name === 'Carta del Inconsciente')?.results"
            :user_name="auth_store.user_data.user.name.split(' ')[0]" />
        <LetterFormComponent v-else />
    </section>
</template>