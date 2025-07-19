import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'

export const useLikeStore = defineStore('like', () => {
    const util_store = useUtilStore()
    const likes = ref([])
    const like = ref({})

    const create_like_user = async (like) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/like',
                data: like
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const create_like_visitor = async (like) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/like/visitor',
                data: like
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const delete_like_user = async (like_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'delete',
                url: `/like/${like_id}`
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const delete_like_visitor = async (like_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'delete',
                url: `/like/visitor/${like_id}`
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const get_all_likes = async () => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: '/like'
            })
            likes.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    return {
        create_like_user,
        create_like_visitor,
        delete_like_user,
        delete_like_visitor,
        get_all_likes
    }
})
