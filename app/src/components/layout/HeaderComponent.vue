<script setup>
import { onMounted, ref } from 'vue';
import { useUtilStore } from '../../stores/util-store';
import { useAuthStore } from '../../stores/auth-store';
import NavbarComponent from './NavbarComponent.vue';

const util_store = useUtilStore()
const auth_store = useAuthStore()
const show_header = ref(true)
const need_bg = ref(false)
const screen_size = ref(window.innerWidth)
let last_scroll_position_y = 0

onMounted(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > last_scroll_position_y) {
            show_header.value = false
        } else {
            show_header.value = true
        }

        last_scroll_position_y = window.scrollY

        if (last_scroll_position_y > 100) {
            need_bg.value = true
        } else {
            need_bg.value = false
        }
    })
})

</script>

<template>

    <header class="header" :class="{ 'header__hidden': !show_header, 'header__bg': need_bg }">
        <RouterLink to="/" class="header__logo">
            <img src="/public/logo-notextbg.png" alt="logo lucia">
        </RouterLink>
        <section class="header__menu">
            <RouterLink to="/terapias" class="action-btn">{{ screen_size < 768 ? 'Agendar'
                : 'Agendar consulta terapeutica' }}</RouterLink>
                    <button @click="auth_store.logout()" v-if="auth_store.token" class="nobg-btn">Cerrar sesión</button>
                    <img src="/public/icon/icon-hamburguer-menu.svg" alt="menu" class="header__menu__icon"
                        @click="util_store.toggle_navbar">
                    <NavbarComponent :class="util_store.show_navbar ? 'header__navbar' : 'header__navbar__hidden'" />
        </section>
    </header>
</template>


<style scoped lang="scss">
.header {
    width: 100%;
    max-width: 1360px;
    max-height: 4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 4rem;
    margin: 0 auto;
    position: fixed;
    top: 0.5rem;
    left: 0;
    right: 0;
    z-index: 100;
    box-sizing: border-box;

    &__logo {
        img {
            width: 4rem;
            object-fit: contain;
        }
    }

    &__menu {
        display: flex;
        align-items: center;
        gap: 1rem;

        &__icon {
            width: 2rem;
            cursor: pointer;
        }

        .action-btn {
            max-width: fit-content;
        }
    }

    &__navbar {
        display: block;

        &__hidden {
            display: none;
        }
    }
}

.header__hidden {
    display: none;
}

.header__bg {
    background-color: color-mix(in srgb, var(--color-white) 80%, transparent);

}

@media screen and (max-width: 720px) {
    .header {
        padding: 1rem;
        box-sizing: border-box;

        &__menu {
            gap: 0.4rem;
        }
    }

    .nobg-btn {
        padding: 0.5rem 0.2rem;
    }
}
</style>