import { defineStore } from 'pinia'
import { api } from '../service/axios'
import { ref } from 'vue'
import { useUtilStore } from './util-store'
import { useAuthStore } from './auth-store'

export const useProgressStore = defineStore('progress', () => {
    const util_store = useUtilStore()
    const auth_store = useAuthStore()

    // Estado del progreso actual (curso que está viendo)
    const current_progress = ref(null)

    // Control de throttle para no saturar la API
    let last_video_update = 0
    const UPDATE_INTERVAL = 30000 // 30 segundos

    // ========== OBTENER PROGRESO ESPECÍFICO ==========
    const get_progress = async (formation_id) => {
        try {
            util_store.set_loading(true)
            const response = await api({
                method: 'get',
                url: `/progress/${formation_id}`,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })
            current_progress.value = response.data.data
            return response.data.data
        } catch (err) {
            console.error('Error obteniendo progreso:', err)
            util_store.set_message('Error al cargar el progreso', 'Reject')
            return null
        } finally {
            util_store.set_loading(false)
        }
    }

    // ========== REGISTRAR ACCESO AL DASHBOARD DEL CURSO ==========
    const register_access = async (formation_id) => {
        try {
            await api({
                method: 'post',
                url: `/progress/access/${formation_id}`,
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })

            // Actualizar fecha de último acceso en el auth_store
            const progress_index = auth_store.user_data.formation_progress.findIndex(
                fp => fp.formation_id._id === formation_id
            )

            if (progress_index !== -1) {
                auth_store.user_data.formation_progress[progress_index].last_accessed = new Date().toISOString()
            }

        } catch (err) {
            console.error('Error registrando acceso:', err)
        }
    }

    // ========== ACTUALIZAR PROGRESO DE VIDEO (con throttle) ==========
    const update_video_progress = async (formation_id, lesson_id, last_watched_second, video_duration, force = false) => {
        try {
            const now = Date.now()

            // Throttle: solo actualizar cada 30 segundos, excepto si es forzado (ej: al pausar/cerrar)
            if (!force && now - last_video_update < UPDATE_INTERVAL) {
                return
            }

            last_video_update = now

            const response = await api({
                method: 'put',
                url: `/progress/video/${formation_id}`,
                data: {
                    lesson_id,
                    last_watched_second,
                    video_duration
                },
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })

            // Actualizar current_progress con la respuesta
            if (current_progress.value) {
                const lesson_index = current_progress.value.lessons_progress.findIndex(
                    lp => lp.lesson_id === lesson_id
                )

                if (lesson_index !== -1) {
                    current_progress.value.lessons_progress[lesson_index] = response.data.data.lesson_progress
                } else {
                    current_progress.value.lessons_progress.push(response.data.data.lesson_progress)
                }

                current_progress.value.overall_progress_percentage = response.data.data.overall_progress_percentage
            }

            // Actualizar también el progreso en auth_store
            const progress_index = auth_store.user_data.formation_progress.findIndex(
                fp => fp.formation_id._id === formation_id
            )

            if (progress_index !== -1) {
                auth_store.user_data.formation_progress[progress_index].overall_progress_percentage =
                    response.data.data.overall_progress_percentage

                // Actualizar completed_at si se completó
                if (response.data.data.overall_progress_percentage === 100) {
                    auth_store.user_data.formation_progress[progress_index].completed_at = new Date().toISOString()
                }
            }

            // Mostrar mensaje solo si completó la lección
            if (response.data.data.lesson_progress.video_progress.status === 'completed') {
                util_store.set_message('¡Lección completada! 🎉', 'Approve')
            }

            return response.data.data

        } catch (err) {
            console.error('Error actualizando progreso de video:', err)
            // No mostrar mensaje de error para no molestar al usuario mientras ve el video
            return null
        }
    }

    // ========== REGISTRAR DESCARGA ==========
    const register_download = async (formation_id, lesson_id = null) => {
        try {
            await api({
                method: 'post',
                url: `/progress/download/${formation_id}`,
                data: { lesson_id },
                headers: {
                    'Authorization': `Bearer ${auth_store.token}`
                }
            })

            util_store.set_message('Descarga registrada', 'Approve')

        } catch (err) {
            console.error('Error registrando descarga:', err)
            // No mostrar error, la descarga igual funcionó
        }
    }

    // ========== HELPER: VALIDAR ACCESO SECUENCIAL (Frontend) ==========
    const can_access_lesson = (formation_id, module_number, lesson_number) => {
        // Buscar el progreso de esta formación
        const formation_progress = auth_store.user_data.formation_progress.find(
            fp => fp.formation_id._id === formation_id
        )

        if (!formation_progress) {
            return { can_access: false, reason: 'No estás inscrito en esta formación' }
        }

        // Si es la primera lección del primer módulo, siempre tiene acceso
        if (module_number === 1 && lesson_number === 1) {
            return { can_access: true }
        }

        // Determinar la lección anterior
        let previous_lesson_id

        if (lesson_number > 1) {
            // Lección anterior está en el mismo módulo
            previous_lesson_id = `module_${module_number}_lesson_${lesson_number - 1}`
        } else {
            // Es la primera lección de este módulo, verificar última del módulo anterior
            const formation = formation_progress.formation_id
            const previous_module = formation.curriculum?.find(
                m => m.module_number === module_number - 1
            )

            if (previous_module && previous_module.lessons.length > 0) {
                const last_lesson_number = previous_module.lessons[previous_module.lessons.length - 1].lesson_number
                previous_lesson_id = `module_${module_number - 1}_lesson_${last_lesson_number}`
            } else {
                // No hay módulo anterior, tiene acceso
                return { can_access: true }
            }
        }

        // Verificar que la lección anterior esté completada
        const previous_lesson_progress = formation_progress.lessons_progress?.find(
            lp => lp.lesson_id === previous_lesson_id
        )

        if (!previous_lesson_progress || previous_lesson_progress.video_progress.status !== 'completed') {
            return {
                can_access: false,
                reason: 'Debes completar la lección anterior primero',
                previous_lesson_id
            }
        }

        return { can_access: true }
    }

    // ========== HELPER: OBTENER ESTADO DE LECCIÓN ==========
    const get_lesson_status = (formation_id, lesson_id) => {
        const formation_progress = auth_store.user_data.formation_progress.find(
            fp => fp.formation_id._id === formation_id
        )

        if (!formation_progress) return 'not_started'

        const lesson_progress = formation_progress.lessons_progress?.find(
            lp => lp.lesson_id === lesson_id
        )

        return lesson_progress?.video_progress.status || 'not_started'
    }

    return {
        current_progress,
        get_progress,
        register_access,
        update_video_progress,
        register_download,
        can_access_lesson,
        get_lesson_status
    }
})