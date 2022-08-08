<script lang="ts" setup>
import LoginButton from '../LoginButton.vue';
import ThemeSwitcher from '../ThemeSwitcher.vue';
</script>
<template>
    <nav class="header-nav flex flex-row justify-center items-center">
        <div class="nav-left flex flex-row justify-between items-center">
            <router-link to="/" class="flex justify-center items-center">
                <img
                    alt="Vue logo"
                    src="@/assets/images/logo.png"
                    class="logo"
                />
            </router-link>
        </div>
        <h3
            class="title text-3xl font-medium text-primary-dark dark:text-ternary-light hidden sm:block"
        >
            Vue3 + TypeScript + Vite Template
        </h3>
        <div class="nav-right flex flex-row justify-between items-center">
            <LoginButton />
            <ThemeSwitcher class="switch-icon" />
        </div>
    </nav>
</template>
<style lang="scss" scoped>
.header-nav {
    width: 100%;
    height: 100%;
}

.nav-left {
    position: absolute;
    left: 20px;
    top: 12px;
}

.logo {
    width: 30px;
    height: 30px;
}

.nav-items {
    margin-left: 10px;
}

.nav-right {
    position: absolute;
    right: 20px;
    top: 12px;
}

.title {
    line-height: 60px;
    font-weight: bold;

    &.title-sm {
        font-size: 12px;
    }
}

.switch-icon {
    margin-left: 20px;
}
</style>
