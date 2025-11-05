<template>
    <aside class="user__dashboard__aside">
        <h2>Tus datos registrados</h2>
        <p>Nombre completo: <span> {{ auth_store.user_data.user.name }}</span></p>
        <p>Correo: <span> {{ auth_store.user_data.user.email }}</span></p>
        <p>Historia Clínica: <span> {{ auth_store.user_data.user.medical_record }}</span></p>
        <div class="user__dashboard__aside__actions">
            <button class="action-btn" @click="show_component = 'medical'"
                v-if="auth_store.user_data.user.role === 'patient'">
                {{ auth_store.user_data.history.length < 13 ? 'Completa tu historia clínica' : 'Historial clínico' }}
                    </button>
                    <button class="action-btn" @click="show_component = 'tasks'"
                        v-if="auth_store.user_data.user.role === 'patient'">
                        Tareas pendientes
                    </button>
                    <button class="action-btn" @click="show_component = 'results'">Resultados de Tests</button>
                    <button class="action-btn" @click="show_component = 'courses'">Cursos Inscritos</button>
                    <button class="action-btn" @click="show_component = 'likes'">Tus likes</button>
                    <RouterLink to="/tests/anamnesis" v-if="auth_store.user_data.user.anamnesis_kids === true"
                        class="action-btn">Anamnesis</RouterLink>
                    <RouterLink to="/terapias" class="nobg-btn">Agendar una consulta</RouterLink>
        </div>
    </aside>
    <section class="user__dashboard__component">
        <div class="user__dashboard__component__greeting" v-if="show_component === 'initial'">
            <h2>Hola {{ auth_store.user_data.user.name.split(' ')[0] }} </h2>
            <p>
                Este es tu espacio personal, aquí puedes ir viendo tus resultados,
                tus logros, avances y descubrir novedades.
            </p>
        </div>
        <UserMedicalHistoryComponent v-if="show_component === 'medical'"
            :history_number_to_show="auth_store.user_data.history.length" />
        <UserTaskComponent v-if="show_component === 'tasks'" />
        <UserTestResultsComponent v-if="show_component === 'results'" />
        <UserCoursesComponent v-if="show_component === 'courses'" />
        <UserLikesComponent v-if="show_component === 'likes'" />
    </section>
</template>

<script setup>
import { useAuthStore } from '../../stores/auth-store.js'
import { RouterLink } from 'vue-router'
import { ref } from 'vue'

//IMport components
import UserMedicalHistoryComponent from './user/UserMedicalHistoryComponent.vue'
import UserTaskComponent from './user/UserTaskComponent.vue'
import UserTestResultsComponent from './user/UserTestResultsComponent.vue'
import UserCoursesComponent from './user/UserCoursesComponent.vue'
import UserLikesComponent from './user/UserLikesComponent.vue'

const auth_store = useAuthStore()
const show_component = ref('initial')

</script>

<style scoped lang="scss">
.user__dashboard__aside {
    width: 35%;
    min-height: 70vh;
    margin: 0;
    padding: 4rem 0 0 4rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    overflow-y: hidden;

    h2 {
        margin-bottom: 1.5rem;
    }

    p {
        margin: 0;

        span {
            font-weight: 500;
        }
    }

    &__actions {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem 1rem 1rem 0;

        a {
            text-align: center;
            width: fit-content;
        }

        button {
            width: 80%;
        }

    }
}

.user__dashboard__component {
    width: 65%;
    max-width: 65%;
    min-height: 70vh;
    margin: 0;
    padding: 4rem 4rem 4rem 0;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    right: 0;
    overflow-y: hidden;
    box-sizing: border-box;

    &__greeting {
        width: 100%;
        min-height: 70vh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 1rem;
        box-sizing: border-box;

        h2 {
            margin-bottom: 1rem;
        }

        p {
            width: 50%;
            margin: 0;
            text-align: center;
        }
    }
}

@media screen and (max-width: 768px) {
    .user__dashboard__aside {
        width: 100%;
        max-width: 100%;
        min-height: fit-content;
        margin: 0;
        padding: 0;
        position: relative;

        h2 {
            margin-bottom: 1rem;
            text-align: center;
        }

        p {
            margin: 0;

            span {
                font-weight: 500;
            }
        }

        &__actions {
            padding: 1rem 0 0;
            align-items: center;

        }
    }

    .user__dashboard__component {
        width: 100%;
        max-width: 100%;
        position: relative;
        margin: 0;
        padding: 0;

        &__greeting {
            p {
                width: 100%;
            }
        }
    }
}
</style>