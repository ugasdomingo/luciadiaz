<script setup lang="ts">
//Import tools
import { onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { useUtilStore } from '@/stores/util-store';
import { useRouter } from 'vue-router';

//Import components
import AppoinmentCalendlyComponent from '@/components/common/forms/AppoinmentCalendlyComponent.vue';

//Use tools
const user_store = useUserStore();
const util_store = useUtilStore();
const router = useRouter();

//Functions
const check_user_registed = () => {
    localStorage.getItem('user') ? user_store.refresh() : null;
};

const handdle_user_role = async () => {
    await user_store.update_user_role('patient');
    localStorage.setItem('new_role', 'patient');
    setTimeout(() => {
        router.push('/area-privada');
    }, 2000);
};

//Lifecycle
onBeforeMount(() => {
    check_user_registed();
});
</script>

<template>
    <main class="page" v-if="user_store.token">
        <AppoinmentCalendlyComponent />
        <button class="button__action" @click="handdle_user_role">
            ¿Cita confirmada? Completa tu historial clínico
        </button>
    </main>
    <main class="page" v-else>
        <h2>Por favor, inicia sesión o regístrate para agendar una cita</h2>
        <button
            class="button__action"
            @click="util_store.show_access_modal = true"
        >
            Iniciar sesión
        </button>
    </main>
</template>

<style scoped lang="scss">
.page {
    h2 {
        margin-bottom: 1rem;
    }

    button {
        align-self: center;
        margin-top: 0;
    }
}
</style>
