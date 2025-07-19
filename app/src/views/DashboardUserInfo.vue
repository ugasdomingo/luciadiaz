<template>
    <main class="pages">
        <h2>Información de {{ user.user.name.split(' ')[0] }}</h2>
        {{ user_store.user }}
        <section class="user__info">
            <p>Nombre completo: {{ user.user.name }}</p>
            <p>Correo electrónico: {{ user.user.email }}</p>
            <p>Rol: {{ user.user.role }}</p>
            <p>Historial médico: {{ user.user.medical_record }}</p>
        </section>
    </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useUserStore } from '../stores/user-store.js'
import { useUtilStore } from '../stores/util-store.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const user_store = useUserStore()
const util_store = useUtilStore()
const user = ref({})

onBeforeMount(async () => {
    util_store.set_loading(true)
    console.log(route.params.user_id)
    await user_store.get_user_by_id(route.params.user_id)
    user.value = user_store.user
    util_store.set_loading(false)
})
</script>

<style scoped lang="scss">
</style>
