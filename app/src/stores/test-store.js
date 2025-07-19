import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'

export const useTestStore = defineStore('test', () => {
    const util_store = useUtilStore()
    
    const create_test_result = async (test_result) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/test_result',
                data: test_result
            })
            util_store.set_message(response.data.message, response.data.status)
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