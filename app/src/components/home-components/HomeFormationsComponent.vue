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
    formation_store.all_formations.length > 0
        ? null
        : await formation_store.get_all_formations();
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
    min-height: 100vh;
    margin-left: auto;
    padding-left: 4rem;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 0;
    position: relative;
    box-sizing: border-box;

    .background__decoration__one {
        position: absolute;
        top: 0;
        left: 0;
        width: 40%;
        height: 0.2rem;
        background-color: var(--color-secondary);
        border-radius: 0 5rem 5rem 0;
        z-index: -1;
    }
    .background__decoration__two {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 40%;
        height: 0.2rem;
        background-color: var(--color-secondary);
        border-radius: 5rem 0 0 5rem;
        z-index: -1;
    }
}

@media screen and (max-width: 768px) {
    .formations-list {
        width: 100%;
        height: fit-content;
        gap: 1rem;
        padding: 0.5rem 0 2rem;
        margin: 4rem 0 0;
        border-top: 2px solid var(--color-primary);
        border-bottom: 2px solid var(--color-primary);

        h2 {
            display: block;
            font-size: 2rem;
            text-align: center;
            margin: 1rem 0;
        }
    }

    .background__decoration__one {
        display: none;
    }

    .background__decoration__two {
        display: none;
    }
}
</style>
