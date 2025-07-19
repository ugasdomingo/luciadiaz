import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'
import { useAuthStore } from './auth-store'

export const useVideoStore = defineStore('video', () => {
    const util_store = useUtilStore()
    const auth_store = useAuthStore()
    const videos = ref([])
    const video = ref({})

    const get_all_videos = async (display) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/video/${display}`
            })
            videos.value = response.data.data
            console.log(response.data.data)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const get_video_by_id = async (id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/video/${id}`
            })
            video.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const create_video = async (video) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/video',
                data: video,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            videos.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const update_video = async (video_id, video) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/video/${video_id}`,
                data: video,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            videos.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const delete_video = async (video_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'delete',
                url: `/video/${video_id}`,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            videos.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    return {
        videos,
        video,
        get_all_videos,
        get_video_by_id,
        create_video,
        update_video,
        delete_video
    }
})