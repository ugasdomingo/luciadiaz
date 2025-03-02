//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { api } from '@/services/axios';
import type { IEnrollment } from '@/types/IEnrollment';
import { useUtilStore } from './util-store';
import { useUserStore } from './user-store';

//Define the store
export const useEnrollmentStore = defineStore('enrollment', () => {
    //Use tools
    const util_store = useUtilStore();
    const user_store = useUserStore();
    //General States
    const all_enrollments = ref<IEnrollment[]>([]);
    const one_enrollment = ref<IEnrollment | null>(null);

    //Methods
    const create_enrollment = async (
        fid: string,
        payment_method: string,
        payment_status: string
    ) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/enrollment',
                headers: {
                    Authorization: `Bearer ${user_store.token}`
                },
                data: {
                    fid,
                    payment_method,
                    payment_status,
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

    const get_all_enrollments = async () => {
        try {
            const response = await api({
                method: 'GET',
                url: '/enrollment'
            });

            all_enrollments.value = response.data.data;

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
        all_enrollments,
        one_enrollment,
        create_enrollment,
        get_all_enrollments
    };
});
