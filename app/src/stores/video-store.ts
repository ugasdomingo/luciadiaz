//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/services/axios';
import type { IVideo } from '@/types/IVideo';
import { useUtilStore } from './util-store';
import { useUserStore } from './user-store';

//Define the store
export const useVideoStore = defineStore('video', () => {
    //Use tools
    const util_store = useUtilStore();
    const user_store = useUserStore();
    //General States
    const all_videos = ref<IVideo[]>([]);
    const one_video = ref<IVideo | null>(null);

    //Methods
    const create_video = async (form_data: FormData) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/content/video',
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

    const get_all_videos = async () => {
        try {
            const response = await api({
                method: 'GET',
                url: '/content/video'
            });

            all_videos.value = response.data.data;

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

    const get_video_by_id = async (id: string) => {
        try {
            const response = await api({
                method: 'GET',
                url: `/content/video/${id}`
            });

            one_video.value = response.data.data;

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

    const delete_video = async (id: string) => {
        try {
            const response = await api({
                method: 'DELETE',
                url: `/content/video/${id}`,
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

    const like_video = async (id: string) => {
        try {
            const response = await api({
                method: 'POST',
                url: `/content/video/like/${id}`,
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

    return {
        all_videos,
        one_video,
        create_video,
        get_all_videos,
        get_video_by_id,
        delete_video,
        like_video
    };
});
