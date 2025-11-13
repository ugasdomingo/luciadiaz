<script setup>
import { ref } from 'vue'
import { useFormationStore } from '../../../stores/formation-store.js'
import { useAuthStore } from '../../../stores/auth-store.js'
import FormationCardComponent from '../../common/cards/FormationCardComponent.vue'

const formation_store = useFormationStore()
const auth_store = useAuthStore()
const show_create_formation = ref(false)
const show_update_formation = ref(false)
const formation_to_update = ref(null)

const toggle_create_formation = () => {
    show_create_formation.value = !show_create_formation.value
}

const toggle_update_formation = () => {
    show_update_formation.value = !show_update_formation.value

    if (formation_store.formations.length === 0) {
        formation_store.get_all_formations(0)
    }
}

//Formdata
const title = ref('')
const slug = ref('')
const type = ref('')
const description = ref('')
const duration = ref('')
const location = ref('')
const price = ref(0)
const start_date = ref()
const categorys = ref('')
const video_url = ref('')
const paypal_button = ref('')
const status = ref('draft')
const formation_cover = ref(null)

//Handdle_submit
const handle_submit = async () => {
    const form_data = new FormData()
    form_data.append('title', title.value)
    form_data.append('slug', slug.value)
    form_data.append('type', type.value)
    form_data.append('description', description.value)
    form_data.append('duration', duration.value)
    form_data.append('location', location.value)
    form_data.append('price', price.value)
    form_data.append('start_date', start_date.value)
    form_data.append('categorys', categorys.value)
    form_data.append('video_url', video_url.value)
    form_data.append('paypal_button', paypal_button.value)
    form_data.append('status', status.value)
    form_data.append('formation_cover', formation_cover.value)

    await formation_store.create_formation(form_data)

    /* title.value = ''
    slug.value = ''
    type.value = ''
    content.value = ''
    description.value = ''
    duration.value = ''
    location.value = ''
    price.value = ''
    start_date.value = ''
    categorys.value = ''
    video_url.value = ''
    paypal_button.value = ''
    status.value = ''
    formation_cover.value = null */
}

//Handdle_file_change
const handle_file_change = (event) => {
    const file = event.target.files[0]
    if (file) {
        formation_cover.value = file
    }
}

</script>

<template>
    <section class="section__container">
        <h2 @click="toggle_create_formation">Crear Formación <span>{{ show_create_formation ? '-' : '+' }}</span></h2>
        <form @submit.prevent="handle_submit" v-if="show_create_formation" class="section__container__content">
            <input type="text" placeholder="Título" v-model="title">
            <input type="text" placeholder="Slug" v-model="slug">
            <select v-model="type">
                <option value="presencial">Presencial</option>
                <option value="live">Live</option>
                <option value="online">Online</option>
            </select>
            <input type="text" placeholder="Descripción" v-model="description">
            <input type="text" placeholder="Duración" v-model="duration">
            <input type="text" placeholder="Ubicación" v-model="location">
            <input type="number" placeholder="Precio" v-model="price">
            <input type="date" placeholder="Fecha de inicio" v-model="start_date">
            <input type="text" placeholder="Categorías" v-model="categorys">
            <input type="text" placeholder="Video URL" v-model="video_url">
            <input type="text" placeholder="Paypal Button" v-model="paypal_button">
            <select v-model="status">
                <option value="inactive">Inactivo</option>
                <option value="active">Activo</option>
                <option value="draft">Borrador</option>
            </select>
            <input type="file" name="image" @change="handle_file_change">
            <button type="submit" class="action-btn">Crear Formación</button>
        </form>
        <h2 @click="toggle_update_formation">Actualizar Formación <span>{{ show_update_formation ? '-' : '+' }}</span>
        </h2>
        <section v-if="show_update_formation" class="section__container__posts">
            <div v-for="formation in formation_store.formations" :key="formation._id">
                <FormationCardComponent :formation="formation" />
                <div class="section__container__posts__actions" v-if="auth_store.user_data.user.role === 'Admin'">
                    <button @click="formation_to_update = formation" class="action-btn">Editar</button>
                    <button @click="formation_store.delete_formation(formation._id)" class="nobg-btn">Eliminar</button>
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
        transition: all 0.25s;

        &:hover {
            color: var(--color-primary);
        }
    }

    &__content {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        box-sizing: border-box;

        select {
            max-width: 30rem;
            padding: 0.5rem;
            border: 1px solid var(--color-gray-2);
            border-radius: 0.5rem;
        }
    }
}
</style>