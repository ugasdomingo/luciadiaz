import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'

export const useCommonStore = defineStore('common', () => {
    const util_store = useUtilStore()
    const posts = ref(null)
    const formations = ref(null)
    const videos = ref(null)

    const getCommon = async () => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: '/common/home'
            })
            posts.value = response.data.data.posts
            formations.value = response.data.data.formations
            videos.value = response.data.data.videos
        } catch (error) {
            console.error(error)
        } finally {
            util_store.set_loading(false)
        }
    }
    return { posts, formations, videos, getCommon }
})
