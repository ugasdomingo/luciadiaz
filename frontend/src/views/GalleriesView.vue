<template>
    <main>
        <h1>Galerías de {{ therapy }}</h1>
    </main>
</template>

<script setup lang="ts">
//Import tools
import { useRoute, useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';

//get path
const route = useRoute();
const router = useRouter();
let therapy = route.params.id;

//define function to get therapy info
onBeforeMount(() => {
    therapy = route.params.id;
});

router.afterEach(() => {
    therapy = route.params.id;
});
</script>
