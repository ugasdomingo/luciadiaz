//Import tools
import { defineStore } from 'pinia';
import { ref } from 'vue';

//Define the store
export const useUtilStore = defineStore('utils', () => {
    //General States
    const isLoading = ref(false);

    //DIsplay Message
    const message = ref('');
    const message_type = ref(0);
    const show_notification = ref(false);
    const show_other_payment_method = ref(false);
    const show_access_modal = ref(false);

    //Admins States
    const current_admin_action = ref('find-user');

    //Methods
    const display_notification = (information: string, type: number) => {
        if (information !== 'Correcto') {
            message.value = information;
            message_type.value = type;
            show_notification.value = true;
            setTimeout(() => {
                show_notification.value = false;
            }, 6500);
        }
    };

    //Return the states and methods
    return {
        isLoading,
        message,
        message_type,
        show_notification,
        show_other_payment_method,
        show_access_modal,
        current_admin_action,
        display_notification
    };
});
