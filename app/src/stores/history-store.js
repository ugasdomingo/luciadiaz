import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'
import { useAuthStore } from './auth-store'

export const useHistoryStore = defineStore('history', () => {
    const util_store = useUtilStore()
    const auth_store = useAuthStore()
    const history = ref([])

    const get_all_history = async () => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: '/history'
            })
            history.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const create_history = async (title, answers) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/history',
                headers: {
                    Authorization: `Bearer ${auth_store.token}`
                },
                data: { title, answers }
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const update_history = async (id, history) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/history/${id}`,
                data: history
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    return {
        get_all_history,
        create_history,
        update_history
    }
})
