<template>
    <section class="enrollment-form">
        <div class="enrollment-form__header">
            <h2>Confirma tu inscripción</h2>
            <p>Revisa la información y confirma tu participación</p>
        </div>

        <form @submit.prevent="handle_submit" class="enrollment-form__content">
            <div class="enrollment-form__user-data">
                <h3>Tus datos</h3>

                <div class="user-info-display">
                    <div class="info-row">
                        <span class="info-label">Nombre:</span>
                        <span class="info-value">{{ auth_store.user_data.user.name }}</span>
                    </div>
                    <div class="info-row">
                        <span class="info-label">Email:</span>
                        <span class="info-value">{{ auth_store.user_data.user.email }}</span>
                    </div>
                </div>

                <!-- Solo mostrar input de teléfono si NO lo tiene -->
                <div class="form-group" v-if="!auth_store.user_data.user.phone">
                    <label for="phone">Teléfono *</label>
                    <input type="tel" id="phone" v-model="phone" required placeholder="+34 600 000 000">
                    <span class="form-hint">
                        Por favor completa tu teléfono para poder contactarte
                    </span>
                </div>
                <div class="info-row" v-else>
                    <span class="info-label">Teléfono:</span>
                    <span class="info-value">{{ auth_store.user_data.user.phone }}</span>
                </div>
            </div>

            <div class="enrollment-form__payment-info">
                <h3>Información de pago</h3>

                <div class="payment-method-display">
                    <div class="payment-badge" :class="`payment-${selected_payment_method}`">
                        <span class="payment-icon">{{ get_payment_icon(selected_payment_method) }}</span>
                        <div class="payment-details">
                            <span class="payment-label">Método de pago</span>
                            <span class="payment-value">{{ get_payment_label(selected_payment_method) }}</span>
                        </div>
                    </div>
                </div>

                <!-- Solo si tiene clave, permitir cambiar entre bizum/efectivo -->
                <div class="form-group" v-if="show_payment_selector">
                    <label>Puedes cambiar el método de pago si lo prefieres:</label>
                    <div class="payment-options">
                        <label class="payment-option">
                            <input type="radio" name="payment" value="bizum" v-model="selected_payment_method">
                            <span>📱 Bizum</span>
                        </label>
                        <label class="payment-option">
                            <input type="radio" name="payment" value="efectivo" v-model="selected_payment_method">
                            <span>💵 Efectivo</span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="enrollment-form__terms">
                <label class="checkbox-label">
                    <input type="checkbox" v-model="accept_terms" required>
                    <span>
                        He leído y acepto los
                        <RouterLink to="/terminos" target="_blank">términos y condiciones</RouterLink>
                        de la formación
                    </span>
                </label>
            </div>

            <button type="submit" class="action-btn enrollment-form__submit">
                Confirmar inscripción
            </button>

            <p class="enrollment-form__note">
                📧 Recibirás un email de confirmación con toda la información de la formación
            </p>
        </form>
    </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth-store'
import { useUtilStore } from '../../stores/util-store'
import { useEnrollmentStore } from '../../stores/enrollment-store'
import { useAdminStore } from '../../stores/admin-store'

const props = defineProps({
    formation: {
        type: Object,
        required: true
    },
    access_key: {
        type: String,
        default: null
    },
    payment_method: {
        type: String,
        required: true
    }
})

const router = useRouter()
const auth_store = useAuthStore()
const util_store = useUtilStore()
const enrollment_store = useEnrollmentStore()
const admin_store = useAdminStore()

const phone = ref('')
const accept_terms = ref(false)
const selected_payment_method = ref(props.payment_method)

// Mostrar selector de método de pago solo si tiene clave (bizum/efectivo)
const show_payment_selector = computed(() => {
    return props.access_key && (props.payment_method === 'bizum' || props.payment_method === 'efectivo')
})

const get_payment_icon = (method) => {
    const icons = {
        paypal: '💳',
        bizum: '📱',
        efectivo: '💵',
        gratuito: '🎁'
    }
    return icons[method] || '💰'
}

const get_payment_label = (method) => {
    const labels = {
        paypal: 'PayPal',
        bizum: 'Bizum',
        efectivo: 'Efectivo',
        gratuito: 'Gratuito'
    }
    return labels[method] || method
}

const handle_submit = async () => {
    try {
        util_store.set_loading(true)

        // Actualizar teléfono del usuario si hace falta
        if (phone.value && !auth_store.user_data.user.phone) {
            await admin_store.update_user(auth_store.user_data.user._id, {
                phone: phone.value
            })
        }

        // Crear enrollment
        await enrollment_store.create_enrollment({
            formation_id: props.formation._id,
            payment_method: selected_payment_method.value,
            access_key: props.access_key
        })

        // Redirigir a confirmación
        router.push({
            name: 'EnrollmentConfirmation',
            params: { formation_slug: props.formation.slug }
        })

    } catch (error) {
        console.error(error)
    } finally {
        util_store.set_loading(false)
    }
}
</script>

<style scoped lang="scss">
.enrollment-form {
    max-width: 700px;
    margin: 0 auto;
    padding: 2rem;
    background: var(--color-white);
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

    &__header {
        text-align: center;
        margin-bottom: 2rem;

        h2 {
            margin: 0 0 0.5rem;
            color: var(--color-primary);
            font-size: 1.8rem;
        }

        p {
            margin: 0;
            color: var(--color-text-dark);
            font-size: 1rem;
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    &__user-data,
    &__payment-info {
        h3 {
            margin: 0 0 1.5rem;
            font-size: 1.2rem;
            color: var(--color-secondary);
            font-family: 'Title';
            padding-bottom: 0.75rem;
            border-bottom: 2px solid var(--color-disable);
        }

        .user-info-display {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 1.25rem;
            background: var(--color-soft-alert);
            border-radius: 0.5rem;
            margin-bottom: 1.5rem;

            .info-row {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .info-label {
                    font-family: 'Text';
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: var(--color-text-dark);
                }

                .info-value {
                    font-family: 'Text';
                    font-size: 1rem;
                    font-weight: 600;
                    color: var(--color-black);
                }
            }
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            margin-bottom: 1.5rem;

            label {
                font-family: 'Text';
                font-size: 0.9rem;
                font-weight: 500;
                color: var(--color-text);
            }

            input {
                width: 100%;
                max-width: 100%;
                padding: 0.75rem;
                border: 1px solid var(--color-disable);
                border-radius: 0.5rem;
                font-family: 'Text';
                font-size: 1rem;
                transition: all 0.3s ease;

                &:focus {
                    outline: none;
                    border-color: var(--color-primary);
                    box-shadow: 0 0 0 3px rgba(107, 76, 147, 0.1);
                }
            }

            .form-hint {
                font-size: 0.85rem;
                color: var(--color-text-dark);
                font-family: 'Text';
            }
        }
    }

    .payment-method-display {
        margin-bottom: 1.5rem;

        .payment-badge {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 1.25rem;
            border-radius: 0.75rem;
            background: var(--color-soft-alert);
            border: 2px solid transparent;

            &.payment-paypal {
                background: #E8F4FD;
                border-color: #0070BA;
            }

            &.payment-bizum {
                background: #E8F9F3;
                border-color: #00D7A3;
            }

            &.payment-efectivo {
                background: #FFF4E6;
                border-color: #FF9800;
            }

            &.payment-gratuito {
                background: #F3E5F5;
                border-color: var(--color-primary);
            }

            .payment-icon {
                font-size: 2rem;
            }

            .payment-details {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;

                .payment-label {
                    font-size: 0.85rem;
                    color: var(--color-text-dark);
                    font-family: 'Text';
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .payment-value {
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: var(--color-black);
                    font-family: 'Text';
                }
            }
        }
    }

    .payment-options {
        display: flex;
        gap: 1rem;

        .payment-option {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 1rem;
            border: 2px solid var(--color-disable);
            border-radius: 0.5rem;
            cursor: pointer;
            transition: all 0.3s ease;

            input[type="radio"] {
                cursor: pointer;
            }

            span {
                font-family: 'Text';
                font-weight: 500;
            }

            &:has(input:checked) {
                border-color: var(--color-primary);
                background: var(--color-soft-alert);
            }
        }
    }

    &__terms {
        .checkbox-label {
            display: flex;
            align-items: flex-start;
            gap: 0.75rem;
            cursor: pointer;

            input[type="checkbox"] {
                margin-top: 0.25rem;
                cursor: pointer;
            }

            span {
                font-size: 0.9rem;
                color: var(--color-text-dark);
                font-family: 'Text';
                line-height: 1.5;

                a {
                    color: var(--color-secondary);
                    text-decoration: underline;

                    &:hover {
                        color: var(--color-primary);
                    }
                }
            }
        }
    }

    &__submit {
        width: 100%;
        max-width: 100%;
        padding: 1rem;
        font-size: 1.1rem;
        margin-top: 0.5rem;
    }

    &__note {
        text-align: center;
        margin: 0;
        padding: 1rem;
        background: var(--color-soft-alert);
        border-radius: 0.5rem;
        font-size: 0.9rem;
        color: var(--color-text-dark);
        font-family: 'Text';
    }
}

@media screen and (max-width: 768px) {
    .enrollment-form {
        padding: 1.5rem;

        &__header h2 {
            font-size: 1.5rem;
        }

        .payment-options {
            flex-direction: column;
        }

        .user-info-display .info-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.25rem;
        }
    }
}
</style>