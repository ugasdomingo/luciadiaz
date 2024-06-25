<script setup lang="ts">
//Import tools
import { onBeforeMount, ref } from 'vue';
import { useTestStore } from '../../../stores/test-store';
import { archetypeResults } from './archetypeResults';

//Activate tools
const testStore = useTestStore();
const archetype = ref();

//Get archetype
onBeforeMount(() => {
    archetype.value = archetypeResults.find(
        (archetype) => archetype.arquetipo === testStore.userArchetype,
    );
});
</script>

<template>
    <main class="results-container">
        <h3>
            Tienes la personalidad de un
            <span> {{ testStore.userArchetype }}</span>
        </h3>
        <section class="explain-result">
            <p>
                Un {{ testStore.userArchetype }} principalmente quiere
                {{ archetype.quiere }}
            </p>
            <p>Sus aspectos positivos:</p>
            <ul>
                <li>{{ archetype.p1 }}</li>
                <li>{{ archetype.p2 }}</li>
                <li>{{ archetype.p3 }}</li>
                <li>{{ archetype.p4 }}</li>
            </ul>
        </section>
        <section class="results">
            <h4>Todos los resultados</h4>
            <p>Sabio Rey: {{ testStore.arquetipo[0]?.answers.wise }}</p>
            <p>Guerrero: {{ testStore.arquetipo[0]?.answers.warrior }}</p>
            <p>Mago: {{ testStore.arquetipo[0]?.answers.wizard }}</p>
            <p>Amante: {{ testStore.arquetipo[0]?.answers.lover }}</p>
        </section>
        <section class="doubts">
            <p>
                Si tienes dudas sobre tu arquetipo,
                <a href="https://wa.me/+34624721896" target="_blank">
                    escríbeme por WhatsApp
                </a>
                o
                <RouterLink to="/agendar-cita">Agenda una cita</RouterLink>
                para que hablemos en profundidad.
            </p>
            <p>
                Comparte este test con tus amigos y familiares para que ellos
                también saquen el máximo potencial a su personalidad
            </p>
        </section>
    </main>
</template>

<style scoped lang="scss">
.results-container {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    padding: 8rem 4rem 2rem;
    color: var(--color-black);
    border-radius: 1rem;

    h3 {
        margin-bottom: 2rem;
        text-align: center;

        span {
            color: var(--color-white);
            background-color: var(--color-primary);
            padding: 0.5rem 1rem;
            border-radius: 0.5rem;
        }
    }

    .explain-result {
        width: 60%;
        color: var(--color-white);
        background-color: var(--color-primary);
        margin: 0 auto;
        padding: 2rem;
        border-radius: 0.5rem;

        p {
            font-size: 1.5rem;
            margin: 0 0 1rem;
        }

        ul {
            margin-left: 2rem;
        }
    }

    .results {
        width: 60%;
        margin: 2rem auto;
        padding: 2rem;
        display: flex;
        gap: 2rem;
        align-items: center;
        justify-content: center;
        background-color: var(--color-primary);
        border-radius: 0.5rem;
    }

    .doubts {
        width: 60%;
        margin: 0 auto;

        p {
            margin: 0 0 1rem;
        }

        a {
            color: var(--color-white);
            text-decoration: none;
            padding: 0.5rem 1rem;
            background-color: var(--color-primary);
            border-radius: 0.5rem;
        }
    }
}
</style>
