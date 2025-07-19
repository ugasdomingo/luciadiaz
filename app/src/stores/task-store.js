import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'

export const useTaskStore = defineStore('task', () => {
    const util_store = useUtilStore()

    const create_task = async (task) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/task',
                data: task
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const update_task = async (task_id, task) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/task/${task_id}`,
                data: task
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const delete_task = async (task_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'delete',
                url: `/task/${task_id}`
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const complete_task = async (task_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/task/complete/${task_id}`
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    return {
        create_task,
        update_task,
        delete_task,
        complete_task
    }
})
