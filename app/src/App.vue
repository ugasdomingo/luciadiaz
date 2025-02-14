<script setup lang="ts">
//Import tools
import { useUtilStore } from './stores/util-store';

//Import components
import HeaderComponent from './components/layout/HeaderComponent.vue';
import DisplayNotificationComponent from './components/common/displays/DisplayNotificationComponent.vue';
import PaymentMethodModalComponent from './components/common/modal/PaymentMethodModalComponent.vue';
import FooterComponent from './components/layout/FooterComponent.vue';

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
    <PaymentMethodModalComponent v-if="utilStore.show_other_payment_method" />
    <RouterView />
    <FooterComponent />
</template>

<style scoped lang="scss"></style>
