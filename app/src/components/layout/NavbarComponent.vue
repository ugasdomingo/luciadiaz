<script setup>
import { useUtilStore } from '../../stores/util-store';

const util_store = useUtilStore()

const links = [
    {
        name: 'Mi espacio',
        path: '/mi-espacio'
    },
    {
        name: 'Terapias',
        path: '/terapias'
    },
    {
        name: 'Blog',
        path: '/blog'
    },
    {
        name: 'Formaciones',
        path: '/formaciones'
    }
]
</script>

<template>
    <nav>
        <ul>
            <li v-for="link in links" :key="link.name">
                <RouterLink :to="link.path" @click="util_store.toggle_navbar">{{ link.name }}</RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
nav {
    width: 100%;
    max-width: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    position: fixed;
    top: 4.25rem;
    right: 2rem;
    z-index: 100;
    background: linear-gradient(to bottom, var(--color-tertiary), var(--color-secondary));    
    border-radius: 1rem;

    ul {
        list-style: none;
        display: flex;
        flex-direction: column;
        padding: 0.5rem 1rem;
        margin: 0;
        gap: 1rem;

        li {
            padding: 0;
            margin: 0;

            &:first-child a {
                color: var(--color-soft-alert);
                text-decoration: underline;
            }

            a {
                display: inline-block;
                text-decoration: none;
                color: var(--color-white);
                transition: all 0.25s;
                padding: 0.5rem 1.5rem;
                margin: 0;
                border-radius: 1rem;
                transition: all 0.25s;

                &:hover {
                    scale: 1.15;
                    color: var(--color-approve-alert);
                }
            }
        }

    }
}
</style>