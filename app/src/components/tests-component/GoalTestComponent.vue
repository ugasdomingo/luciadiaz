<script setup lang="ts">
//Import tools
import { computed, onBeforeMount } from 'vue';
import { useUserStore } from '@/stores/user-store';

//Import components
import GoalFormComponent from '../common/forms/tests/GoalFormComponent.vue';

//States
const user_store = useUserStore();
const goal_result = computed(() =>
    user_store.all_user_data.test_results.find(
        (test: any) => test.title === 'goal'
    )
);

//Lifecycle
onBeforeMount(async () => {
    //Check if user has done the test before
    if (user_store.token && !user_store.all_user_data) {
        user_store.user_role === 'Admin'
            ? await user_store.get_data_by_admin()
            : await user_store.get_data_by_user();
    }
});
</script>

<template>
    <section>
        <div class="show_results" v-if="goal_result">
            <h2>
                Felicidades {{ user_store.user_name.split(' ')[0] }}
                tu inconsciente te ha escrito una carta
            </h2>
            <p class="sub_title">
                Esto es lo que tu inconsciente te ha dicho con respecto a
                <span>{{ goal_result.results.goal }}</span>
            </p>

            <h2 class="letter">
                Yo, {{ user_store.user_name }}, conscientemente quiero
                {{ goal_result.results.r1 }}, ya que bloqueo en mi
                {{ goal_result.results.r3 }}. Además quisiera
                {{ goal_result.results.r4 }}, pero rechazo en mi
                {{ goal_result.results.r6 }}.
            </h2>
            <RouterLink
                to="/blog/678a307efda39560e5f7fced"
                class="button__action"
            >
                Aprender más sobre esta carta
            </RouterLink>
        </div>
        <GoalFormComponent v-else />
    </section>
</template>

<style lang="scss" scoped>
.show_results {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 2rem;

    .sub_title {
        margin-bottom: 1rem;

        span {
            font-weight: bold;
            text-decoration: underline;
        }
    }

    .letter {
        width: 50%;
        margin-top: 1rem;
        text-align: justify;
        align-self: center;
    }
}

@media screen and (max-width: 768px) {
    .show_results {
        h2 {
            margin-bottom: 0;
        }

        .letter {
            width: 100%;
            font-size: 1.75rem;
            margin-bottom: 2rem;
            text-align: left;
        }
    }
}
</style>
