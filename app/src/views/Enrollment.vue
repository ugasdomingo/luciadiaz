<template>
    <main class="enrollment-page">
        <!-- Breadcrumbs -->
        <nav class="enrollment-page__breadcrumbs" v-if="formation">
            <RouterLink to="/">Inicio</RouterLink>
            <span class="separator">/</span>
            <RouterLink to="/formaciones">Formaciones</RouterLink>
            <span class="separator">/</span>
            <RouterLink :to="`/formaciones/${formation.slug}`">{{ formation.title }}</RouterLink>
            <span class="separator">/</span>
            <span class="current">Inscripción</span>
        </nav>

        <!-- Error State -->
        <div v-if="error" class="enrollment-page__error">
            <h2>⚠️ Acceso denegado</h2>
            <p>{{ error }}</p>
            <div class="enrollment-page__error-actions">
                <RouterLink :to="`/formaciones/${route.params.formation_slug}`" class="action-btn">
                    Volver a la formación
                </RouterLink>
                <a :href="util_store.whatsapp_link" target="_blank" class="nobg-btn">
                    Contactar por WhatsApp
                </a>
            </div>
        </div>

        <!-- Content -->
        <div v-else-if="access_granted && formation" class="enrollment-page__content">
            <div class="enrollment-page__info">
                <h1>Inscripción a la formación</h1>
                <div class="formation-summary">
                    <img :src="formation.formation_cover.secure_url" :alt="formation.title">
                    <div class="formation-summary__details">
                        <h2>{{ formation.title }}</h2>
                        <p>{{ formation.description }}</p>
                        <div class="formation-summary__meta">
                            <span>📅 {{ format_date(formation.start_date) }}</span>
                            <span>⏱️ {{ formation.duration }}</span>
                            <span>💰 {{ formation.price }}€</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Mostrar componente según el estado de autenticación -->
            <AccessValidationComponent v-if="!auth_store.token" :formation="formation" :access_key="access_key"
                :payment_method="payment_method" @access-validated="handle_access_validated" />

            <EnrollmentFormComponent v-else :formation="formation" :access_key="access_key"
                :payment_method="payment_method" />
        </div>
    </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormationStore } from '../stores/formation-store'
import { useAuthStore } from '../stores/auth-store'
import { useUtilStore } from '../stores/util-store'
import { useEnrollmentStore } from '../stores/enrollment-store'
import AccessValidationComponent from '../components/enrollment/AccessValidationComponent.vue'
import EnrollmentFormComponent from '../components/enrollment/EnrollmentFormComponent.vue'

const route = useRoute()
const router = useRouter()
const formation_store = useFormationStore()
const auth_store = useAuthStore()
const util_store = useUtilStore()
const enrollment_store = useEnrollmentStore()

const formation = ref(null)
const error = ref(null)
const access_granted = ref(false)
const access_key = ref(null)
const payment_method = ref(null)

onBeforeMount(async () => {
    try {
        util_store.set_loading(true)

        // 1. Cargar la formación
        await formation_store.get_formation_by_slug(route.params.formation_slug)
        formation.value = formation_store.formation

        if (!formation.value) {
            error.value = 'Formación no encontrada'
            return
        }

        // 2. Detectar método de acceso
        const query_params = route.query

        // Si tiene success_payment=true (viene de PayPal)
        if (query_params.success_payment === 'true') {
            payment_method.value = 'paypal'
            access_granted.value = true
            return
        }

        // Si tiene key en la URL (bizum/efectivo)
        if (query_params.key) {
            access_key.value = query_params.key

            // Validar la clave
            const is_valid = await enrollment_store.validate_access_key(
                formation.value._id,
                access_key.value
            )

            if (is_valid) {
                payment_method.value = 'bizum'
                access_granted.value = true
            } else {
                error.value = 'Clave de acceso inválida o expirada'
            }

            return
        }

        // Si la formación es gratuita
        if (formation.value.price === 0) {
            payment_method.value = 'gratuito'
            access_granted.value = true
            return
        }

        // Si es admin
        if (auth_store.user_data?.user?.role === 'Admin') {
            payment_method.value = 'gratuito'
            access_granted.value = true
            return
        }

        // Si llegó aquí sin método de pago válido
        error.value = 'Debes pagar la formación o tener una clave de acceso válida para inscribirte'

    } catch (err) {
        console.error(err)
        error.value = 'Error al cargar la información de la formación'
    } finally {
        util_store.set_loading(false)
    }
})

const format_date = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('es-ES', options)
}

const handle_access_validated = () => {
    router.go(0)
}
</script>

<style scoped lang="scss">
.enrollment-page {
    width: 100%;
    min-height: 100vh;
    padding: 6rem 4rem 4rem;
    margin: 0;
    box-sizing: border-box;
    animation: fade-in 0.6s ease-out;

    &__breadcrumbs {
        max-width: 1000px;
        margin: 0 auto 2rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9rem;
        font-family: 'Text';
        color: var(--color-text-dark);

        a {
            color: var(--color-secondary);
            transition: color 0.3s ease;

            &:hover {
                color: var(--color-primary);
            }
        }

        .separator {
            color: var(--color-disable);
        }

        .current {
            color: var(--color-text-dark);
        }
    }

    &__loading,
    &__error {
        max-width: 600px;
        margin: 4rem auto;
        text-align: center;
        padding: 3rem;
        background: var(--color-white);
        border-radius: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

        h2 {
            margin: 0 0 1rem;
            color: var(--color-primary);
        }

        p {
            margin: 0 0 2rem;
            color: var(--color-text-dark);
            font-size: 1.1rem;
        }
    }

    &__error-actions {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
    }

    &__content {
        max-width: 1000px;
        margin: 0 auto;
    }

    &__info {
        margin-bottom: 3rem;

        h1 {
            text-align: center;
            margin: 0 0 2rem;
            color: var(--color-primary);
        }
    }
}

.formation-summary {
    display: flex;
    gap: 2rem;
    padding: 2rem;
    background: var(--color-white);
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    img {
        width: 200px;
        height: 200px;
        object-fit: cover;
        border-radius: 0.5rem;
        flex-shrink: 0;
    }

    &__details {
        flex: 1;

        h2 {
            margin: 0 0 1rem;
            color: var(--color-black);
            font-size: 1.5rem;
        }

        p {
            margin: 0 0 1.5rem;
            color: var(--color-text-dark);
            line-height: 1.6;
        }
    }

    &__meta {
        display: flex;
        gap: 1.5rem;
        flex-wrap: wrap;
        font-size: 0.95rem;
        color: var(--color-text-dark);
        font-family: 'Text';

        span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    }
}

@keyframes fade-in {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media screen and (max-width: 768px) {
    .enrollment-page {
        padding: 5rem 1rem 2rem;

        &__breadcrumbs {
            font-size: 0.8rem;
            flex-wrap: wrap;
        }
    }

    .formation-summary {
        flex-direction: column;
        padding: 1.5rem;

        img {
            width: 100%;
            height: auto;
        }

        &__details h2 {
            font-size: 1.25rem;
        }

        &__meta {
            gap: 1rem;
        }
    }
}
</style>