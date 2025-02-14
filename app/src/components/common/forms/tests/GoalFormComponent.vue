<script setup lang="ts">
//Import tools
import { ref, computed } from 'vue';
import { useTestStore } from '@/stores/test-store';
import { useUtilStore } from '@/stores/util-store';

//States
const test_store = useTestStore();
const util_store = useUtilStore();
const form_completed = computed(() => {
    return (
        goal.value !== '' &&
        r1.value !== '' &&
        r2.value !== '' &&
        r3.value !== '' &&
        r4.value !== '' &&
        r5.value !== '' &&
        r6.value !== ''
    );
});

//Responses
const goal = ref('');
const r1 = ref('');
const r2 = ref('');
const r3 = ref('');
const r4 = ref('');
const r5 = ref('');
const r6 = ref('');

//Methods
const handle_submit = () => {
    //Validate form completed
    if (
        r1.value === '' ||
        r2.value === '' ||
        r3.value === '' ||
        r4.value === '' ||
        r5.value === '' ||
        r6.value === ''
    ) {
        util_store.display_notification(
            'Por favor, responda todas las preguntas.',
            400
        );
        return;
    }

    //Calculate results
    const results = {
        goal: goal.value,
        r1: r1.value,
        r2: r2.value,
        r3: r3.value,
        r4: r4.value,
        r5: r5.value,
        r6: r6.value
    };

    //Save results
    test_store.create_test_result('goal', results);
};
</script>

<template>
    <form @submit.prevent="handle_submit">
        <h2>Carta de tu inconsciente</h2>
        <p>
            Escribe la meta que deseas lograr y escribe 6 razones por las cuales
            quieres alcanzar esa meta.
        </p>
        <input type="text" v-model="goal" placeholder="Meta" />
        <input type="text" v-model="r1" placeholder="Razón 1" />
        <input type="text" v-model="r2" placeholder="Razón 2" />
        <input type="text" v-model="r3" placeholder="Razón 3" />
        <input type="text" v-model="r4" placeholder="Razón 4" />
        <input type="text" v-model="r5" placeholder="Razón 5" />
        <input type="text" v-model="r6" placeholder="Razón 6" />
        <button :class="form_completed ? 'button__action' : 'button__inactive'">
            {{
                form_completed
                    ? 'Procesar Test'
                    : 'Tienes preguntas sin responder'
            }}
        </button>
    </form>
</template>

<style lang="scss" scoped>
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;

    h2 {
        font-size: 2rem;
        margin-bottom: 1rem;
    }

    p {
        width: 60%;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    input {
        width: 40%;
    }

    button {
        margin: 1rem 0;
    }
}
</style>
