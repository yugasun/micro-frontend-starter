// import { getToken } from '@/utils/token';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Index',
        meta: {
            title: 'Home Page',
            // keepAlive: true,
            // requireAuth: false,
        },
        component: () => import('@/pages/index.vue'),
    },
    {
        path: '/detail',
        name: 'Detail',
        meta: {
            title: 'Detail Page',
            keepAlive: true,
            requireAuth: true,
        },
        component: () => import('@/pages/detail.vue'),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// TODO: support login token check
// router.beforeEach(async (to, from) => {
//     const token = getToken();
//     if (!token && to.name !== 'Index') {
//         return { name: 'Index' };
//     }
// });

export default router;
