<script setup>
import { watch } from 'vue'

// Props para controlar el loading - conecta con tu store
const props = defineProps({
    isVisible: {
        type: Boolean,
        default: false
    }
})

// Bloquear scroll cuando está cargando
watch(() => props.isVisible, (newValue) => {
    if (newValue) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = ''
    }
})
</script>

<template>
    <Transition name="loading">
        <div v-if="isVisible" class="loading-overlay">
            <div class="loading-backdrop"></div>
            <div class="loading-content">
                <div class="spinner">
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                    <div class="spinner-ring"></div>
                </div>
                <div class="loading-text">
                    <span class="dot">.</span>
                    <span class="dot">.</span>
                    <span class="dot">.</span>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loading-backdrop {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(245, 240, 255, 0.85);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
}

.loading-content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;
    padding: 2rem;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
    box-shadow: 0 8px 32px rgba(147, 112, 219, 0.15);
    border: 1px solid rgba(221, 160, 221, 0.2);
}

.spinner {
    position: relative;
    width: 60px;
    height: 60px;
}

.spinner-ring {
    position: absolute;
    width: 100%;
    height: 100%;
    border: 3px solid transparent;
    border-radius: 50%;
    animation: spin 2s linear infinite;
}

.spinner-ring:nth-child(1) {
    border-top-color: #DDA0DD;
    animation-delay: 0s;
}

.spinner-ring:nth-child(2) {
    border-right-color: #E6E6FA;
    animation-delay: -0.5s;
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
}

.spinner-ring:nth-child(3) {
    border-bottom-color: #F0E6FF;
    animation-delay: -1s;
    width: 60%;
    height: 60%;
    top: 20%;
    left: 20%;
}

.loading-text {
    display: flex;
    gap: 0.3rem;
    align-items: center;
}

.dot {
    width: 8px;
    height: 8px;
    background: #DDA0DD;
    border-radius: 50%;
    animation: bounce 1.4s ease-in-out infinite both;
    font-size: 0;
}

.dot:nth-child(1) {
    animation-delay: -0.32s;
}

.dot:nth-child(2) {
    animation-delay: -0.16s;
}

.dot:nth-child(3) {
    animation-delay: 0s;
}

/* Animaciones */
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes bounce {

    0%,
    80%,
    100% {
        transform: scale(0.8);
        opacity: 0.5;
    }

    40% {
        transform: scale(1.2);
        opacity: 1;
    }
}

/* Transiciones de entrada/salida */
.loading-enter-active {
    transition: all 0.3s ease-out;
}

.loading-leave-active {
    transition: all 0.25s ease-in;
}

.loading-enter-from {
    opacity: 0;
    transform: scale(0.9);
}

.loading-leave-to {
    opacity: 0;
    transform: scale(1.05);
}

.loading-enter-from .loading-backdrop {
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
}

/* Responsive */
@media (max-width: 480px) {
    .loading-content {
        padding: 1.5rem;
        margin: 1rem;
    }

    .spinner {
        width: 50px;
        height: 50px;
    }
}
</style>