<script lang="ts" setup>
import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';

const router = useRouter();

const userStore = useUserStore();

function goBack() {
    router.back();
}
</script>

<template>
    <h1 class="title">This is Detail Page, need login</h1>
    <p class="user-info">Wellcome, {{ userStore.userInfo?.username }}</p>
    <!-- <el-button @click="goBack">Back</el-button> -->
</template>

<style lang="scss" scoped>
.title {
    font-size: 32px;
    font-weight: bold;
    line-height: 100px;
}

.user-info {
    margin: 20px auto;
    font-weight: bold;
    color: green;
}
</style>
