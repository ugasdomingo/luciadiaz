import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'
import { useAuthStore } from './auth-store'

export const usePostStore = defineStore('post', () => {
    const util_store = useUtilStore()
    const auth_store = useAuthStore()
    const posts = ref([])
    const post = ref({})

    const get_all_posts = async (display) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/post/${display}`
            })
            posts.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const get_all_posts_admin = async () => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: '/post/admin/all',
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            posts.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const get_post_by_slug = async (post_slug) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/post/post/${post_slug}`
            })
            post.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const create_post = async (post) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/post',
                data: post,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            posts.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const update_post = async (post_id, post) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/post/${post_id}`,
                data: post,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            posts.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const change_post_status = async (post_id, status) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/post/status/${post_id}`,
                data: { status },
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            posts.value = response.data.data
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const delete_post = async (post_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'delete',
                url: `/post/${post_id}`,
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
        posts,
        post,
        get_all_posts,
        get_all_posts_admin,
        get_post_by_slug,
        create_post,
        update_post,
        change_post_status,
        delete_post
    }
})
