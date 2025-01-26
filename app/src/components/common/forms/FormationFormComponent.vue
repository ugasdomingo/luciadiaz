<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import Editor from '@tinymce/tinymce-vue';
import { useFormationStore } from '@/stores/formation-store';

//Use tools
const formation_store = useFormationStore();

//Define data
const form_data: FormData = new FormData();
const title = ref('');
const type = ref('');
const content = ref('Contenido de la formación');
const description = ref('');
const duration = ref('');
const location = ref('');
const price = ref('');
const date = ref('');
const categorys = ref('');
const video_url = ref('');
const cover_image = ref();
const paypal_button = ref('');
const status = ref('');

//Define methods
const submitFormation = () => {
    try {
        form_data.append('title', title.value);
        form_data.append('type', type.value);
        form_data.append('content', content.value);
        form_data.append('description', description.value);
        form_data.append('duration', duration.value);
        form_data.append('location', location.value);
        form_data.append('price', price.value);
        form_data.append('date', date.value);
        form_data.append('categorys', categorys.value);
        form_data.append('video_url', video_url.value);
        form_data.append('cover_image', cover_image.value);
        form_data.append('paypal_button', paypal_button.value);
        form_data.append('status', status.value);

        formation_store.create_formation(form_data);

        title.value = '';
        type.value = '';
        content.value = '';
        description.value = '';
        duration.value = '';
        location.value = '';
        price.value = '';
        date.value = '';
        categorys.value = '';
        video_url.value = '';
        cover_image.value = '';
        paypal_button.value = '';
        status.value = '';
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
    <form @submit.prevent="submitFormation">
        <input type="text" v-model="title" placeholder="Título" />
        <input type="text" v-model="type" placeholder="Tipo" />
        <editor
            v-model="content"
            :init="{
                plugins: 'lists link image code table wordcount',
                toolbar:
                    'undo redo | blocks | bold italic | alignleft aligncenter alignright | bullist numlist outdent indent | link image | code',
                height: 600
            }"
        />
        <input type="text" v-model="description" placeholder="Descripción" />
        <input type="text" v-model="duration" placeholder="Duración" />
        <input type="text" v-model="location" placeholder="Ubicación" />
        <input type="text" v-model="price" placeholder="Precio" />
        <input type="date" v-model="date" placeholder="Fecha" />
        <input type="text" v-model="categorys" placeholder="Categorías" />
        <input type="text" v-model="video_url" placeholder="URL del video" />
        <input type="file" @change="handleFileChange" />
        <input
            type="text"
            v-model="paypal_button"
            placeholder="Botón de PayPal"
        />
        <input type="text" v-model="status" placeholder="Estado" />
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
