<template>
    <main>
        <h1>Terapias</h1>
        <section>
            <RouterLink
                :to="therapy.url"
                v-for="therapy in therapyInfo"
                :key="therapy.id"
            >
                <h2>{{ therapy.title }}</h2>
                <img :src="therapy.image" :alt="therapy.title" />
            </RouterLink>
        </section>
    </main>
</template>

<script setup lang="ts">
//Import tools
import { therapyInfo } from '../static/therapyInfo';
</script>

<style scoped lang="scss">
main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100vh;
    padding: 11vh 4rem 2rem;
    margin: 0;
    background-color: #f5f5f5;
    box-sizing: border-box;

    h1 {
        font-weight: 300;
        text-align: center;
        margin-bottom: 2rem;
    }

    section {
        display: flex;
        justify-content: space-around;
        box-sizing: border-box;
        padding: 0;
        margin: 0;

        a {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            width: 250px;
            height: 250px;
            position: relative;
            padding: 0;
            margin: 0;
            box-sizing: border-box;

            h2 {
                font-size: 1.25rem;
                font-weight: 300;
                padding: 1rem;
                margin: 0;
                z-index: 10;
                position: absolute;
                bottom: 0;
                left: 0;
                background-color: rgba(245, 245, 245, 0.5);
                border-radius: 0.5rem 0.5rem 0 0;
            }

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 1rem;
            }
        }
    }
}
</style>
