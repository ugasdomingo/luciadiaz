<script setup lang="ts">
//Import tools
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Import components
import UserHistoryComponent from './user-data-component/UserHistoryComponent.vue';
import UserTestResultsComponent from './user-data-component/UserTestResultsComponent.vue';

const props = defineProps({
    user_id: {
        type: String
    }
});

//States
const user_store = useUserStore();
const medical_data = ref();
const show_user_history = ref(false);
const show_user_test_results = ref(false);
const show_user_task = ref(false);
const show_user_enrollments = ref(false);
const show_user_likes = ref(false);
const show_book_appointment = ref(false);

const get_user_data = async () => {
    props.user_id
        ? await user_store.get_data_by_admin(props.user_id)
        : await user_store.get_data_by_user();
    medical_data.value = user_store.all_user_data;
};

//Lifecycle
onMounted(async () => {
    get_user_data();
});
</script>

<template>
    <section class="user__data__container">
        <div class="user__profile">
            <section v-if="medical_data" class="user__profile__info">
                <h3>Hola {{ medical_data.user_name.split(' ')[0] }}</h3>
                <h4>Información de contacto</h4>
                <p>Correo: {{ medical_data.user_email }}</p>
                <p>Teléfono: {{ medical_data.user_phone }}</p>
            </section>
            <section v-else class="user__profile__info">Cargando ...</section>
            <section class="user__profile__actions">
                <h3>¿Tienes dudas? Te puedo ayudar</h3>
                <a href="#">Contartar por WhatsApp</a>
                <button
                    class="button__simply"
                    @click="show_book_appointment = true"
                >
                    Agendar una cita
                </button>
            </section>
        </div>
        <div class="user__data__display">
            {{ medical_data }}
            <section>
                <button
                    class="button__simply"
                    @click="show_user_history = !show_user_history"
                >
                    {{ show_user_history ? 'Cerrar' : 'Ver' }}
                    <span>Historial médico</span>
                </button>
                <UserHistoryComponent v-if="show_user_history" />
            </section>
            <section>
                <button
                    class="button__simply"
                    @click="show_user_test_results = !show_user_test_results"
                >
                    {{ show_user_test_results ? 'Cerrar' : 'Ver' }}
                    <span>Resultados de tests</span>
                </button>
                <UserTestResultsComponent v-if="show_user_test_results" />
            </section>
            <section>
                <button
                    class="button__simply"
                    @click="show_user_task = !show_user_task"
                >
                    {{ show_user_task ? 'Cerrar' : 'Ver' }}
                    <span>Tareas asignadas</span>
                </button>
            </section>
            <section>
                <button
                    class="button__simply"
                    @click="show_user_enrollments = !show_user_enrollments"
                >
                    {{ show_user_enrollments ? 'Cerrar' : 'Ver' }}
                    <span>Inscripciones</span>
                </button>
            </section>
            <section>
                <button
                    class="button__simply"
                    @click="show_user_likes = !show_user_likes"
                >
                    {{ show_user_likes ? 'Cerrar' : 'Ver' }}
                    <span>Contenido favorito</span>
                </button>
            </section>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.user__data__container {
    width: 100%;
    height: 100%;
    min-height: 80vh;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 1rem 0;
    box-sizing: border-box;

    .user__profile {
        width: 30%;
        height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 0;
        position: sticky;
        top: 0;
        left: 0;
        box-sizing: border-box;

        .user__profile__info {
            width: 100%;
            height: 50%;
            padding: 1rem;
            box-sizing: border-box;
        }

        .user__profile__actions {
            width: 100%;
            height: 50%;
            display: flex;
            gap: 1rem;
            flex-direction: column;
            padding: 1rem;
            box-sizing: border-box;
        }
    }

    .user__data__display {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        width: 70%;
        height: 100%;
        padding: 1rem;
        box-sizing: border-box;

        section {
            width: 100%;
            display: flex;
            flex-direction: column;
            padding: 1rem;
            box-sizing: border-box;
            transition: all 0.5s ease;

            button {
                width: 100%;
                padding: 1rem;
                background-color: var(--color-white);
                border: 1px solid var(--color-primary);
                border-radius: 5px;
                cursor: pointer;
                transition: all 0.3s ease;
                box-sizing: border-box;

                &:hover {
                    background-color: #e0e0e0;
                }
            }
        }
    }
}
</style>
