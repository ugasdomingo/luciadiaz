//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/services/axios';
import type { IPost } from '@/types/IPost';
import { useUtilStore } from './util-store';
import { useUserStore } from './user-store';

//Define the store
export const usePostStore = defineStore('post', () => {
    //Use tools
    const util_store = useUtilStore();
    const user_store = useUserStore();
    //General States
    const all_posts = ref<IPost[]>([]);
    const one_post = ref<IPost | null>(null);

    //Methods
    const create_post = async (form_data: FormData) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/content/post',
                headers: {
                    Authorization: `Bearer ${user_store.token}`
                },
                data: form_data
            });

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al iniciar sesión, intente de nuevo',
                500
            );
        }
    };

    const get_all_posts = async () => {
        try {
            const response = await api({
                method: 'GET',
                url: '/content/post'
            });

            all_posts.value = response.data.data;

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al iniciar sesión, intente de nuevo',
                500
            );
        }
    };

    const get_one_post = async (id: string) => {
        try {
            const response = await api({
                method: 'GET',
                url: `/content/post/${id}`
            });

            one_post.value = response.data.data;

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al iniciar sesión, intente de nuevo',
                500
            );
        }
    };

    const update_post = async (id: string, form_data: FormData) => {
        try {
            const response = await api({
                method: 'PUT',
                url: `/content/post/${id}`,
                headers: {
                    Authorization: `Bearer ${user_store.token}`
                },
                data: form_data
            });

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al iniciar sesión, intente de nuevo',
                500
            );
        }
    };

    const delete_post = async (id: string) => {
        try {
            const response = await api({
                method: 'DELETE',
                url: `/content/post/${id}`,
                headers: {
                    Authorization: `Bearer ${user_store.token}`
                }
            });

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al iniciar sesión, intente de nuevo',
                500
            );
        }
    };

    const add_like = async (id: string) => {
        try {
            const response = await api({
                method: 'POST',
                url: `/content/post/like/${id}`,
                headers: {
                    Authorization: `Bearer ${user_store.token}`
                },
                data: {
                    medical_record: user_store.user_medical_record
                }
            });

            util_store.display_notification(
                response.data.message,
                response.status
            );
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al iniciar sesión, intente de nuevo',
                500
            );
        }
    };

    //Return the states and methods
    return {
        all_posts,
        one_post,
        create_post,
        get_all_posts,
        get_one_post,
        update_post,
        delete_post,
        add_like
    };
});
