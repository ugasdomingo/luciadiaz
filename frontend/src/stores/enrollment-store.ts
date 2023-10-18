//Import tools
import { defineStore } from 'pinia';
import { api } from '../services/axios';
import { Ref, ref } from 'vue';
import { useUserStore } from './user-store';
import { useUtilStore } from './util-store';
import { IEnrollment } from '../interfaces/IEnrollment';

//Define store
export const useEnrollmentStore = defineStore('enrollment', () => {
    const userStore = useUserStore();
    const utilStore = useUtilStore();

    const enrollments: Ref<IEnrollment[]> = ref([]);

    const getEnrollments = async () => {
        try {
            const response = await api({
                url: '/enrollments',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            enrollments.value = response.data.enrollments;
        } catch (error) {
            console.error(error);
            utilStore.displayAlert(
                'Error al cargar las inscripciones',
                'error',
            );
        }
    };

    const getEnrollmentById = async (id: string) => {
        try {
            const response = await api({
                url: `/enrollments/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            return response.data.enrollment;
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al cargar la inscripción', 'error');
        }
    };

    const createEnrollment = async (formationId: string) => {
        try {
            await api({
                url: '/enrollments',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                data: {
                    formation_id: formationId,
                },
            });

            utilStore.displayAlert('Inscripción creada con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al crear la inscripción', 'error');
        }
    };

    const updateEnrollment = async (id: string, status: string) => {
        try {
            await api({
                url: `/enrollments/${id}`,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                data: {
                    status,
                },
            });

            utilStore.displayAlert(
                'Inscripción actualizada con éxito',
                'success',
            );
        } catch (error) {
            console.error(error);
            utilStore.displayAlert(
                'Error al actualizar la inscripción',
                'error',
            );
        }
    };

    return {
        enrollments,
        getEnrollments,
        getEnrollmentById,
        createEnrollment,
        updateEnrollment,
    };
});
