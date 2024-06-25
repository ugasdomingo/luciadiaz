//Import tools
import { defineStore } from 'pinia';
import { api } from '../services/axios';
import { Ref, ref } from 'vue';
import { useUserStore } from './user-store';
import { useUtilStore } from './util-store';
import { IFormation } from '../interfaces/IFormation';

//Define store
export const useFormationStore = defineStore('formation', () => {
    const userStore = useUserStore();
    const utilStore = useUtilStore();

    const showFormations: Ref<IFormation[]> = ref([]);

    const createFormation = async (formData: any) => {
        try {
            await api({
                url: '/formations',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                data: formData,
            });

            utilStore.displayAlert('Formación creada con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al crear la formación', 'error');
        }
    };

    const getFormations = async (showNum: number) => {
        try {
            const response = await api({
                url: '/formations',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            showNum === 0
                ? (showFormations.value = response.data.formations)
                : (showFormations.value = response.data.formations.slice(
                      -showNum,
                  ));
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al cargar las formaciones', 'error');
        }
    };

    const getFormationById = async (id: string) => {
        try {
            const response = await api({
                url: `/formations/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            return response.data.formation;
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al cargar la formación', 'error');
        }
    };

    const updateFormation = async (id: string, formData: any) => {
        try {
            await api({
                url: `/formations/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                data: formData,
            });

            utilStore.displayAlert(
                'Formación actualizada con éxito',
                'success',
            );
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al actualizar la formación', 'error');
        }
    };

    const deleteFormation = async (id: string) => {
        try {
            await api({
                url: `/formations/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            utilStore.displayAlert('Formación eliminada con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al eliminar la formación', 'error');
        }
    };

    return {
        showFormations,
        createFormation,
        getFormations,
        getFormationById,
        updateFormation,
        deleteFormation,
    };
});
