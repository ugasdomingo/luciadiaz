<script setup>
import { defineProps, ref, reactive, onMounted } from 'vue';

import ArchetypeResultComponent from '../../../tests/results/ArchetypeResultComponent.vue'
import TemperamentResultComponent from '../../../tests/results/TemperamentResultComponent.vue'
import LetterResultComponent from '../../../tests/results/LetterResultComponent.vue'
import AnamnesisResultComponent from '../../../tests/results/AnamnesisResultComponent.vue'

const props = defineProps({
    user_tests: {
        type: Array,
        required: true
    },
    user_name: {
        type: String,
        required: true
    }
})

const archetype_completed = ref(false)
const temperament_completed = ref(false)
const letter_completed = ref(false)
const anamnesis_completed = ref(false)
const expanded_items = reactive({})


const check_completed_tests = (tests) => {
    if (!tests) return
    tests.forEach(test => {
        if (test.test_name === 'Arquetipo') {
            archetype_completed.value = true
        } else if (test.test_name === 'Temperamento') {
            temperament_completed.value = true
        } else if (test.test_name === 'Carta del Inconsciente') {
            letter_completed.value = true
        } else if (test.test_name === 'Anamnesis') {
            anamnesis_completed.value = true
        }
    })
}

const toggle_answers = (history_id) => {
    expanded_items[history_id] = !expanded_items[history_id]
}
onMounted(() => {
    check_completed_tests(props.user_tests)
})
</script>

<template>
    <div class="test-results__container">
        <h2>Tests</h2>
        <article class="test-results__container__article" v-for="test in props.user_tests" :key="test._id">
            <h3 @click="toggle_answers(test._id)" class="test-results__container__article__title"
                :class="expanded_items[test._id] ? 'expanded' : ''">
                {{ test.test_name }} <span class="arrow" :class="{ 'rotated': expanded_items[test._id] }">
                    <img src="/public/icon/icon-plus.svg" alt="plus icon">
                </span>
            </h3>
            <transition name="accordion" @enter="enter" @after-enter="afterEnter" @leave="leave"
                @after-leave="afterLeave">
                <div v-show="expanded_items[test._id]">
                    <section v-if="test.test_name === 'Arquetipo' && archetype_completed">
                        <ArchetypeResultComponent
                            :archetype_results="props.user_tests.find(result => result.test_name === 'Arquetipo')?.results"
                            :user_name="props.user_name" />

                    </section>
                    <section v-else-if="test.test_name === 'Temperamento' && temperament_completed">
                        <TemperamentResultComponent
                            :temperament_results="props.user_tests.find(result => result.test_name === 'Temperamento')?.results"
                            :user_name="props.user_name" />
                    </section>
                    <section v-else-if="test.test_name === 'Carta del Inconsciente' && letter_completed">
                        <LetterResultComponent
                            :letter_results="props.user_tests.find(result => result.test_name === 'Carta del Inconsciente')?.results"
                            :user_name="props.user_name" />
                    </section>
                    <section v-else-if="test.test_name === 'Anamnesis' && anamnesis_completed">
                        <AnamnesisResultComponent
                            :anamnesis="props.user_tests.find(result => result.test_name === 'Anamnesis')?.results"
                            :user_name="props.user_name" />
                    </section>
                    <section class="not-completed__container" v-else>
                        <p>Aún no ha completado el test de {{ test.test_name }}</p>
                    </section>
                </div>
            </transition>
        </article>
    </div>
</template>

<style scoped lang="scss">
.test-results__container {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    &__article {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 0;
        margin: 0;
        box-sizing: border-box;

        &__title {
            display: flex;
            align-items: center;
            gap: 1rem;
            cursor: pointer;

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

            &.expanded {
                border-bottom: 1px solid var(--color-primary);
            }


        }
    }

}
</style>