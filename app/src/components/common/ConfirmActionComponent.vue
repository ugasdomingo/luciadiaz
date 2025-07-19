<script setup>
const props = defineProps({
    message: String
})

const emit = defineEmits([true, false])

const confirm_action = () => {
    emit(true)
}

const cancel_action = () => {
    emit(false)
}
</script>

<template>
    <article class="confirm__action__modal">
        <section class="confirm__action__modal__content">

            <h2>{{ props.message }}</h2>
            <div class="confirm__action__modal__content__buttons">
                <button @click="confirm_action">Confirmar</button>
                <button @click="cancel_action">Cancelar</button>
            </div>
        </section>
    </article>
</template>

<style scoped lang="scss">
.confirm__action__modal {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
    padding: 0;
    margin: 0;
    background-color: rgba(var(--color-black), 0.5);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;

    &__content {
        width: 100%;
        max-width: 30rem;
        padding: 1rem;
        background-color: var(--color-white);
        border-radius: 0.5rem;
        
        h2 {
            margin: 0;
            padding: 0;
        }
        
        &__buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
}
</style>
