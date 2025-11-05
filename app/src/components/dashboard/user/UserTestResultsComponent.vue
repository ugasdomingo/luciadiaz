<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '../../../stores/auth-store.js'
import { test_info } from '../../../static/test-info.js'
import ArchetypeResultComponent from '../../tests/results/ArchetypeResultComponent.vue'
import TemperamentResultComponent from '../../tests/results/TemperamentResultComponent.vue'
import LetterResultComponent from '../../tests/results/LetterResultComponent.vue'

const auth_store = useAuthStore()
const archetype_completed = ref(false)
const temperament_completed = ref(false)
const letter_completed = ref(false)
const expanded_items = reactive({})

const toggle_answers = (history_id) => {
    expanded_items[history_id] = !expanded_items[history_id]
}

onMounted(async () => {
    if (!auth_store.user_data) {
        await auth_store.refresh()
    }
    const check_completed_tests = (tests) => {
        if (!tests) return
        tests.forEach(test => {
            if (test.test_name === 'Arquetipo') {
                archetype_completed.value = true
            } else if (test.test_name === 'Temperamento') {
                temperament_completed.value = true
            } else if (test.test_name === 'Carta del Inconsciente') {
                letter_completed.value = true
            }
        })
    }
    check_completed_tests(auth_store.user_data.test_results)
})


</script>

<template>
    <section class="test-results__container">
        <h2>Resultados de tus tests</h2>
        <article class="test-results__container__article" v-for="test in test_info" :key="test.id">
            <h3 @click="toggle_answers(test.id)" class="test-results__container__article__title"
                :class="expanded_items[test.id] ? 'expanded' : ''">
                {{ test.name }} <span class="arrow" :class="{ 'rotated': expanded_items[test.id] }">
                    <img src="/public/icon/icon-plus.svg" alt="plus icon">
                </span>
            </h3>
            <transition name="accordion" @enter="enter" @after-enter="afterEnter" @leave="leave"
                @after-leave="afterLeave">
                <div v-show="expanded_items[test.id]">
                    <section v-if="test.name === 'Arquetipos de la personalidad' && archetype_completed">
                        <ArchetypeResultComponent
                            :archetype_results="auth_store.user_data.test_results.find(result => result.test_name === 'Arquetipo')?.results" />

                    </section>
                    <section v-else-if="test.name === 'Temperamentos' && temperament_completed">
                        <TemperamentResultComponent
                            :temperament_results="auth_store.user_data.test_results.find(result => result.test_name === 'Temperamento')?.results"
                            :user_name="auth_store.user_data.user.name.split(' ')[0]" />
                    </section>
                    <section v-else-if="test.name === 'Carta del inconsciente' && letter_completed">
                        <LetterResultComponent
                            :letter_results="auth_store.user_data.test_results.find(result => result.test_name === 'Carta del Inconsciente')?.results"
                            :user_name="auth_store.user_data.user.name.split(' ')[0]" />
                    </section>

                    <section class="not-completed__container" v-else>
                        <p>Aún no has completado el test de {{ test.name }}</p>
                        <p class="brief">{{ test.brief }}</p>
                        <p class="description">{{ test.description }}</p>
                        <RouterLink :to="test.link" class="nobg-btn">Comenzar</RouterLink>
                    </section>
                </div>
            </transition>
        </article>

    </section>
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
