<template>
    <main class="formation-landing-page">
        <!-- Error: Formation not found -->
        <div v-if="error_loading" class="error-state">
            <h2>⚠️ Formación no encontrada</h2>
            <p>Lo sentimos, no pudimos cargar esta formación.</p>
            <RouterLink to="/formaciones" class="action-btn">
                Volver a formaciones
            </RouterLink>
        </div>

        <!-- Error: No landing available for this formation -->
        <div v-else-if="error_no_landing && formation" class="error-state">
            <h2>🚧 Página en construcción</h2>
            <p>Esta formación aún no tiene una página configurada.</p>
            <div class="error-actions">
                <RouterLink to="/formaciones" class="action-btn">
                    Volver a formaciones
                </RouterLink>
                <a :href="util_store.whatsapp_link" target="_blank" class="nobg-btn">
                    Contactar por WhatsApp
                </a>
            </div>
        </div>

        <!-- Dynamic Landing Component -->
        <component v-else-if="landing_component && formation" :is="landing_component" :formation="formation" />
    </main>
</template>

<script setup>
import { ref, onBeforeMount, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormationStore } from '../stores/formation-store'
import { useUtilStore } from '../stores/util-store'
import { useAuthStore } from '../stores/auth-store'

const route = useRoute()
const router = useRouter()
const formation_store = useFormationStore()
const util_store = useUtilStore()
const auth_store = useAuthStore()

const formation = ref(null)
const error_loading = ref(false)
const error_no_landing = ref(false)

// shallowRef para evitar que Vue haga reactivo el componente completo
const landing_component = shallowRef(null)

// Mapa de slugs a nombres de archivo de componentes
const landing_map = {
    'despierta-a-tu-mente': 'DespiertaTuMenteLanding',
    'construye-relaciones-saludables': 'ApegoLanding',
    // Agregar más landings aquí conforme se crean (1 línea por landing)
}

const load_landing_component = async (slug) => {
    const componentName = landing_map[slug]

    if (!componentName) {
        error_no_landing.value = true
        return
    }

    try {
        const module = await import(`../components/landings/${componentName}.vue`)
        landing_component.value = module.default
    } catch (error) {
        console.error(`Error cargando landing component para ${slug}:`, error)
        error_no_landing.value = true
    }
}

onBeforeMount(async () => {
    try {
        util_store.set_loading(true)

        // 1. Cargar datos de la formación desde BD
        await formation_store.get_formation_by_slug(route.params.formation_slug)
        formation.value = formation_store.formation

        if (!formation.value) {
            error_loading.value = true
            return
        }

        // 2. Validar si el usuario está inscrito
        const is_enrolled = auth_store.user_data?.progress?.some(progress => progress.formation_id === formation.value._id)

        if (is_enrolled) {
            router.push(`/formaciones/${route.params.formation_slug}/dashboard`)
            return
        }
        // 3. Cargar el componente de landing dinámicamente
        await load_landing_component(formation.value.slug)

    } catch (error) {
        console.error('Error cargando formación:', error)
        error_loading.value = true
    } finally {
        util_store.set_loading(false)
    }
})
</script>

<style scoped lang="scss">
.formation-landing-page {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    background: var(--color-white);
}

.loading-state {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.5rem;
    padding: 2rem;

    .spinner {
        width: 50px;
        height: 50px;
        border: 4px solid var(--color-disable);
        border-top-color: var(--color-primary);
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    p {
        font-size: 1.1rem;
        color: var(--color-text-dark);
        font-family: 'Text';
    }
}

.error-state {
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    padding: 4rem 2rem;
    text-align: center;

    h2 {
        font-size: 2.5rem;
        color: var(--color-primary);
        margin: 0;
    }

    p {
        font-size: 1.2rem;
        color: var(--color-text-dark);
        max-width: 500px;
        margin: 0;
    }

    .error-actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
    }

    .action-btn,
    .nobg-btn {
        max-width: fit-content;
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

@media screen and (max-width: 768px) {
    .error-state {
        padding: 3rem 1rem;

        h2 {
            font-size: 2rem;
        }

        p {
            font-size: 1rem;
        }

        .error-actions {
            flex-direction: column;
            width: 100%;

            .action-btn,
            .nobg-btn {
                width: 100%;
                max-width: 100%;
            }
        }
    }
}
</style>
