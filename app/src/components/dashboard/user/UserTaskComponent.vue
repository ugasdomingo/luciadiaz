<script setup>
import { ref, reactive, defineProps, onMounted } from 'vue'
import { useAuthStore } from '../../../stores/auth-store.js'

const auth_store = useAuthStore()

</script>

<template>
    <section>
        <h2>Tareas pendientes</h2>
        <p>{{ auth_store.user_data.therapy_tasks }}</p>
    </section>
</template>

<style scoped lang="scss"></style>