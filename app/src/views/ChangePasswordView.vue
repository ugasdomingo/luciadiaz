<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user-store';
import { useUtilStore } from '@/stores/util-store';

//Import components
import LoadingComponent from '@/components/common/LoadingComponent.vue';

//Use tools
const route = useRoute();
const user_store = useUserStore();
const util_store = useUtilStore();
const new_password = ref('');
const confirm_password = ref('');

//Methods
const change_password = async () => {
    try {
        util_store.isLoading = true;
        await user_store.change_password(
            new_password.value,
            route.params.token as string
        );
    } catch (error) {
        console.log(error);
    } finally {
        util_store.isLoading = false;
    }
};
</script>

<template>
    <main class="page">
        <h2>Crea una nueva contraseña</h2>
        <section class="change-password">
            <LoadingComponent v-if="util_store.isLoading" text="Cargando..." />
            <form v-else @submit.prevent="change_password()">
                <input
                    type="password"
                    placeholder="Nueva contraseña"
                    v-model="new_password"
                />
                <input
                    type="password"
                    placeholder="Confirma tu nueva contraseña"
                    v-model="confirm_password"
                />
                <button
                    type="submit"
                    class="button__action"
                    v-if="
                        confirm_password === new_password &&
                        confirm_password.length > 0
                    "
                >
                    Cambiar contraseña
                </button>
            </form>
        </section>
    </main>
</template>

<style scoped lang="scss">
.page {
    align-items: center;

    h2 {
        margin-top: 5rem;
    }
    .change-password {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin: 0;

        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1rem;
        }
    }
}
</style>
