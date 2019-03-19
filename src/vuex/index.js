/**Created by xiaoqi on 2019/3/18*/
import Vue from 'vue'
//引入并使用vuex
import Vuex from 'vuex'

Vue.use(Vuex);

const moduleA = {
    state: {
        count:100,
        list: [1,5,8,10,30,50]
    },
    mutations:{
        increment(state,n=1){
            state.count+=n;
        },
        decrease(state){
            state.count--;
        }
    },
    getters:{
        filteredList:(state)=>{
            return state.list.filter((item)=>{
                return item<10
            })
        }
    },
    actions:{
        increment(context,n){
            context.commit('increment',n)
        },
        asyncIncrement(context,n){
            return new Promise(resolve=>{
                setTimeout(()=>{
                    context.commit('increment',n);
                    resolve();
                },1000)
            })
        }
    }
};
const moduleB = {
    state:{
        num:10
    },
    mutations:{
        addNum(state){
            state.num+=20;
        }
    },
    actions:{

    },
    getters:{
        controlNum(state){
            return state.num*2;
        }
    },

};

const store = new Vuex.Store({
    modules:{
        a:moduleA,
        b:moduleB
    }
});

export default store