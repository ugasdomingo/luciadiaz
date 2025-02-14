<script setup lang="ts">
import { defineProps, withDefaults } from 'vue';

// Definición de props con valores por defecto
const props = withDefaults(
    defineProps<{
        text?: string;
        fullscreen?: boolean;
    }>(),
    {
        text: '',
        fullscreen: false
    }
);
</script>

<template>
    <div
        class="loading-spinner"
        :class="{ 'loading-spinner--fullscreen': props.fullscreen }"
    >
        <div class="spinner">
            <div class="spinner-inner"></div>
        </div>
        <div v-if="props.text" class="loading-text">
            {{ props.text }}
        </div>
    </div>
</template>

<style scoped>
.loading-spinner {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
}

.loading-spinner--fullscreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 9999;
}

.spinner {
    width: 50px;
    height: 50px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.spinner-inner {
    width: 100%;
    height: 100%;
}

.loading-text {
    color: #333;
    font-size: 1rem;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
