import Vue from 'vue'
import Router from 'vue-router'
import Container from './container/index'
Vue.use(Router)
export const asyncRouterMap = [
    {
        path: '/',
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
            path: '/register',
            name: 'register',
            meta: {
                name: '注册呼哈'
            },
            component: () => import('./views/register/index.vue')
        },
            {
                path: '/cooperation',
                name: 'cooperation',
                meta: {
                    name: '呼哈商务合作计划'
                },
                component: () => import('./views/cooperation/index.vue')
            },
            {
                path: '/drawPost',
                name: 'drawPost',
                meta: {
                    name: '推广素材'
                },
                component: () => import('./views/drawPost/index.vue')
            },{
            path: '/download',
            name: 'download',
                meta: {
                name:'APP下载'
                },
                component: () => import('./components/dialog/index.vue')
            },
            {
                path: '/wallet/:id?',
                name: 'wallet',
                meta: {
                    name: '我的钱包',
                    props: true
                },
                component: () => import('./views/wallet/index.vue')
            },
            {
                path: '/billsDetail/:id?',
                name: 'billsDetail',
                meta: {
                    name: '账单明细',
                    props: true
                },
                component: () => import('./views/wallet/billsDetail.vue')
            },
            {
                path: '/withdraw',
                name: 'withdraw',
                meta: {
                    name: '提现',
                    props: true
                },
                component: () => import('./views/wallet/withdraw.vue')
            },
            {
                path: '/applyInfo/:id?',
                name: 'applyInfo',
                meta: {
                    name: '账单明细',
                    props: true
                },
                component: () => import('./views/wallet/applyInfo.vue')
            }
        ]
    },
    {
        path: '/exchange',
        name:'exchange',
        meta: {
            name: '呼哈币兑换现金'
        },
        component: () => import('./views/wallet/exchange.vue'),
    }
];

const router = new Router({
    routes: asyncRouterMap
})
export default router