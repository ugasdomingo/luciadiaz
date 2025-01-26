<script setup lang="ts">
//Import tools
import { useUserStore } from '@/stores/user-store';

//Use tools
const user_store = useUserStore();
</script>

<template>
    <form @submit.prevent="user_store.login()">
        <input
            v-model="user_store.access_email"
            type="email"
            placeholder="Email"
        />
        <input
            v-model="user_store.access_password"
            type="password"
            placeholder="Password"
        />
        <button class="button__action" type="submit">Iniciar sesión</button>
    </form>
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem 2rem;

    button {
        cursor: pointer;
    }
}
</style>
