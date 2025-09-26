import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'
import { useAuthStore } from './auth-store'

export const useNoteStore = defineStore('note', () => {
    const util_store = useUtilStore()
    const auth_store = useAuthStore()
    const notes = ref([])

    const get_all_pending_notes = async () => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: '/note/pending'
            })
            notes.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const create_note = async (note) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/note',
                data: note,
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

    const update_note = async (note_id, note) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/note/${note_id}`,
                data: note,
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

    const delete_note = async (note_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'delete',
                url: `/note/${note_id}`,
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

    return {
        notes,
        get_all_pending_notes,
        create_note,
        update_note,
        delete_note
    }
})
