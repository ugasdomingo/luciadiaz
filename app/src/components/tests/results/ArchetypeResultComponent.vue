<script setup>
import { defineProps, ref } from 'vue';
import { archetype_results_info } from '../../../static/answers/archetype-results.js'
import { useAuthStore } from '../../../stores/auth-store.js';

const props = defineProps({
    archetype_results: { type: Object || null, default: null },
    user_name: { type: String, default: '' }
})
const auth_store = useAuthStore()

const archetype_result = ref(archetype_results_info.find(result => result.archetype_name === props.archetype_results.archetype))
const archetype_others = ref(archetype_results_info.filter(result => result.archetype_name !== props.archetype_results.archetype))
const show_others = ref(false)
</script>

<template>
    <section class="archetype-result-section">
        <h3>
            {{ props.user_name.split(" ")[0] || auth_store.user_data.user.name.split(" ")[0] }}, eres {{
                props.archetype_results.archetype }}.
        </h3>
        <article class="archetype-info">
            <p>Para ti la máxima necesidad es <strong>{{
                archetype_result.archetype_necesities }}</strong>
            </p>
            <p>Tienes las siguientes emociones privadas contenidas: </p>
            <ul>
                <li v-for="emotion in archetype_result.archetype_emotions" :key="emotion">{{ emotion }}</li>
            </ul>
            <p>Tu principal cualidad: <strong>{{ archetype_result.archetype_quality }}</strong></p>
            <p>Tu toma de decisiones: <strong>{{ archetype_result.archetype_decision }}</strong></p>
            <p>Lo que te gusta: <strong>{{ archetype_result.archetype_like }}</strong></p>
        </article>
        <div class="total-results">
            <h3>Resultados totales</h3>
            <ul>
                <li>
                    <strong>Sabio Rey:</strong> {{ props.archetype_results.wise }}
                </li>
                <li>
                    <strong>Guerrero:</strong> {{ props.archetype_results.warrior }}
                </li>
                <li>
                    <strong>Mago:</strong> {{ props.archetype_results.wizard }}
                </li>
                <li>
                    <strong>Amante:</strong> {{ props.archetype_results.lover }}
                </li>
            </ul>
        </div>
        <button class="nobg-btn" @click="show_others = !show_others">
            {{ show_others ? 'Ocultar otros arquetipos' : 'Ver otros arquetipos' }}
        </button>
        <div v-if="show_others" class="archetype-others__container">
            <article v-for="archetype in archetype_others" :key="archetype.archetype_name"
                class="archetype-info-others">
                <h4>{{ archetype.archetype_name }}</h4>
                <p>Su máxima necesidad es <strong>{{
                    archetype.archetype_necesities }}</strong>
                </p>
                <p>Tiene las siguientes emociones privadas contenidas: </p>
                <ul>
                    <li v-for="emotion in archetype.archetype_emotions" :key="emotion">{{ emotion }}</li>
                </ul>
                <p>Su principal cualidad: <strong>{{ archetype.archetype_quality }}</strong></p>
                <p>Su toma de decisiones: <strong>{{ archetype.archetype_decision }}</strong></p>
                <p>Lo que le gusta: <strong>{{ archetype.archetype_like }}</strong></p>
            </article>
        </div>
    </section>
</template>

<style scoped lang="scss">
.archetype-result-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0 0 0 2rem;
    box-sizing: border-box;

    h3 {
        margin: 0;
        color: var(--color-text);
    }

    .archetype-info {
        display: flex;
        flex-direction: column;
        gap: 0;
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
        box-sizing: border-box;

        p {
            margin: 0.2rem;
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
        width: fit-content;
        margin: 0 0 0 auto;
    }

    .archetype-others__container {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .archetype-info-others {
            display: flex;
            flex-direction: column;
            gap: 0;
            padding: 1rem;
            border-radius: 1rem;
            box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
            box-sizing: border-box;

            p {
                margin: 0.2rem;
            }
        }
    }
}

@media screen and (max-width: 720px) {
    .archetype-result-section {
        padding: 0 0 0 1rem;

        .archetype-info {
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
