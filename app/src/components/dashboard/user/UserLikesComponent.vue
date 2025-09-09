<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '../../../stores/auth-store.js'

const auth_store = useAuthStore()

onMounted(async () => {
    if (!auth_store.user_data) {
        await auth_store.refresh()
    }
})
</script>

<template>
    <section>
        <h2>Tus likes</h2>
        <p>{{ auth_store.user_data.likes }}</p>
    </section>
</template>

<style scoped lang="scss"></style>