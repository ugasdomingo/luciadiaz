<script setup>
import { ref } from 'vue'
import { useVideoStore } from '../../../stores/video-store.js'
import { useAuthStore } from '../../../stores/auth-store.js'
import VideoCardComponent from '../../common/cards/VideoCardComponent.vue'
import { onBeforeMount } from 'vue'

const video_store = useVideoStore()
const auth_store = useAuthStore()
const show_create_video = ref(false)
const show_update_video = ref(false)
const video_to_update = ref(null)

const toggle_create_video = () => {
    show_create_video.value = !show_create_video.value
}

const toggle_update_video = () => {
    show_update_video.value = !show_update_video.value

    if (video_store.videos.length === 0) {
        video_store.get_all_videos(0)
    }
}

//Formdata
const title = ref('')
const brief = ref('')
const video_url = ref('')
const category = ref('')
const tags = ref('')
const video_cover = ref(null)

//Handdle_submit
const handle_submit = async () => {
    const form_data = new FormData()
    form_data.append('title', title.value)
    form_data.append('brief', brief.value)
    form_data.append('video_url', video_url.value)
    form_data.append('category', category.value)
    form_data.append('tags', tags.value)
    form_data.append('video_cover', video_cover.value)

    await video_store.create_video(form_data)

    title.value = ''
    brief.value = ''
    video_url.value = ''
    category.value = ''
    tags.value = ''
    video_cover.value = null
}

//Handdle_file_change
const handle_file_change = (event) => {
    const file = event.target.files[0]
    if (file) {
        video_cover.value = file
    }
}

</script>

<template>
    <section class="section__container">
        <h2 @click="toggle_create_video">Crear Video <span>{{ show_create_video ? '-' : '+' }}</span></h2>
        <form @submit.prevent="handle_submit" v-if="show_create_video" class="section__container__create">
            <input type="text" placeholder="Titulo" v-model="title">
            <input type="text-area" placeholder="Resumen" v-model="brief">
            <input type="text" placeholder="URL del video" v-model="video_url">
            <input type="text" placeholder="Categoria" v-model="category">
            <input type="text" placeholder="Tags" v-model="tags">
            <input type="file" @change="handle_file_change">
            <button type="submit" class="action-btn">Crear Video</button>
        </form>
        <h2 @click="toggle_update_video">Actualizar Video <span>{{ show_update_video ? '-' : '+' }}</span></h2>
        <section v-if="show_update_video" class="section__container__posts">
            <div v-for="video in video_store.videos" :key="video.id">
                <VideoCardComponent :video="video" />
                <div class="section__container__posts__actions" v-if="auth_store.user.role === 'Admin'">
                    <button @click="video_to_update = video" class="action-btn">Editar</button>
                    <button @click="video_store.delete_video(video.id)" class="nobg-btn">Eliminar</button>
                </div>
            </div>
        </section>
    </section>
</template>

<style scoped lang="scss">
.section__container {
    width: 100%;
    margin: 0;
    padding: 0 4rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;

    h2 {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        padding: 2rem 0.5rem;
        cursor: pointer;
        transition: all 0.25s;

        &:hover {
            color: var(--color-primary);
        }
    }

    &__create {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        padding: 2rem;

        button {
            margin-top: 2rem;
        }
    }

    &__posts {
        display: flex;
        flex-wrap: wrap;
        gap: 1rem;
    }

    &__posts__actions {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
    }
}
</style>