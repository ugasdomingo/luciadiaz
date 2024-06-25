<script setup lang="ts">
//Import tools
import { useRouter } from 'vue-router';
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
    <header>
        <NavbarComponent />
    </header>
</template>

<style scoped lang="scss">
header {
    display: flex;
    justify-content: center;
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
</style>
