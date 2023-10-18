<script setup lang="ts">
//Import tools
import { useUtilStore } from '../stores/util-store';

//Acitvate tools
const utilStore = useUtilStore();
</script>

<template>
    <div class="alert" :class="utilStore.alertType" v-if="utilStore.showAlert">
        {{ utilStore.alertMessage }}
    </div>
</template>

<style scoped lang="scss">
.alert {
    width: 50%;
    margin: 0 auto;
    padding: 1rem;
    border-radius: 0.5rem;
    font-size: 1.5rem;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 100;
    text-align: center;
    &.success {
        background-color: #4caf50;
        color: #fff;
    }
    &.error {
        background-color: #f44336;
        color: #fff;
    }
}
</style>
