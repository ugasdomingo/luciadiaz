<script setup lang="ts">
//Import tools
import { useUserStore } from '../stores/user-store';

//Activate store
const userStore = useUserStore();

const servicesPaths = [
    { name: 'Terapia Individual', path: '/servicios/individual' },
    { name: 'Terapia Parejas', path: '/servicios/parejas' },
    { name: 'Terapia Infantil', path: '/servicios/infantil' },
    { name: 'Orientación para Padres', path: '/servicios/padres' },
    { name: 'Cursos', path: '/galeria/cursos' },
];

const autogestionPaths = [
    { name: 'Test de Personalidad', path: '/autogestion/arquetipos' },
    { name: 'Test de Temperamento', path: '/autogestion/temperamento' },
    { name: 'Desbloquear metas', path: '/autogestion/metas' },
    { name: 'Libros', path: '/galeria/libros' },
    { name: 'Blog', path: '/galeria/blog' },
];
</script>

<template>
    <nav>
        <ul>
            <li>
                <RouterLink to="/galeria/servicios">Servicios</RouterLink>
                <img src="../assets/down-arrow.svg" alt="down-arrow" />
                <div class="services-submenu">
                    <ul>
                        <li v-for="service in servicesPaths">
                            <RouterLink :to="service.path">
                                {{ service.name }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <RouterLink to="/sobre-mi">Conóceme</RouterLink>
            </li>
            <li>
                <RouterLink to="/galeria/autogestion">Autogestión</RouterLink>
                <img src="../assets/down-arrow.svg" alt="down-arrow" />
                <div class="autogestion-submenu">
                    <ul>
                        <li v-for="autogestion in autogestionPaths">
                            <RouterLink :to="autogestion.path">
                                {{ autogestion.name }}
                            </RouterLink>
                        </li>
                    </ul>
                </div>
            </li>
            <li>
                <RouterLink to="/espacio-personal">
                    Espacio personal
                </RouterLink>
            </li>
            <li>
                <RouterLink to="/agendar-cita" class="action-btn">
                    Agendar cita
                </RouterLink>
            </li>
            <li v-if="userStore.token">
                <RouterLink to="/logout" class="close-btn">
                    Cerrar Sesión
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>

<style scoped lang="scss">
nav {
    ul {
        display: flex;
        gap: 1rem;
        list-style: none;
        font-size: 1.2rem;
        font-weight: 500;
        margin: 0;
        padding: 0;

        li {
            margin-left: 1rem;
            position: relative;

            a {
                text-decoration: none;
                font-weight: 300;
                letter-spacing: 0.1rem;
                margin: 0;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                transition: background-color 0.2s ease-in-out;

                &:hover {
                    background-color: var(--color-accent);
                    color: var(--color-white);
                }
            }

            img {
                width: 1rem;
                margin-left: 0;
            }

            .services-submenu,
            .autogestion-submenu {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                background-color: var(--color-primary);
                border-radius: 0.5rem;
                padding: 1rem;
                z-index: 10;
                width: 250px;
                height: fit-content;
                box-sizing: border-box;

                ul {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;
                    padding: 0;
                    margin: 0;

                    li {
                        margin: 0;
                        padding: 0;
                        font-size: 1rem;
                        font-weight: 400;

                        a {
                            text-decoration: none;
                            color: var(--color-white);
                            padding: 0.5rem 0;
                            transition: color 0.2s ease-in-out;

                            &:hover {
                                color: var(--color-accent);
                                background-color: transparent;
                            }
                        }
                    }
                }
            }
        }

        li:hover .services-submenu,
        li:hover .autogestion-submenu {
            display: block;
        }

        .action-btn {
            background-color: var(--color-accent);
            color: var(--color-white);
        }

        .close-btn {
            background-color: var(--color-primary);
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            margin-left: 1rem;
        }
    }
}
</style>
