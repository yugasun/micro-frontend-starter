<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import { Menu as IconMenu, HomeFilled } from '@element-plus/icons-vue';
// import AppLink from './Link.vue';

const route = useRoute();

const activeIndex = computed(() => {
    return route.path;
});

// get app list config from window.__MICRO_APPS__
const appList = ref<IMicroApp[]>(window.__MICRO_APPS__ || []);
</script>
<template>
    <el-menu
        :default-active="activeIndex"
        class="el-menu-vertical-demo"
        :router="true"
    >
        <el-menu-item index="/" name="home">
            <el-icon>
                <HomeFilled />
            </el-icon>
            <span>Home</span>
        </el-menu-item>
        <el-menu-item
            v-for="item in appList"
            :key="item.name"
            :index="item.activeRule"
            :name="item.name"
        >
            <el-icon><icon-menu /></el-icon>
            <span>{{ item.name }}</span>
        </el-menu-item>
    </el-menu>
</template>
<style lang="scss">
.menu-list {
    background: none;
    width: 130px;
    margin-left: 20px;

    .menu-item {
        width: 100px;
    }
}
</style>
