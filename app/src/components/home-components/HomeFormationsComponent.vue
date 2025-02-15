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
        <h2>Próximas Formaciones</h2>
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

    h2 {
        display: none;
    }

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
