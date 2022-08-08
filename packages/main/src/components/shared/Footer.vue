<script lang="ts" setup>
import { ref } from 'vue';

const year = ref(new Date().getFullYear());
</script>
<template>
    <div class="footer text-primary-dark dark:text-ternary-light">
        @{{ year }}
        <a
            class="link__item underline"
            href="https://github.com/yugasun/vue-template"
            target="_blank"
        >
            Github
        </a>
        <span class="p-2"> | </span>
        <a
            class="link__item underline"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
        >
            Vite Docs
        </a>
        <span class="p-2"> | </span>
        <a
            class="link__item underline"
            href="https://v3.vuejs.org/"
            target="_blank"
            >Vue 3 Docs</a
        >
    </div>
</template>
<style lang="scss" scoped>
.footer {
    line-height: 60px;
    font-size: 16px;

    .link__item {
        color: var(--link-color);
    }
}
</style>
