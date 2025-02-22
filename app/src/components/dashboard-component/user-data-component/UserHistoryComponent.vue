<script setup lang="ts">
//Import tools
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Import components
import GeneralHistoryFormComponent from '@/components/common/forms/history/GeneralHistoryFormComponent.vue';
import DisplayUserHistoryComponent from '@/components/common/displays/DisplayUserHistoryComponent.vue';

//States
const user_store = useUserStore();
const patient_historys = computed(
    () => user_store.all_user_data.patient_history
);
const form_to_show = computed(() => patient_historys.value.length + 1);
const show_all_history_answers = ref(false);

//Lifecycle
</script>

<template>
    <section class="history__container">
        <h3>
            {{
                patient_historys.length === 14
                    ? 'Feclicidades has completado el historial'
                    : 'Por favor completa el historial'
            }}
        </h3>
        <GeneralHistoryFormComponent
            v-if="form_to_show < 14"
            :history_number="form_to_show - 1"
        />
        <button
            class="button_normal"
            @click="show_all_history_answers = !show_all_history_answers"
        >
            {{ show_all_history_answers ? 'Cerrar' : 'Ver' }}
        </button>
        <div class="answers__container" v-if="show_all_history_answers">
            <DisplayUserHistoryComponent :patient_history="patient_historys" />
        </div>
    </section>
</template>

<style scoped lang="scss">
.history__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid var(--color-primary);
    border-radius: 5px;
    background-color: var(--color-white);
    box-sizing: border-box;

    h3 {
        text-align: center;
    }
}

@media screen and (max-width: 768px) {
    .history__container {
        padding: 0;
        gap: 0;

        h3 {
            margin: 0;
        }
    }
}
</style>
