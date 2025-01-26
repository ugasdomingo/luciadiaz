<script setup lang="ts">
//Import tools
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user-store';

//States
const user_store = useUserStore();
const hidden = ref(false);
let last_scroll = 0;

//Methods
const handleScroll = () => {
    const current_scroll = window.scrollY;
    if (current_scroll > last_scroll && current_scroll > 50) {
        hidden.value = true;
    } else {
        hidden.value = false;
    }
    last_scroll = current_scroll;
};

//Lifecycle
onMounted(() => {
    window.addEventListener('scroll', handleScroll);
});
</script>

<template>
    <header :class="{ hidden: hidden }">
        <RouterLink to="/" class="logo">
            <img src="/img/logo-notextbg.png" alt="Logo" />
            <h2>Lucia Diaz</h2>
        </RouterLink>
        <section class="button-area">
            <button
                class="button__transparent"
                @click="user_store.logout"
                v-if="user_store.token"
            >
                Cerrar sesión
            </button>
            <RouterLink to="/area-privada" class="button__action">
                Área Privada
            </RouterLink>
        </section>
    </header>
</template>

<style scoped lang="scss">
header {
    width: 100%;
    height: 5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4rem;
    background-color: transparent;
    transition: transform 0.3s;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
    overflow-y: hidden;
    box-sizing: border-box;

    &.hidden {
        transform: translateY(-100%);
    }

    .logo {
        display: flex;
        text-decoration: none;
        align-items: center;
        box-sizing: border-box;
        img {
            width: 4rem;
            height: 4rem;
            object-fit: cover;
        }
        h2 {
            margin-left: 1rem;
            color: var(--color-primary);
        }
    }

    .button-area {
        display: flex;
        gap: 1rem;
    }
}
</style>
