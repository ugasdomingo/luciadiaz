<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    progress: {
        type: Object,
        required: true
    }
})

const router = useRouter()

// Formatear fecha
const format_date = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('es-ES', options)
}

// Color de barra de progreso según porcentaje
const progress_color = computed(() => {
    const percentage = props.progress.overall_progress_percentage
    if (percentage >= 0 && percentage < 20) return '#d9837b' // Rojo
    if (percentage >= 20 && percentage < 90) return '#d4a574' // Amarillo/Naranja
    return '#5a9e7d' // Verde
})

// Ícono según tipo de formación
const type_config = computed(() => {
    const types = {
        'presencial': { label: 'Presencial', color: '#4CAF50' },
        'live': { label: 'En vivo', color: '#FF5722' },
        'online': { label: 'Online', color: '#2196F3' }
    }
    return types[props.progress.formation_id.type] || types.online
})

// Ir al dashboard del curso
const go_to_course = () => {
    router.push(`/formaciones/${props.progress.formation_id.slug}/dashboard`)
}
</script>

<template>
    <article class="course-card" @click="go_to_course">
        <!-- Imagen -->
        <div class="course-card__image-wrapper">
            <img :src="progress.formation_id.formation_cover.secure_url" :alt="progress.formation_id.title"
                class="course-card__image">

            <!-- Badge de tipo -->
            <span class="course-card__type" :style="{ backgroundColor: type_config.color }">
                {{ type_config.label }}
            </span>

            <!-- Badge de completado -->
            <div v-if="progress.overall_progress_percentage === 100" class="course-card__completed">
                <span>✓ Completado</span>
            </div>
        </div>

        <!-- Contenido -->
        <div class="course-card__content">
            <h3 class="course-card__title">{{ progress.formation_id.title }}</h3>

            <!-- Barra de progreso -->
            <div class="course-card__progress">
                <div class="progress-info">
                    <span class="progress-label">Tu progreso</span>
                    <span class="progress-percentage">{{ progress.overall_progress_percentage }}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar__fill" :style="{
                        width: `${progress.overall_progress_percentage}%`,
                        backgroundColor: progress_color
                    }"></div>
                </div>
            </div>

            <!-- Última vez accedido -->
            <div class="course-card__meta">
                <span class="meta-item">
                    Último acceso: {{ format_date(progress.last_accessed) }}
                </span>
            </div>

            <!-- CTA -->
            <button class="course-card__cta">
                {{ progress.overall_progress_percentage === 100 ? 'Revisar curso' : 'Continuar aprendiendo' }}
            </button>
        </div>
    </article>
</template>

<style scoped lang="scss">
.course-card {
    display: grid;
    grid-template-columns: 1fr;
    background: var(--color-white);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(107, 76, 147, 0.15);

        .course-card__image {
            transform: scale(1.05);
        }

        .course-card__cta {
            background: var(--color-primary);
            color: var(--color-white);
        }
    }

    &__image-wrapper {
        position: relative;
        width: 100%;
        height: 220px;
        overflow: hidden;
        background: var(--color-disable);
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &__type {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.4rem 0.9rem;
        border-radius: 2rem;
        font-family: 'Text';
        font-size: 0.75rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        color: white;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }

    &__completed {
        position: absolute;
        top: 1rem;
        left: 1rem;
        padding: 0.5rem 1rem;
        background: rgba(90, 158, 125, 0.95);
        color: white;
        border-radius: 2rem;
        font-family: 'Text';
        font-size: 0.85rem;
        font-weight: 600;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 0.3rem;
    }

    &__content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &__title {
        margin: 0;
        font-size: 1.3rem;
        line-height: 1.3;
        color: var(--color-black);
        font-family: 'Title';
        font-weight: 600;
    }

    &__progress {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;

        .progress-info {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-family: 'Text';
            font-size: 0.9rem;

            .progress-label {
                color: var(--color-text-dark);
            }

            .progress-percentage {
                font-weight: 600;
                color: var(--color-primary);
            }
        }

        .progress-bar {
            width: 100%;
            height: 8px;
            background: var(--color-disable);
            border-radius: 10px;
            overflow: hidden;

            &__fill {
                height: 100%;
                border-radius: 10px;
                transition: width 0.8s cubic-bezier(0.4, 0, 0.2, 1);
            }
        }
    }

    &__meta {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        font-family: 'Text';
        font-size: 0.85rem;
        color: var(--color-text-dark);

        .meta-item {
            display: flex;
            align-items: center;
            gap: 0.3rem;
        }
    }

    &__cta {
        width: 100%;
        padding: 0.75rem 1.5rem;
        border: 2px solid var(--color-primary);
        background: transparent;
        color: var(--color-primary);
        border-radius: 0.5rem;
        font-family: 'Text';
        font-size: 0.95rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-top: auto;

        &:hover {
            transform: translateY(-2px);
        }
    }
}

// Responsive: Desktop horizontal
@media screen and (min-width: 769px) {
    .course-card {
        grid-template-columns: 280px 1fr;

        &__image-wrapper {
            height: 100%;
            min-height: 250px;
        }

        &__content {
            padding: 2rem;
        }
    }
}

@media screen and (max-width: 768px) {
    .course-card {
        &__title {
            font-size: 1.2rem;
        }

        &__cta {
            font-size: 0.9rem;
            padding: 0.7rem 1.2rem;
        }
    }
}
</style>