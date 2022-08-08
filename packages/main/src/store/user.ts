import { defineStore } from 'pinia';
import api from '@/api';
import { removeToken, getToken } from '@/utils/token';

interface UserInfo {
    username: string;
    [prop: string]: any;
}

interface UserState {
    userInfo: UserInfo | null;
}

export const useUserStore = defineStore({
    id: 'user',
    state(): UserState {
        return {
            userInfo: null,
        };
    },
    getters: {
        isLogin: (state: UserState) => !!state.userInfo,
    },
    actions: {
        async initUser() {
            const token = getToken();
            if (token) {
                const res = await api.getUser();
                if (res.code === 0) {
                    this.updateUser(res.data);
                }
            }
        },
        updateUser(userInfo: UserInfo | null) {
            if (!userInfo) {
                removeToken();
            }
            this.userInfo = userInfo;
        },
    },
});
