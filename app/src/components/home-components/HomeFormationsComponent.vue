<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useFormationStore } from '@/stores/formation-store';
import FormationCardComponent from '../common/cards/FormationCardComponent.vue';

//States
const formation_store = useFormationStore();
const formations_list = ref();

//Methods
const last_formations = () => {
    formations_list.value = formation_store.all_formations
        .reverse()
        .filter((formation) => formation.status == 'active')
        .slice(0, 3);
};

//life cycle hook
onBeforeMount(async () => {
    await formation_store.get_all_formations();
    last_formations();
});
</script>

<template>
    <section class="formations">
        <h2>Próximas Formaciones</h2>
        <div class="formations-list">
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
        </div>
    </section>
</template>

<style scoped lang="scss">
.formations {
    width: 90%;
    height: 60vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-self: flex-end;
    margin: 0;
    padding: 2rem;
    border-radius: 200px 0 0 40px;
    background-color: var(--color-secondary);
    box-sizing: border-box;

    h2 {
        margin: 0 0 2rem;
        color: var(--color-white);
    }

    .formations-list {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
}
</style>
