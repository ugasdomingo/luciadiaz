<script setup lang="ts">
//Import tools
import { useUtilStore } from '@/stores/util-store';

//Import components
import AdminNavbarComponent from './AdminNavbarComponent.vue';
import FindUsersComponent from './FindUsersComponent.vue';
import PostFormComponent from '../common/forms/PostFormComponent.vue';
import VideoFormComponent from '../common/forms/VideoFormComponent.vue';
import FormationFormComponent from '../common/forms/FormationFormComponent.vue';

//Use tools
const util_store = useUtilStore();
</script>

<template>
    <main>
        <AdminNavbarComponent />
        <FindUsersComponent
            v-if="util_store.current_admin_action == 'find-user'"
        />
        <PostFormComponent
            v-if="util_store.current_admin_action == 'create-post'"
        />
        <VideoFormComponent
            v-if="util_store.current_admin_action == 'upload-video'"
        />
        <FormationFormComponent
            v-if="util_store.current_admin_action == 'create-formation'"
        />
    </main>
</template>

<style scoped lang="scss">
main {
    padding-top: 7rem;
    position: relative;
}
</style>
