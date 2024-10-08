import VueRouter from "vue-router";

const router = new VueRouter({
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: () => import("@/pages/LoginVc/LoginVc.vue"),
    },
    {
      path: "/manage",
      redirect: "/manage/personal",
      component: () => import("@/pages/IndexVc.vue"),
      children: [
        {
          path: "/manage/personal",
          component: () => import("@/pages/PersonalVc/PersonalVc.vue"),
        },
        {
          path: "/manage/orderform",
          component: () => import("@/pages/OrderForm/OrderForm.vue"),
        },
        {
          path: "/manage/usermanage",
          component: () => import("@/pages/UserManage/UserManage.vue"),
        },
      ],
    },
    {
      path: "/manage/datamanage",
      component: () => import("@/pages/DataManage/DataManage.vue"),
    },
  ],
});

//需要重写VueRouter.prototype原型对象身上的push|replace方法
//先把VueRouter.prototype身上的push|replace方法进行保存一份
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.push;
//重写VueRouter.prototype身上的方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  //第一个形参：路由跳转的配置对象（query|params）
  //第二个参数：undefined|箭头函数（成功的回调）
  //第三个参数:undefined|箭头函数（失败的回调）
  if (resolve && reject) {
    //push方法传递第二个参数|第三个参数（箭头函数）
    //originPush：利用call修改上下文，变为(路由组件.$router)这个对象，第二参数：配置对象、第三、第四个参数：成功和失败回调函数
    originPush.call(this, location, resolve, reject);
  } else {
    //push方法没有产生第二个参数|第三个参数
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// router.beforeEach((to, from, next) => {
//     const key = to.path.split('/')[1]
//     if (key === 'manage' && !localStorage.getItem('token')) {
//         next('/')
//     }
//     else next();
// })

export default router;
