<script setup lang="ts">
//Import tools
import { ref } from 'vue';
import { useTestStore } from '@/stores/test-store';
import { useUserStore } from '@/stores/user-store';

//Import components

//States
const testStore = useTestStore();
const userStore = useUserStore();
const test_result = ref();
</script>

<template>
    <section>
        <div class="show_results" v-if="test_result"></div>
        <GoalFormComponent v-else />
    </section>
</template>
