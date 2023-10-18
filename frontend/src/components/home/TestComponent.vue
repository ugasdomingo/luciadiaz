<script setup lang="ts">
import { testsInfo } from '../../static/testsInfo';
import { ref } from 'vue';

//Import components
import ShowTestCard from '../cards/ShowTestCard.vue';

const showIn = ref(0);
const test = ref(testsInfo[showIn.value]);

const changeShowTest = (order: string) => {
    if (order === 'next') {
        if (showIn.value < testsInfo.length - 1) {
            showIn.value++;
        } else {
            showIn.value = 0;
        }
    } else {
        if (showIn.value > 0) {
            showIn.value--;
        } else {
            showIn.value = testsInfo.length - 1;
        }
    }
    test.value = testsInfo[showIn.value];
};
</script>

<template>
    <section class="test-container">
        <h2>Test Automatizados</h2>
        <p>Obtén el resultado de manera inmediata y gratuita</p>
        <div class="tests">
            <button @click="changeShowTest('prev')">
                <img src="src/assets/left-arrow.svg" alt="left-arrow" />
            </button>
            <ShowTestCard :test="test" />
            <button @click="changeShowTest('next')">
                <img src="src/assets/rigth-arrow.svg" alt="left-arrow" />
            </button>
        </div>
        <h5>{{ showIn + 1 }} / {{ testsInfo.length }}</h5>
    </section>
</template>

<style scoped lang="scss">
.test-container {
    width: 100%;
    min-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 4rem;
    box-sizing: border-box;
    background-color: var(--color-white);
    color: var(--color-black);

    h2 {
        font-weight: 700;
        margin: 0;
        text-transform: uppercase;
        text-align: center;
    }

    p {
        font-size: 1rem;
        font-weight: 400;
        margin: 0;
        text-align: center;
    }

    h5 {
        width: fit-content;
        font-size: 1.5rem;
        font-weight: 400;
        margin: 0;
        text-align: center;
        padding: 0.5rem 3rem;
        border-radius: 2rem;
        background-color: var(--color-primary);
        color: var(--color-white);
    }

    .tests {
        width: 100%;
        height: fit-content;
        display: flex;
        gap: 1rem;
        justify-content: center;
        align-items: center;
        margin: 2rem 0;
        box-sizing: border-box;

        button {
            width: 3rem;
            height: 3rem;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0;
            border-radius: 50%;
            border: none;
            background-color: var(--color-primary);
            color: var(--color-white);
            font-size: 1.5rem;
            cursor: pointer;
            transition: all 0.3s ease-in-out;

            &:hover {
                background-color: var(--color-primary-dark);
            }

            img {
                width: 1.5rem;
                height: 1.5rem;
            }
        }
    }
}
</style>
