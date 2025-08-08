<template>
    <main class="pages">
        <section class="formation__content">
            <h2>{{ formation_store.formation.title }}</h2>
            <div v-html="formation_store.formation.content"></div>
        </section>
        <aside class="formation__aside">
            <section class="formation__aside__content">
                <img :src="formation_store.formation.formation_cover.secure_url" :alt="formation_store.formation.title">
                <div class="formation__aside__content__info">
                    <p>Inicia: {{ util_store.format_date(formation_store.formation.start_date) }}</p>
                    <p>Precio: {{ formation_store.formation.price }}€</p>
                    <p>Modalidad: {{ formation_store.formation.type }}</p>
                </div>
            </section>
            <button class="action-btn">Comprar</button>
        </aside>
    </main>
</template>

<script setup>
import {  onBeforeMount } from 'vue';
import { useFormationStore } from '../stores/formation-store';
import { useRoute } from 'vue-router';
import { useUtilStore } from '../stores/util-store';

const util_store = useUtilStore()

const route = useRoute()
const formation_store = useFormationStore()

onBeforeMount(() => {
    formation_store.get_formation_by_id(route.params.formation_id)
})
</script>

<style scoped lang="scss">

.pages {
    flex-direction: row;
    justify-content: space-between; 
    position: relative;

    .formation__content {
        width: 65%;
    }

    .formation__aside {
        width: 25%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: fixed;
        top: 8rem;
        right: 4rem;
        padding: 1rem;
        box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.4);
        border-radius: 1rem;
        z-index: 1;

        .formation__aside__content {
            width: 100%;
            display: flex;
            gap: 1rem;
            
            img {
                width: 8rem;
                height: 8rem;
                object-fit: cover;
                border-radius: 1rem;
            }

            &__info {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                padding: 0;

                p {
                    margin: 0;
                    padding: 0;
                }
            }
        }
    }
}


</style>
