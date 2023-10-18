<script setup lang="ts">
import { PropType } from 'vue';
import { ITherapyInfo } from '../static/therapyInfo';

defineProps({
    therapyInfo: {
        type: Object as PropType<ITherapyInfo>,
        required: true,
    },
});
</script>

<template>
    <main>
        <section class="content-container">
            <h1>{{ therapyInfo.title }}</h1>
            <img :src="therapyInfo.image" :alt="therapyInfo.alt" />
            <p>{{ therapyInfo.description }}</p>
        </section>
        <aside class="payment-methods">
            <h2>Cómo agendar una cita:</h2>
            <div class="paso-uno">
                <h3>1. Realiza el Pago</h3>
                <p>
                    Puedes pagar a través de tus tarjetas de débito, crédito o
                    Paypal
                </p>
                <a :href="therapyInfo.payLink">Realizar el pago</a>
            </div>
            <div class="paso-dos">
                <h3>2. Agenda tu cita</h3>
                <p>
                    Una vez realizado el pago, puedes agendar tu cita en el
                    horario que más te convenga en la página web a la que serás
                    sedireccionado(a).
                </p>
            </div>
            <div class="paso-tres">
                <h3>3. Completa el Historial</h3>
                <p>
                    Una vez reservada tu cita, en tu escritorio tendrás el
                    acceso para completar el Historial, el cual es necesario
                    completar almenos 24 horas antes de la sesión.
                </p>
                <RouterLink to="/espacio-personal"
                    >Ir a tu Espacio Personal</RouterLink
                >
            </div>
        </aside>
    </main>
</template>

<style scoped lang="scss">
main {
    display: flex;
    width: 100%;
    min-height: 90vh;
    position: relative;
    padding: 4rem 0 0;

    .content-container {
        width: 60%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 60%;
        padding: 2rem;

        h1 {
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        img {
            width: 100%;
            max-width: 500px;
            margin-bottom: 1rem;
        }

        p {
            font-size: 1.2rem;
            font-weight: 400;
            text-align: justify;
        }
    }

    .payment-methods {
        width: 40%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40%;
        padding: 2rem;
        position: sticky;
        top: 10vh;
        right: 0;

        h2 {
            font-size: 1.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
        }

        .paso-uno,
        .paso-dos,
        .paso-tres {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 1rem;
            margin-bottom: 1rem;
            border: 1px solid #000;
            border-radius: 5px;

            h3 {
                font-size: 1.2rem;
                font-weight: 700;
                margin-bottom: 1rem;
            }

            p {
                font-size: 1rem;
                font-weight: 400;
                text-align: justify;
            }

            a {
                font-size: 1rem;
                font-weight: 700;
                text-decoration: none;
                color: #000;
                background-color: #fff;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                border: 1px solid #000;
                transition: all 0.3s ease-in-out;

                &:hover {
                    background-color: #000;
                    color: #fff;
                }
            }
        }
    }
}
</style>
