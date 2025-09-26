<template>
    <main class="pages">
        <aside class="basic__info">
            <h2>Información del usuario</h2>
            <ul>
                <li>
                    <strong> Nombre: </strong> {{ user_info?.user?.name }}
                </li>
                <li>
                    <strong> Correo: </strong> {{ user_info?.user?.email }}
                    <img src="/public/icon/icon-mail.svg" alt="checked verified email"
                        v-if="user_info?.user?.email_verified">
                </li>
                <li>
                    <strong> Teléfono: </strong> {{ user_info?.user?.phone }}
                </li>
                <li>
                    <strong> Rol: </strong> {{ user_info?.user?.role }}
                </li>
                <li>
                    <strong> Historial Médico: </strong> {{ user_info?.user?.medical_record }}
                </li>
                <li>
                    <strong> Fecha de alta en web: </strong> {{ new
                        Date(user_info?.user?.createdAt).toLocaleDateString() }}
                </li>
            </ul>
        </aside>
        <section class="content">
            <div class="content__navegation">
                <button class="nobg-btn" @click="show_component = 'medical'">
                    Historial
                </button>
                <button class="nobg-btn" @click="show_component = 'notes'">Notas</button>
                <button class="nobg-btn" @click="show_component = 'tasks'">
                    Tareas
                </button>
                <button class="nobg-btn" @click="show_component = 'results'">Tests</button>
                <button class="nobg-btn" @click="show_component = 'courses'">Cursos</button>
                <button class="nobg-btn" @click="show_component = 'likes'">Likes</button>
            </div>
            <div class="content__component">
                <InfoUserHistoryComponent v-if="show_component === 'medical'" :user_history="user_info?.history" />
                <InfoUserNotesComponent v-if="show_component === 'notes'" :user_notes="user_info?.therapy_notes"
                    :user_id="route.params.user_id" />
                <InfoUserTaskComponent v-if="show_component === 'tasks'" :user_tasks="user_info?.therapy_tasks"
                    :user_id="route.params.user_id" />
                <InfoUserTestComponent v-if="show_component === 'results'" :user_tests="user_info?.test_results"
                    :user_name="user_info?.user?.name" />
                <InfoUserFormationComponent v-if="show_component === 'courses'"
                    :user_formation="user_info?.enrollments" />
                <InfoUserLikeComponent v-if="show_component === 'likes'" :user_likes="user_info?.likes" />
            </div>
        </section>
    </main>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useAdminStore } from '../../stores/admin-store';

//Import components
import InfoUserHistoryComponent from '../../components/dashboard/admin/info-user/InfoUserHistoryComponent.vue'
import InfoUserTaskComponent from '../../components/dashboard/admin/info-user/InfoUserTaskComponent.vue'
import InfoUserTestComponent from '../../components/dashboard/admin/info-user/InfoUserTestComponent.vue'
import InfoUserFormationComponent from '../../components/dashboard/admin/info-user/InfoUserFormationComponent.vue'
import InfoUserLikeComponent from '../../components/dashboard/admin/info-user/InfoUserLikeComponent.vue'
import InfoUserNotesComponent from '../../components/dashboard/admin/info-user/InfoUserNotesComponent.vue'

const route = useRoute()
const admin_store = useAdminStore()
const user_info = ref(admin_store.user)
const show_component = ref('tasks')

onMounted(async () => {
    await admin_store.get_user_by_id(route.params.user_id)
})

</script>

<style scoped lang="scss">
.pages {
    .basic__info {
        width: 35%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: absolute;
        top: 4rem;
        left: 4rem;

        h2 {
            margin-bottom: 0;
        }

        ul {
            list-style: none;
            margin: 0;
            padding: 0;

            li {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin: 0;

                img {
                    width: 2rem;
                }
            }
        }
    }

    .content {
        width: 65%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin: 0 0 0 auto;

        .content__navegation {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
        }
    }
}

@media screen and (max-width: 768px) {
    .pages {
        .basic__info {
            width: 100%;
            position: static;
        }

        .content {
            width: 100%;
            padding-top: 2rem;

            .content__navegation {
                justify-content: center;
            }

            .content__component {
                overflow-x: auto;
            }
        }
    }
}
</style>