<script setup lang="ts">
//Import tools
import { ref, computed } from 'vue';
import { useUserStore } from '@/stores/user-store';
import { useTaskStore } from '@/stores/task.store';

//States
const user_store = useUserStore();
const task_store = useTaskStore();
const user_tasks = computed(() => user_store.all_user_data.assigned_tasks);
const assing_task = ref('');
const show_create_task = ref(false);

//Methods
const handdle_create_task = async () => {
    await task_store.create_task(
        user_store.user_id,
        assing_task.value,
        user_store.user_medical_record
    );
};
const complete_task = async (task_id: string) => {
    await task_store.update_task(task_id, 'Completada');
    await user_store.get_data_by_user();
};
</script>

<template>
    <section
        v-if="user_store.user_role === 'Admin'"
        class="task__container__admin"
    >
        <button
            class="button__simply"
            @click="show_create_task = !show_create_task"
        >
            {{ show_create_task ? 'Cerrar' : 'Crear tarea' }}
        </button>
        <div class="create__task">
            <form @submit.prevent="handdle_create_task" v-if="show_create_task">
                <input
                    type="text-area"
                    v-model="assing_task"
                    placeholder="Tarea a realizar"
                />
                <button type="submit">Crear tarea</button>
            </form>
        </div>
    </section>
    <section class="task__container__user">
        <div v-for="task in user_tasks" :key="task.task" class="task__card">
            <p>{{ task.task }}</p>
            <button
                @click="complete_task(task.task_id)"
                :class="
                    task.status === 'Pendiente'
                        ? 'button__action'
                        : 'button__inactive'
                "
            >
                {{
                    task.status === 'Pendiente'
                        ? 'Marcar como completada'
                        : 'Completada'
                }}
            </button>
        </div>
    </section>
</template>

<style scoped lang="scss">
.task__container__admin {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 1rem;
    padding: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
}

.task__container__user {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 1rem 0;

    .task__card {
        max-width: 250px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
        border: 1px solid var(--color-primary);
        border-radius: 1rem;
    }
}
</style>
