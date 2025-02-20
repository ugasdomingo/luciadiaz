<script setup lang="ts">
//Import tools
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { therapies } from '@/static/therapies';
import { useUtilStore } from '@/stores/util-store';

//States
const route = useRoute();
const util_store = useUtilStore();
const therapy = ref();
const show_tutorial = ref(false);

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
            <h1>{{ therapy.title }}</h1>
            <img :src="therapy.image_url" alt="therapy.title" />
            <p v-html="therapy.description"></p>
        </section>
        <aside class="actions__container">
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
                @click="util_store.show_other_payment_method = true"
            >
                Ver otros métodos de pago
            </button>

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
        box-sizing: border-box;

        h1 {
            margin-bottom: 0;
        }

        img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            object-position: center;
            border-radius: 1rem;
        }
    }

    .actions__container {
        width: 30%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        position: fixed;
        top: 6rem;
        right: 4rem;
        box-sizing: border-box;

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

@media screen and (max-width: 768px) {
    .page {
        flex-direction: column;
        margin-top: 4rem;

        .info__container {
            width: 100%;

            h1 {
                font-size: 2.5rem;
                margin-top: 0;
            }

            img {
                height: 200px;
                border-radius: 1rem;
            }
        }

        .actions__container {
            width: 100%;
            gap: 0.5rem;
            margin-top: 2rem;
            position: static;
            top: 0;
            right: 0;
            padding: 0;
        }
    }
}
</style>
