import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'
import { useAuthStore } from './auth-store'

export const useEnrollmentStore = defineStore('enrollment', () => {
    const util_store = useUtilStore()
    const auth_store = useAuthStore()
    const enrollments = ref([])
    const enrollment = ref({})

    // Validar clave de acceso
    const validate_access_key = async (formation_id, access_key) => {
        try {
            const response = await api({
                method: 'post',
                url: '/enrollment/validate-access',
                data: { formation_id, access_key }
            })
            return response.data.data?.valid || false
        } catch (err) {
            console.error(err)
            util_store.set_message('Clave de acceso inválida', 'Reject')
            return false
        }
    }

    // Crear enrollment (requiere autenticación)
    const create_enrollment = async (enrollment_data) => {
        try {
            const response = await api({
                method: 'post',
                url: '/enrollment',
                data: enrollment_data,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            util_store.set_message(response.data.message, 'Approve')
            return response.data.data
        } catch (err) {
            console.error(err)
            throw err
        }
    }

    // Obtener todos los enrollments (admin)
    const get_all_enrollments = async () => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: '/enrollment',
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            enrollments.value = response.data.data
        } catch (err) {
            console.error(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    // Obtener enrollment por ID (admin)
    const get_enrollment_by_id = async (id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/enrollment/${id}`,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            enrollment.value = response.data.data
        } catch (err) {
            console.error(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    // Obtener claves de una formación (admin)
    const get_formation_keys = async (formation_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/enrollment/formation-keys/${formation_id}`,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            return response.data.data
        } catch (err) {
            console.error(err)
            return []
        } finally {
            util_store.set_loading(false)
        }
    }

    return {
        enrollments,
        enrollment,
        validate_access_key,
        create_enrollment,
        get_all_enrollments,
        get_enrollment_by_id,
        get_formation_keys
    }
})