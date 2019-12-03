import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Home = () => import('@/views/home');
const Category = () => import('@/views/category');
const Eat = () => import('@/views/eat');
const Cart = () => import('@/views/cart');
const Mine = () => import('@/views/mine');

// 解决vue-router导航重复
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      redirect: "/dashboard/home"
    },
    {
      path: "/login",
      name: "Login",
      component: () => import('@/views/login')
    },
    {
      path: "/dashboard",
      component: () => import('@/views/layout'),
      children: [
        {
          path: 'home',
          name: "Home",
          component: Home,
          meta: {
            keepAlive: true
          }
        },
        {
          path: "category",
          name: "Category",
          component: Category,
        },
        {
          path: "eat",
          name: "Eat",
          component: Eat,
          meta: {
            keepAlive: true
          }
        },
        {
          path: 'cart',
          name: "Cart",
          component: Cart
        },
        {
          path: "mine",
          name: "Mine",
          component: Mine,
          meta: {
            keepAlive: true
          }
        }
      ]
    },
    {
      path: "/dashboard/home/map",
      name: "MyMap",
      component: () => import('@/views/home/myMap')
    },
    {
      path: "/mine/profile",
      name: "Profile",
      component: () => import('@/views/mine/profile/profile')
    },
    {
      path: "/profile/changeName",
      name: "ChangeName",
      component: () => import('@/views/mine/profile/changeName')
    },
    {
      path: "/mine/order",
      name: "Order",
      component: () => import('@/views/mine/order')
    },
    {
      path: "/mine/coupons",
      name: "Coupon",
      component: () => import('@/views/mine/coupon')
    },
    {
      path: "/mine/myaddress",
      name: "Address",
      component: () => import('@/views/mine/address/myAddress')
    },
    {
      path: "/mine/addaddress",
      name: "AddAddress",
      component: () => import('@/views/mine/address/addAddress')
    },
    {
      path: "/mine/editaddress",
      name: "EditAddress",
      component: () => import('@/views/mine/address/editAddress')
    },
    {
      path: "/mine/myVip",
      name: "Vip",
      component: () => import('@/views/mine/vip/vip'),
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/mine/myVip/pay",
      name: "PayVip",
      component: () => import('@/views/mine/vip/payVip')
    },
    {
      path: "/orderfill",
      name: "OrderFill",
      component: () => import('@/views/cart/order/orderFill')
    },
    {
      path: "/goodslist",
      name: "GoodsList",
      component: () => import('@/views/cart/order/goodsList')
    },
    {
      path: "/collection",
      name: "Collection",
      component: () => import('@/views/eat/collection/collection')
    }
    
  ]
})

router.beforeEach((to, from, next) => {
  // const { token } = store.state;
  // if (!token && to.path !== "/login") {
  //   next({
  //     path: "/login"
  //   });
  // }

  next();
});



export default router;