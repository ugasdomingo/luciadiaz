<script setup lang="ts">
//Import tools
import { useUtilStore } from '@/stores/util-store';

//use store
const util_store = useUtilStore();
</script>

<template>
    <div class="modal__container">
        <section class="modal__content">
            <img
                src="/icon/close.svg"
                alt="close"
                @click="util_store.show_other_payment_method = false"
            />
            <h2>Modal</h2>
        </section>
    </div>
</template>

<style scoped lang="scss">
.modal__container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;

    .modal__content {
        background-color: var(--color-white);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        width: 90%;
        max-width: 40rem;
        position: relative;

        img {
            width: 2rem;
            height: 2rem;
            position: absolute;
            top: 1rem;
            right: 1rem;
            cursor: pointer;
        }
    }
}
</style>
