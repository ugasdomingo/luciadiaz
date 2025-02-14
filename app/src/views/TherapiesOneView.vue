<script setup lang="ts">
//Import tools
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { therapies } from '@/static/therapies';

//States
const route = useRoute();
const therapy = ref();
const show_tutorial = ref(false);
const show_other_payments = ref(false);

//Methods
const get_therapy_to_show = () => {
    if (route.params.therapy === 'individual') {
        therapy.value = therapies[0];
    } else if (route.params.therapy === 'pareja') {
        therapy.value = therapies[1];
    } else {
        therapy.value = therapies[2];
    }
};

//Lifecicle
onBeforeMount(() => {
    get_therapy_to_show();
});
</script>

<template>
    <main class="page">
        <section class="info__container">
            <img :src="therapy.image_url" alt="therapy.title" />
            <p>{{ therapy.description }}</p>
        </section>
        <aside class="actions__container">
            <h1>{{ therapy.title }}</h1>
            <p>Duración: <span>45 minutos</span></p>
            <p>
                Costo: <span>{{ therapy.cost }}€</span>
            </p>
            <p>Lugar: <span>Online o presencial en Madrid</span></p>
            <a
                :href="therapy.paypal_button"
                target="_blank"
                class="button__action"
                >Pagar con tarjeta y agendar cita</a
            >

            <button
                class="button__simply"
                @click="show_other_payments = !show_other_payments"
            >
                {{ show_tutorial ? 'Ocultar' : 'Ver' }} otros métodos de pago
            </button>
            <section class="other__payments" v-if="show_other_payments">
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
            <button
                class="button__simply"
                @click="show_tutorial = !show_tutorial"
            >
                {{ show_tutorial ? 'Ocultar' : 'Ver' }} tutorial para agendar
            </button>
        </aside>
    </main>
</template>

<style scoped lang="scss">
.page {
    .info__container {
        width: 60%;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            object-position: center;
            border-radius: 10rem;
        }
    }

    .actions__container {
        width: 30%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: absolute;
        top: 3rem;
        right: 4rem;

        h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 0;
        }

        p {
            font-size: 1rem;
            margin: 0;

            span {
                font-weight: 700;
            }
        }
    }
}
</style>
