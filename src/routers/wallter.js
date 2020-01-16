import Container from "../container/index";

const walletRouter = [
             {
                 path: '/wallet/:id?',
                 name: 'wallet',
                 meta: {
                     name: '我的钱包',
                     props: true
                 },
                 component: () => import('../views/wallet/index.vue')
             },
             {
                 path: '/billsDetail/:id?',
                 name: 'billsDetail',
                 meta: {
                     name: '账单明细',
                     props: true
                 },
                 component: () => import('../views/wallet/billsDetail.vue')
             },
             {
                 path: '/withdraw',
                 name: 'withdraw',
                 meta: {
                     name: '提现',
                     props: true
                 },
                 component: () => import('../views/wallet/withdraw.vue')
             },
             {
                 path: '/applyInfo/:id?',
                 name: 'applyInfo',
                 meta: {
                     name: '账单明细',
                     props: true
                 },
                 component: () => import('../views/wallet/applyInfo.vue')
             },
             {
                 path: '/exchange',
                 name:'exchange',
                 meta: {
                     name: '呼哈币兑换现金',
                     props: true
                 },
                 component: () => import('../views/wallet/exchange.vue'),
             }
 ];

export default walletRouter;