import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 首页
const Home = () => import('@/views/home');
const Category = () => import('@/views/category')
const Eat = () => import('@/views/eat');
const Cart = () => import('@/views/cart');
const Mine = () => import('@/views/mine')

// mine
const Profile = () => import('@/views/mine/profile/profile')
const ChangeName = () => import('@/views/mine/profile/changeName')

const Order = () => import('@/views/mine/order')
const Coupon = () => import('@/views/mine/coupon')
const Vip = () => import('@/views/mine/vip/vip')
const PayVip = () => import('@/views/mine/vip/payVip')

const myAddress = () => import('@/views/mine/address/myAddress')
const AddAddress = () => import('@/views/mine/address/addAddress')
const EditAddress = () => import('@/views/mine/address/editAddress')

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
          component: Category
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
      component: Profile
    },
    {
      path: "/profile/changeName",
      name: "ChangeName",
      component: ChangeName
    },
    {
      path: "/mine/order",
      name: "Order",
      component: Order
    },
    {
      path: "/mine/coupons",
      name: "Coupon",
      component: Coupon
    },
    {
      path: "/mine/myaddress",
      name: "Address",
      component: myAddress
    },
    {
      path: "/mine/addaddress",
      name: "AddAddress",
      component: AddAddress
    },
    {
      path: "/mine/myVip",
      name: "Vip",
      component: Vip,
      meta: {
        keepAlive: true
      }
    },
    {
      path: "/mine/myVip/pay",
      name: "PayVip",
      component: PayVip
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