<script setup lang="ts">
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

const router = useRouter();

const path = ref(router.currentRoute.value.path);
const isHome = ref(true);
const backgroundWhite = ref(false);

const getIsHome = () => {
    if (path.value == '/') {
        isHome.value = true;
        window.addEventListener('scroll', changeBackground);
    } else {
        isHome.value = false;
        window.removeEventListener('scroll', changeBackground);
    }
};
const changeBackground = () => {
    if (window.scrollY > 10) {
        backgroundWhite.value = true;
    } else {
        backgroundWhite.value = false;
    }
};

onMounted(() => {
    getIsHome();
});
router.afterEach(() => {
    path.value = router.currentRoute.value.path;
    getIsHome();
});

const servicesPaths = [
    { name: 'Terapia Individual', path: '/' },
    { name: 'Terapia Parejas', path: '/' },
    { name: 'Terapia Infantil', path: '/' },
    { name: 'Orientación para Padres', path: '/' },
    { name: 'Cursos', path: '/' },
];

const autogestionPaths = [
    { name: 'Test de Personalidad', path: '/' },
    { name: 'Test de Temperamento', path: '/' },
    { name: 'Desbloquear metas', path: '/' },
    { name: 'Libros', path: '/' },
    { name: 'Blog', path: '/' },
];
</script>

<template>
    <nav
        :class="{
            'background-accent': !isHome,
            'background-white': backgroundWhite,
        }"
    >
        <div>
            <RouterLink to="/galeria/servicios">
                Servicios
                <img
                    src="../assets/down-arrow.svg"
                    alt="down-arrow"
                    class="icon"
                />
            </RouterLink>
            <ul class="services-submenu">
                <li v-for="service in servicesPaths" :key="service.name">
                    <RouterLink :to="service.path" class="sub-link">
                        {{ service.name }}
                    </RouterLink>
                </li>
            </ul>
        </div>

        <div>
            <RouterLink to="/">
                Autogestión
                <img
                    src="../assets/down-arrow.svg"
                    alt="down-arrow"
                    class="icon"
                />
            </RouterLink>
            <ul class="autogestion-submenu">
                <li
                    v-for="autogestion in autogestionPaths"
                    :key="autogestion.name"
                >
                    <RouterLink :to="autogestion.path" class="sub-link">
                        {{ autogestion.name }}
                    </RouterLink>
                </li>
            </ul>
        </div>

        <RouterLink to="/">Conóceme </RouterLink>

        <RouterLink to="/">
            <img src="../assets/logo-med.png" alt="logo" class="logo" />
        </RouterLink>

        <RouterLink to="/"> Agendar cita </RouterLink>

        <RouterLink to="/"> Espacio personal </RouterLink>

        <div class="socials">
            <a href="#instagram">
                <img src="../assets/instagram-icon.svg" alt="instagram" />
            </a>
            <a href="#">
                <img src="../assets/whatsapp-icon.svg" alt="whatsapp" />
            </a>
            <a href="#">
                <img src="../assets/youtube-icon.svg" alt="youtube" />
            </a>
        </div>
    </nav>
</template>

<style scoped lang="scss">
nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 80%;
    max-height: 8vh;
    padding: 1rem 4rem;
    background-color: rgba(245, 245, 245, 0.65);
    border-radius: 1rem;
    position: fixed;
    top: 2rem;
    box-sizing: border-box;
    z-index: 10;

    div {
        position: relative;

        &:hover {
            .services-submenu,
            .autogestion-submenu {
                display: block;
            }
        }
    }

    a {
        text-decoration: none;
        color: var(--color-dark);
        font-weight: 700;
        font-size: 0.75rem;
        padding: 0 1rem;
        transition: color 0.2s ease-in-out;

        &:hover {
            color: var(--color-accent);
        }

        .icon {
            width: 0.7rem;
            height: 0.7rem;
            margin-left: 0.5rem;
        }
    }

    .logo {
        width: 150px;
        will-change: filter;
        color: var(--color-primary);
        transition: filter 300ms;
    }

    .logo:hover {
        filter: drop-shadow(0 0 2rem #4b1264da);
    }

    .services-submenu,
    .autogestion-submenu {
        display: none;
        width: 200px;
        position: absolute;
        top: 40%;
        left: 0;
        background-color: var(--color-white);
        border-radius: 1rem;
        box-shadow: 0 0 1rem var(--color-primary);
        padding: 1rem 0;

        li {
            list-style: none;
            text-align: center;
            padding: 0.5rem 0;

            &:hover {
                background-color: var(--color-accent);
                color: var(--color-white);
            }

            a {
                &:hover {
                    color: var(--color-white);
                }
            }
        }
    }
}
.socials {
    display: flex;

    a {
        img {
            width: 1rem;
            height: 1rem;
        }

        &:hover {
            opacity: 0.5;
        }
    }
}
.background-accent {
    background-color: #be80bfbe;
    color: var(--color-white);

    a {
        color: var(--color-black);
    }
}
.background-white {
    background-color: var(--color-white);
}

@media screen and (max-width: 768px) {
    nav {
        width: 90%;
        padding: 0;
        box-sizing: border-box;
        gap: 0;

        div {
            display: none;
        }

        .logo {
            width: 100px;
        }

        a {
            padding: 0 0.5rem;
            font-size: 0.6rem;
        }

        .socials {
            display: none;
        }
    }
}
</style>
