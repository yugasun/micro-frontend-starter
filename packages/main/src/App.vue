<script lang="ts" setup>
import { ref } from 'vue';
import Header from '@/components/shared/Header.vue';
import Footer from '@/components/shared/Footer.vue';
import Menu from '@/components/shared/Menu.vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

userStore.initUser();

const isMainApp = ref(window.__MICRO_APP__NAME__ || false);
</script>
<template>
    <el-container>
        <el-header>
            <Header />
        </el-header>
        <el-container>
            <el-aside width="200px"><Menu /></el-aside>
            <el-container>
                <el-main class="main">
                    <RouterView v-if="isMainApp" />
                    <div id="subapp-container"></div>
                </el-main>
                <el-footer>
                    <Footer />
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
    <ReloadPrompt />
</template>
<style lang="scss">
#root {
    font-family: Avenir, Helvetica, Arial, sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    line-height: 150%;

    .main {
        min-height: 500px;
    }

    .sw-msg {
        margin-top: 20px;
    }
}
</style>
