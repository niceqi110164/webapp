/**Created by xiaoqi on 2019/3/16*/
import Vue from 'vue';

/**引入并使用vue-router*/
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//引入子模版 (这部操作可以直接放到下面)
//import Home from '../views/index.vue';
//import About from '../views/about.vue';

//配置路由
const routes = [
    {
        path:'/list',
        meta:{
            title:'商品列表'
        },
        component:()=>import('../views/list.vue')
    },
    {
        path:'/product/:id',
        meta:{
            title:'商品详情'
        },
        component:()=>import('../views/product.vue')
    },
    {
        path:'/cart',
        meta:{
            title:'购物车'
        },
        component:()=>import('../views/cart.vue')
    },
    {
        path:'*',
        redirect:'/list'
    },
];

//实例化路由
const router = new VueRouter({
    routes
});

//暴露除去
export default router;