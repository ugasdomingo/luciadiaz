<template>
    <main class="enrollment-confirmation">
        <!-- Breadcrumbs -->
        <nav class="enrollment-confirmation__breadcrumbs" v-if="formation">
            <RouterLink to="/">Inicio</RouterLink>
            <span class="separator">/</span>
            <RouterLink to="/formaciones">Formaciones</RouterLink>
            <span class="separator">/</span>
            <RouterLink :to="`/formaciones/${formation.slug}`">{{ formation.title }}</RouterLink>
            <span class="separator">/</span>
            <span class="current">Confirmación</span>
        </nav>

        <div class="enrollment-confirmation__content" v-if="formation">
            <!-- Success Icon -->
            <div class="enrollment-confirmation__icon">
                <div class="success-checkmark">
                    <div class="check-icon">
                        <span class="icon-line line-tip"></span>
                        <span class="icon-line line-long"></span>
                        <div class="icon-circle"></div>
                        <div class="icon-fix"></div>
                    </div>
                </div>
            </div>

            <!-- Success Message -->
            <div class="enrollment-confirmation__message">
                <h1>¡Inscripción confirmada!</h1>
                <p class="subtitle">Te has inscrito exitosamente en la formación</p>
            </div>

            <!-- Formation Info -->
            <div class="enrollment-confirmation__formation">
                <img :src="formation.formation_cover.secure_url" :alt="formation.title">
                <div class="formation-details">
                    <h2>{{ formation.title }}</h2>
                    <div class="formation-meta">
                        <div class="meta-item">
                            <span class="meta-icon">📅</span>
                            <span>{{ format_date(formation.start_date) }}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">⏱️</span>
                            <span>{{ formation.duration }}</span>
                        </div>
                        <div class="meta-item">
                            <span class="meta-icon">📍</span>
                            <span>{{ formation.location }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Next Steps -->
            <div class="enrollment-confirmation__next-steps">
                <h3>📬 Próximos pasos</h3>
                <ul>
                    <li>✅ Recibirás un email de confirmación con todos los detalles</li>
                    <li>📋 Te enviaremos información adicional antes del inicio</li>
                    <li>💬 Si tienes dudas, puedes contactarme por WhatsApp</li>
                    <li>🎓 Prepárate para una experiencia transformadora</li>
                </ul>
            </div>

            <!-- Actions -->
            <div class="enrollment-confirmation__actions">
                <RouterLink to="/mi-espacio" class="action-btn" v-if="auth_store.token">
                    Ver mi espacio
                </RouterLink>
                <RouterLink to="/formaciones" class="nobg-btn">
                    Ver otras formaciones
                </RouterLink>
                <a :href="util_store.whatsapp_link" target="_blank" class="whatsapp-btn">
                    <span>💬</span> Contactar por WhatsApp
                </a>
            </div>
        </div>
    </main>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useFormationStore } from '../../stores/formation-store'
import { useAuthStore } from '../../stores/auth-store'
import { useUtilStore } from '../../stores/util-store'

const route = useRoute()
const formation_store = useFormationStore()
const auth_store = useAuthStore()
const util_store = useUtilStore()

const formation = ref(null)

onBeforeMount(async () => {
    try {
        util_store.set_loading(true)
        await formation_store.get_formation_by_slug(route.params.formation_slug)
        formation.value = formation_store.formation
    } catch (error) {
        console.error(error)
    } finally {
        util_store.set_loading(false)
    }
})

const format_date = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('es-ES', options)
}
</script>

<style scoped lang="scss">
.enrollment-confirmation {
    width: 100%;
    min-height: 100vh;
    padding: 6rem 4rem 4rem;
    margin: 0;
    box-sizing: border-box;
    animation: fade-in 0.6s ease-out;

    &__breadcrumbs {
        max-width: 800px;
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

    &__content {
        max-width: 800px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2.5rem;
    }

    &__icon {
        animation: scale-in 0.5s ease-out 0.3s both;
    }

    &__message {
        text-align: center;
        animation: fade-in-up 0.6s ease-out 0.5s both;

        h1 {
            margin: 0 0 0.5rem;
            font-size: 2.5rem;
            color: var(--color-primary);
        }

        .subtitle {
            margin: 0;
            font-size: 1.2rem;
            color: var(--color-text-dark);
            font-family: 'Text';
        }
    }

    &__formation {
        width: 100%;
        display: flex;
        gap: 2rem;
        padding: 2rem;
        background: var(--color-white);
        border-radius: 1rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        animation: fade-in-up 0.6s ease-out 0.7s both;

        img {
            width: 200px;
            height: 200px;
            object-fit: cover;
            border-radius: 0.75rem;
            flex-shrink: 0;
        }

        .formation-details {
            flex: 1;

            h2 {
                margin: 0 0 1.5rem;
                font-size: 1.5rem;
                color: var(--color-black);
                font-family: 'Title';
            }

            .formation-meta {
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                    font-family: 'Text';
                    font-size: 1rem;
                    color: var(--color-text-dark);

                    .meta-icon {
                        font-size: 1.25rem;
                    }
                }
            }
        }
    }

    &__next-steps {
        width: 100%;
        padding: 2rem;
        background: var(--color-soft-alert);
        border-radius: 1rem;
        animation: fade-in-up 0.6s ease-out 0.9s both;

        h3 {
            margin: 0 0 1.5rem;
            font-size: 1.3rem;
            color: var(--color-secondary);
            font-family: 'Title';
        }

        ul {
            margin: 0;
            padding: 0;
            list-style: none;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            li {
                font-family: 'Text';
                font-size: 1rem;
                line-height: 1.6;
                color: var(--color-text);
                padding-left: 0;
            }
        }
    }

    &__actions {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        justify-content: center;
        animation: fade-in-up 0.6s ease-out 1.1s both;

        .whatsapp-btn {
            padding: 0.75rem 1.5rem;
            background: #25D366;
            color: white;
            border-radius: 0.5rem;
            font-family: 'Text';
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            transition: all 0.3s ease;
            text-decoration: none;

            &:hover {
                background: #20ba5a;
                transform: translateY(-2px);
            }
        }
    }
}

// Success Checkmark Animation
.success-checkmark {
    width: 80px;
    height: 80px;
    margin: 0 auto;

    .check-icon {
        width: 80px;
        height: 80px;
        position: relative;
        border-radius: 50%;
        box-sizing: content-box;
        border: 4px solid #4CAF50;

        &::before {
            top: 3px;
            left: -2px;
            width: 30px;
            transform-origin: 100% 50%;
            border-radius: 100px 0 0 100px;
        }

        &::after {
            top: 0;
            left: 30px;
            width: 60px;
            transform-origin: 0 50%;
            border-radius: 0 100px 100px 0;
            animation: rotate-circle 4.25s ease-in;
        }

        &::before,
        &::after {
            content: '';
            height: 100px;
            position: absolute;
            background: var(--color-white);
            transform: rotate(-45deg);
        }

        .icon-line {
            height: 5px;
            background-color: #4CAF50;
            display: block;
            border-radius: 2px;
            position: absolute;
            z-index: 10;

            &.line-tip {
                top: 46px;
                left: 14px;
                width: 25px;
                transform: rotate(45deg);
                animation: icon-line-tip 0.75s;
            }

            &.line-long {
                top: 38px;
                right: 8px;
                width: 47px;
                transform: rotate(-45deg);
                animation: icon-line-long 0.75s;
            }
        }

        .icon-circle {
            top: -4px;
            left: -4px;
            z-index: 10;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            position: absolute;
            box-sizing: content-box;
            border: 4px solid rgba(76, 175, 80, 0.5);
        }

        .icon-fix {
            top: 8px;
            width: 5px;
            left: 26px;
            z-index: 1;
            height: 85px;
            position: absolute;
            transform: rotate(-45deg);
            background-color: var(--color-white);
        }
    }
}

@keyframes rotate-circle {
    0% {
        transform: rotate(-45deg);
    }

    5% {
        transform: rotate(-45deg);
    }

    12% {
        transform: rotate(-405deg);
    }

    100% {
        transform: rotate(-405deg);
    }
}

@keyframes icon-line-tip {
    0% {
        width: 0;
        left: 1px;
        top: 19px;
    }

    54% {
        width: 0;
        left: 1px;
        top: 19px;
    }

    70% {
        width: 50px;
        left: -8px;
        top: 37px;
    }

    84% {
        width: 17px;
        left: 21px;
        top: 48px;
    }

    100% {
        width: 25px;
        left: 14px;
        top: 45px;
    }
}

@keyframes icon-line-long {
    0% {
        width: 0;
        right: 46px;
        top: 54px;
    }

    65% {
        width: 0;
        right: 46px;
        top: 54px;
    }

    84% {
        width: 55px;
        right: 0px;
        top: 35px;
    }

    100% {
        width: 47px;
        right: 8px;
        top: 38px;
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

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes scale-in {
    from {
        opacity: 0;
        transform: scale(0.5);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

@media screen and (max-width: 768px) {
    .enrollment-confirmation {
        padding: 5rem 1rem 2rem;

        &__breadcrumbs {
            font-size: 0.8rem;
            flex-wrap: wrap;
        }

        &__message h1 {
            font-size: 2rem;
        }

        &__formation {
            flex-direction: column;
            padding: 1.5rem;

            img {
                width: 100%;
                height: auto;
            }
        }

        &__actions {
            flex-direction: column;
            width: 100%;

            .action-btn,
            .nobg-btn,
            .whatsapp-btn {
                width: 100%;
                justify-content: center;
            }
        }
    }

    .success-checkmark {
        width: 60px;
        height: 60px;

        .check-icon {
            width: 60px;
            height: 60px;

            .icon-line {
                &.line-tip {
                    width: 20px;
                    top: 34px;
                    left: 10px;
                }

                &.line-long {
                    width: 35px;
                    top: 28px;
                    right: 6px;
                }
            }

            .icon-circle {
                width: 60px;
                height: 60px;
            }
        }
    }
}
</style>