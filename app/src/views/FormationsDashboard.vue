<script setup>
import { ref, computed, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth-store'
import { useProgressStore } from '../stores/progress-store'
import { useUtilStore } from '../stores/util-store'
import CourseContentComponent from '../components/dashboard/user/UserCourseContentComponent.vue'
import DownloadablesComponent from '../components/dashboard/user/UserDownloadablesComponent.vue'

const route = useRoute()
const router = useRouter()
const auth_store = useAuthStore()
const progress_store = useProgressStore()
const util_store = useUtilStore()

const active_tab = ref('content')
const progress = ref(null)
const error = ref(false)

// Formatear fecha
const format_date = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('es-ES', options)
}

// Color de progreso
const progress_color = computed(() => {
    if (!progress.value) return '#d9837b'
    const percentage = progress.value.overall_progress_percentage
    if (percentage >= 0 && percentage < 20) return '#d9837b'
    if (percentage >= 20 && percentage < 90) return '#d4a574'
    return '#5a9e7d'
})

// Determinar tabs disponibles
const available_tabs = computed(() => {
    if (!progress.value?.formation_id) return []
    const tabs = []

    const formation = progress.value.formation_id

    // Tab de contenido si tiene curriculum
    if (formation.curriculum && formation.curriculum.length > 0) {
        tabs.push({ id: 'content', label: 'Contenido', icon: '📚' })
    }

    // Tab de descargables si tiene archivos
    if (formation.downloadables && formation.downloadables.length > 0) {
        tabs.push({ id: 'downloads', label: 'Descargables', icon: '📥' })
    }

    return tabs
})

// Solicitar certificado (futuro webhook)
const request_certificate = () => {
    util_store.set_message('Pronto podrás solicitar tu certificado', 'Approve')
    // TODO: Implementar webhook a agente IA
    // const webhook_url = 'https://example.com/webhook/certificate'
}

onBeforeMount(async () => {
    try {
        util_store.set_loading(true)

        // Buscar progreso del usuario en esta formación
        const user_progress = auth_store.user_data?.progress?.find(
            p => p.formation_id.slug === route.params.formation_slug
        )

        if (!user_progress) {
            error.value = true
            util_store.set_message('No tienes acceso a este curso', 'Reject')
            router.push('/formaciones')
            return
        }

        // Cargar progreso completo
        progress.value = await progress_store.get_progress(user_progress.formation_id._id)

        if (!progress.value) {
            error.value = true
            return
        }

        // Registrar acceso
        await progress_store.register_access(user_progress.formation_id._id)

        // Establecer tab inicial
        if (available_tabs.value.length > 0) {
            active_tab.value = available_tabs.value[0].id
        }

    } catch (err) {
        console.error('Error cargando dashboard del curso:', err)
        error.value = true
    } finally {
        util_store.set_loading(false)
    }
})
</script>

<template>
    <main class="course-dashboard">
        <!-- Error state -->
        <div v-if="error" class="error-state">
            <h2>⚠️ Error al cargar el curso</h2>
            <p>No pudimos cargar la información de este curso.</p>
            <RouterLink to="/mi-espacio" class="action-btn">Volver a mis cursos</RouterLink>
        </div>

        <!-- Dashboard -->
        <div v-else-if="progress" class="course-dashboard__container">
            <!-- Header -->
            <header class="course-dashboard__header">
                <div class="header-content">
                    <div class="header-image">
                        <img :src="progress.formation_id.formation_cover.secure_url" :alt="progress.formation_id.title">
                    </div>
                    <div class="header-info">
                        <h1>{{ progress.formation_id.title }}</h1>
                        <p class="header-meta">
                            Último acceso: {{ format_date(progress.last_accessed) }}
                        </p>

                        <!-- Progreso -->
                        <div class="header-progress">
                            <div class="progress-info">
                                <span class="progress-label">Progreso del curso</span>
                                <span class="progress-percentage">{{ progress.overall_progress_percentage }}%</span>
                            </div>
                            <div class="progress-bar">
                                <div class="progress-bar__fill" :style="{
                                    width: `${progress.overall_progress_percentage}%`,
                                    backgroundColor: progress_color
                                }"></div>
                            </div>
                        </div>

                        <!-- Botón certificado -->
                        <button v-if="progress.overall_progress_percentage === 100" @click="request_certificate"
                            class="certificate-btn">
                            🎓 Solicitar certificado
                        </button>
                    </div>
                </div>
            </header>

            <!-- Tabs Navigation -->
            <nav v-if="available_tabs.length > 0" class="course-dashboard__tabs">
                <button v-for="tab in available_tabs" :key="tab.id"
                    :class="['tab-btn', { 'tab-btn--active': active_tab === tab.id }]" @click="active_tab = tab.id">
                    <span class="tab-icon">{{ tab.icon }}</span>
                    <span class="tab-label">{{ tab.label }}</span>
                </button>
            </nav>

            <!-- Tab Content -->
            <div class="course-dashboard__content">
                <!-- Contenido del curso -->
                <CourseContentComponent v-if="active_tab === 'content' && progress.formation_id.curriculum"
                    :formation="progress.formation_id" :progress="progress" />

                <!-- Descargables -->
                <DownloadablesComponent v-if="active_tab === 'downloads' && progress.formation_id.downloadables"
                    :formation="progress.formation_id" :formation_id="progress.formation_id._id" />
            </div>
        </div>
    </main>
</template>

<style scoped lang="scss">
.course-dashboard {
    width: 100%;
    min-height: 100vh;
    padding: 6rem 2rem 2rem;
    background: var(--color-white);

    &__container {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    // Header
    &__header {
        background: linear-gradient(135deg, #6b4c93 0%, #4a4a8a 100%);
        border-radius: 1.5rem;
        padding: 2rem;
        color: var(--color-white);
        box-shadow: 0 8px 30px rgba(107, 76, 147, 0.2);
    }

    // Tabs
    &__tabs {
        display: flex;
        gap: 1rem;
        border-bottom: 2px solid var(--color-disable);
        padding: 0 1rem;
    }

    // Content
    &__content {
        padding: 0 1rem;
        min-height: 50vh;
    }
}

.header-content {
    display: grid;
    grid-template-columns: 200px 1fr;
    gap: 2rem;
    align-items: start;

    .header-image {
        width: 100%;
        aspect-ratio: 16/9;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .header-info {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        h1 {
            margin: 0;
            font-size: 2.5rem;
            color: var(--color-white);
            line-height: 1.2;
        }

        .header-meta {
            margin: 0;
            font-family: 'Text';
            font-size: 0.95rem;
            opacity: 0.9;
        }
    }
}

.header-progress {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 1rem;

    .progress-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-family: 'Text';
        font-size: 0.95rem;

        .progress-label {
            opacity: 0.9;
        }

        .progress-percentage {
            font-weight: 700;
            font-size: 1.1rem;
        }
    }

    .progress-bar {
        width: 100%;
        height: 12px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        overflow: hidden;

        &__fill {
            height: 100%;
            border-radius: 10px;
            transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
    }
}

.certificate-btn {
    width: fit-content;
    padding: 0.75rem 1.5rem;
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    border: 2px solid rgba(255, 255, 255, 0.3);
    color: var(--color-white);
    border-radius: 0.75rem;
    font-family: 'Text';
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    margin-top: 1rem;

    &:hover {
        background: rgba(255, 255, 255, 0.3);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    }
}

.tab-btn {
    padding: 1rem 2rem;
    background: transparent;
    border: none;
    border-bottom: 3px solid transparent;
    color: var(--color-text-dark);
    font-family: 'Text';
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .tab-icon {
        font-size: 1.2rem;
    }

    &:hover {
        color: var(--color-primary);
    }

    &--active {
        color: var(--color-primary);
        border-bottom-color: var(--color-primary);
    }
}

.error-state {
    width: 100%;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    text-align: center;
    padding: 2rem;

    h2 {
        font-size: 2rem;
        color: var(--color-primary);
        margin: 0;
    }

    p {
        font-size: 1.1rem;
        color: var(--color-text-dark);
        margin: 0;
    }
}

@media screen and (max-width: 768px) {
    .course-dashboard {
        padding: 5rem 1rem 2rem;

        &__tabs {
            padding: 0;
            overflow-x: auto;
            scrollbar-width: none;

            &::-webkit-scrollbar {
                display: none;
            }
        }

        &__content {
            padding: 0;
        }
    }

    .header-content {
        grid-template-columns: 1fr;
        gap: 1.5rem;

        .header-image {
            width: 100%;
            max-width: 300px;
            margin: 0 auto;
        }

        .header-info {
            h1 {
                font-size: 1.8rem;
            }
        }
    }

    .tab-btn {
        padding: 0.75rem 1.5rem;
        font-size: 0.9rem;
        white-space: nowrap;

        .tab-label {
            display: none;
        }

        .tab-icon {
            font-size: 1.5rem;
        }
    }

    .certificate-btn {
        width: 100%;
    }
}
</style>
