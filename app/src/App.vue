<script setup>
import HeaderComponent from './components/layout/HeaderComponent.vue'
import LoadingComponent from './components/common/LoadingComponent.vue'
import GlobalMessagesComponent from './components/common/GlobalMessagesComponent.vue'
import { useUtilStore } from './stores/util-store'

const util_store = useUtilStore()
</script>

<template>
  <HeaderComponent />
  <LoadingComponent :isVisible="util_store.loading" />
  <GlobalMessagesComponent v-if="util_store.show_message" />
  <router-view />
</template>

<style scoped lang="scss">

</style>
