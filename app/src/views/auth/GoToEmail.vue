<script setup>
const close_tab = () => {
    window.close()
}
</script>

<template>
    <main class="pages">
        <h1>Te he enviado un correo de verificación</h1>
        <p>Ve a tu correo electrónico y haz clic en el enlace para verificarlo</p>
       <button class="action-btn" @click="close_tab">Cerrar esta pestaña</button>
    </main>
</template>

<style scoped lang="scss">
.pages {
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;

    h1 {
        margin-bottom: 1rem;
    }
}
</style>
