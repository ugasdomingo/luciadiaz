//Import tools
import { defineStore } from 'pinia';
import { api } from '@/services/axios';
import { useUtilStore } from './util-store';
import { useUserStore } from './user-store';

//Define the store
export const useHistoryStore = defineStore('history', () => {
    //Use tools
    const util_store = useUtilStore();
    const user_store = useUserStore();
    //General States

    //Methods
    const create_patient_history = async (title: string, answers: object[]) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/patient-history',
                headers: {
                    Authorization: `Bearer ${user_store.token}`
                },
                data: {
                    title: title,
                    answers: answers,
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
        create_patient_history
    };
});
