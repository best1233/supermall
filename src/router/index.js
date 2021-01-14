import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

//push
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch((err) => err);
};
//replace
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch((err) => err);
};

const Home = () => import("@/views/home/Home");
const Category = () => import("@/views/category/Category");
const Cart = () => import("@/views/cart/Cart");
const Profile = () => import("@/views/profile/Profile");
const Detail = () => import("@/views/detail/Detail");

const routes = [
  {
    path: "/",
    redirect: { name: "Home" },
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      index: 1
    }
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
    meta: {
      index: 2
    }
  },
  {
    path: "/shopcart",
    name: "Cart",
    component: Cart,
    meta: {
      index: 3
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    meta: {
      index: 4
    }
  },
  {
    path: "/detail/:iid",
    name: "Detail",
    component: Detail,
    props: true
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
