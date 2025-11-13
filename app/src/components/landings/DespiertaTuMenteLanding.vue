<template>
    <div class="landing-despierta">
        <!-- HERO SECTION -->
        <section class="hero">
            <div class="hero__container">
                <h1 class="hero__headline">
                    ¿Por qué siempre terminas diciendo "sí" cuando querías decir "no"?
                </h1>
                <p class="hero__subheadline">
                    Un sábado para entender por qué reaccionas como lo haces
                    y cómo cambiarlo desde la raíz.
                </p>

                <!-- CTAs -->
                <div class="hero__ctas" v-if="!is_full">
                    <a :href="PAYPAL_RESERVA_URL" class="cta-btn cta-btn--primary" target="_blank">
                        Reservar con 30€
                    </a>
                    <a :href="formation.paypal_button" class="cta-btn cta-btn--secondary" target="_blank">
                        Pagar completo ({{ formation.price }}€)
                    </a>
                </div>

                <!-- Plazas completas -->
                <div class="hero__full" v-else>
                    <p class="full-message">✋ Plazas agotadas para esta fecha</p>
                    <a :href="whatsapp_link" class="cta-btn cta-btn--whatsapp" target="_blank">
                        Contactar por WhatsApp para próximas fechas
                    </a>
                </div>

                <!-- Info rápida -->
                <div class="hero__info">
                    <span>{{ places_message }}</span>
                    <span>📍 Madrid</span>
                    <span>📅 {{ formatted_date }} ({{ days_until }})</span>
                </div>
            </div>
        </section>

        <!-- EL ESPEJO -->
        <section class="mirror">
            <div class="mirror__container">
                <h2 class="mirror__title">¿Alguna vez te has sentido así?</h2>

                <div class="mirror__checks">
                    <div class="check-item" v-for="(item, index) in mirror_items" :key="index">
                        <span class="check-icon">✓</span>
                        <p>{{ item }}</p>
                    </div>
                </div>

                <p class="mirror__conclusion">
                    No es que seas débil. <strong>Es que nadie te enseñó cómo funciona tu mente.</strong>
                </p>
            </div>
        </section>

        <!-- 9 BENEFICIOS -->
        <section class="benefits">
            <div class="benefits__container">
                <h2 class="benefits__title">En 6 horas, vas a entender (y cambiar) cosas que llevas años repitiendo:
                </h2>

                <div class="benefits__grid">
                    <div class="benefit-card" v-for="(benefit, index) in benefits" :key="index">
                        <span class="benefit-number">{{ index + 1 }}</span>
                        <p class="benefit-text">{{ benefit }}</p>
                    </div>
                </div>

                <p class="benefits__footer">
                    Esto no es teoría. Son herramientas que usas ese mismo día
                    y sigues usando el resto de tu vida.
                </p>
            </div>
        </section>

        <!-- QUÉ APRENDERÁS -->
        <section class="content">
            <div class="content__container">
                <h2 class="content__title">Las herramientas que cambiarán tu forma de ver(te):</h2>

                <div class="content__blocks">
                    <div class="content-block" v-for="(block, index) in content_blocks" :key="index">
                        <div class="content-block__header">
                            <span class="content-block__number">{{ index + 1 }}</span>
                            <h3 class="content-block__title">{{ block.title }}</h3>
                        </div>
                        <p class="content-block__description">{{ block.description }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- QUIÉN FACILITA -->
        <section class="facilitator">
            <div class="facilitator__container">
                <h2 class="facilitator__title">Quién facilita</h2>

                <div class="facilitator__content">
                    <div class="facilitator__photo">
                        <img :src="facilitator.photo" :alt="facilitator.name">
                    </div>

                    <div class="facilitator__info">
                        <h3 class="facilitator__name">{{ facilitator.name }}</h3>
                        <p class="facilitator__title-role">{{ facilitator.title }}</p>
                        <p class="facilitator__bio" v-html="facilitator.bio.replace(/\n/g, '<br>')"></p>
                        <a :href="facilitator.instagram" class="facilitator__instagram" target="_blank" rel="noopener">
                            📸 {{ facilitator.instagram_handle }}
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- LOGÍSTICA + PRECIO -->
        <section class="logistics">
            <div class="logistics__container">
                <h2 class="logistics__title">Cómo funciona</h2>

                <div class="logistics__grid">
                    <div class="logistics-card">
                        <span class="logistics-icon">📅</span>
                        <h4>Fecha</h4>
                        <p>{{ formatted_date }}</p>
                    </div>

                    <div class="logistics-card">
                        <span class="logistics-icon">🕐</span>
                        <h4>Horario</h4>
                        <p>{{ formation.duration }}</p>
                    </div>

                    <div class="logistics-card">
                        <span class="logistics-icon">📍</span>
                        <h4>Lugar</h4>
                        <p>Madrid (dirección exacta al inscribirse)</p>
                    </div>

                    <div class="logistics-card">
                        <span class="logistics-icon">👥</span>
                        <h4>Cupo</h4>
                        <p>Solo 12 personas</p>
                    </div>
                </div>

                <!-- Precio -->
                <div class="pricing">
                    <h3 class="pricing__title">Inversión</h3>
                    <div class="pricing__content">
                        <div class="pricing__options">
                            <div class="pricing-option">
                                <span class="pricing-label">Reserva tu lugar</span>
                                <span class="pricing-value pricing-value--accent">30€</span>
                                <span class="pricing-note">Pagas el resto el día del curso</span>
                            </div>
                            <div class="pricing-separator">o</div>
                            <div class="pricing-option">
                                <span class="pricing-label">Pago completo</span>
                                <span class="pricing-value">{{ formation.price }}€</span>
                                <span class="pricing-note">Aseguras tu plaza ahora</span>
                            </div>
                        </div>
                    </div>

                    <!-- CTAs finales -->
                    <div class="pricing__ctas" v-if="!is_full">
                        <a :href="PAYPAL_RESERVA_URL" class="cta-btn cta-btn--primary cta-btn--large" target="_blank">
                            Reservar con 30€
                        </a>
                        <a :href="formation.paypal_button" class="cta-btn cta-btn--secondary cta-btn--large"
                            target="_blank">
                            Pagar completo ({{ formation.price }}€)
                        </a>
                    </div>

                    <div class="pricing__full" v-else>
                        <p class="full-message">✋ Plazas agotadas para esta fecha</p>
                        <a :href="whatsapp_link" class="cta-btn cta-btn--whatsapp cta-btn--large" target="_blank">
                            Contactar para próximas fechas
                        </a>
                    </div>

                    <div class="pricing__security">
                        <span>🔒 Pago seguro vía PayPal</span>
                        <span>{{ places_message }}</span>
                    </div>
                </div>
            </div>
        </section>

        <!-- FAQ -->
        <section class="faq">
            <div class="faq__container">
                <h2 class="faq__title">Preguntas frecuentes</h2>

                <div class="faq__list">
                    <div class="faq-item" v-for="(item, index) in faqs" :key="index"
                        :class="{ 'faq-item--open': open_faq === index }" @click="toggleFaq(index)">
                        <div class="faq-item__question">
                            <h4>{{ item.question }}</h4>
                            <span class="faq-item__icon">{{ open_faq === index ? '−' : '+' }}</span>
                        </div>
                        <transition name="faq-slide">
                            <div class="faq-item__answer" v-if="open_faq === index">
                                <p>{{ item.answer }}</p>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA FINAL -->
        <section class="final-cta">
            <div class="final-cta__container">
                <h2 class="final-cta__title">La pregunta no es si necesitas esto.</h2>
                <p class="final-cta__text">
                    La pregunta es: <strong>¿Cuánto tiempo más vas a seguir reaccionando igual?</strong>
                </p>
                <p class="final-cta__examples">
                    El mismo patrón con tus parejas.<br>
                    El mismo silencio cuando deberías hablar.<br>
                    La misma culpa cuando dices "no".<br>
                    El mismo piloto automático todos los días.
                </p>
                <p class="final-cta__urgency">
                    O reservas tu lugar hoy, o dentro de 6 meses seguirás igual.
                </p>

                <div class="final-cta__buttons" v-if="!is_full">
                    <a :href="formation.paypal_button" class="cta-btn cta-btn--primary cta-btn--xl" target="_blank">
                        Quiero despertar mi mente
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useUtilStore } from '../../stores/util-store'
import { lucia_info } from '../../static/facilitators/lucia-diaz.info'
import { despierta_tu_mente_faq } from '../../static/faqs/despierta-tu-mente-faq'

const props = defineProps({
    formation: {
        type: Object,
        required: true
    }
})

const util_store = useUtilStore()

// PayPal URLs
const PAYPAL_RESERVA_URL = 'https://www.paypal.com/ncp/payment/F8N63LKAVK5C8' // ← Cambia esta URL

// Data
const facilitator = lucia_info
const faqs = despierta_tu_mente_faq
const open_faq = ref(null)

const whatsapp_link = computed(() => util_store.whatsapp_link)

// Problemas del espejo
const mirror_items = [
    'Dices "sí" y después te arrepientes',
    'Vives la vida que otros esperan, no la tuya',
    'Repites conversaciones que nunca resuelven nada',
    'Te quedas callado cuando más necesitas hablar',
    'Eliges las mismas parejas/situaciones (terminan igual)',
    'Te sientes culpable cuando priorizas lo que TÚ quieres',
    'Sabes que algo no funciona, pero no sabes qué cambiar'
]

// 9 Beneficios
const benefits = [
    'Dejar de quedarte en blanco cuando más necesitas hablar',
    'Controlar los nervios antes de una conversación importante sin tener que tomar algo',
    'Entender por qué siempre eliges el mismo tipo de pareja (y termina igual)',
    'Descubrir por qué sigues haciendo cosas que sabes que te hacen daño',
    'Detectar y saber qué responder cuando alguien te quiere manipular',
    'Dejar de sentirte culpable cada vez que dices "no"',
    'Entender por qué casi todos malinterpretan lo que dices',
    'Saber exactamente qué hacer cuando sientes que "algo no está bien" pero no sabes qué',
    'Entender por qué tu hijo/pareja/amigo reaccionan de formas que no tienen sentido para ti'
]

// Contenido del curso
const content_blocks = [
    {
        title: 'El Metamodelo del Lenguaje',
        description: 'Por qué las conversaciones se vuelven circulares y cómo salir de ellas en 3 preguntas.'
    },
    {
        title: 'Calibración y Lenguaje Corporal',
        description: 'Cómo detectar cuando las palabras de alguien no coinciden con lo que realmente siente.'
    },
    {
        title: 'El Ejercicio de las Máscaras',
        description: 'El momento más incómodo (y revelador) del día: descubrir que lo que crees que es tu mayor virtud es exactamente lo que te sabotea.'
    },
    {
        title: 'Anclajes de Excelencia',
        description: 'Cómo "guardar" estados emocionales poderosos y activarlos cuando los necesitas (confianza, calma, claridad).'
    },
    {
        title: 'Niveles Neurológicos',
        description: 'El mapa para ubicar exactamente dónde está tu problema y qué cambiar primero.'
    },
    {
        title: 'Puente a Futuro',
        description: 'Cómo llegar mentalmente preparado/a a situaciones que antes te bloqueaban.'
    }
]

// Computeds para plazas
const available_places = computed(() => {
    const enrolled = props.formation.users_enrolled?.length || 0
    return Math.max(0, 12 - enrolled)
})

const is_full = computed(() => available_places.value === 0)

const places_message = computed(() => {
    const places = available_places.value

    if (places === 0) {
        return '✋ Plazas agotadas'
    } else if (places <= 3) {
        return `🔥 ¡ÚLTIMAS ${places} PLAZAS!`
    } else if (places <= 7) {
        return `⚠️ Solo quedan ${places} plazas disponibles`
    } else {
        return '✓ Plazas disponibles'
    }
})

// Formato de fecha
const formatted_date = computed(() => {
    if (!props.formation.start_date) return 'Fecha por confirmar'

    const date = new Date(props.formation.start_date)
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const formatted = date.toLocaleDateString('es-ES', options)
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
})

// Días hasta el curso
const days_until = computed(() => {
    if (!props.formation.start_date) return ''

    const today = new Date()
    const course_date = new Date(props.formation.start_date)
    const diff = Math.ceil((course_date - today) / (1000 * 60 * 60 * 24))

    if (diff < 0) return 'Fecha pasada'
    if (diff === 0) return '¡Hoy!'
    if (diff === 1) return 'Mañana'
    return `Faltan ${diff} días`
})

// Toggle FAQ
const toggleFaq = (index) => {
    open_faq.value = open_faq.value === index ? null : index
}
</script>

<style scoped lang="scss">
// Variables de la landing
$landing-accent: #d4a574;
$landing-warm: #c77966;
$landing-dark: #2d2d44;
$gradient-hero: linear-gradient(135deg, #6b4c93 0%, #4a4a8a 100%);
$gradient-cta: linear-gradient(135deg, #d4a574 0%, #c77966 100%);

.landing-despierta {
    width: 100%;
    margin: 0;
    padding: 0;
    background: var(--color-white);
}

// ========== HERO ==========
.hero {
    width: 100%;
    min-height: 100vh;
    background: $gradient-hero;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8rem 2rem 4rem;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
            radial-gradient(circle at 20% 50%, rgba(212, 165, 116, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(199, 121, 102, 0.1) 0%, transparent 50%);
        pointer-events: none;
    }

    &__container {
        max-width: 900px;
        width: 100%;
        text-align: center;
        position: relative;
        z-index: 1;
    }

    &__headline {
        font-size: 3.5rem;
        font-family: 'Title';
        color: var(--color-white);
        line-height: 1.2;
        margin: 0 0 1.5rem;
        font-weight: 600;
    }

    &__subheadline {
        font-size: 1.5rem;
        font-family: 'Text';
        color: rgba(255, 255, 255, 0.95);
        line-height: 1.6;
        margin: 0 0 3rem;
        font-weight: 300;
    }

    &__ctas {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }

    &__full {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
        margin-bottom: 2rem;

        .full-message {
            font-size: 1.3rem;
            color: var(--color-white);
            font-weight: 500;
            margin: 0;
        }
    }

    &__info {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: wrap;
        font-size: 1rem;
        color: rgba(255, 255, 255, 0.9);
        font-family: 'Text';

        span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
    }
}

// ========== BOTONES CTA ==========
.cta-btn {
    padding: 1rem 2.5rem;
    font-size: 1.1rem;
    font-family: 'Text';
    font-weight: 600;
    border-radius: 0.75rem;
    text-decoration: none;
    transition: all 0.3s ease;
    display: inline-block;
    border: none;
    cursor: pointer;

    &--primary {
        background: $gradient-cta;
        color: var(--color-white);
        box-shadow: 0 4px 15px rgba(212, 165, 116, 0.4);

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(212, 165, 116, 0.6);
        }
    }

    &--secondary {
        background: var(--color-white);
        color: var(--color-primary);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }
    }

    &--whatsapp {
        background: #25D366;
        color: var(--color-white);
        box-shadow: 0 4px 15px rgba(37, 211, 102, 0.3);

        &:hover {
            background: #20ba5a;
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.5);
        }
    }

    &--large {
        padding: 1.25rem 3rem;
        font-size: 1.2rem;
    }

    &--xl {
        padding: 1.5rem 4rem;
        font-size: 1.3rem;
    }
}

// ========== EL ESPEJO ==========
.mirror {
    padding: 6rem 2rem;
    background: var(--color-white);

    &__container {
        max-width: 1000px;
        margin: 0 auto;
    }

    &__title {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 3rem;
        color: var(--color-primary);
    }

    &__checks {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
        gap: 1.5rem;
        margin-bottom: 3rem;
    }

    &__conclusion {
        font-size: 1.3rem;
        text-align: center;
        color: $landing-dark;
        margin: 3rem 0 0;
        line-height: 1.6;

        strong {
            color: var(--color-primary);
            font-weight: 600;
        }
    }
}

.check-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: #f8f9fa;
    border-radius: 0.75rem;
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .check-icon {
        flex-shrink: 0;
        width: 24px;
        height: 24px;
        background: var(--color-primary);
        color: var(--color-white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 0.9rem;
    }

    p {
        margin: 0;
        font-size: 1.1rem;
        color: $landing-dark;
        line-height: 1.5;
    }
}

// ========== BENEFICIOS ==========
.benefits {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #f8f4fc 0%, var(--color-white) 100%);

    &__container {
        max-width: 1200px;
        margin: 0 auto;
    }

    &__title {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 4rem;
        color: var(--color-primary);
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    &__footer {
        font-size: 1.2rem;
        text-align: center;
        color: $landing-dark;
        margin: 3rem 0 0;
        font-weight: 500;
    }
}

.benefit-card {
    background: var(--color-white);
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    transition: all 0.3s ease;
    display: flex;
    gap: 1rem;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 30px rgba(107, 76, 147, 0.15);
    }

    .benefit-number {
        flex-shrink: 0;
        width: 40px;
        height: 40px;
        background: $gradient-cta;
        color: var(--color-white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.2rem;
    }

    .benefit-text {
        margin: 0;
        font-size: 1.05rem;
        color: $landing-dark;
        line-height: 1.6;
    }
}

// ========== CONTENIDO ==========
.content {
    padding: 6rem 2rem;
    background: var(--color-white);

    &__container {
        max-width: 1000px;
        margin: 0 auto;
    }

    &__title {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 4rem;
        color: var(--color-primary);
    }

    &__blocks {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }
}

.content-block {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 1rem;
    border-left: 4px solid var(--color-primary);
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border-left-color: $landing-accent;
    }

    &__header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1rem;
    }

    &__number {
        flex-shrink: 0;
        width: 36px;
        height: 36px;
        background: var(--color-primary);
        color: var(--color-white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
    }

    &__title {
        margin: 0;
        font-size: 1.4rem;
        color: var(--color-primary);
    }

    &__description {
        margin: 0;
        font-size: 1.05rem;
        color: $landing-dark;
        line-height: 1.6;
    }
}

// ========== FACILITATOR ==========
.facilitator {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, var(--color-white) 0%, #f8f4fc 100%);

    &__container {
        max-width: 1000px;
        margin: 0 auto;
    }

    &__title {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 4rem;
        color: var(--color-primary);
    }

    &__content {
        display: grid;
        grid-template-columns: 300px 1fr;
        gap: 3rem;
        align-items: start;
    }

    &__photo {
        img {
            width: 100%;
            height: auto;
            border-radius: 1rem;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    &__name {
        font-size: 2rem;
        color: var(--color-primary);
        margin: 0;
    }

    &__title-role {
        font-size: 1.2rem;
        color: $landing-accent;
        margin: 0;
        font-weight: 500;
    }

    &__bio {
        font-size: 1.05rem;
        color: $landing-dark;
        line-height: 1.7;
        margin: 1rem 0;
    }

    &__instagram {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--color-primary);
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
            color: $landing-accent;
            transform: translateX(5px);
        }
    }
}

// ========== LOGÍSTICA ==========
.logistics {
    padding: 6rem 2rem;
    background: var(--color-white);

    &__container {
        max-width: 1000px;
        margin: 0 auto;
    }

    &__title {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 3rem;
        color: var(--color-primary);
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        gap: 2rem;
        margin-bottom: 4rem;
    }
}

.logistics-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .logistics-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
    }

    h4 {
        margin: 0 0 0.5rem;
        font-size: 1.2rem;
        color: var(--color-primary);
    }

    p {
        margin: 0;
        font-size: 1rem;
        color: $landing-dark;
    }
}

// ========== PRICING ==========
.pricing {
    background: $gradient-hero;
    padding: 4rem;
    border-radius: 1.5rem;
    box-shadow: 0 8px 40px rgba(107, 76, 147, 0.3);

    &__title {
        font-size: 2rem;
        text-align: center;
        margin: 0 0 2rem;
        color: var(--color-white);
    }

    &__content {
        margin-bottom: 3rem;
    }

    &__options {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 3rem;
        flex-wrap: wrap;
    }

    &__ctas {
        display: flex;
        gap: 1.5rem;
        justify-content: center;
        flex-wrap: wrap;
        margin-bottom: 2rem;
    }

    &__full {
        text-align: center;
        margin-bottom: 2rem;

        .full-message {
            font-size: 1.3rem;
            color: var(--color-white);
            margin-bottom: 1.5rem;
        }
    }

    &__security {
        display: flex;
        gap: 2rem;
        justify-content: center;
        flex-wrap: wrap;
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.9);
    }
}

.pricing-option {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
}

.pricing-label {
    font-size: 1rem;
    color: rgba(255, 255, 255, 0.9);
}

.pricing-value {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-white);
    font-family: 'Title';

    &--accent {
        color: $landing-accent;
    }
}

.pricing-note {
    font-size: 0.9rem;
    color: rgba(255, 255, 255, 0.8);
}

.pricing-separator {
    font-size: 1.5rem;
    color: rgba(255, 255, 255, 0.6);
    font-weight: 300;
}

// ========== FAQ ==========
.faq {
    padding: 6rem 2rem;
    background: #f8f9fa;

    &__container {
        max-width: 900px;
        margin: 0 auto;
    }

    &__title {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 3rem;
        color: var(--color-primary);
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}

.faq-item {
    background: var(--color-white);
    border-radius: 0.75rem;
    overflow: hidden;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    &__question {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        gap: 1rem;

        h4 {
            margin: 0;
            font-size: 1.1rem;
            color: $landing-dark;
            font-family: 'Text';
            font-weight: 500;
        }
    }

    &__icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        background: var(--color-primary);
        color: var(--color-white);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.5rem;
        font-weight: 300;
        transition: all 0.3s ease;
    }

    &--open &__icon {
        background: $landing-accent;
    }

    &__answer {
        padding: 0 2rem 1.5rem;

        p {
            margin: 0;
            font-size: 1rem;
            color: $landing-dark;
            line-height: 1.7;
        }
    }
}

.faq-slide-enter-active,
.faq-slide-leave-active {
    transition: all 0.3s ease;
}

.faq-slide-enter-from,
.faq-slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

// ========== CTA FINAL ==========
.final-cta {
    padding: 6rem 2rem;
    background: $gradient-hero;
    position: relative;

    &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background:
            radial-gradient(circle at 30% 40%, rgba(212, 165, 116, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(199, 121, 102, 0.15) 0%, transparent 50%);
        pointer-events: none;
    }

    &__container {
        max-width: 800px;
        margin: 0 auto;
        text-align: center;
        position: relative;
        z-index: 1;
    }

    &__title {
        font-size: 2.5rem;
        color: var(--color-white);
        margin: 0 0 1.5rem;
    }

    &__text {
        font-size: 1.4rem;
        color: rgba(255, 255, 255, 0.95);
        margin: 0 0 2rem;
        line-height: 1.6;

        strong {
            color: $landing-accent;
            font-weight: 600;
        }
    }

    &__examples {
        font-size: 1.2rem;
        color: rgba(255, 255, 255, 0.9);
        margin: 0 0 2rem;
        line-height: 1.8;
    }

    &__urgency {
        font-size: 1.3rem;
        color: var(--color-white);
        margin: 0 0 3rem;
        font-weight: 500;
    }

    &__buttons {
        display: flex;
        justify-content: center;
    }
}

// ========== RESPONSIVE ==========
@media screen and (max-width: 1024px) {
    .facilitator__content {
        grid-template-columns: 1fr;
        gap: 2rem;

        .facilitator__photo {
            max-width: 300px;
            margin: 0 auto;
        }
    }
}

@media screen and (max-width: 768px) {
    .hero {
        padding: 6rem 1.5rem 3rem;
        box-sizing: border-box;

        &__headline {
            font-size: 2.2rem;
        }

        &__subheadline {
            font-size: 1.2rem;
        }

        &__ctas {
            flex-direction: column;
            width: 100%;

            .cta-btn {
                width: fit-content;
                max-width: 100%;
                align-self: center;
            }
        }

        &__info {
            flex-direction: column;
            gap: 0.5rem;
        }
    }

    .mirror__checks {
        grid-template-columns: 1fr;
    }

    .benefits__grid {
        grid-template-columns: 1fr;
    }

    .logistics__grid {
        grid-template-columns: 1fr;
    }

    .pricing {
        padding: 2rem 1.5rem;

        &__options {
            flex-direction: column;
            gap: 2rem;
        }

        &__ctas {
            flex-direction: column;
            width: 100%;

            .cta-btn {
                width: fit-content;
                max-width: 100%;
                text-align: center;
            }
        }
    }

    .final-cta {
        padding: 4rem 1.5rem;

        &__title {
            font-size: 2rem;
        }

        &__text {
            font-size: 1.2rem;
        }

        &__examples {
            font-size: 1.1rem;
        }
    }

    section {
        padding: 4rem 1.5rem;
    }

    h2 {
        font-size: 2rem !important;
    }
}
</style>