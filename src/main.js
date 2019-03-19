import Vue from 'vue'
import App from './App.vue'
//引入路由
//import router from './router';
//permission(路由钩子函数)
import './permission.js';
//引入vuex
//import store from './vuex'

import './daily/style.css'

//引用vueBus
//import VueBus from './vueBus/vueBus.js';
//Vue.use(VueBus);
Vue.config.productionTip = false;

new Vue({
    render: h => h(App),
    //router, //挂载路由,
    //store,  //使用vuex
}).$mount('#app');
