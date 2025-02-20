<script setup lang="ts">
//Import tools
import { useUtilStore } from './stores/util-store';

//Import components
import HeaderComponent from './components/layout/HeaderComponent.vue';
import DisplayNotificationComponent from './components/common/displays/DisplayNotificationComponent.vue';
import PaymentMethodModalComponent from './components/common/modal/PaymentMethodModalComponent.vue';
import AccessModalComponent from './components/common/modal/AccessModalComponent.vue';
import FooterComponent from './components/layout/FooterComponent.vue';

//Use tools
const util_store = useUtilStore();
</script>

<template>
    <HeaderComponent />
    <DisplayNotificationComponent
        v-if="util_store.show_notification"
        :message="util_store.message"
        :type="util_store.message_type"
    />
    <PaymentMethodModalComponent v-if="util_store.show_other_payment_method" />
    <AccessModalComponent v-if="util_store.show_access_modal" />
    <RouterView />
    <FooterComponent />
</template>

<style scoped lang="scss"></style>
