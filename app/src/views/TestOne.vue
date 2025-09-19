<template>
    <main class="pages">
        <ArchetypeTestComponent v-if="test_name === 'arquetipos'" />
        <TemperamentTestComponent v-else-if="test_name === 'temperamentos'" />
        <LetterTestComponent v-else-if="test_name === 'carta-inconsciente'" />
        <AnamnesisTestComponent v-else-if="test_name === 'anamnesis'" />
    </main>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { ref } from 'vue';

import ArchetypeTestComponent from '../components/tests/ArchetypeTestComponent.vue';
import TemperamentTestComponent from '../components/tests/TemperamentTestComponent.vue';
import LetterTestComponent from '../components/tests/LetterTestComponent.vue';
import AnamnesisTestComponent from '../components/tests/AnamnesisTestComponent.vue';

const route = useRoute()

const test_name = ref(route.params.test_name)



</script>

<style scoped lang="scss"></style>
