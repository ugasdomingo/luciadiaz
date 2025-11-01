<template>
    <RouterLink :to="`/formaciones/${formation.slug}`" class="formation-card">
        <div class="formation-card__image-wrapper">
            <img :src="formation.formation_cover.secure_url" :alt="formation.title" class="formation-card__image">
            <div class="formation-card__overlay">
                <span class="formation-card__view-more">Ver detalles</span>
            </div>
            <span class="formation-card__type" :class="`type-${formation.type}`">
                {{ format_type(formation.type) }}
            </span>
        </div>

        <div class="formation-card__content">
            <h3 class="formation-card__title">{{ formation.title }}</h3>

            <p class="formation-card__description">{{ get_excerpt(formation.description) }}</p>

            <div class="formation-card__meta">
                <div class="formation-card__meta-item">
                    <span class="icon">📅</span>
                    <span>{{ format_date(formation.start_date) }}</span>
                </div>
                <div class="formation-card__meta-item">
                    <span class="icon">⏱️</span>
                    <span>{{ formation.duration }} {{ formation.duration === '1' ? 'hora' : 'horas' }}</span>
                </div>
                <div class="formation-card__meta-item">
                    <span class="icon">📍</span>
                    <span>{{ formation.location }}</span>
                </div>
            </div>

            <div class="formation-card__footer">
                <span class="formation-card__price">{{
                    formation.price === 0 ? 'Gratuita' : '€' + formation.price
                    }}</span>
                <span class="formation-card__cta">Inscribirse →</span>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
    formation: Object
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
    const options = { day: 'numeric', month: 'short', year: 'numeric' }
    return new Date(date).toLocaleDateString('es-ES', options)
}

const get_excerpt = (text) => {
    return text.substring(0, 100) + (text.length > 100 ? '...' : '')
}
</script>

<style scoped lang="scss">
.formation-card {
    display: flex;
    flex-direction: column;
    background: var(--color-white);
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    animation: fade-in 0.6s ease-out var(--delay, 0s) both;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0 12px 24px rgba(107, 76, 147, 0.15);

        .formation-card__image {
            transform: scale(1.05);
        }

        .formation-card__overlay {
            opacity: 1;
        }
    }

    &__image-wrapper {
        position: relative;
        width: 100%;
        height: 280px;
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

    &__view-more {
        color: var(--color-white);
        font-family: 'Text';
        font-size: 0.95rem;
        font-weight: 500;
        letter-spacing: 0.5px;
        text-transform: uppercase;
    }

    &__type {
        position: absolute;
        top: 1rem;
        right: 1rem;
        padding: 0.5rem 1rem;
        border-radius: 2rem;
        font-family: 'Text';
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

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

    &__content {
        padding: 1.75rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        flex: 1;
    }

    &__title {
        margin: 0;
        font-size: 1.4rem;
        line-height: 1.3;
        color: var(--color-black);
        font-family: 'Title';
        font-weight: 600;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    &__description {
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

    &__meta {
        display: flex;
        flex-direction: column;
        gap: 0.6rem;
        padding: 1rem 0;
        border-top: 1px solid var(--color-disable);
        border-bottom: 1px solid var(--color-disable);
    }

    &__meta-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: 'Text';
        font-size: 0.9rem;
        color: var(--color-text-dark);

        .icon {
            font-size: 1.1rem;
        }
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: auto;
    }

    &__price {
        font-size: 1.75rem;
        font-weight: 700;
        color: var(--color-primary);
        font-family: 'Title';
    }

    &__cta {
        font-size: 0.95rem;
        font-weight: 500;
        color: var(--color-secondary);
        font-family: 'Text';
        transition: color 0.3s ease;
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
    .formation-card {
        &__image-wrapper {
            height: 220px;
        }

        &__content {
            padding: 1.5rem;
        }

        &__title {
            font-size: 1.2rem;
        }

        &__description {
            font-size: 0.9rem;
        }

        &__price {
            font-size: 1.5rem;
        }
    }
}
</style>