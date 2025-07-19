<script setup>
defineProps({
    test: Object
})
</script>

<template>
    <RouterLink :to="test.link" class="test__card">
        <img :src="test.image" alt="">
        <h4>{{ test.name }}</h4>
        <p>{{ test.brief }}</p>
    </RouterLink>
</template>

<style scoped lang="scss">
.test__card {
    width: 100%;
    max-width: 15rem;
    border-radius: 1rem;
    padding: 0;
    margin: 0; 
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    color: var(--color-black);
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }

    img {
        width: 15rem;
        height: 15rem;
        object-fit: cover;
        margin-bottom: 1rem;
        border-radius: 0.1rem;
    }

    h4 {
        font-size: 1rem;
        margin:0;
        padding: 0 0.5rem;
        color: var(--color-black);
    }
    
    p {
        font-size: 0.8rem;
        padding: 0 0.5rem;
        margin-bottom: 1rem;
    }
}
</style>
