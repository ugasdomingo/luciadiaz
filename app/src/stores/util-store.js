import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUtilStore = defineStore('utils', () => {
    //Generals

    //Whatsapp link:
    const whatsapp_link = ref('https://wa.me/34604822385')

    // Navbar
    const show_navbar = ref(false)

    const toggle_navbar = () => {
        show_navbar.value = !show_navbar.value
    }

    // Loading
    const loading = ref(false)

    const set_loading = (value) => {
        loading.value = value
    }

    // Last page before login
    const last_page = ref('')

    const set_last_page = (value) => {
        last_page.value = value
    }

    // Message
    const show_message = ref(false)
    const message = ref('')
    const message_type = ref('')

    const set_message = (value, type) => {
        if (typeof type === 'string') {
            message_type.value = type
        } else if (typeof type === 'number') {
            type >= 400 ? message_type.value = 'Error' : message_type.value = 'Approve'
        } else {
            message_type.value = 'Info'
        }
        message.value = value
        show_message.value = true
    }

    const hide_message = () => {
        show_message.value = false
        message.value = ''
        message_type.value = ''
    }

    // Format Date
    const format_date = (date) => {
        return new Date(date).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }



    return {
        whatsapp_link,
        show_navbar,
        toggle_navbar,
        loading,
        set_loading,
        last_page,
        set_last_page,
        show_message,
        message,
        message_type,
        set_message,
        hide_message,
        format_date
    }
})


