//Import tools
import { defineStore } from 'pinia';
import { api } from '@/services/axios';
import { useRouter } from 'vue-router';
import { useUtilStore } from './util-store';
import { useUserStore } from './user-store';

//Define the store
export const useTestStore = defineStore('test', () => {
    //Use tools
    const util_store = useUtilStore();
    const user_store = useUserStore();
    const router = useRouter();

    //Methods
    const create_test_result = async (title: string, results: any) => {
        try {
            const response = await api({
                method: 'POST',
                url: '/test-result',
                headers: {
                    Authorization: `Bearer ${user_store.token}`
                },
                data: {
                    title,
                    results,
                    medical_record: user_store.user_medical_record
                }
            });

            util_store.display_notification(
                response.data.message,
                response.status
            );

            router.push('/area-privada');
        } catch (error) {
            console.log(error);
            util_store.display_notification(
                'Error al iniciar sesión, intente de nuevo',
                500
            );
        }
    };

    //return
    return {
        create_test_result
    };
});
