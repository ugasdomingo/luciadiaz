import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'
import { useAuthStore } from './auth-store'

export const useFormationStore = defineStore('formation', () => {
    const util_store = useUtilStore()
    const auth_store = useAuthStore()
    const formations = ref([])
    const formation = ref({})

    const get_all_formations = async (display) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/formation/${display}`
            })
            formations.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const get_formation_by_id = async (id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/formation/${id}`
            })
            formation.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const create_formation = async (formation) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/formation',
                data: formation,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            formations.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const update_formation = async (id, formation) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/formation/${formation.id}`,
                data: formation,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            formations.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const delete_formation = async (id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'delete',
                url: `/formation/${id}`,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const change_formation_status = async (formation_id, status) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/formation/status/${id}`,
                data: status,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            formations.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    return {
        formations,
        formation,
        get_all_formations,
        get_formation_by_id,
        create_formation,
        update_formation,
        delete_formation,
        change_formation_status
    }
})