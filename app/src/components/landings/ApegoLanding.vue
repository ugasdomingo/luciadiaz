<template>
    <div class="landing-apego">
        <!-- HERO SECTION -->
        <section class="hero">
            <div class="hero__container">
                <h1 class="hero__headline">
                    ¿Por qué siempre terminas rodeándote de las mismas personas, aunque jures que esta vez será
                    diferente?
                </h1>
                <p class="hero__subheadline">
                    Descubre el patrón invisible que aprendiste en tu infancia y que sigue
                    decidiendo cómo te relacionas con tu pareja, tus padres, tus amigos y
                    hasta tus compañeros de trabajo.
                </p>

                <!-- CTA -->
                <div class="hero__cta">
                    <RouterLink :to="`/inscripcion/${formation.slug}`" class="cta-btn cta-btn--primary">
                        Acceder al curso gratuito
                    </RouterLink>
                </div>

                <!-- Info rápida -->
                <div class="hero__info">
                    <span>✓ Curso online completo (1-2 horas)</span>
                    <span>✓ Acceso a partir del {{ formatted_date }}</span>
                    <span>✓ Certificado de participación</span>
                    <span>✓ Material descargable</span>
                </div>
            </div>
        </section>

        <!-- EL ESPEJO -->
        <section class="mirror">
            <div class="mirror__container">
                <h2 class="mirror__title">¿Reconoces alguna de estas situaciones?</h2>

                <!-- Con pareja -->
                <div class="mirror__category">
                    <h3 class="mirror__category-title">Con tu pareja o personas que te gustan:</h3>
                    <div class="mirror__items">
                        <div class="check-item" v-for="(item, index) in mirror_pareja" :key="index">
                            <span class="check-icon">✓</span>
                            <p>{{ item }}</p>
                        </div>
                    </div>
                </div>

                <!-- Con familia -->
                <div class="mirror__category">
                    <h3 class="mirror__category-title">Con tu familia:</h3>
                    <div class="mirror__items">
                        <div class="check-item" v-for="(item, index) in mirror_familia" :key="index">
                            <span class="check-icon">✓</span>
                            <p>{{ item }}</p>
                        </div>
                    </div>
                </div>

                <!-- Con amigos -->
                <div class="mirror__category">
                    <h3 class="mirror__category-title">Con tus amigos:</h3>
                    <div class="mirror__items">
                        <div class="check-item" v-for="(item, index) in mirror_amigos" :key="index">
                            <span class="check-icon">✓</span>
                            <p>{{ item }}</p>
                        </div>
                    </div>
                </div>

                <!-- En trabajo -->
                <div class="mirror__category">
                    <h3 class="mirror__category-title">En el trabajo:</h3>
                    <div class="mirror__items">
                        <div class="check-item" v-for="(item, index) in mirror_trabajo" :key="index">
                            <span class="check-icon">✓</span>
                            <p>{{ item }}</p>
                        </div>
                    </div>
                </div>

                <p class="mirror__conclusion">
                    Esto no es casualidad. <strong>Es tu estilo de apego hablando por ti.</strong><br>
                    Y la buena noticia: una vez que lo ves, puedes cambiarlo.
                </p>
            </div>
        </section>

        <!-- QUÉ APRENDERÁS -->
        <section class="content">
            <div class="content__container">
                <h2 class="content__title">En este curso vas a descubrir:</h2>

                <div class="content__blocks">
                    <div class="content-block" v-for="(block, index) in content_blocks" :key="index">
                        <div class="content-block__header">
                            <span class="content-block__number">{{ index + 1 }}</span>
                            <h3 class="content-block__title">{{ block.title }}</h3>
                        </div>
                        <p class="content-block__description">{{ block.description }}</p>

                        <!-- Subpatrones si existen -->
                        <div v-if="block.patterns" class="content-block__patterns">
                            <div class="pattern-item" v-for="(pattern, pIndex) in block.patterns" :key="pIndex">
                                <strong>{{ pattern.title }}</strong>
                                <p>{{ pattern.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <p class="content__footer">
                    No es terapia, es información que debiste tener hace años.
                </p>
            </div>
        </section>

        <!-- QUÉ INCLUYE -->
        <section class="includes">
            <div class="includes__container">
                <h2 class="includes__title">Lo que recibes al inscribirte:</h2>

                <div class="includes__grid">
                    <div class="include-card">
                        <span class="include-icon">📹</span>
                        <h4>Videos cortos (1-2 horas en total)</h4>
                        <p>Divididos por temas para que puedas ver a tu ritmo. Acceso de por vida a partir del {{
                            formatted_date }}.</p>
                    </div>

                    <div class="include-card">
                        <span class="include-icon">📄</span>
                        <h4>Guía completa en PDF</h4>
                        <p>Material de apoyo con toda la teoría, cuestionarios y ejercicios prácticos para cada tipo de
                            apego.</p>
                    </div>

                    <div class="include-card">
                        <span class="include-icon">🎓</span>
                        <h4>Certificado de participación</h4>
                        <p>Para que puedas acreditar que completaste el curso.</p>
                    </div>

                    <div class="include-card">
                        <span class="include-icon">💬</span>
                        <h4>Acceso a consultas por WhatsApp</h4>
                        <p>Puedes escribirle directamente a Lucía si tienes dudas específicas sobre tu caso.</p>
                    </div>
                </div>

                <div class="includes__cta">
                    <RouterLink :to="`/inscripcion/${formation.slug}`" class="cta-btn cta-btn--secondary">
                        Quiero entender mi apego
                    </RouterLink>
                </div>
            </div>
        </section>

        <!-- PARA QUIÉN ES -->
        <section class="target">
            <div class="target__container">
                <div class="target__column">
                    <h3 class="target__subtitle">Este curso es para ti si:</h3>
                    <div class="target__list">
                        <div class="target-item target-item--yes" v-for="(item, index) in target_yes" :key="index">
                            <span class="target-icon">✓</span>
                            <p>{{ item }}</p>
                        </div>
                    </div>
                </div>

                <div class="target__column">
                    <h3 class="target__subtitle">Este curso NO es para ti si:</h3>
                    <div class="target__list">
                        <div class="target-item target-item--no" v-for="(item, index) in target_no" :key="index">
                            <span class="target-icon">✗</span>
                            <p>{{ item }}</p>
                        </div>
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

        <!-- CÓMO FUNCIONA -->
        <section class="process">
            <div class="process__container">
                <h2 class="process__title">Accede en 3 pasos:</h2>

                <div class="process__steps">
                    <div class="step">
                        <span class="step__number">1</span>
                        <h4 class="step__title">Inscríbete</h4>
                        <p class="step__description">Completa el formulario con tus datos (toma 30 segundos)</p>
                    </div>

                    <div class="step">
                        <span class="step__number">2</span>
                        <h4 class="step__title">Revisa tu email</h4>
                        <p class="step__description">Recibirás el PDF y las instrucciones de acceso. Los videos estarán
                            disponibles a partir del {{ formatted_date }}.</p>
                    </div>

                    <div class="step">
                        <span class="step__number">3</span>
                        <h4 class="step__title">Empieza a aprender</h4>
                        <p class="step__description">Ve los videos cuando quieras, a tu ritmo, desde cualquier
                            dispositivo. Acceso de por vida.</p>
                    </div>
                </div>

                <div class="process__cta">
                    <RouterLink :to="`/inscripcion/${formation.slug}`" class="cta-btn cta-btn--primary cta-btn--large">
                        Inscribirme ahora
                    </RouterLink>
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
                                <p v-html="item.answer.replace(/\[FECHA\]/g, formatted_date)"></p>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA FINAL -->
        <section class="final-cta">
            <div class="final-cta__container">
                <h2 class="final-cta__title">Seguir repitiendo lo mismo con las personas que te importan, o empezar a
                    entender por qué.</h2>
                <p class="final-cta__examples">
                    Puedes seguir dando sin recibir.<br>
                    Huyendo cuando alguien se acerca de verdad.<br>
                    Sintiendo que nadie valora lo que haces.<br>
                    Preguntándote por qué siempre te rodeas de las mismas personas.
                </p>
                <p class="final-cta__urgency">
                    O puedes tomarte 2 horas para entender qué está pasando realmente.
                </p>

                <div class="final-cta__buttons">
                    <RouterLink :to="`/inscripcion/${formation.slug}`" class="cta-btn cta-btn--primary cta-btn--xl">
                        Acceder al curso gratuito ahora
                    </RouterLink>
                </div>

                <p class="final-cta__note">
                    No necesitas tarjeta de crédito. Solo tu email para enviarte el acceso.<br>
                    Videos disponibles a partir del {{ formatted_date }}.
                </p>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { lucia_info } from '../../static/facilitators/lucia-diaz.info'
import { apego_faq } from '../../static/faqs/apego-faq'

const props = defineProps({
    formation: {
        type: Object,
        required: true
    }
})

// Data
const facilitator = lucia_info
const faqs = apego_faq
const open_faq = ref(null)

// Mirror items por categoría
const mirror_pareja = [
    'Te entregas por completo, pero cuando la relación se pone seria sientes que te están invadiendo y quieres distancia',
    'Das todo pero nadie parece reconocer lo que haces por ellos',
    'Necesitas saber constantemente si todavía te quieren o empiezas a inventar escenarios en tu cabeza',
    'Prefieres relaciones que sabes que no van a ningún lado porque comprometerte de verdad te da miedo'
]

const mirror_familia = [
    'Haces todo lo que te piden pero nunca es suficiente',
    'Te sientes culpable cada vez que pones límites o dices "no"',
    'Aunque ya no vives con ellos, sigues sintiendo que debes darles explicaciones de tu vida',
    'Evitas las reuniones familiares porque siempre terminan en conflicto o te hacen sentir mal'
]

const mirror_amigos = [
    'Siempre eres tú quien busca, quien pregunta, quien organiza',
    'Te molesta que no te llamen, pero cuando lo hacen te cuesta estar presente',
    'Sientes que das más de lo que recibes y eso te genera resentimiento',
    'Te cuesta confiar en que realmente les importas'
]

const mirror_trabajo = [
    'Haces más de lo que te corresponde esperando que lo valoren, pero nadie lo nota',
    'Te cuesta trabajar en equipo porque sientes que tienes que hacerlo todo tú',
    'No sabes decir "no" aunque estés colapsado/a',
    'Evitas vínculos cercanos con compañeros porque mezclar trabajo y afecto te incomoda'
]

// Contenido del curso
const content_blocks = [
    {
        title: 'Por qué te relacionas como te relacionas',
        description: 'Qué pasó en tu infancia que hoy hace que reacciones así con las personas importantes de tu vida, aunque no lo recuerdes conscientemente.'
    },
    {
        title: 'Los 4 patrones que todos tenemos',
        description: 'Descripción desde el problema real, no desde términos psicológicos:',
        patterns: [
            {
                title: '"No necesito a nadie, yo puedo solo/a"',
                description: 'Por qué te incomoda la cercanía emocional, prefieres la independencia y te cuesta pedir ayuda aunque la necesites.'
            },
            {
                title: '"Hago todo para que me quieran"',
                description: 'Por qué das más de lo que recibes, vives con miedo a que te abandonen y necesitas constante confirmación de que le importas a los demás.'
            },
            {
                title: '"Te quiero pero no tan cerca"',
                description: 'Por qué un día quieres intimidad y al siguiente huyes, ves a las personas como salvación y amenaza al mismo tiempo.'
            },
            {
                title: '"Puedo estar bien conmigo y con otros"',
                description: 'Por qué algunas personas pueden tener relaciones sanas sin drama, confiar sin depender y estar presentes sin perderse.'
            }
        ]
    },
    {
        title: 'Cómo identificar tu patrón',
        description: 'Con cuestionarios y ejemplos reales para que sepas exactamente cuál es el tuyo (o si tienes una mezcla de varios).'
    },
    {
        title: 'Cómo se manifiesta en TODAS tus relaciones',
        description: 'Por qué repites las mismas dinámicas con tu pareja, tu familia, tus amigos, en el trabajo y hasta con tus hijos si los tienes.'
    },
    {
        title: 'Primeros pasos para cambiarlo',
        description: 'Herramientas concretas para empezar a transformar tu manera de relacionarte con las personas que más te importan.'
    }
]

// Para quién es
const target_yes = [
    'Tienes entre 25 y 50 años',
    'Sientes que repites los mismos errores en tus relaciones',
    'Quieres entender por qué reaccionas como reaccionas',
    'Estás cansado/a de que te digan "tienes que quererte más" sin saber cómo',
    'Buscas información real, no frases bonitas de Instagram'
]

const target_no = [
    'Esperas que alguien más cambie tu vida por ti',
    'Buscas soluciones mágicas sin trabajo personal',
    'No estás dispuesto/a a mirarte de verdad'
]

// Formato de fecha
const formatted_date = computed(() => {
    if (!props.formation.start_date) return 'fecha por confirmar'

    const date = new Date(props.formation.start_date)
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }

    const formatted = date.toLocaleDateString('es-ES', options)
    return formatted.charAt(0).toUpperCase() + formatted.slice(1)
})

// Toggle FAQ
const toggleFaq = (index) => {
    open_faq.value = open_faq.value === index ? null : index
}
</script>

<style scoped lang="scss">
// Variables de colores
$apego-primary: #7b5d9e;
$apego-secondary: #9b7db8;
$apego-accent: #b89ecc;
$apego-warm: #a88ab8;
$apego-dark: #2d2d44;
$gradient-hero: linear-gradient(135deg, #7b5d9e 0%, #5d4a7a 100%);
$gradient-cta: linear-gradient(135deg, #7db899 0%, #5a9e7d 100%);

.landing-apego {
    width: 100%;
    margin: 0;
    padding: 0;
    background: var(--color-white);
}

// ========== HERO ==========
.hero {
    width: 100%;
    min-height: 90vh;
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
            radial-gradient(circle at 20% 50%, rgba(155, 125, 184, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(168, 138, 184, 0.15) 0%, transparent 50%);
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
        font-size: 3.2rem;
        font-family: 'Title';
        color: var(--color-white);
        line-height: 1.2;
        margin: 0 0 1.5rem;
        font-weight: 600;
    }

    &__subheadline {
        font-size: 1.3rem;
        font-family: 'Text';
        color: rgba(255, 255, 255, 0.95);
        line-height: 1.6;
        margin: 0 0 3rem;
        font-weight: 300;
    }

    &__cta {
        margin-bottom: 2rem;
    }

    &__info {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.9);
        font-family: 'Text';

        span {
            display: flex;
            align-items: center;
            justify-content: center;
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
        box-shadow: 0 4px 15px rgba(125, 184, 153, 0.4);

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(125, 184, 153, 0.6);
        }
    }

    &--secondary {
        background: var(--color-white);
        color: $apego-primary;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

        &:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
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
        max-width: 1100px;
        margin: 0 auto;
    }

    &__title {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 4rem;
        color: $apego-primary;
    }

    &__category {
        margin-bottom: 3rem;

        &:last-of-type {
            margin-bottom: 4rem;
        }
    }

    &__category-title {
        font-size: 1.5rem;
        color: $apego-secondary;
        margin: 0 0 1.5rem;
        font-family: 'Title';
    }

    &__items {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
        gap: 1rem;
    }

    &__conclusion {
        font-size: 1.3rem;
        text-align: center;
        color: $apego-dark;
        margin: 3rem 0 0;
        line-height: 1.6;

        strong {
            color: $apego-primary;
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
        background: $apego-primary;
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
        font-size: 1.05rem;
        color: $apego-dark;
        line-height: 1.5;
    }
}

// ========== CONTENIDO ==========
.content {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #f8f4fc 0%, var(--color-white) 100%);

    &__container {
        max-width: 1000px;
        margin: 0 auto;
    }

    &__title {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 4rem;
        color: $apego-primary;
    }

    &__blocks {
        display: flex;
        flex-direction: column;
        gap: 2rem;
    }

    &__footer {
        font-size: 1.2rem;
        text-align: center;
        color: $apego-dark;
        margin: 3rem 0 0;
        font-weight: 500;
    }
}

.content-block {
    background: var(--color-white);
    padding: 2rem;
    border-radius: 1rem;
    border-left: 4px solid $apego-primary;
    transition: all 0.3s ease;

    &:hover {
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        border-left-color: $apego-accent;
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
        background: $apego-primary;
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
        color: $apego-primary;
    }

    &__description {
        margin: 0;
        font-size: 1.05rem;
        color: $apego-dark;
        line-height: 1.6;
    }

    &__patterns {
        margin-top: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding-left: 1rem;
    }
}

.pattern-item {
    padding: 1rem;
    background: #f8f9fa;
    border-radius: 0.5rem;

    strong {
        display: block;
        color: $apego-secondary;
        margin-bottom: 0.5rem;
        font-size: 1.05rem;
    }

    p {
        margin: 0;
        font-size: 0.95rem;
        color: $apego-dark;
        line-height: 1.5;
    }
}

// ========== QUÉ INCLUYE ==========
.includes {
    padding: 6rem 2rem;
    background: var(--color-white);

    &__container {
        max-width: 1100px;
        margin: 0 auto;
    }

    &__title {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 4rem;
        color: $apego-primary;
    }

    &__grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    &__cta {
        text-align: center;
    }
}

.include-card {
    background: #f8f9fa;
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    .include-icon {
        font-size: 3rem;
        display: block;
        margin-bottom: 1rem;
    }

    h4 {
        margin: 0 0 0.5rem;
        font-size: 1.2rem;
        color: $apego-primary;
    }

    p {
        margin: 0;
        font-size: 1rem;
        color: $apego-dark;
        line-height: 1.5;
    }
}

// ========== PARA QUIÉN ES ==========
.target {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, var(--color-white) 0%, #f8f4fc 100%);

    &__container {
        max-width: 1100px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
        gap: 3rem;
    }

    &__subtitle {
        font-size: 2rem;
        color: $apego-primary;
        margin: 0 0 2rem;
        text-align: center;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}

.target-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 1.5rem;
    background: var(--color-white);
    border-radius: 0.75rem;
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(5px);
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
    }

    .target-icon {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.1rem;
    }

    &--yes .target-icon {
        background: #5a9e7d;
        color: var(--color-white);
    }

    &--no .target-icon {
        background: #d9837b;
        color: var(--color-white);
    }

    p {
        margin: 0;
        font-size: 1.05rem;
        color: $apego-dark;
        line-height: 1.5;
    }
}

// ========== FACILITATOR ==========
.facilitator {
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
        color: $apego-primary;
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
        color: $apego-primary;
        margin: 0;
    }

    &__title-role {
        font-size: 1.2rem;
        color: $apego-secondary;
        margin: 0;
        font-weight: 500;
    }

    &__bio {
        font-size: 1.05rem;
        color: $apego-dark;
        line-height: 1.7;
        margin: 1rem 0;
    }

    &__instagram {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        color: $apego-primary;
        text-decoration: none;
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
            color: $apego-accent;
            transform: translateX(5px);
        }
    }
}

// ========== CÓMO FUNCIONA ==========
.process {
    padding: 6rem 2rem;
    background: linear-gradient(180deg, #f8f4fc 0%, var(--color-white) 100%);

    &__container {
        max-width: 1000px;
        margin: 0 auto;
    }

    &__title {
        font-size: 2.5rem;
        text-align: center;
        margin: 0 0 4rem;
        color: $apego-primary;
    }

    &__steps {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
    }

    &__cta {
        text-align: center;
    }
}

.step {
    background: var(--color-white);
    padding: 2rem;
    border-radius: 1rem;
    text-align: center;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    }

    &__number {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 60px;
        height: 60px;
        background: $gradient-cta;
        color: var(--color-white);
        border-radius: 50%;
        font-size: 2rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
    }

    &__title {
        margin: 0 0 1rem;
        font-size: 1.3rem;
        color: $apego-primary;
    }

    &__description {
        margin: 0;
        font-size: 1rem;
        color: $apego-dark;
        line-height: 1.6;
    }
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
        color: $apego-primary;
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
            color: $apego-dark;
            font-family: 'Text';
            font-weight: 500;
        }
    }

    &__icon {
        flex-shrink: 0;
        width: 32px;
        height: 32px;
        background: $apego-primary;
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
        background: $apego-accent;
    }

    &__answer {
        padding: 0 2rem 1.5rem;

        p {
            margin: 0;
            font-size: 1rem;
            color: $apego-dark;
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
            radial-gradient(circle at 30% 40%, rgba(155, 125, 184, 0.15) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, rgba(168, 138, 184, 0.15) 0%, transparent 50%);
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
        margin: 0 0 2rem;
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
        margin-bottom: 1.5rem;
    }

    &__note {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.8);
        margin: 0;
        line-height: 1.6;
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

    .target__container {
        grid-template-columns: 1fr;
    }

    .mirror__items {
        grid-template-columns: 1fr;
    }
}

@media screen and (max-width: 768px) {
    .hero {
        padding: 6rem 1.5rem 3rem;
        min-height: auto;

        &__headline {
            font-size: 2.2rem;
        }

        &__subheadline {
            font-size: 1.1rem;
        }

        &__info {
            grid-template-columns: 1fr;
            gap: 0.5rem;
        }
    }

    .process__steps {
        grid-template-columns: 1fr;
    }

    .includes__grid {
        grid-template-columns: 1fr;
    }

    .final-cta {
        padding: 4rem 1.5rem;

        &__title {
            font-size: 2rem;
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

    .mirror__category-title {
        font-size: 1.3rem;
    }
}
</style>