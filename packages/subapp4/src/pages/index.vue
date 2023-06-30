<script setup lang="ts">
import HelloWorld from '@/components/HelloWorld.vue';
</script>

<template>
    <div>
        <a href="https://vuejs.org/" target="_blank">
            <!-- do not use relative path -->
            <img src="@/assets/vite.svg" class="logo vite" alt="Vite logo" />
            <img src="@/assets/vue.svg" class="logo vue" alt="Vue logo" />
        </a>
    </div>
    <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
