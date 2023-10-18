//Import tools
import { defineStore } from 'pinia';
import { api } from '../services/axios';
import { Ref, ref } from 'vue';
import { useUserStore } from './user-store';
import { useUtilStore } from './util-store';
import { IBook } from '../interfaces/IBook';

//Define store
export const useBookStore = defineStore('book', () => {
    const userStore = useUserStore();
    const utilStore = useUtilStore();

    const showBooks: Ref<IBook[]> = ref([]);

    const createBook = async (formData: any) => {
        try {
            await api({
                url: '/books',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                data: formData,
            });

            utilStore.displayAlert('Libro creado con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al crear el libro', 'error');
        }
    };

    const getBooks = async (showNum: number) => {
        try {
            const response = await api({
                url: '/books',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            showBooks.value = response.data.books.slice(-showNum);
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al cargar los libros', 'error');
        }
    };

    const getBookById = async (id: string) => {
        try {
            const response = await api({
                url: `/books/${id}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            return response.data.book;
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al cargar el libro', 'error');
        }
    };

    const updateBook = async (id: string, formData: any) => {
        try {
            await api({
                url: `/books/${id}`,
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

    const deleteBook = async (id: string) => {
        try {
            await api({
                url: `/books/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            utilStore.displayAlert('Libro eliminado con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al eliminar el libro', 'error');
        }
    };

    return {
        showBooks,
        createBook,
        getBooks,
        getBookById,
        updateBook,
        deleteBook,
    };
});
