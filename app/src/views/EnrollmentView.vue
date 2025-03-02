<script setup lang="ts">
//Import tools
import { computed, onBeforeMount, onMounted } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { useEnrollmentStore } from '@/stores/enrollment-store';
import { useRoute } from 'vue-router';
import { formaction_paths } from '@/static/formations-path';

//Active tools
const user_store = useUserStore();
const enrollment_store = useEnrollmentStore();
const route = useRoute();

//Variables
const paypal_code = computed(() => route.params.paypal_code);

//Functions
const send_enrollment = async () => {
    console.log(paypal_code.value);
    const formation = formaction_paths.find(
        (formation) => formation.paypal_code === paypal_code.value
    );

    console.log(formation);

    if (formation && user_store.token) {
        await enrollment_store.create_enrollment(
            formation.fid,
            formation.payment_methods,
            'approved'
        );
    }
};

//Hooks
onBeforeMount(async () => {
    user_store.token ? null : await user_store.refresh();
});

onMounted(() => {
    setTimeout(() => {
        send_enrollment();
    }, 2000);
});
</script>

<template>
    <main class="page">
        <h1>Gracias por inscribirte en mi formación</h1>
        <p>
            Ya puedes ver tu registro en tu área personal. Es un honor para mi
            poder acompañarte en cada paso de tu proceso.
        </p>
        <RouterLink to="/area-privada" class="button__action">
            Ir a mi área personal
        </RouterLink>
    </main>
</template>

<style scoped lang="scss">
.page {
    height: 100vh;
    justify-content: center;
    text-align: center;

    h1 {
        margin-bottom: 1rem;
    }

    p {
        font-size: 1.2rem;
        margin-bottom: 2rem;
    }
}
</style>
