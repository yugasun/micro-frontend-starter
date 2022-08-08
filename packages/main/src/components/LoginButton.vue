<script lang="ts" setup>
import { ref } from 'vue';

import { toast } from '@/utils/toast';
import API from '@/api';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();

const isLoginDialogVisible = ref(false);
const isLogoutDialogVisible = ref(false);
const formData = ref({
    username: 'admin',
    password: 'admin',
});

function showLoginDialog() {
    isLoginDialogVisible.value = true;
}

async function submitLogin() {
    const res = await API.login('test', '123');
    console.log('res', res);
    if (res.code === 0) {
        toast({
            type: 'success',
            message: 'Login success',
        });
        const userRes = await API.getUser();
        userStore.updateUser(userRes.data);

        isLoginDialogVisible.value = false;
    } else {
        toast({
            type: 'error',
            message: 'Login Fail',
        });
    }
}

function logout() {
    isLogoutDialogVisible.value = true;
}

function logoutConfirm() {
    userStore.updateUser(null);
    isLogoutDialogVisible.value = false;
}
</script>

<template>
    <div class="user-info">
        <el-button v-if="userStore.isLogin" @click="logout">Logout</el-button>
        <el-button v-else @click="showLoginDialog">Login</el-button>
    </div>

    <!-- login dialog -->
    <el-dialog v-model="isLoginDialogVisible" title="Login">
        <el-form :model="formData">
            <el-form-item label="Username">
                <el-input v-model="formData.username" autocomplete="off" />
            </el-form-item>
            <el-form-item label="Password">
                <el-input
                    v-model="formData.password"
                    autocomplete="off"
                    type="password"
                    show-password
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isLoginDialogVisible = false"
                    >Cancel</el-button
                >
                <el-button type="primary" @click="submitLogin"
                    >Confirm</el-button
                >
            </span>
        </template>
    </el-dialog>

    <!-- logout dialog -->
    <el-dialog v-model="isLogoutDialogVisible" title="Logout">
        <span>Do you confirm to logout?</span>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="isLogoutDialogVisible = false"
                    >Cancel</el-button
                >
                <el-button type="primary" @click="logoutConfirm"
                    >Confirm</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>
<style lang="scss" scoped>
.user-info {
    display: flex;

    .user {
        margin-right: 20px;
        line-height: 32px;
    }
}
</style>
