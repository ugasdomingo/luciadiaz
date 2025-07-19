import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'

export const useEnrollmentStore = defineStore('enrollment', () => {
    const util_store = useUtilStore()
    const enrollments = ref([])
    const enrollment = ref({})
    
    const get_all_enrollments = async () => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: '/enrollment'
            })
            enrollments.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }
    
    const get_enrollment_by_id = async (id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/enrollment/${id}`
            })
            enrollment.value = response.data.data
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }
    
    const create_enrollment = async (enrollment) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'post',
                url: '/enrollment',
                data: enrollment
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const add_payment_proof = async (id, payment_proof) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/enrollment/payment-proof/${id}`,
                data: payment_proof
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    const approve_enrollment = async (id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'put',
                url: `/enrollment/approve/${id}`,
            })
            util_store.set_message(response.data.message, response.data.status)
        } catch (err) {
            console.log(err)
        } finally {
            util_store.set_loading(false)
        }
    }

    return {
        create_enrollment,
        update_enrollment,
        approve_enrollment,
        get_all_enrollments,
        get_enrollment_by_id
    }
})