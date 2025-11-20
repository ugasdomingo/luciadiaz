<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from '../../../stores/auth-store.js'
import { useFormationStore } from '../../../stores/formation-store.js'
import ProgressCardComponent from '../../common/cards/ProgressCardComponent.vue'
import { RouterLink } from 'vue-router'

const auth_store = useAuthStore()
const formation_store = useFormationStore()

onMounted(async () => {
    if (!auth_store.user_data) {
        await auth_store.refresh()
    }
    // Cargar formaciones disponibles para el CTA si no hay cursos
    if (!auth_store.user_data.progress || auth_store.user_data.progress.length === 0) {
        await formation_store.get_all_formations(5)
    }
})

// Ordenar cursos: en progreso (menor a mayor %), completados al final
const sorted_courses = computed(() => {
    if (!auth_store.user_data.progress) return { in_progress: [], completed: [] }

    const in_progress = auth_store.user_data.progress
        .filter(p => p.overall_progress_percentage < 100)
        .sort((a, b) => a.overall_progress_percentage - b.overall_progress_percentage)

    const completed = auth_store.user_data.progress
        .filter(p => p.overall_progress_percentage === 100)

    return { in_progress, completed }
})

// Formación más próxima a empezar para el CTA
const next_formation = computed(() => {
    if (!formation_store.formations || formation_store.formations.length === 0) return null

    // Ordenar por fecha más cercana
    const sorted = [...formation_store.formations].sort((a, b) => {
        return new Date(a.start_date) - new Date(b.start_date)
    })

    return sorted[0]
})

// Nombre del usuario
const user_first_name = computed(() => {
    return auth_store.user_data?.user?.name?.split(' ')[0] || 'Amigo'
})
</script>

<template>
    <section class="user-courses">
        <h2>Tus Cursos</h2>

        <!-- Sin cursos inscritos -->
        <div v-if="!auth_store.user_data.progress || auth_store.user_data.progress.length === 0"
            class="user-courses__empty">
            <div class="empty-state">
                <div class="empty-icon">📚</div>
                <h3>Aún no te has inscrito en ningún curso</h3>

                <!-- CTA personalizado -->
                <p v-if="next_formation" class="empty-suggestion">
                    {{ user_first_name }}, te sugiero la formación
                    <strong>{{ next_formation.title }}</strong> que comienza pronto y puede ayudarte mucho en tu
                    crecimiento personal.
                </p>
                <p v-else class="empty-suggestion">
                    Explora nuestras formaciones disponibles y comienza tu viaje de transformación personal.
                </p>

                <!-- CTA -->
                <RouterLink v-if="next_formation" :to="`/formaciones/${next_formation.slug}`" class="action-btn">
                    Ver {{ next_formation.title }}
                </RouterLink>
                <RouterLink v-else to="/formaciones" class="action-btn">
                    Explorar formaciones
                </RouterLink>
            </div>
        </div>

        <!-- Con cursos inscritos -->
        <div v-else class="user-courses__list">
            <!-- Cursos en progreso -->
            <div v-if="sorted_courses.in_progress.length > 0" class="courses-section">
                <h3 class="section-title">En progreso</h3>
                <div class="courses-grid">
                    <ProgressCardComponent v-for="progress in sorted_courses.in_progress" :key="progress._id"
                        :progress="progress" />
                </div>
            </div>

            <!-- Divisor si hay completados -->
            <div v-if="sorted_courses.completed.length > 0" class="courses-divider">
                <span>Cursos completados</span>
            </div>

            <!-- Cursos completados -->
            <div v-if="sorted_courses.completed.length > 0" class="courses-section">
                <div class="courses-grid">
                    <ProgressCardComponent v-for="progress in sorted_courses.completed" :key="progress._id"
                        :progress="progress" />
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped lang="scss">
.user-courses {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h2 {
        margin: 0;
        font-size: 2.5rem;
        color: var(--color-primary);
    }

    // Estado vacío
    &__empty {
        width: 100%;
        min-height: 50vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 3rem 0;
    }
}

.empty-state {
    max-width: 600px;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.5rem;

    .empty-icon {
        font-size: 5rem;
        opacity: 0.7;
    }

    h3 {
        margin: 0;
        font-size: 1.8rem;
        color: var(--color-primary);
    }

    .empty-suggestion {
        margin: 0;
        font-size: 1.1rem;
        line-height: 1.6;
        color: var(--color-text-dark);

        strong {
            color: var(--color-primary);
            font-weight: 600;
        }
    }

    .action-btn {
        margin-top: 1rem;
        padding: 1rem 2rem;
        font-size: 1.1rem;
    }
}

// Lista de cursos
.user-courses__list {
    display: flex;
    flex-direction: column;
    gap: 3rem;
}

.courses-section {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .section-title {
        margin: 0;
        font-size: 1.5rem;
        color: var(--color-text-dark);
        font-family: 'Text';
        font-weight: 600;
    }
}

.courses-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
    gap: 2rem;
}

.courses-divider {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 1rem;
    margin: 1rem 0;

    &::before,
    &::after {
        content: '';
        flex: 1;
        height: 2px;
        background: linear-gradient(90deg,
                transparent 0%,
                var(--color-disable) 20%,
                var(--color-disable) 80%,
                transparent 100%);
    }

    span {
        font-family: 'Text';
        font-size: 1.1rem;
        font-weight: 600;
        color: var(--color-text-dark);
        text-transform: uppercase;
        letter-spacing: 1px;
    }
}

@media screen and (max-width: 768px) {
    .user-courses {
        h2 {
            font-size: 2rem;
        }
    }

    .empty-state {
        padding: 2rem 1rem;

        .empty-icon {
            font-size: 4rem;
        }

        h3 {
            font-size: 1.5rem;
        }

        .empty-suggestion {
            font-size: 1rem;
        }
    }

    .courses-grid {
        grid-template-columns: 1fr;
    }
}
</style>