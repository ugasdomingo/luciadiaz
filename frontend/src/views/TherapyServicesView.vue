<template>
    <DisplayTherapyComponent :therapyInfo="showTherapy as ITherapyInfo" />
</template>

<script setup lang="ts">
//Import tools
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount, ref } from 'vue';
import { therapyInfo, ITherapyInfo } from '../static/therapyInfo';

//Import components
import DisplayTherapyComponent from '../components/DisplayTherapyComponent.vue';

//get path
const route = useRoute();
const router = useRouter();
let therapy = route.params.id;

const showTherapy = ref<ITherapyInfo>();

//define function to get therapy info
const setTherapyToShow = (therapy: string) => {
    switch (therapy) {
        case 'individual':
            showTherapy.value = therapyInfo[0];
            break;
        case 'pareja':
            showTherapy.value = therapyInfo[1];
            break;
        case 'infantil':
            showTherapy.value = therapyInfo[2];
            break;
        case 'padres':
            showTherapy.value = therapyInfo[3];
            break;
        default:
            showTherapy.value = therapyInfo[1];
            break;
    }
};

//activate function
onBeforeMount(() => {
    therapy = route.params.id;
    setTherapyToShow(therapy as string);
});

router.afterEach(() => {
    therapy = route.params.id;
    setTherapyToShow(therapy as string);
});
</script>
