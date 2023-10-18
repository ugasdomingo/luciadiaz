//Import tools
import { defineStore } from 'pinia';
import { api } from '../services/axios';
import { Ref, ref } from 'vue';
import { useUserStore } from './user-store';
import { useUtilStore } from './util-store';
import { ISellBook } from '../interfaces/ISellBook';

//Define store
export const useSellBookStore = defineStore('sellBook', () => {
    const userStore = useUserStore();
    const utilStore = useUtilStore();

    const showSellBooks: Ref<ISellBook[]> = ref([]);

    const createSellBook = async (formData: any) => {
        try {
            await api({
                url: '/sell-books',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                data: formData,
            });

            utilStore.displayAlert('Libro comprado con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al crear el libro', 'error');
        }
    };

    const getSellBooks = async (showNum: number) => {
        try {
            const response = await api({
                url: '/sell-books',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            showSellBooks.value = response.data.sellBooks.slice(-showNum);
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al cargar los libros', 'error');
        }
    };

    const getSellBookById = async (id: string) => {
        try {
            const response = await api({
                url: `/sell-books/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            return response.data.sellBook;
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al cargar el libro', 'error');
        }
    };

    const updateSellBook = async (id: string, formData: any) => {
        try {
            await api({
                url: `/sell-books/${id}`,
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                data: formData,
            });

            utilStore.displayAlert('Libro actualizado con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al actualizar el libro', 'error');
        }
    };

    return {
        showSellBooks,
        createSellBook,
        getSellBooks,
        getSellBookById,
        updateSellBook,
    };
});
