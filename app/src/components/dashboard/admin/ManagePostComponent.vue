<script setup>
import { ref } from 'vue'
import { usePostStore } from '../../../stores/post-store.js'
import { onBeforeMount } from 'vue'
import EditorComponent from '../../common/EditorComponent.vue'
import PostCardComponent from '../../common/cards/PostCardComponent.vue'
import { useAuthStore } from '../../../stores/auth-store.js'

const auth_store = useAuthStore()

const post_store = usePostStore()
const show_create_post = ref(false)
const show_update_post = ref(false)
const post_to_update = ref(null)

const toggle_create_post = () => {
    show_create_post.value = !show_create_post.value
}

const toggle_update_post = () => {
    show_update_post.value = !show_update_post.value

    if (post_store.posts.length === 0) {
        post_store.get_all_posts_admin()
    }
}

//Formdata
const title = ref('')
const slug = ref('')
const content = ref('')
const category = ref('')
const tags = ref('')
const post_cover = ref()


//Handdle_submit
const handle_submit = async () => {
    const form_data = new FormData()
    form_data.append('title', title.value)
    form_data.append('slug', slug.value)
    form_data.append('content', content.value)
    form_data.append('category', category.value)
    form_data.append('tags', tags.value)
    form_data.append('post_cover', post_cover.value)
    form_data.append('status', 'published')

    await post_store.create_post(form_data)

    title.value = ''
    slug.value = ''
    content.value = ''
    category.value = ''
    tags.value = ''
    post_cover.value = null
}

//Handdle_file_change
const handle_file_change = (event) => {
    const file = event.target.files[0]
    if (file) {
        post_cover.value = file
    }

}

//Prepare post to update
const prepare_post_to_update = (post) => {
    post_to_update.value = post
    toggle_create_post()
    title.value = post.title
    slug.value = post.slug
    content.value = post.content
    category.value = post.category
    tags.value = post.tags
}

//Handdle_update
const handle_update = async () => {
    const form_data = new FormData()
    form_data.append('title', title.value)
    form_data.append('slug', slug.value)
    form_data.append('content', content.value)
    form_data.append('category', category.value)
    form_data.append('tags', tags.value)
    form_data.append('post_cover', post_cover.value)

    await post_store.update_post(post_to_update.value._id, form_data)

    title.value = ''
    slug.value = ''
    content.value = ''
    category.value = ''
    tags.value = ''
    post_cover.value = null
    post_to_update.value = null
    toggle_update_post()
}

</script>

<template>
    <section class="section__container">
        <h2 @click="toggle_create_post">Crear Post <span>{{ show_create_post ? '-' : '+' }}</span></h2>
        <form @submit.prevent="handle_submit" v-if="show_create_post" class="section__container__create">
            <input type="text" placeholder="Titulo" v-model="title" required>
            <input type="text" placeholder="Slug" v-model="slug" required>
            <EditorComponent v-model="content" />
            <input type="text" placeholder="Categoria" v-model="category" required>
            <input type="text" placeholder="Tags" v-model="tags" required>
            <input type="file" accept="image/*" @change="handle_file_change" required>
            <button type="submit" class="action-btn">Crear Post</button>
            <button type="button" class="nobg-btn" @click="handle_update">Guardar</button>
        </form>
        <h2 @click="toggle_update_post">Actualizar Post <span>{{ show_update_post ? '-' : '+' }}</span></h2>
        <section v-if="show_update_post" class="section__container__posts">
            <div v-for="post in post_store.posts" :key="post.id">
                <PostCardComponent :post="post" />
                <div class="section__container__posts__actions" v-if="auth_store.user_data.user.role === 'Admin'">
                    <button @click="post_store.change_post_status(post._id, 'published')"
                        class="action-btn">Publicar</button>
                    <button @click="post_store.delete_post(post._id)" class="nobg-btn">Eliminar</button>
                    <button @click="prepare_post_to_update(post)" class="action-btn">Editar</button>
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0;
        padding: 2rem 0.5rem;
        cursor: pointer;
        color: var(--color-text);

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
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 1.5rem;
        padding: 2rem;

        &__actions {
            display: flex;
            gap: 1rem;
        }
    }
}
</style>
