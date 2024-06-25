//Import tools
import { defineStore } from 'pinia';
import { api } from '../services/axios';
import { Ref, ref } from 'vue';
import { useUserStore } from './user-store';
import { useUtilStore } from './util-store';
import { ITestResult } from '../interfaces/ITestResult';

//Define store
export const useTestStore = defineStore('test', () => {
    const userStore = useUserStore();
    const utilStore = useUtilStore();

    const userArchetype = ref('');
    const userTemper = ref('');

    //Order User testResults
    const anamnesis: Ref<ITestResult[]> = ref([]);
    const arquetipo: Ref<ITestResult[]> = ref([]);
    const autoregistro: Ref<ITestResult[]> = ref([]);
    const metas: Ref<ITestResult[]> = ref([]);
    const temperamento: Ref<ITestResult[]> = ref([]);
    const historial: Ref<ITestResult[]> = ref([]);
    const notas: Ref<ITestResult[]> = ref([]);

    const createTestResult = async (testTitle: string, answers: object) => {
        try {
            await api({
                url: '/test-results',
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
                data: {
                    testTitle,
                    answers,
                },
            });

            utilStore.displayAlert('Test enviado con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al crear el test', 'error');
        }
    };

    const getTestResultByUserId = async (uid: string) => {
        try {
            const response = await api({
                url: `/test-results/admin/${uid}`,
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            response.data.testResults.map((item: ITestResult) => {
                if (item.testTitle == 'Anamnesis') {
                    anamnesis.value.push(item);
                } else if (item.testTitle == 'Notas') {
                    notas.value.push(item);
                } else if (item.testTitle == 'Arquetipo') {
                    arquetipo.value.push(item);
                    const bigNumber = Object.values(item.answers).sort()[3];
                    const { wise, warrior, wizard, lover } = item.answers;
                    warrior == bigNumber
                        ? (userArchetype.value = 'Guerrero')
                        : wise == bigNumber
                        ? (userArchetype.value = 'Sabio Rey')
                        : wizard == bigNumber
                        ? (userArchetype.value = 'Mago')
                        : lover == bigNumber
                        ? (userArchetype.value = 'Amante')
                        : (userArchetype.value = '');
                } else if (item.testTitle == 'Autoregistro') {
                    autoregistro.value.push(item);
                } else if (item.testTitle == 'Logro de Metas') {
                    metas.value.push(item);
                } else if (item.testTitle == 'Temperamento') {
                    temperamento.value.push(item);
                    const bigNumber = Object.values(item.answers).sort(
                        (a, b) => a - b,
                    )[3];
                    const { sanguine, choleric, melancholic, phlegmatic } =
                        item.answers;
                    sanguine == bigNumber
                        ? (userTemper.value = 'Sanguineo')
                        : choleric == bigNumber
                        ? (userTemper.value = 'Colérico')
                        : melancholic == bigNumber
                        ? (userTemper.value = 'Melancólico')
                        : phlegmatic == bigNumber
                        ? (userTemper.value = 'Flemático')
                        : (userTemper.value = '');
                } else {
                    historial.value.push(item);
                }
            });
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al obtener el test', 'error');
        }
    };

    const getOwnTestResultByUserId = async () => {
        try {
            const response = await api({
                url: '/test-results/own',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            console.log(response.data.testResults.testResults);

            response.data.testResults.map((item: ITestResult) => {
                if (item.testTitle == 'Anamnesis') {
                    anamnesis.value.push(item);
                } else if (item.testTitle == 'Notas') {
                    notas.value.push(item);
                } else if (item.testTitle == 'Arquetipo') {
                    arquetipo.value.push(item);
                    const bigNumber = Object.values(item.answers).sort()[3];
                    const { wise, warrior, wizard, lover } = item.answers;
                    warrior == bigNumber
                        ? (userArchetype.value = 'Guerrero')
                        : wise == bigNumber
                        ? (userArchetype.value = 'Sabio Rey')
                        : wizard == bigNumber
                        ? (userArchetype.value = 'Mago')
                        : lover == bigNumber
                        ? (userArchetype.value = 'Amante')
                        : (userArchetype.value = '');
                } else if (item.testTitle == 'Autoregistro') {
                    autoregistro.value.push(item);
                } else if (item.testTitle == 'Logro de Metas') {
                    metas.value.push(item);
                } else if (item.testTitle == 'Temperamento') {
                    temperamento.value.push(item);
                    const bigNumber = Object.values(item.answers).sort(
                        (a, b) => a - b,
                    )[3];
                    const { sanguine, choleric, melancholic, phlegmatic } =
                        item.answers;
                    sanguine == bigNumber
                        ? (userTemper.value = 'Sanguineo')
                        : choleric == bigNumber
                        ? (userTemper.value = 'Colérico')
                        : melancholic == bigNumber
                        ? (userTemper.value = 'Melancólico')
                        : phlegmatic == bigNumber
                        ? (userTemper.value = 'Flemático')
                        : (userTemper.value = '');
                } else {
                    historial.value.push(item);
                }
            });
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al obtener el test', 'error');
        }
    };

    const deleteTestResult = async (id: string) => {
        try {
            await api({
                url: `/test-results/${id}`,
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${userStore.token}`,
                },
            });

            utilStore.displayAlert('Test eliminado con éxito', 'success');
        } catch (error) {
            console.error(error);
            utilStore.displayAlert('Error al eliminar el test', 'error');
        }
    };
    //Utilitys
    const cleanData = () => {
        anamnesis.value = [];
        temperamento.value = [];
        metas.value = [];
        autoregistro.value = [];
        arquetipo.value = [];
        historial.value = [];
        userArchetype.value = '';
        userTemper.value = '';
    };

    return {
        userArchetype,
        userTemper,
        anamnesis,
        arquetipo,
        autoregistro,
        metas,
        temperamento,
        historial,
        createTestResult,
        getTestResultByUserId,
        getOwnTestResultByUserId,
        deleteTestResult,
        cleanData,
    };
});
