<script setup lang="ts">
import { ref, onMounted } from 'vue';
//Define props
const props = defineProps<{ message: string; type: number }>();

//state
const success = ref(false);

//methods
const set_type = () => {
    if (props.type >= 200 && props.type < 300) {
        success.value = true;
    } else {
        success.value = false;
    }
};

onMounted(() => {
    set_type();
});
</script>

<template>
    <div class="message" :class="success ? 'success' : 'error'">
        <p>{{ message }}</p>
    </div>
</template>

<style scoped lang="scss">
.message {
    padding: 1rem;
    border-radius: 1rem;
    margin: 1rem 0;
    text-align: center;
    width: 30%;
    position: fixed;
    top: 6rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1000;
    animation: slideIn 1s ease-in-out, fadeOut 4s 2s ease-in-out forwards;
    p {
        margin: 0;
    }
    &.success {
        background-color: var(--color-success);
        color: var(--color-white);
    }
    &.error {
        background-color: var(--color-error);
        color: var(--color-white);
    }
}

@keyframes slideIn {
    from {
        top: -10rem;
    }
    to {
        top: 6rem;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}

@media screen and (max-width: 768px) {
    .message {
        width: 80%;
    }
}
</style>
