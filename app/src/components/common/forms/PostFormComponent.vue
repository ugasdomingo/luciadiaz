<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import Editor from '@tinymce/tinymce-vue';
import { usePostStore } from '@/stores/post-store';

//Use tools
const post_store = usePostStore();

//Define data
const form_data: FormData = new FormData();
const title = ref('');
const content = ref('Contenido del post');
const cover_image = ref();
const categorys = ref('');
const video_url = ref('');

//Define methods
const submitPost = () => {
    try {
        form_data.append('title', title.value);
        form_data.append('content', content.value);
        form_data.append('cover_image', cover_image.value);
        form_data.append('categorys', categorys.value);
        form_data.append('video_url', video_url.value);

        post_store.create_post(form_data);

        title.value = '';
        content.value = '';
        cover_image.value = '';
        categorys.value = '';
        video_url.value = '';
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
    <form @submit.prevent="submitPost">
        <input type="text" v-model="title" placeholder="Título" />
        <editor
            v-model="content"
            :init="{
                plugins: 'lists link image code table wordcount',
                toolbar:
                    'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code',
                height: 600
            }"
        />
        <input type="file" @change="handleFileChange" />
        <input type="text" v-model="categorys" placeholder="Categorías" />
        <input type="text" v-model="video_url" placeholder="URL del video" />
        <button type="submit" class="button__action">Publicar</button>
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
