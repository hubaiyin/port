import VueRouter from "vue-router";

const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: '/login',

        },
        {
            path: '/login',
            component: () => import('@/pages/LoginVc/LoginVc.vue')
        },
        {
            path: '/manage',
            redirect: '/manage/personal',
            component: () => import('@/pages/IndexVc.vue'),
            children: [
                {
                    path: '/manage/personal',
                    component: () => import('@/pages/PersonalVc/PersonalVc.vue')
                },
                {
                    path: '/manage/orderform',
                    component: () => import('@/pages/OrderForm/OrderForm.vue')
                },
                {
                    path: '/manage/planview',
                    component: () => import('@/pages/PlanView/PlanView.vue')
                },
                {
                    path: '/manage/usermanage',
                    component: () => import('@/pages/UserManage/UserManage.vue')
                },
                {
                    path: '/manage/datamanage',
                    component: () => import('@/pages/DataManage/DataManage.vue')
                }
            ]
        }
    ]
})

export default router;