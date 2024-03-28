import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Calculating from '@/pages/Calculating.vue';
import Home from '@/pages/Home.vue';
import Results from '@/pages/Results.vue';
import Users from '@/pages/Users.vue';

const routes: RouteRecordRaw[] = [
    {
        name: 'Home',
        path: '/',
        component: Home,
    },
    {
        name: 'Users',
        path: '/users',
        component: Users,
    },
    {
        name: 'Calculating',
        path: '/calculating',
        component: Calculating,
    },
    {
        name: 'Results',
        path: '/results',
        component: Results,
    },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
