<template>
    <main class="formation-detail" v-if="formation_store.formation">
        <!-- Breadcrumbs -->
        <nav class="formation-detail__breadcrumbs">
            <RouterLink to="/">Inicio</RouterLink>
            <span class="separator">/</span>
            <RouterLink to="/formaciones">Formaciones</RouterLink>
            <span class="separator">/</span>
            <span class="current">{{ formation_store.formation.title }}</span>
        </nav>

        <div class="formation-detail__container">
            <!-- Main Content -->
            <div class="formation-detail__content">
                <!-- Hero Section -->
                <section class="formation-detail__hero">
                    <span class="formation-detail__type" :class="`type-${formation_store.formation.type}`">
                        {{ format_type(formation_store.formation.type) }}
                    </span>
                    <h1 class="formation-detail__title">{{ formation_store.formation.title }}</h1>
                    <p class="formation-detail__description">{{ formation_store.formation.description }}</p>
                </section>

                <!-- Video Section -->
                <section class="formation-detail__video" v-if="formation_store.formation.video_url">
                    <div class="video-wrapper">
                        <iframe :src="get_embed_url(formation_store.formation.video_url)" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                    </div>
                </section>

                <!-- Main Image (if no video) -->
                <section class="formation-detail__main-image" v-else>
                    <img :src="formation_store.formation.formation_cover.secure_url"
                        :alt="formation_store.formation.title">
                </section>

                <!-- Content -->
                <article class="formation-detail__body" v-html="formation_store.formation.content"></article>

                <!-- Categories -->
                <div class="formation-detail__categories" v-if="formation_store.formation.categorys?.length">
                    <span class="formation-detail__categories-label">Categorías:</span>
                    <span v-for="category in formation_store.formation.categorys" :key="category"
                        class="formation-detail__category">
                        {{ category }}
                    </span>
                </div>

                <!-- Share Section -->
                <div class="formation-detail__share">
                    <p>¿Te interesa esta formación? Compártela</p>
                    <div class="formation-detail__share-buttons">
                        <button @click="share('twitter')" class="share-btn twitter">
                            <span>Twitter</span>
                        </button>
                        <button @click="share('whatsapp')" class="share-btn whatsapp">
                            <span>WhatsApp</span>
                        </button>
                        <button @click="share('linkedin')" class="share-btn linkedin">
                            <span>LinkedIn</span>
                        </button>
                        <button @click="copy_link" class="share-btn link">
                            <span>{{ copied ? '¡Copiado!' : 'Copiar enlace' }}</span>
                        </button>
                    </div>
                </div>

                <!-- Navigation -->
                <nav class="formation-detail__navigation">
                    <RouterLink to="/formaciones" class="formation-detail__back">
                        ← Volver a formaciones
                    </RouterLink>
                </nav>
            </div>

            <!-- Sidebar -->
            <aside class="formation-detail__sidebar">
                <div class="sidebar-card">
                    <div class="sidebar-card__image">
                        <img :src="formation_store.formation.formation_cover.secure_url"
                            :alt="formation_store.formation.title">
                    </div>

                    <div class="sidebar-card__price">
                        <span class="price-value">{{ formation_store.formation.price === 0 ? 'Gratuita' : '€' +
                            formation_store.formation.price }}</span>
                    </div>

                    <div class="sidebar-card__info">
                        <div class="info-item">
                            <span class="info-icon">📅</span>
                            <div class="info-content">
                                <span class="info-label">Fecha de inicio</span>
                                <span class="info-value">{{ format_date(formation_store.formation.start_date) }}</span>
                            </div>
                        </div>

                        <div class="info-item">
                            <span class="info-icon">⏱️</span>
                            <div class="info-content">
                                <span class="info-label">Duración</span>
                                <span class="info-value">{{ formation_store.formation.duration }}</span>
                            </div>
                        </div>

                        <div class="info-item">
                            <span class="info-icon">🎓</span>
                            <div class="info-content">
                                <span class="info-label">Modalidad</span>
                                <span class="info-value">{{ format_type(formation_store.formation.type) }}</span>
                            </div>
                        </div>

                        <div class="info-item">
                            <span class="info-icon">📍</span>
                            <div class="info-content">
                                <span class="info-label">Ubicación</span>
                                <span class="info-value">{{ formation_store.formation.location }}</span>
                            </div>
                        </div>
                    </div>

                    <RouterLink v-if="formation_store.formation.price === 0"
                        :to="`/inscripcion/${formation_store.formation.slug}`" class="sidebar-card__cta">
                        Inscribirme gratis
                    </RouterLink>
                    <a v-else :href="formation_store.formation.paypal_button" class="sidebar-card__cta">
                        Inscribirme ahora
                    </a>
                    <div v-if="formation_store.formation.price > 0" class="sidebar-card__alternative">
                        <p class="alternative-text">¿Prefieres otro método de pago?</p>
                        <a :href="util_store.whatsapp_link" target="_blank" class="alternative-btn">
                            💬 Contactar por WhatsApp
                        </a>
                    </div>
                </div>
            </aside>
        </div>
    </main>
</template>

<script setup>
import { useFormationStore } from '../stores/formation-store'
import { useUtilStore } from '../stores/util-store'
import { useRoute } from 'vue-router'
import { onBeforeMount, ref } from 'vue'

const route = useRoute()
const formation_store = useFormationStore()
const copied = ref(false)
const util_store = useUtilStore()

onBeforeMount(() => {
    formation_store.get_formation_by_slug(route.params.formation_slug)
})

const format_type = (type) => {
    const types = {
        'presencial': 'Presencial',
        'online': 'Online',
        'live': 'En vivo'
    }
    return types[type] || type
}

const format_date = (date) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('es-ES', options)
}

const get_embed_url = (url) => {
    // Convert YouTube URL to embed format
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
        const video_id = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
        return `https://www.youtube.com/embed/${video_id}`
    }
    // Convert Vimeo URL to embed format
    if (url.includes('vimeo.com')) {
        const video_id = url.match(/vimeo\.com\/(\d+)/)?.[1]
        return `https://player.vimeo.com/video/${video_id}`
    }
    return url
}

const share = (platform) => {
    const url = window.location.href
    const title = formation_store.formation.title
    const text = `${title} - ${url}`

    const share_urls = {
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`,
        linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    }

    if (platform === 'whatsapp') {
        window.location.href = share_urls[platform]
    } else {
        window.open(share_urls[platform], '_blank', 'width=600,height=400')
    }
}

const copy_link = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href)
        copied.value = true
        setTimeout(() => copied.value = false, 2000)
    } catch (err) {
        console.error('Error al copiar:', err)
    }
}

const handle_enrollment = () => {
    // Redirect to contact or enrollment form
    window.location.href = '/terapias'
}
</script>

<style scoped lang="scss">
.formation-detail {
    width: 100%;
    min-height: 100vh;
    padding: 6rem 4rem 4rem;
    margin: 0;
    box-sizing: border-box;
    animation: fade-in 0.6s ease-out;

    &__breadcrumbs {
        max-width: 1200px;
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
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            max-width: 300px;
        }
    }

    &__container {
        max-width: 1200px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 380px;
        gap: 3rem;
        align-items: start;
    }

    &__content {
        width: 100%;
    }

    &__hero {
        margin-bottom: 2rem;
    }

    &__type {
        display: inline-block;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font-family: 'Text';
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 1.5rem;

        &.type-presencial {
            background: #4CAF50;
            color: white;
        }

        &.type-online {
            background: #2196F3;
            color: white;
        }

        &.type-live {
            background: #FF5722;
            color: white;
        }
    }

    &__title {
        margin: 0 0 1.5rem;
        font-size: 3rem;
        line-height: 1.2;
        color: var(--color-primary);
        font-family: 'Title';
    }

    &__description {
        margin: 0;
        font-size: 1.2rem;
        line-height: 1.7;
        color: var(--color-text-dark);
        font-family: 'Text';
    }

    &__video {
        margin: 2rem 0 3rem;

        .video-wrapper {
            position: relative;
            padding-bottom: 56.25%;
            /* 16:9 */
            height: 0;
            overflow: hidden;
            border-radius: 1rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);

            iframe {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                border-radius: 1rem;
            }
        }
    }

    &__main-image {
        margin: 2rem 0 3rem;

        img {
            width: 100%;
            height: auto;
            border-radius: 1rem;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        }
    }

    &__body {
        font-family: 'Text';
        font-size: 1.1rem;
        line-height: 1.8;
        color: var(--color-text);
        margin-bottom: 3rem;

        :deep(h2) {
            font-size: 2rem;
            margin: 3rem 0 1.5rem;
            color: var(--color-primary);
            font-family: 'Title';
        }

        :deep(h3) {
            font-size: 1.5rem;
            margin: 2.5rem 0 1.25rem;
            color: var(--color-secondary);
            font-family: 'Title';
        }

        :deep(p) {
            margin: 1.5rem 0;
            line-height: 1.8;
        }

        :deep(ul),
        :deep(ol) {
            margin: 1.5rem 0;
            padding-left: 2rem;

            li {
                margin: 0.75rem 0;
            }
        }

        :deep(strong) {
            color: var(--color-black);
            font-weight: 600;
        }
    }

    &__categories {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        padding: 2rem 0;
        border-top: 1px solid var(--color-disable);
        margin-bottom: 2rem;
    }

    &__categories-label {
        font-weight: 500;
        color: var(--color-text-dark);
        font-family: 'Text';
    }

    &__category {
        padding: 0.4rem 1rem;
        background: var(--color-white);
        border: 1px solid var(--color-disable);
        color: var(--color-secondary);
        border-radius: 2rem;
        font-size: 0.85rem;
        font-family: 'Text';
        transition: all 0.3s ease;

        &:hover {
            background: var(--color-soft-alert);
            border-color: var(--color-secondary);
        }
    }

    &__share {
        padding: 2rem;
        background: var(--color-soft-alert);
        border-radius: 1rem;
        text-align: center;
        margin-bottom: 3rem;

        p {
            margin: 0 0 1.5rem;
            font-size: 1.1rem;
            font-weight: 500;
            color: var(--color-secondary);
            font-family: 'Text';
        }
    }

    &__share-buttons {
        display: flex;
        justify-content: center;
        gap: 1rem;
        flex-wrap: wrap;
    }

    .share-btn {
        padding: 0.75rem 1.5rem;
        border: none;
        border-radius: 0.5rem;
        font-family: 'Text';
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;

        &.twitter {
            background: #1DA1F2;
            color: white;

            &:hover {
                background: #1a8cd8;
                transform: translateY(-2px);
            }
        }

        &.whatsapp {
            background: #25D366;
            color: white;

            &:hover {
                background: #20ba5a;
                transform: translateY(-2px);
            }
        }

        &.linkedin {
            background: #0A66C2;
            color: white;

            &:hover {
                background: #084d92;
                transform: translateY(-2px);
            }
        }

        &.link {
            background: var(--color-secondary);
            color: white;

            &:hover {
                background: var(--color-primary);
                transform: translateY(-2px);
            }
        }
    }

    &__navigation {
        display: flex;
        justify-content: center;
        padding-top: 2rem;
        border-top: 1px solid var(--color-disable);
    }

    &__back {
        padding: 0.75rem 2rem;
        background: var(--color-white);
        color: var(--color-secondary);
        border: 2px solid var(--color-secondary);
        border-radius: 2rem;
        font-family: 'Text';
        font-weight: 500;
        transition: all 0.3s ease;

        &:hover {
            background: var(--color-secondary);
            color: var(--color-white);
            transform: translateX(-5px);
        }
    }

    &__sidebar {
        position: fixed;
        top: 5.5rem;
        right: 4rem;
        max-height: 100vh;
    }
}

.sidebar-card {
    height: fit-content;
    display: flex;
    flex-direction: column;
    background: var(--color-white);
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    box-sizing: border-box;

    &__image {
        width: 100%;
        height: 80px;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__price {
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 1rem;
        background: linear-gradient(135deg, var(--color-primary), var(--color-tertiary));
        color: white;
        box-sizing: border-box;

        .price-value {
            font-size: 2rem;
            font-family: 'Title';
            font-weight: 700;
            margin: 0;
        }
    }

    &__info {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .info-item {
            display: flex;
            align-items: flex-start;
            gap: 1.25rem;

            .info-icon {
                font-size: 1.5rem;
                flex-shrink: 0;
            }

            .info-content {
                display: flex;
                flex-direction: column;
                gap: 0.25rem;

                .info-label {
                    font-size: 0.8rem;
                    color: var(--color-text-dark);
                    font-family: 'Text';
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }

                .info-value {
                    font-size: 1rem;
                    color: var(--color-black);
                    font-family: 'Text';
                    font-weight: 500;
                }
            }
        }
    }

    &__cta {
        width: fit-content;
        margin: 0 1.5rem 1.5rem;
        padding: 1rem;
        background: var(--color-secondary);
        color: white;
        border: none;
        border-radius: 0.5rem;
        align-self: center;
        font-family: 'Text';
        font-size: 1rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
            background: var(--color-primary);
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(107, 76, 147, 0.3);
        }
    }

    &__alternative {
        padding: 1rem 1.5rem;
        border-top: 1px solid var(--color-disable);
        text-align: center;

        .alternative-text {
            margin: 0 0 0.75rem;
            font-size: 0.9rem;
            color: var(--color-text-dark);
            font-family: 'Text';
        }

        .alternative-btn {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.75rem 1.5rem;
            background: #25D366;
            color: white;
            border-radius: 0.5rem;
            font-family: 'Text';
            font-size: 0.95rem;
            font-weight: 500;
            text-decoration: none;
            transition: all 0.3s ease;

            &:hover {
                background: #20ba5a;
                transform: translateY(-2px);
            }
        }
    }

    &__note {
        padding: 0 1.5rem 1.5rem;
        text-align: center;
        font-size: 0.85rem;
        color: var(--color-text-dark);
        font-family: 'Text';
        margin: 0;

        a {
            color: var(--color-secondary);
            text-decoration: underline;
            transition: color 0.3s ease;

            &:hover {
                color: var(--color-primary);
            }
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

@media screen and (max-width: 1024px) {
    .formation-detail {
        padding: 5rem 2rem 3rem;

        &__container {
            grid-template-columns: 1fr;
            gap: 3rem;
        }

        &__sidebar {
            position: static;
            order: -1;
            max-width: 500px;
            margin: 0 auto;
        }

        &__title {
            font-size: 2.5rem;
        }
    }
}

@media screen and (max-width: 768px) {
    .formation-detail {
        padding: 5rem 1rem 2rem;

        &__breadcrumbs {
            font-size: 0.8rem;

            .current {
                max-width: 150px;
            }
        }

        &__title {
            font-size: 2rem;
        }

        &__description {
            font-size: 1rem;
        }

        &__body {
            font-size: 1rem;

            :deep(h2) {
                font-size: 1.6rem;
            }

            :deep(h3) {
                font-size: 1.3rem;
            }
        }

        &__share {
            padding: 1.5rem;

            p {
                font-size: 1rem;
            }
        }

        &__share-buttons {
            flex-direction: column;

            .share-btn {
                width: 100%;
            }
        }

        &__sidebar {
            width: 100%;
        }
    }

    .sidebar-card {
        &__price {
            padding: 1.5rem;

            .price-value {
                font-size: 2.5rem;
            }
        }
    }
}
</style>
