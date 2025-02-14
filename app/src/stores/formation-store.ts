//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/services/axios';
import type { IFormation } from '@/types/IFormation';
import { useUtilStore } from './util-store';
import { useUserStore } from './user-store';

//Define the store
export const useFormationStore = defineStore('formation', () => {
    //Use tools
    const util_store = useUtilStore();
    const user_store = useUserStore();
    //General States
    const all_formations = ref<IFormation[]>([]);
    const one_formation = ref<IFormation | null>(null);

    //Methods
    const create_formation = async (form_data: FormData) => {
        try {
            console.log(form_data);
            const response = await api({
                method: 'POST',
                url: '/formation',
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

    const get_all_formations = async () => {
        try {
            const response = await api({
                method: 'GET',
                url: '/formation'
            });

            all_formations.value = response.data.data;

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

    const get_one_formation = async (id: string) => {
        try {
            const response = await api({
                method: 'GET',
                url: `/formation/${id}`
            });

            one_formation.value = response.data.data;

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

    const update_formation = async (form_data: FormData, id: string) => {
        try {
            const response = await api({
                method: 'PUT',
                url: `/formation/${id}`,
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

    const like_formation = async (id: string) => {
        try {
            const response = await api({
                method: 'PUT',
                url: `/formation/like/${id}`,
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
        all_formations,
        one_formation,
        create_formation,
        get_all_formations,
        get_one_formation,
        update_formation,
        like_formation
    };
});
