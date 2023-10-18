//Import tools
import { defineStore } from 'pinia';
import { api } from '../services/axios';
import { Ref, ref } from 'vue';
import { useUserStore } from './user-store';
import { useUtilStore } from './util-store';
import { IPost } from '../interfaces/IPost';

//Define store
export const useBlogStore = defineStore('blog', () => {
    const userStore = useUserStore();
    const utilStore = useUtilStore();

    const showPosts: Ref<IPost[]> = ref([]);

    const createPost = async (formData: any) => {
        try {
            await api({
                url: '/posts',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                data: formData,
            });

            utilStore.displayAlert('Post creado con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al crear el post', 'error');
        }
    };

    const getPosts = async (showNum: number) => {
        try {
            const response = await api({
                url: '/posts',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            showPosts.value = response.data.posts.slice(-showNum);
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al cargar los posts', 'error');
        }
    };

    const getPostById = async (id: string) => {
        try {
            const response = await api({
                url: `/posts/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            return response.data.post;
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al cargar el post', 'error');
        }
    };

    const updatePost = async (id: string, formData: any) => {
        try {
            await api({
                url: `/posts/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                data: formData,
            });

            utilStore.displayAlert('Post actualizado con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al actualizar el post', 'error');
        }
    };

    const deletePost = async (id: string) => {
        try {
            await api({
                url: `/posts/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            utilStore.displayAlert('Post eliminado con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al eliminar el post', 'error');
        }
    };

    return {
        showPosts,
        createPost,
        getPosts,
        getPostById,
        updatePost,
        deletePost,
    };
});
