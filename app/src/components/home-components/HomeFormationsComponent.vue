<script setup lang="ts">
import { onBeforeMount, computed } from 'vue';
import { useFormationStore } from '@/stores/formation-store';
import FormationCardComponent from '../common/cards/FormationCardComponent.vue';

//props
const props = defineProps({
    display: {
        type: Number,
        required: true
    }
});
//States
const formation_store = useFormationStore();
const formations_list = computed(() => {
    const formations_to_show = formation_store.all_formations.filter(
        (formation) => formation.status == 'active'
    );
    return props.display > 0
        ? formations_to_show.slice(0, props.display)
        : formations_to_show;
});

//life cycle hook
onBeforeMount(async () => {
    await formation_store.get_all_formations();
});
</script>

<template>
    <section class="formations-list">
        <div class="background__decoration__one"></div>
        <div class="background__decoration__two"></div>
        <FormationCardComponent
            v-for="formation in formations_list"
            :key="formation._id"
            :_id="formation._id"
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
    width: 90%;
    min-height: 70vh;
    margin-left: auto;
    padding-left: 4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    position: relative;

    .background__decoration__one {
        position: absolute;
        bottom: auto;
        right: 0;
        width: 99%;
        height: 75%;
        background-color: var(--color-secondary);
        border-radius: 400px 0 0 400px;
        z-index: -1;
    }
    .background__decoration__two {
        position: absolute;
        bottom: auto;
        right: 0;
        width: 100%;
        height: 80%;
        background-color: var(--color-primary);
        border-radius: 400px 0 0 400px;
        opacity: 0.5;
        z-index: -3;
    }
}
</style>
