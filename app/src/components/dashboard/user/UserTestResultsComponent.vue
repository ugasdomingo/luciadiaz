<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useAuthStore } from '../../../stores/auth-store.js'
import { test_info } from '../../../static/test-info.js'
import ArchetypeResultComponent from '../user/tests/ArchetypeResultComponent.vue'

const auth_store = useAuthStore()
const archetype_completed = ref(false)
const temperament_completed = ref(false)
const goal_completed = ref(false)
const expanded_items = reactive({})

const toggle_answers = (history_id) => {
    expanded_items[history_id] = !expanded_items[history_id]
}

onMounted(async () => {
    if (!auth_store.user_data) {
        await auth_store.refresh()
    }
    archetype_completed.value = auth_store.user_data.test_results.find((test) => test.test_name === 'Arquetipo').length > 0 ? true : false
    temperament_completed.value = auth_store.user_data.test_results.find((test) => test.test_name === 'Temperamento').length > 0 ? true : false
    goal_completed.value = auth_store.user_data.test_results.find((test) => test.test_name === 'Meta').length > 0 ? true : false
})


</script>

<template>
    <section class="test-results__container">
        <h2>Resultados de tus tests</h2>
        <article class="test-results__container__article" v-for="test in test_info" :key="test.id">
            <h3 @click="toggle_answers(test.id)" class="test-results__container__article__title">
                {{ test.name }} <span class="arrow" :class="{ 'rotated': expanded_items[test.id] }">
                    <img src="/public/icon/icon-plus.svg" alt="plus icon">
                </span>
            </h3>
            <transition name="accordion" @enter="enter" @after-enter="afterEnter" @leave="leave"
                @after-leave="afterLeave">
                <div v-show="expanded_items[test.id]">
                    <ArchetypeResultComponent v-if="archetype_completed" />
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


        }
    }

}
</style>
