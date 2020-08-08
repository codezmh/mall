import Vue from 'vue'
import VueRouter from 'vue-router'

//创建组件
Vue.use(VueRouter);
//导入页面组件

const Home = () => import('../pages/home/Home')
const Category = () => import('../pages/category/Category')
const Cart = () => import('../pages/cart/Cart')
const Profile = () => import('../pages/profile/Profile')
const Detail = () => import('../pages/detail/Detail')

//创建对象
const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/profile',
    component: Profile
  },
  {
    //传递一个iid
    path: '/detail',
    component:Detail
  }
]
const router = new VueRouter({
  routes,
  mode: "history"
})



//导出组件
export default router;