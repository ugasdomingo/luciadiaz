<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useVideoStore } from '@/stores/video-store';

//Use tools
const video_store = useVideoStore();

//Define data
const form_data: FormData = new FormData();
const title = ref('');
const description = ref('');
const video_url = ref('');
const cover_image = ref();
const categorys = ref('');

//Define methods
const submitVideo = () => {
    try {
        form_data.append('title', title.value);
        form_data.append('description', description.value);
        form_data.append('video_url', video_url.value);
        form_data.append('cover_image', cover_image.value);
        form_data.append('categorys', categorys.value);

        video_store.create_video(form_data);

        title.value = '';
        description.value = '';
        video_url.value = '';
        cover_image.value = '';
        categorys.value = '';
    } catch (error) {
        console.log(error);
    }
};

const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files[0]) {
        cover_image.value = target.files[0];
    }
};
</script>

<template>
    <form @submit.prevent="submitVideo">
        <input type="text" v-model="title" placeholder="Título" />
        <input type="text" v-model="description" placeholder="Descripción" />
        <input type="text" v-model="video_url" placeholder="URL del video" />
        <input type="file" @change="handleFileChange" />
        <input type="text" v-model="categorys" placeholder="Categorías" />
        <button type="submit" class="button__action">Crear video</button>
    </form>
</template>

<style scoped lang="scss">
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 3rem 2rem;
    border: 1px solid var(--color-primary-trans);
    border-radius: 1rem;
    margin: 0;
}
</style>
