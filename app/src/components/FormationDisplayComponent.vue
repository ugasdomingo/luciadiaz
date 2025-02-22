<script setup lang="ts">
//Import tools
import { onBeforeMount, computed } from 'vue';
import { useFormationStore } from '@/stores/formation-store';
import FormationCardComponent from '@/components/common/cards/FormationCardComponent.vue';

//States
const formation_store = useFormationStore();
const formations_list = computed(() => {
    return formation_store.all_formations.filter(
        (formation) => formation.status === 'active'
    );
});

//life cycle hook
onBeforeMount(async () => {
    formation_store.all_formations.length > 0
        ? null
        : await formation_store.get_all_formations();
});
</script>

<template>
    <section class="formations-list">
        <FormationCardComponent
            v-for="formation in formations_list"
            :key="formation._id"
            :_id="formation._id"
            :landing_page="formation.landing_page"
            :description="formation.description"
            :image="formation.cover_image.secure_url"
            :likes="formation.likes"
            :price="formation.price"
            :title="formation.title"
            :type="formation.type"
        />
    </section>
</template>

<style scoped lang="scss">
.formations-list {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    position: relative;
}

@media screen and (max-width: 768px) {
    .formations-list {
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2rem;
    }
}
</style>
