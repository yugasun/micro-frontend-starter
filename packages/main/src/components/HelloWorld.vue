<script setup lang="ts">
import { useUserStore } from '@/store/user';

defineProps<{ msg: string }>();

const userStore = useUserStore();
</script>

<template>
    <h1 class="text-lg text-primary-dark dark:text-ternary-light">{{ msg }}</h1>
    <p
        v-if="userStore.isLogin"
        class="text-primary-dark dark:text-ternary-light"
    >
        Hello, {{ userStore.userInfo?.username }}
    </p>
    <p class="text-primary-dark dark:text-ternary-light">
        Recommended IDE setup:
        <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
        +
        <a href="https://github.com/johnsoncodehk/volar" target="_blank"
            >Volar</a
        >
    </p>

    <p class="text-primary-dark dark:text-ternary-light">
        See <code class="dark:text-ternary-dark">README.md</code> for more
        information.
    </p>
</template>

<style scoped>
a {
    color: var(--link-color);
}

label {
    margin: 0 0.5em;
    font-weight: bold;
}

code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
}
</style>
