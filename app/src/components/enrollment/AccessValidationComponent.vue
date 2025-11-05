<template>
    <section class="access-validation">
        <div class="access-validation__header">
            <h2>Completa tu registro</h2>
            <p>Para formalizar tu inscripción en esta formación necesitas crear una cuenta o iniciar sesión</p>
        </div>

        <div class="access-validation__tabs">
            <button @click="active_tab = 'register'" :class="{ active: active_tab === 'register' }" class="tab-btn">
                Crear cuenta
            </button>
            <button @click="active_tab = 'login'" :class="{ active: active_tab === 'login' }" class="tab-btn">
                Iniciar sesión
            </button>
        </div>

        <!-- Register Form -->
        <RegisterComponent v-if="active_tab === 'register'" />

        <!-- Login Form -->
        <LoginComponent v-if="active_tab === 'login'" />

        <div class="access-validation__note">
            <p>💡 Tus datos están seguros y solo los usaremos para gestionar tu inscripción</p>
        </div>
    </section>
</template>

<script setup>
import { ref } from 'vue'
import LoginComponent from '../auth/LoginComponent.vue'
import RegisterComponent from '../auth/RegisterComponent.vue'

defineProps({
    formation: Object,
    access_key: String,
    payment_method: String
})

const emit = defineEmits(['access-validated'])

const active_tab = ref('register')

</script>

<style scoped lang="scss">
.access-validation {
    max-width: 600px;
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

    &__tabs {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
        border-bottom: 2px solid var(--color-disable);

        .tab-btn {
            flex: 1;
            padding: 1rem;
            border: none;
            background: transparent;
            font-family: 'Text';
            font-size: 1rem;
            font-weight: 500;
            color: var(--color-text-dark);
            cursor: pointer;
            transition: all 0.3s ease;
            border-bottom: 3px solid transparent;
            margin-bottom: -2px;

            &:hover {
                color: var(--color-primary);
            }

            &.active {
                color: var(--color-primary);
                border-bottom-color: var(--color-primary);
            }
        }
    }

    &__form {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;

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

            &.checkbox {
                flex-direction: row;
                align-items: center;
                gap: 0.75rem;

                input[type="checkbox"] {
                    width: auto;
                    cursor: pointer;
                }

                label {
                    font-size: 0.9rem;
                    color: var(--color-text-dark);

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

        .forgot-password {
            font-size: 0.9rem;
            color: var(--color-secondary);
            text-decoration: underline;
            align-self: flex-end;
            margin-top: -0.5rem;

            &:hover {
                color: var(--color-primary);
            }
        }

        .action-btn {
            width: 100%;
            max-width: 100%;
            margin-top: 0.5rem;
        }
    }

    &__note {
        margin-top: 2rem;
        padding: 1rem;
        background: var(--color-soft-alert);
        border-radius: 0.5rem;
        text-align: center;

        p {
            margin: 0;
            font-size: 0.9rem;
            color: var(--color-text-dark);
            font-family: 'Text';
        }
    }
}

@media screen and (max-width: 768px) {
    .access-validation {
        padding: 1.5rem;

        &__header h2 {
            font-size: 1.5rem;
        }

        &__tabs {
            .tab-btn {
                font-size: 0.9rem;
                padding: 0.75rem;
            }
        }

        &__form {
            gap: 1.25rem;
        }
    }
}
</style>