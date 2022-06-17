import {
    createWebHashHistory,
    createRouter
} from "vue-router";
import Layout from '../components/Layout/Layout.vue';
const routes = [{
        path: '/',
        redirect:'/welcome'
    },
    {
        peth:'/welcome',
        name:'welcome',
        component:()=>import('../views/welcome.vue')
    },
    {
        path: '/see',
        component:()=> Layout,
        redirect: '/total',
        children: [{
            path: '/total',
            name: 'total',
            component: () => import('../views/total.vue')
        }]
    },
    {
        component: Layout,
        children: [{
            path: '/nsearch',
            name: 'NodeResult',
            component: () => import('../views/searchNodes.vue'),
        }, ]
    },
    {
        component: Layout,
        children: [{
            path: '/Aquestion',
            name: 'Aquestion',
            component: () => import('../views/Aquestion.vue')
        }]
    },
    {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
    },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router