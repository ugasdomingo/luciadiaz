<script setup lang="ts">
//Import tools
import { useUtilStore } from '@/stores/util-store';

//States
const util_store = useUtilStore();

const actions = [
    {
        name: 'Encontrar Usuario',
        action: 'find-user'
    },
    {
        name: 'Crear Post',
        action: 'create-post'
    },
    {
        name: 'Subir Video',
        action: 'upload-video'
    },
    {
        name: 'Crear Formación',
        action: 'create-formation'
    }
];
</script>

<template>
    <nav>
        <button
            v-for="action in actions"
            :key="action.action"
            @click="util_store.current_admin_action = action.action"
            class="button__action"
            :class="
                util_store.current_admin_action === action.action
                    ? 'button__action--active'
                    : ''
            "
        >
            {{ action.name }}
        </button>
    </nav>
</template>

<style scoped lang="scss">
nav {
    width: 100%;
    max-height: 2rem;
    display: flex;
    justify-content: space-around;
    padding: 0;
    margin: 0;
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;

    .button__action {
        padding: 0.2rem;
        border-radius: 0.5rem;
        cursor: pointer;
    }

    .button__action--active {
        background-color: var(--color-secondary);
        color: var(--color-white);
    }
}
</style>
