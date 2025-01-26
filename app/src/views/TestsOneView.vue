<script setup lang="ts">
//Import tools
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

//Dinamic import components by route
const route = useRoute();

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
    <main class="page">
        <component :is="component" />
    </main>
</template>

<style scoped lang="scss"></style>
