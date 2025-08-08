<script setup>
import { ref } from 'vue'
import { useEnrollmentStore } from '../../../stores/enrollment-store.js'
import { onBeforeMount } from 'vue'

const enrollment_store = useEnrollmentStore()
const show_get_all_enrollment = ref(true)
const show_update_enrollment = ref(false)
const enrollment_to_update = ref(null)

const toggle_get_all_enrollment = () => {
    show_get_all_enrollment.value = !show_get_all_enrollment.value
}

const toggle_update_enrollment = () => {
    show_update_enrollment.value = !show_update_enrollment.value
}

//Formdata
const enrollment_data = ref({
    title: '',
    content: '',
    image: null,
    category: '',
    tags: []
})

onBeforeMount(() => {
    enrollment_store.get_all_enrollments()
})

</script>

<template>
    <section class="section__container">
        <h2>Ver Inscripciones <span @click="toggle_get_all_enrollment">{{ show_get_all_enrollment ? '-' : '+' }}</span>
        </h2>
        <div v-if="show_get_all_enrollment" class="section__container__content">
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
                    <tr v-for="enrollment in enrollment_store.enrollments" :key="enrollment.id">
                        <td>{{ enrollment.id }}</td>
                        <td>{{ enrollment.name }}</td>
                        <td>{{ enrollment.last_name }}</td>
                        <td>{{ enrollment.email }}</td>
                        <td>
                            <button @click="toggle_update_enrollment">Editar</button>
                            <button @click="enrollment_store.delete_enrollment(enrollment.id)">Eliminar</button>
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