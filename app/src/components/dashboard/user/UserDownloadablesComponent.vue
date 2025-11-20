<script setup>
import { useProgressStore } from '../../../stores/progress-store'

const props = defineProps({
    formation: {
        type: Object,
        required: true
    },
    formation_id: {
        type: String,
        required: true
    }
})

const progress_store = useProgressStore()

// Descargar archivo individual
const download_file = async (downloadable) => {
    // Registrar descarga
    await progress_store.register_download(props.formation_id, null)

    // Abrir en nueva pestaña
    window.open(downloadable.file_url, '_blank')
}

// Descargar todos (uno por uno)
const download_all = async () => {
    for (const downloadable of props.formation.downloadables) {
        await download_file(downloadable)
        // Pequeño delay para no saturar el navegador
        await new Promise(resolve => setTimeout(resolve, 500))
    }
}

// Ícono según tipo de archivo
const get_file_icon = (file_type) => {
    const icons = {
        'pdf': '📄',
        'docx': '📝',
        'xlsx': '📊',
        'pptx': '📽️',
        'zip': '📦',
        'jpg': '🖼️',
        'png': '🖼️',
        'mp3': '🎵',
        'mp4': '🎥'
    }
    return icons[file_type?.toLowerCase()] || '📎'
}
</script>

<template>
    <div class="downloadables">
        <div class="downloadables__header">
            <h2>Material descargable</h2>
            <button v-if="formation.downloadables.length > 1" @click="download_all" class="download-all-btn">
                📥 Descargar todos
            </button>
        </div>

        <p class="downloadables__description">
            Aquí encontrarás todo el material complementario del curso. Puedes descargarlo cuando lo necesites.
        </p>

        <!-- Lista de descargables -->
        <div class="downloadables__list">
            <div v-for="(downloadable, index) in formation.downloadables" :key="index" class="downloadable-item"
                @click="download_file(downloadable)">
                <div class="downloadable-item__icon">
                    {{ get_file_icon(downloadable.file_type) }}
                </div>

                <div class="downloadable-item__info">
                    <h4 class="downloadable-item__name">{{ downloadable.file_name }}</h4>
                    <p v-if="downloadable.file_description" class="downloadable-item__description">
                        {{ downloadable.file_description }}
                    </p>
                    <div class="downloadable-item__meta">
                        <span v-if="downloadable.file_type" class="meta-tag">
                            {{ downloadable.file_type.toUpperCase() }}
                        </span>
                        <span v-if="downloadable.file_size" class="meta-size">
                            {{ downloadable.file_size }}
                        </span>
                    </div>
                </div>

                <div class="downloadable-item__action">
                    <button class="download-btn">
                        ⬇️ Descargar
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.downloadables {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;

        h2 {
            margin: 0;
            font-size: 2rem;
            color: var(--color-primary);
        }
    }

    &__description {
        margin: 0;
        font-size: 1rem;
        color: var(--color-text-dark);
        line-height: 1.6;
    }

    &__list {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
}

.download-all-btn {
    padding: 0.75rem 1.5rem;
    background: var(--color-primary);
    color: var(--color-white);
    border: none;
    border-radius: 0.75rem;
    font-family: 'Text';
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        background: var(--color-secondary);
        transform: translateY(-2px);
        box-shadow: 0 4px 15px rgba(107, 76, 147, 0.3);
    }
}

.downloadable-item {
    display: grid;
    grid-template-columns: 60px 1fr auto;
    gap: 1.5rem;
    padding: 1.5rem;
    background: var(--color-white);
    border: 2px solid var(--color-disable);
    border-radius: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    align-items: center;

    &:hover {
        border-color: var(--color-primary);
        transform: translateY(-4px);
        box-shadow: 0 8px 20px rgba(107, 76, 147, 0.15);

        .download-btn {
            background: var(--color-primary);
            color: var(--color-white);
        }
    }

    &__icon {
        font-size: 3rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__info {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    &__name {
        margin: 0;
        font-size: 1.2rem;
        color: var(--color-black);
        font-family: 'Text';
        font-weight: 600;
        line-height: 1.3;
    }

    &__description {
        margin: 0;
        font-size: 0.95rem;
        color: var(--color-text-dark);
        line-height: 1.4;
    }

    &__meta {
        display: flex;
        gap: 0.75rem;
        flex-wrap: wrap;

        .meta-tag,
        .meta-size {
            padding: 0.25rem 0.75rem;
            background: #e9ecef;
            color: var(--color-text-dark);
            border-radius: 0.5rem;
            font-family: 'Text';
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }
    }

    &__action {
        display: flex;
        align-items: center;
    }
}

.download-btn {
    padding: 0.75rem 1.5rem;
    background: transparent;
    color: var(--color-primary);
    border: 2px solid var(--color-primary);
    border-radius: 0.75rem;
    font-family: 'Text';
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    white-space: nowrap;

    &:hover {
        transform: scale(1.05);
    }
}

@media screen and (max-width: 768px) {
    .downloadables {
        &__header {
            flex-direction: column;
            align-items: flex-start;

            h2 {
                font-size: 1.6rem;
            }
        }
    }

    .download-all-btn {
        width: 100%;
    }

    .downloadable-item {
        grid-template-columns: 50px 1fr;
        gap: 1rem;
        padding: 1rem;

        &__icon {
            font-size: 2.5rem;
        }

        &__action {
            grid-column: 1 / -1;
            width: 100%;

            .download-btn {
                width: 100%;
            }
        }
    }
}
</style>