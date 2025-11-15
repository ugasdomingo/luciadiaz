<template>
    <main class="pages">
        <h2>Dashboard de personas inscritas en formaciones</h2>
        <p>{{ formation }}, </p>
        <p>{{ enrollment }}</p>
    </main>
</template>

<script setup>
import { onBeforeMount, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '../stores/auth-store';
import { useUtilStore } from '../stores/util-store';
import { useFormationStore } from '../stores/formation-store';

const auth_store = useAuthStore();
const util_store = useUtilStore();
const formation_store = useFormationStore();
const route = useRoute();
const formation = computed(() => formation_store.formation);
const enrollment = computed(() => {
    if (!auth_store.user_data) return [];
    return auth_store.user_data.enrollments.filter(enrollment => enrollment.formation_id === formation.value._id);
});

onBeforeMount(async () => {
    try {
        util_store.set_loading(true);
        if (!formation_store.formation) {
            await formation_store.get_formation_by_slug(route.params.formation_slug);
        }
    } catch (error) {
        console.log(error);
    } finally {
        util_store.set_loading(false);
    }
});
</script>
