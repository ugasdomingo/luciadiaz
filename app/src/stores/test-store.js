import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { useRouter } from 'vue-router'
import { useAuthStore } from './auth-store'
import { useUtilStore } from './util-store'

export const useTestStore = defineStore('test', () => {
    const util_store = useUtilStore()
    const auth_store = useAuthStore()
    const router = useRouter()

    const create_test_result = async (test_name, results) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/test_result',
                data: { test_name, results },
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            util_store.set_message(response.data.message, response.data.status)
            await auth_store.refresh()
            router.push('/mi-espacio')
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    return {
        create_test_result
    }
})