<script setup lang="ts">
//Import tools
import { useUserStore } from '@/stores/user-store';
import { ref } from 'vue';

//Use tools
const user_store = useUserStore();
const role = ref('user');
const policy_accepted = ref(false);
</script>

<template>
    <form>
        <input
            v-model="user_store.access_name"
            type="text"
            placeholder="Nombre Completo"
        />
        <input
            v-model="user_store.access_email"
            type="email"
            placeholder="Email"
        />
        <input
            v-model="user_store.access_phone"
            type="tel"
            placeholder="Teléfono (inclye + código de país)"
        />
        <input
            v-model="user_store.access_password"
            type="password"
            placeholder="Password"
        />
        <div class="policy">
            <p>
                Acepta nuestra
                <RouterLink to="/politicas-privacidad"
                    >política de privacidad</RouterLink
                >
                y
                <RouterLink to="/terminos-condiciones"
                    >términos y condiciones</RouterLink
                >
            </p>
            <input
                v-model="policy_accepted"
                type="checkbox"
                placeholder="Policy accepted"
            />
        </div>
        <button
            v-if="policy_accepted"
            class="button__action"
            @click="user_store.register(role, policy_accepted)"
        >
            Registrarme
        </button>
        <button v-else class="button__inactive">Registrarme</button>
    </form>
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem 2rem;

    button {
        cursor: pointer;
    }

    .policy {
        display: flex;
        gap: 1rem;
        align-items: center;

        p {
            font-size: 0.8rem;
        }
    }
}
</style>
