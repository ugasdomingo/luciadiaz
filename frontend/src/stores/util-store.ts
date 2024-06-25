//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';

//Define store
export const useUtilStore = defineStore('util', () => {
    const showAlert = ref(false);
    const alertMessage = ref('');
    const alertType = ref('');
    const isLoading = ref(false);

    const displayAlert = (message: string, type: string) => {
        showAlert.value = true;
        alertMessage.value = message;
        alertType.value = type;

        setTimeout(() => {
            showAlert.value = false;
        }, 3000);
    };

    return {
        showAlert,
        alertMessage,
        alertType,
        isLoading,
        displayAlert,
    };
});
