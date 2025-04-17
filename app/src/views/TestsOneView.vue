<script setup lang="ts">
//Import tools
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user-store';
import { useUtilStore } from '@/stores/util-store';

//Dinamic import components by route
const route = useRoute();
const user_store = useUserStore();
const util_store = useUtilStore();

const component = computed(() => {
    switch (route.path) {
        case '/tests/arquetipos':
            return defineAsyncComponent(
                () =>
                    import(
                        '@/components/tests-component/ArchetypeTestComponent.vue'
                    )
            );
        case '/tests/temperamentos':
            return defineAsyncComponent(
                () =>
                    import(
                        '@/components/tests-component/TemperamentTestComponent.vue'
                    )
            );
        case '/tests/meta':
            return defineAsyncComponent(
                () =>
                    import('@/components/tests-component/GoalTestComponent.vue')
            );
    }
});
</script>

<template>
    <main class="page" v-if="user_store.token">
        <component :is="component" />
    </main>
    <main class="page not-loggued" v-else>
        <h2>Para realizar este test necesitas iniciar sesión</h2>
        <button
            class="button__action"
            @click="util_store.show_access_modal = true"
        >
            Iniciar sesión
        </button>
    </main>
</template>

<style scoped lang="scss">
.page {
    &.not-loggued {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h2 {
            margin-bottom: 1rem;
        }
    }
}
</style>
