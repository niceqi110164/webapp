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
        path:'/home',
        meta:{
            title:'首页'
        },
        component:()=>import('../views/index.vue')
    },
    {
        path:'/about',
        meta:{
            title:'关于'
        },
        component:()=>import('../views/about.vue')
    },
    {
        path:'/user/:cid',
        meta:{
            title:'个人主页'
        },
        component:()=>import('../views/user.vue')
    },
    {
        path:'*',
        redirect:'/home'
    },
];

//实例化路由
const router = new VueRouter({
    routes
});

//暴露除去
export default router;