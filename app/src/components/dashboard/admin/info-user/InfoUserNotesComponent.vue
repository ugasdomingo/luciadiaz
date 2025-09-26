<script setup>
import { defineProps, ref, reactive } from 'vue';
import { useNoteStore } from '../../../../stores/note-store';

const props = defineProps({
    user_notes: {
        type: Object,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
})
const note_store = useNoteStore()

const reason = ref('')
const notes = ref('')
const create_note = ref(false)
const expanded_items = reactive({})

const toggle_answers = (note_id) => {
    expanded_items[note_id] = !expanded_items[note_id]
}

const handle_submit = async () => {
    const new_note = {
        user_id: props.user_id,
        reason: reason.value,
        notes: notes.value
    }
    await note_store.create_note(new_note)
    reason.value = ''
    notes.value = ''
}

</script>

<template>
    <section class="notes">
        <button class="action-btn" @click="create_note = !create_note">{{ create_note ? 'Cancelar' : 'Crear nota'
            }}</button>
        <div class="notes__create" v-if="create_note">
            <h2>Crear nota</h2>
            <form @submit.prevent="handle_submit">
                <input type="text" v-model="reason" placeholder="Motivo">
                <textarea v-model="notes" placeholder="Notas"></textarea>
                <button class="action-btn" type="submit">Crear</button>
            </form>
        </div>
        <div class="notes__display" v-else>
            <h2>Notas</h2>
            <article v-for="note in props.user_notes" :key="note._id" class="note-item">
                <h4 @click="toggle_answers(note._id)" class="note-title"
                    :class="{ 'active': expanded_items[note._id] }">
                    {{ new Date(note.createdAt).toLocaleDateString() + ' - ' + new
                        Date(note.createdAt).toLocaleTimeString() }}
                    <span class="arrow" :class="{ 'rotated': expanded_items[note._id] }">
                        <img src="/icon/icon-plus.svg" alt="plus icon">
                    </span>
                </h4>
                <transition name="accordion" @enter="enter" @after-enter="afterEnter" @leave="leave"
                    @after-leave="afterLeave">
                    <div class="answer-container" v-show="expanded_items[note._id]">
                        <p class="note-reason"><strong>Motivo de consulta:</strong> {{ note.reason }}</p>
                        <p class="note-notes">{{ note.notes }}</p>
                    </div>
                </transition>
            </article>
        </div>
    </section>
</template>

<style scoped lang="scss">
.notes {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .action-btn {
        width: fit-content;
    }

    .notes__create {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        form {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }

    .notes__display {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;

        .note-item {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            padding: 0;
            margin: 0;
            box-sizing: border-box;

            .note-title {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 0;
                margin: 0;
                box-sizing: border-box;
                cursor: pointer;
                transition: all 0.25s;

                &:hover {
                    color: var(--color-primary);
                }

                &.active {
                    color: var(--color-primary);
                }

                .arrow {
                    transition: transform 0.25s;
                    font-size: 1.5rem;

                    img {
                        width: 1rem;
                        height: 1rem;
                    }

                    &.rotated {
                        transform: rotate(225deg);
                    }
                }

            }

            .answer-container {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                .note-reson {
                    padding: 0;
                    margin: 0;
                }

                .note-notes {
                    padding: 1rem;
                    margin: 0;
                    border-radius: 1rem;
                    box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.5);
                }
            }
        }
    }
}
</style>
