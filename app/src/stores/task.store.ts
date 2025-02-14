//Import tools
import { defineStore } from 'pinia';
import { api } from '@/services/axios';
import { useUtilStore } from './util-store';
import { useUserStore } from './user-store';

//Define the store
export const useTaskStore = defineStore('task', () => {
    //Use tools
    const util_store = useUtilStore();
    const user_store = useUserStore();

    //Methods
    const create_task = async (
        uid: string,
        task: string,
        medical_record: string
    ) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/therapy/task',
                headers: {
                    Authorization: `Bearer ${user_store.token}`
                },
                data: {
                    uid,
                    task,
                    medical_record
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

    const update_task = async (task_id: string, status: string) => {
        try {
            const response = await api({
                method: 'PUT',
                url: '/therapy/task/status',
                headers: {
                    Authorization: `Bearer ${user_store.token}`
                },
                data: {
                    task_id,
                    status
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

    const edit_task = async (task_id: string, task: string) => {
        try {
            const response = await api({
                method: 'PUT',
                url: '/therapy/edit',
                headers: {
                    Authorization: `Bearer ${user_store.token}`
                },
                data: {
                    task_id,
                    task
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
        create_task,
        update_task,
        edit_task
    };
});
