<template>
    <RouterLink :to="`/blog/${post.slug}`" class="post-card">
        <div class="post-card__image-wrapper">
            <img :src="post.post_cover.secure_url" :alt="post.title" class="post-card__image">
            <div class="post-card__overlay">
                <span class="post-card__read-more">Leer artículo</span>
            </div>
        </div>

        <div class="post-card__content">
            <div class="post-card__meta">
                <span class="post-card__category">{{ post.category }}</span>
                <span class="post-card__date">{{ format_date(post.createdAt) }}</span>
            </div>

            <h3 class="post-card__title">{{ post.title }}</h3>

            <p class="post-card__excerpt" v-html="get_excerpt(post.content)"></p>
        </div>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    post: Object
})

const format_date = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
    return new Date(date).toLocaleDateString('es-ES', options)
}

const get_excerpt = (html) => {
    const temp = document.createElement('div')
    temp.innerHTML = html
    const text = temp.textContent || temp.innerText || ''
    return text.substring(0, 120) + (text.length > 120 ? '...' : '')
}
</script>

<style scoped lang="scss">
.post-card {
    display: flex;
    flex-direction: column;
    background: var(--color-white);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    animation: fade-in 0.6s ease-out var(--delay, 0s) both;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(107, 76, 147, 0.15);

        .post-card__image {
            transform: scale(1.05);
        }

        .post-card__overlay {
            opacity: 1;
        }
    }

    &__image-wrapper {
        position: relative;
        width: 100%;
        height: 240px;
        overflow: hidden;
        background: var(--color-disable);
    }

    &__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &__overlay {
        position: absolute;
        inset: 0;
        background: linear-gradient(to top,
                rgba(107, 76, 147, 0.9) 0%,
                rgba(107, 76, 147, 0.4) 50%,
                transparent 100%);
        opacity: 0;
        transition: opacity 0.4s ease;
        display: flex;
        align-items: flex-end;
        justify-content: center;
        padding-bottom: 2rem;
    }

    &__read-more {
        color: var(--color-white);
        font-family: 'Text';
        font-size: 0.95rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    &__content {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        flex: 1;
    }

    &__meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        font-size: 0.85rem;
    }

    &__category {
        padding: 0.25rem 0.75rem;
        background: var(--color-soft-alert);
        color: var(--color-secondary);
        border-radius: 2rem;
        font-weight: 500;
        font-family: 'Text';
        font-size: 0.8rem;
        text-transform: capitalize;
    }

    &__date {
        color: var(--color-text-dark);
        font-family: 'Text';
        font-size: 0.8rem;
    }

    &__title {
        margin: 0;
        font-size: 1.25rem;
        line-height: 1.4;
        color: var(--color-black);
        font-family: 'Title';
        font-weight: 600;
        transition: color 0.3s ease;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__excerpt {
        margin: 0;
        font-size: 0.95rem;
        line-height: 1.6;
        color: var(--color-text-dark);
        font-family: 'Text';
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
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
    .post-card {
        &__image-wrapper {
            height: 200px;
        }

        &__content {
            padding: 1.25rem;
        }

        &__title {
            font-size: 1.1rem;
        }

        &__excerpt {
            font-size: 0.9rem;
        }
    }
}
</style>
