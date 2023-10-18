<script setup lang="ts">
//Import tools
import { RouterLink, useRouter } from 'vue-router';
import { onMounted, onUnmounted, ref } from 'vue';

//Import components
import NavbarComponent from './NavbarComponent.vue';

const router = useRouter();
//Variables
const backgroundWhite = ref(false);
const path = ref(router.currentRoute.value.path);

//Functions
const changeBackground = () => {
    if (window.scrollY > 10) {
        backgroundWhite.value = true;
    } else {
        backgroundWhite.value = false;
    }
};

router.afterEach(() => {
    path.value = router.currentRoute.value.path;
});
//Hooks
onMounted(() => {
    window.addEventListener('scroll', changeBackground);
});

onUnmounted(() => {
    window.removeEventListener('scroll', changeBackground);
});
</script>

<template>
    <header
        :class="{
            'background-white': backgroundWhite,
            'justify-center': path == '/',
        }"
    >
        <RouterLink to="/" v-if="path !== '/'">
            <h2 class="logo">Lucia Diaz</h2>
        </RouterLink>
        <NavbarComponent />
    </header>
</template>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-height: 10vh;
    padding: 1rem 4rem;
    background-color: transparent;
    z-index: 10;
    position: fixed;
    top: 0;
    box-sizing: border-box;
}
/* Gestion de la barre de navigation */
.justify-center {
    justify-content: center;
}
.logo {
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2rem #4b1264da);
}
.background-white {
    background-color: rgba(255, 255, 255, 0.95);
    box-shadow: 0 0 1em var(--color-primary);
    color: var(--color-primary);
}
</style>
