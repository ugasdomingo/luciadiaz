<template>
    <main class="blog-post" v-if="post_store.post">
        <!-- Progress Bar -->
        <div class="blog-post__progress" :style="{ width: scroll_progress + '%' }"></div>

        <!-- Breadcrumbs -->
        <nav class="blog-post__breadcrumbs">
            <RouterLink to="/">Inicio</RouterLink>
            <span class="separator">/</span>
            <RouterLink to="/blog">Blog</RouterLink>
            <span class="separator">/</span>
            <span class="current">{{ post_store.post.title }}</span>
        </nav>

        <!-- Hero Section -->
        <section class="blog-post__hero">
            <div class="blog-post__hero-content">
                <span class="blog-post__category">{{ post_store.post.category }}</span>
                <h1 class="blog-post__title">{{ post_store.post.title }}</h1>
                <div class="blog-post__meta">
                    <span class="blog-post__date">
                        <img src="/public/icon/icon-calendar.svg" alt="fecha" class="icon">
                        {{ format_date(post_store.post.createdAt) }}
                    </span>
                    <span class="blog-post__reading-time">
                        <img src="/public/icon/icon-clock.svg" alt="tiempo" class="icon">
                        {{ reading_time }} min lectura
                    </span>
                </div>
            </div>
            <div class="blog-post__hero-image">
                <img :src="post_store.post.post_cover.secure_url" :alt="post_store.post.title">
            </div>
        </section>

        <!-- Content -->
        <article class="blog-post__content" v-html="post_store.post.content"></article>

        <!-- Tags -->
        <div class="blog-post__tags" v-if="post_store.post.tags?.length">
            <span class="blog-post__tags-label">Etiquetas:</span>
            <span v-for="tag in post_store.post.tags" :key="tag" class="blog-post__tag">
                {{ tag }}
            </span>
        </div>

        <!-- Share Section -->
        <div class="blog-post__share">
            <p>¿Te ha gustado este artículo? Compártelo</p>
            <div class="blog-post__share-buttons">
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
        <nav class="blog-post__navigation">
            <RouterLink to="/blog" class="blog-post__back">
                ← Volver al blog
            </RouterLink>
        </nav>
    </main>
</template>

<script setup>
import { usePostStore } from '../stores/post-store'
import { useRoute } from 'vue-router'
import { onBeforeMount, onMounted, ref, computed } from 'vue'

const route = useRoute()
const post_store = usePostStore()
const scroll_progress = ref(0)
const copied = ref(false)

onBeforeMount(() => {
    post_store.get_post_by_slug(route.params.post_slug)
})

onMounted(() => {
    window.addEventListener('scroll', update_scroll_progress)
})

const format_date = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('es-ES', options)
}

const reading_time = computed(() => {
    if (!post_store.post?.content) return 0
    const words = post_store.post.content.replace(/<[^>]*>/g, '').split(/\s+/).length
    return Math.ceil(words / 200)
})

const update_scroll_progress = () => {
    const window_height = window.innerHeight
    const document_height = document.documentElement.scrollHeight - window_height
    const scroll_top = window.scrollY
    scroll_progress.value = (scroll_top / document_height) * 100
}

const share = (platform) => {
    const url = window.location.href
    const title = post_store.post.title
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
</script>

<style scoped lang="scss">
.blog-post {
    width: 100%;
    min-height: 100vh;
    padding: 6rem 4rem 4rem;
    margin: 0;
    box-sizing: border-box;
    animation: fade-in 0.6s ease-out;

    &__progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 6px;
        background: linear-gradient(90deg, var(--color-primary), var(--color-tertiary));
        z-index: 1000;
        transition: width 0.1s ease;
        box-shadow: 0 2px 4px rgba(107, 76, 147, 0.3);
    }

    &__breadcrumbs {
        max-width: 900px;
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

    &__hero {
        max-width: 900px;
        margin: 0 auto 4rem;
    }

    &__hero-content {
        text-align: center;
        margin-bottom: 3rem;
    }

    &__category {
        display: inline-block;
        padding: 0.5rem 1.25rem;
        background: var(--color-soft-alert);
        color: var(--color-secondary);
        border-radius: 2rem;
        font-weight: 500;
        font-family: 'Text';
        font-size: 0.9rem;
        text-transform: capitalize;
        margin-bottom: 1.5rem;
    }

    &__title {
        margin: 0 0 1.5rem;
        font-size: 3rem;
        line-height: 1.2;
        color: var(--color-primary);
        font-family: 'Title';
    }

    &__meta {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2rem;
        font-size: 0.95rem;
        color: var(--color-text-dark);
        font-family: 'Text';

        span {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .icon {
            width: 1rem;
            height: 1rem;
            opacity: 0.7;
        }
    }

    &__hero-image {
        width: 100%;
        height: 500px;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    &__content {
        max-width: 750px;
        margin: 0 auto 4rem;
        font-family: 'Text';
        font-size: 1.1rem;
        line-height: 1.8;
        color: var(--color-text);

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
            text-align: justify;
        }

        :deep(ul),
        :deep(ol) {
            margin: 1.5rem 0;
            padding-left: 2rem;

            li {
                margin: 0.75rem 0;
            }
        }

        :deep(blockquote) {
            margin: 2.5rem 0;
            padding: 1.5rem 2rem;
            border-left: 4px solid var(--color-primary);
            background: var(--color-soft-alert);
            border-radius: 0 0.5rem 0.5rem 0;
            font-style: italic;
            color: var(--color-text-dark);
        }

        :deep(strong) {
            color: var(--color-black);
            font-weight: 600;
        }

        :deep(a) {
            color: var(--color-secondary);
            text-decoration: underline;
            transition: color 0.3s ease;

            &:hover {
                color: var(--color-primary);
            }
        }

        :deep(img) {
            width: 100%;
            height: auto;
            border-radius: 0.5rem;
            margin: 2rem 0;
        }
    }

    &__tags {
        max-width: 750px;
        margin: 0 auto 3rem;
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 0.75rem;
        padding-top: 2rem;
        border-top: 1px solid var(--color-disable);
    }

    &__tags-label {
        font-weight: 500;
        color: var(--color-text-dark);
        font-family: 'Text';
    }

    &__tag {
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
        max-width: 750px;
        margin: 0 auto 3rem;
        padding: 2rem;
        background: var(--color-soft-alert);
        border-radius: 1rem;
        text-align: center;

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
        max-width: 750px;
        margin: 0 auto;
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
    .blog-post {
        padding: 5rem 2rem 3rem;

        &__title {
            font-size: 2.5rem;
        }

        &__hero-image {
            height: 400px;
        }
    }
}

@media screen and (max-width: 768px) {
    .blog-post {
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

        &__meta {
            flex-direction: column;
            gap: 0.75rem;
        }

        &__hero-image {
            height: 300px;
        }

        &__content {
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
    }
}
</style>
