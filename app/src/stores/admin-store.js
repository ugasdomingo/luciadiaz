import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useAuthStore } from './auth-store'
import { useUtilStore } from './util-store'

const auth_store = useAuthStore()
const util_store = useUtilStore()

export const useAdminStore = defineStore('admin', () => {
    const users = ref(null)
    const user = ref(null)

    const get_all_users = async () => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: '/user',
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            users.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const get_user_by_id = async (user_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/user/${user_id}`,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            user.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const update_user = async (user_id, user_data) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/user/${user_id}`,
                data: user_data,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            user.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const role_to_patient = async (user_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/user/role_to_patient/${user_id}`,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            user.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const active_anamnesis = async (user_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: `/util/active_anamnesis`,
                data: {
                    user_id
                },
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            user.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }



    return {
        users,
        user,
        get_all_users,
        get_user_by_id,
        update_user,
        role_to_patient,
        active_anamnesis
    }
})