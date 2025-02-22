<script setup lang="ts">
//Import tools
import { defineAsyncComponent, onBeforeMount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useFormationStore } from '@/stores/formation-store';
import { formaction_paths } from '@/static/formations-path';
import type { IFormation } from '@/types/IFormation';

//Import components
import LoadingComponent from '@/components/common/LoadingComponent.vue';

//Router
const route = useRoute();

//States
const formation_store = useFormationStore();
const formation = ref<IFormation>();
const component = ref();

//Methods
const get_formation = () => {
    formation.value = formation_store.all_formations.find(
        (formation) => formation.landing_page === route.params.landing_page
    );
};

const load_component = async () => {
    if (formation.value) {
        const component_path = formaction_paths.find(
            (path) => path.landing_page === route.params.landing_page
        );
        component.value = await defineAsyncComponent(
            () =>
                import(
                    `@/components/landing-pages/${component_path?.component_name}.vue`
                )
        );
    }
};

//Lifecycle
onBeforeMount(async () => {
    if (formation_store.all_formations.length === 0) {
        await formation_store.get_all_formations();

        get_formation();
        load_component();
    } else {
        get_formation();
        load_component();
    }
});
</script>

<template>
    <component :is="component" v-if="component" :formation="formation" />
    <LoadingComponent v-else :text="'Cargando...'" class="Loading" />
</template>

<style scoped lang="scss">
.Loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
