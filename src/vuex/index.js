/**Created by xiaoqi on 2019/3/18*/
import Vue from 'vue'
//引入并使用vuex
import Vuex from 'vuex'

Vue.use(Vuex);
import product_data from '../libs/product.js';

//数组排重
function getFilterArray(array){
    const res = [];
    const json = {};
    for(let i=0;i<array.length;i++){
        const _self = array[i];
        if(!json[_self]){
            res.push(_self);
            json[_self] = 1;
        }
    }
    return res;
}

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
        num:10,
        productList:[],
        cartList:[]
    },
    mutations:{
        addNum(state){
            state.num+=20;
        },
        //添加商品列表
        setProductList(state,data){
            state.productList = data;
        },
        //添加购物车
        addCart(state,id){
            //先判断购物车是否已有,如果有,数量加1
            const isAdded = state.cartList.find(item=>item.id === id);
            if(isAdded){
                isAdded.count++;
            }else{
                state.cartList.push({
                    id:id,
                    count:1
                })
            }
        },
        //修改商品数量
        editCartCount(state,payload){
            const product = state.cartList.find(item=>item.id===payload.id);
            product.count +=payload.count;
        },
        //删除商品
        deleteCart(state,id){
            const index = state.cartList.findIndex(item => item.id === id);
            state.cartList.splice(index,1);
        },
        //清空购物车
        emptyCart(state){
            state.cartList = [];
        }
    },
    actions:{
        //请求商品列表
        getProductList(context){
            // 真实环境通过 ajax 获取，这里用异步模拟
            setTimeout(() => {
                context.commit('setProductList', product_data);
            }, 500);
        },
        //购买
        buy(context){
            //真实环境通过ajax提交购买请求后再清空购物车
            return new Promise((resolve)=>{
                setTimeout(()=>{
                    context.commit('emptyCart');
                    resolve()
                },500)
            })
        }
    },
    getters:{
        controlNum(state){
            return state.num*2;
        },
        brands(state){
            const brands = state.productList.map(item=>item.brand);
            return getFilterArray(brands);
        },
        colors(state){
            const colors = state.productList.map(item => item.color);
            return getFilterArray(colors);
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