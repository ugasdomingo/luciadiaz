<script setup>
import { onBeforeMount } from 'vue'
import { useLikeStore } from '../../../stores/like-store.js'

const like_store = useLikeStore()

onBeforeMount(() => {
    like_store.get_all_likes()
})
</script>

<template>
    <section class="section__container">
        <h2>Ver Likes <span @click="toggle_get_all_likes">{{ show_get_all_likes ? '-' : '+' }}</span></h2>
        <div v-if="show_get_all_likes" class="section__container__content">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Correo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="like in like_store.likes" :key="like.id">
                        <td>{{ like.id }}</td>
                        <td>{{ like.name }}</td>
                        <td>{{ like.last_name }}</td>
                        <td>{{ like.email }}</td>
                        <td>
                            <button @click="toggle_update_like">Editar</button>
                            <button @click="like_store.delete_like(like.id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
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
}
</style>
