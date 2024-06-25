<template>
    <main>
        <h1>{{ galleryTitle }}</h1>
        <section class="gallery">
            <router-link
                :to="`/${therapy}/${item.id}`"
                class="gallery-item"
                v-for="item in gallery"
                :key="item.id"
            >
                <img :src="item.img.secure_url" :alt="item.title" />
                <h2>{{ item.title }}</h2>
            </router-link>
        </section>
    </main>
</template>

<script setup lang="ts">
//Import tools
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';

//Import stores
import { useBlogStore } from '../stores/blog-store';
import { useBookStore } from '../stores/book-store';
import { useFormationStore } from '../stores/formation-store';

const route = useRoute();
const router = useRouter();
//get path
let therapy = route.params.id;

const gallery = ref();
const galleryTitle = ref('');

//Functions
const getData = async (path: string) => {
    try {
        if (path == 'cursos') {
            galleryTitle.value = 'Cursos Disponibles';
            const formationStore = useFormationStore();
            await formationStore.getFormations(0);
            gallery.value = formationStore.showFormations;
        } else if (path == 'libros') {
            galleryTitle.value = 'Libros Disponibles';
            const bookStore = useBookStore();
            await bookStore.getBooks(0);
            gallery.value = bookStore.showBooks;
        } else if (path == 'blog') {
            galleryTitle.value = 'Artículos y Novedades';
            const blogStore = useBlogStore();
            await blogStore.getPosts(0);
            gallery.value = blogStore.showPosts;
        }
    } catch (error) {
        console.log(error);
    }
};

//define function to get therapy info
onBeforeMount(() => {
    therapy = route.params.id as string;
    getData(therapy);
});

router.afterEach(() => {
    gallery.value = [];
    therapy = route.params.id as string;
    getData(therapy);
});
</script>

<style scoped lang="scss">
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    padding: 11vh 4rem 2rem;
    margin: 0;
    background-color: #f5f5f5;
    box-sizing: border-box;

    h1 {
        font-weight: 300;
        text-align: center;
        margin-bottom: 2rem;
    }

    a {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 250px;
        height: 250px;
        position: relative;
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        h2 {
            font-size: 1.25rem;
            font-weight: 300;
            padding: 1rem;
            margin: 0;
            z-index: 10;
            position: absolute;
            bottom: 0;
            left: 0;
            background-color: rgba(245, 245, 245, 0.5);
            border-radius: 0.5rem 0.5rem 0 0;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
            border-radius: 1rem;
        }
    }
}
</style>
