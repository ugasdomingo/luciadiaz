<script setup lang="ts">
//Import tools
import { useUtilStore } from './stores/util-store';

//Import components
import HeaderComponent from './components/layout/HeaderComponent.vue';
import DisplayNotificationComponent from './components/common/DisplayNotificationComponent.vue';

//Use tools
const utilStore = useUtilStore();
</script>

<template>
    <HeaderComponent />
    <DisplayNotificationComponent
        v-if="utilStore.show_notification"
        :message="utilStore.message"
        :type="utilStore.message_type"
    />
    <RouterView />
</template>

<style scoped lang="scss"></style>
