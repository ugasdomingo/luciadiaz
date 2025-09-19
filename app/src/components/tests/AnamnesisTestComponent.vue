<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '../../stores/auth-store'
import AnamnesisFormComponent from './forms/AnamnesisFormComponent.vue';
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
        <div v-if="auth_store.user_data.test_results.find(test => test.test_name === 'Anamnesis')">
            <h2>Ya has completado el test de Anamnesis</h2>
            <p>Gracias por tu tiempo</p>
            <p>Si tienes algunda duda o necesitas modificar algo, por favor contacta conmigo</p>
        </div>
        <AnamnesisFormComponent v-else />
    </section>
</template>

<style scoped lang="scss">
div {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
</style>
