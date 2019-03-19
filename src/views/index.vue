<template>
    <div class="index">
        首页{{count}}
        <router-link to="/about">About</router-link>
        <button @click="handleIncrement">+1</button>
        <button @click="handleDecrease">-1</button>

        <button @click="filteredList">过滤数组</button>
        <h1>{{arr}}</h1>
        <h2>{{list}}</h2>
        <button @click="handleActionIncrement">Action</button>
        <button @click="handleAsyncIncrement">async</button>
        {{count}}
        <hr>
        {{$store.state.b.num}}
        <hr>
        {{$store.state.b.getters}}
        {{$store.getters.controlNum}}
        <hr>
        随机增加
        <Counter :number="number"></Counter>
    </div>
</template>

<script>
    import Counter from './Counter.vue'
    export default {
        name: "index",
        data(){
            return {
                arr:'',
                number:0
            }
        },
        components:{
            Counter
        },
        created(){
            this.$bus.on('add',this.handleAddRandom);
        },
        beforeDestroy(){
            this.$bus.off('add',this.handleAddRandom);
        },
        computed:{
            count(){
                return this.$store.state.count
            },
            list(){
                return this.$store.getters.filteredList
            }
        },
        methods:{
            handleAddRandom(num){
                this.number +=num
            },
            handleIncrement(){
                this.$store.commit('increment',5)
            },
            handleDecrease(){
                this.$store.commit('decrease')
            },
            filteredList(){
                this.arr = this.$store.getters.filteredList
            },
            handleActionIncrement(){
                this.$store.dispatch('increment',100);
            },
            handleAsyncIncrement(){
                this.$store.dispatch('asyncIncrement').then(()=>{
                    window.console.log(this.$store.state.count);
                })
            }
        },
    }
</script>

<style >
    .index{
        height:2000px;
    }
</style>