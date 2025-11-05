<script setup>
import { ref, defineProps } from 'vue';
import { useAuthStore } from '../../../stores/auth-store.js';
import { temperament_results_info } from '../../../static/answers/temperament-results.js'

const auth_store = useAuthStore()
const props = defineProps({
    temperament_results: { type: Object, required: true },
    user_name: { type: String, required: true }
})

const temperament_result = ref(temperament_results_info.find(result => result.title === props.temperament_results.temperament))
const other_temperaments = ref(temperament_results_info.filter(result => result.title !== props.temperament_results.temperament))
const show_others = ref(false)
</script>

<template>
    <section class="temperament-result-section">
        <h3>{{ props.user_name.split(" ")[0] || auth_store.user_data.user.name.split(" ")[0] }}, eres {{
            temperament_result.title }}.
        </h3>
        <article class="temperament-info">
            <h4>El lema de los {{ temperament_result.title }}s, es: "{{ temperament_result.slogan }}"</h4>
            <ul>
                <li><strong>Deseo:</strong> {{ temperament_result.deseo }}</li>
                <li><strong>Necesidades:</strong> {{ temperament_result.necesidades }}</li>
                <li><strong>Fuerzas claves:</strong> {{ temperament_result.fuerzas }}</li>
                <li><strong>Debilidades claves:</strong> {{ temperament_result.debilidades }}</li>
                <li><strong>Se deprime cuando:</strong> {{ temperament_result.deprime }}</li>
                <li><strong>Tiene miedo de:</strong> {{ temperament_result.miedo }}</li>
                <li><strong>Le gustan las personas que:</strong> {{ temperament_result.gustan }}</li>
                <li><strong>No le gustan las personas que:</strong> {{ temperament_result.no_gustan }}</li>
                <li><strong>Podría mejorar si:</strong> {{ temperament_result.mejorar }}</li>
                <li><strong>Como lider el/ella:</strong> {{ temperament_result.lider }}</li>
                <li><strong>Tiende a casarse con:</strong> {{ temperament_result.casarse }}</li>
                <li><strong>Reacciona al estrés:</strong> {{ temperament_result.estres }}</li>
                <li><strong>Se le reconoce por:</strong> {{ temperament_result.reconoce }}</li>
            </ul>
        </article>
        <div class="total-results">
            <h3>Resultados totales</h3>
            <ul>
                <li>
                    <strong>Melancólico:</strong> {{ props.temperament_results.melancholic }}
                </li>
                <li>
                    <strong>Sanguíneo:</strong> {{ props.temperament_results.sanguine }}
                </li>
                <li>
                    <strong>Colérico:</strong> {{ props.temperament_results.choleric }}
                </li>
                <li>
                    <strong>Flemático:</strong> {{ props.temperament_results.phlegmatic }}
                </li>
            </ul>
        </div>
        <button class="nobg-btn" @click="show_others = !show_others">
            {{ show_others ? 'Ocultar otros temperamentos' : 'Ver otros temperamentos' }}
        </button>
        <div class="other-temperaments" v-if="show_others">
            <article v-for="temperament in other_temperaments" :key="temperament.title" class="temperament-info">
                <h3>{{ temperament.title }}</h3>
                <h4>Su lema es: "{{ temperament.slogan }}"</h4>
                <ul>
                    <li><strong>Deseo:</strong> {{ temperament.deseo }}</li>
                    <li><strong>Necesidades:</strong> {{ temperament.necesidades }}</li>
                    <li><strong>Fuerzas claves:</strong> {{ temperament.fuerzas }}</li>
                    <li><strong>Debilidades claves:</strong> {{ temperament.debilidades }}</li>
                    <li><strong>Se deprime cuando:</strong> {{ temperament.deprime }}</li>
                    <li><strong>Tiene miedo de:</strong> {{ temperament.miedo }}</li>
                    <li><strong>Le gustan las personas que:</strong> {{ temperament.gustan }}</li>
                    <li><strong>No le gustan las personas que:</strong> {{ temperament.no_gustan }}</li>
                    <li><strong>Podría mejorar si:</strong> {{ temperament.mejorar }}</li>
                    <li><strong>Como lider el/ella:</strong> {{ temperament.lider }}</li>
                    <li><strong>Tiende a casarse con:</strong> {{ temperament.casarse }}</li>
                    <li><strong>Reacciona al estrés:</strong> {{ temperament.estres }}</li>
                    <li><strong>Se le reconoce por:</strong> {{ temperament.reconoce }}</li>
                </ul>
            </article>
        </div>
    </section>
</template>

<style scoped lang="scss">
.temperament-result-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 0 0 2rem;
    box-sizing: border-box;

    h3 {
        margin: 0;
    }

    .temperament-info {
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
        box-sizing: border-box;

        h4 {
            margin: 0;
        }

        ul {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            list-style: none;
        }
    }

    .total-results {
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
        box-sizing: border-box;

        h3 {
            color: var(--color-text);
            font-weight: 700;
        }

        ul {
            display: flex;
            gap: 1.5rem;
            list-style: none;
        }
    }

    .nobg-btn {
        margin: 0 0 0 auto;
    }

    .other-temperaments {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .temperament-info {
            display: flex;
            flex-direction: column;
            gap: 0;
            padding: 1rem;
            border-radius: 1rem;
            box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
            box-sizing: border-box;
        }
    }
}

@media screen and (max-width: 720px) {
    .temperament-result-section {
        padding: 0 0 0 1rem;

        .temperament-info {
            padding: 0.5rem;
        }

        .total-results {

            padding: 0.5rem;
            box-sizing: border-box;

            h3 {
                margin: 0;
            }

            ul {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                list-style: none;
            }
        }
    }
}
</style>
