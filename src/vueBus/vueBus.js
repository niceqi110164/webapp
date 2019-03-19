/**Created by xiaoqi on 2019/3/18*/
const install  = function(Vue){
    const Bus = new Vue({
        methods:{
            emit(event,...args){
                this.$emit(event,...args);
            },
            on(event,callback){
                this.$on(event,callback);
            },
            off(event,callback){
                this.$off(event,callback);
            }
        }
    });
    Vue.prototype.$bus = Bus;
};

export default install