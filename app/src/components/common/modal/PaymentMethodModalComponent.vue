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
            <section class="other__payments">
                <h3>Métodos de pago adicionales</h3>
                <p>Pagos en Europa</p>
                <ul>
                    <li>Cuenta: <span>BE58 9675 2118 2679</span></li>
                    <li>Titular: <span>Lucia Antonella Diaz Gimenez</span></li>
                    <li>
                        Bizum España: <span>624 72 18 96 - Lucia Diaz</span>
                    </li>
                </ul>
                <p>Pagos Estados Unidos</p>
                <ul>
                    <li>Zelle: <span>+1 </span></li>
                    <li>Titular: <span>Milagros Gimenez</span></li>
                </ul>
                <p>Pago Móvil Venezuela</p>
                <ul>
                    <li>Teléfono: <span>0414 260 44 96</span></li>
                    <li>Banco: <span>Provincial</span></li>
                    <li>Cédula: <span>V-19.066.267</span></li>
                </ul>
            </section>
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
    box-sizing: border-box;

    .modal__content {
        width: 60%;
        background-color: var(--color-white);
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
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

@media screen and (max-width: 768px) {
    .modal__container {
        .modal__content {
            width: 85%;
        }
    }
}
</style>
