<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProgressStore } from '../../../stores/progress-store'

const props = defineProps({
    formation: {
        type: Object,
        required: true
    },
    progress: {
        type: Object,
        required: true
    }
})

const router = useRouter()
const progress_store = useProgressStore()

// Solo el primer módulo abierto por defecto
const open_module = ref(props.formation.curriculum[0]?.module_number || null)

// Toggle módulo (solo uno abierto a la vez)
const toggle_module = (module_number) => {
    if (open_module.value === module_number) {
        open_module.value = null
    } else {
        open_module.value = module_number
    }
}

// Obtener estado de lección
const get_lesson_status = (module_number, lesson_number) => {
    const lesson_id = `module_${module_number}_lesson_${lesson_number}`
    return progress_store.get_lesson_status(props.progress.formation_id._id, lesson_id)
}

// Verificar si puede acceder a lección
const can_access_lesson = (module_number, lesson_number) => {
    return progress_store.can_access_lesson(
        props.progress.formation_id._id,
        module_number,
        lesson_number
    )
}

// Click en lección
const go_to_lesson = (module, lesson) => {
    const access = can_access_lesson(module.module_number, lesson.lesson_number)

    if (!access.can_access) {
        // No hacer nada, el tooltip ya muestra el mensaje
        return
    }

    router.push(`/formaciones/${props.formation.slug}/leccion/${module.module_number}/${lesson.lesson_number}`)
}

// Ícono según estado
const get_status_icon = (status) => {
    const icons = {
        'completed': '✓',
        'almost_done': '🔄',
        'in_progress': '▶',
        'not_started': '○'
    }
    return icons[status] || '○'
}

// Color según estado
const get_status_color = (status) => {
    const colors = {
        'completed': '#5a9e7d',
        'almost_done': '#d4a574',
        'in_progress': '#d4a574',
        'not_started': '#dee2e6'
    }
    return colors[status] || '#dee2e6'
}
</script>

<template>
    <div class="course-content">
        <h2>Contenido del curso</h2>

        <!-- Lista de módulos -->
        <div class="modules-list">
            <div v-for="module in formation.curriculum" :key="module.module_number" class="module">
                <!-- Header del módulo -->
                <button class="module__header" @click="toggle_module(module.module_number)">
                    <div class="module__info">
                        <span class="module__number">Módulo {{ module.module_number }}</span>
                        <h3 class="module__title">{{ module.module_title }}</h3>
                    </div>
                    <span class="module__icon" :class="{ 'module__icon--open': open_module === module.module_number }">
                        ▼
                    </span>
                </button>

                <!-- Lecciones (colapsable) -->
                <transition name="slide">
                    <div v-if="open_module === module.module_number" class="module__lessons">
                        <div v-for="lesson in module.lessons" :key="lesson.lesson_number" class="lesson" :class="{
                            'lesson--locked': !can_access_lesson(module.module_number, lesson.lesson_number).can_access,
                            'lesson--completed': get_lesson_status(module.module_number, lesson.lesson_number) === 'completed'
                        }" @click="go_to_lesson(module, lesson)">

                            <!-- Estado -->
                            <div class="lesson__status" :style="{
                                color: get_status_color(get_lesson_status(module.module_number, lesson.lesson_number))
                            }">
                                {{ get_status_icon(get_lesson_status(module.module_number, lesson.lesson_number)) }}
                            </div>

                            <!-- Info -->
                            <div class="lesson__info">
                                <h4 class="lesson__title">
                                    {{ lesson.lesson_number }}. {{ lesson.lesson_title }}
                                </h4>
                                <p v-if="lesson.lesson_description" class="lesson__description">
                                    {{ lesson.lesson_description }}
                                </p>
                            </div>

                            <!-- Candado si está bloqueada -->
                            <div v-if="!can_access_lesson(module.module_number, lesson.lesson_number).can_access"
                                class="lesson__lock">
                                <span class="lock-icon">🔒</span>
                                <span class="lock-tooltip">Completa la lección anterior</span>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.course-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h2 {
        margin: 0;
        font-size: 2rem;
        color: var(--color-primary);
    }
}

.modules-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.module {
    background: var(--color-white);
    border: 2px solid var(--color-disable);
    border-radius: 1rem;
    overflow: hidden;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    &__header {
        width: 100%;
        padding: 1.5rem;
        background: #f8f9fa;
        border: none;
        display: flex;
        align-items: center;
        justify-content: space-between;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background: #e9ecef;
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        text-align: left;
    }

    &__number {
        font-family: 'Text';
        font-size: 0.85rem;
        font-weight: 600;
        color: var(--color-primary);
        text-transform: uppercase;
        letter-spacing: 0.5px;
    }

    &__title {
        margin: 0;
        font-size: 1.3rem;
        color: var(--color-black);
        font-family: 'Title';
    }

    &__icon {
        font-size: 1.2rem;
        color: var(--color-primary);
        transition: transform 0.3s ease;

        &--open {
            transform: rotate(180deg);
        }
    }

    &__lessons {
        display: flex;
        flex-direction: column;
        border-top: 2px solid var(--color-disable);
    }
}

.lesson {
    display: grid;
    grid-template-columns: 40px 1fr auto;
    gap: 1rem;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--color-disable);
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;

    &:last-child {
        border-bottom: none;
    }

    &:hover:not(&--locked) {
        background: #f8f9fa;
        transform: translateX(5px);
    }

    &--locked {
        opacity: 0.5;
        cursor: not-allowed;
    }

    &--completed {
        .lesson__title {
            color: #5a9e7d;
        }
    }

    &__status {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: bold;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    &__title {
        margin: 0;
        font-size: 1.1rem;
        color: var(--color-black);
        font-family: 'Text';
        font-weight: 600;
        line-height: 1.3;
    }

    &__description {
        margin: 0;
        font-size: 0.9rem;
        color: var(--color-text-dark);
        line-height: 1.4;
    }

    &__lock {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        position: relative;

        .lock-icon {
            font-size: 1.2rem;
        }

        .lock-tooltip {
            position: absolute;
            right: 100%;
            margin-right: 1rem;
            padding: 0.5rem 1rem;
            background: var(--color-black);
            color: var(--color-white);
            border-radius: 0.5rem;
            font-family: 'Text';
            font-size: 0.85rem;
            white-space: nowrap;
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.3s ease;
        }

        &:hover .lock-tooltip {
            opacity: 1;
        }
    }
}

// Transición slide
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
    max-height: 1000px;
}

.slide-enter-from,
.slide-leave-to {
    max-height: 0;
    opacity: 0;
}

@media screen and (max-width: 768px) {
    .course-content {
        h2 {
            font-size: 1.6rem;
        }
    }

    .module {
        &__header {
            padding: 1rem;
        }

        &__title {
            font-size: 1.1rem;
        }
    }

    .lesson {
        grid-template-columns: 30px 1fr auto;
        padding: 1rem;
        gap: 0.75rem;

        &__title {
            font-size: 1rem;
        }

        &__description {
            font-size: 0.85rem;
        }

        &__lock {
            .lock-tooltip {
                position: fixed;
                right: auto;
                left: 50%;
                bottom: 2rem;
                transform: translateX(-50%);
                margin: 0;
                z-index: 1000;
            }
        }
    }
}
</style>