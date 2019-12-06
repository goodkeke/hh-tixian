import Vue from 'vue'
import Router from 'vue-router'
import Container from './container/index'
Vue.use(Router)
export const asyncRouterMap = [
    {
        path: '',
        meta: {
            title: '首页',
        },
        redirect: '/home',
        component: Container,
        children: [{
            path: 'home/:id?',
            name: 'home',
            alias: '/',
            meta: {
                name: '呼哈：城市·生活·圈',
                props: true
            },
            component: () => import('./views/home/index.vue')
        },{
            path: 'register',
            name: 'register',
            meta: {
                name: '注册呼哈'
            },
            component: () => import('./views/register/index.vue')
        },
            {
                path: 'cooperation',
                name: 'cooperation',
                meta: {
                    name: '呼哈商务合作计划'
                },
                component: () => import('./views/cooperation/index.vue')
            },
            {
                path: 'drawPost',
                name: 'drawPost',
                meta: {
                    name: '推广素材'
                },
                component: () => import('./views/drawPost/index.vue')
            }
        
        ]
    }
]

const router = new Router({
    routes: asyncRouterMap
})
export default router