<template>
    <!--
    <div id="app">
        <v-title title="Vue组件化"></v-title>
        <v-button @click="handleClick">点击按钮</v-button>
        <router-link to="/home" active-class="red">Home</router-link>
        <router-link to="/about">About</router-link>
        <router-link to="/user/aa">User</router-link>
        <p>
            <img src="./assets/image.png" width="200px" alt="">
        </p>
        <hr>
        <router-view></router-view>
    </div>-->
    <div class="daily">
        <div class="daily-menu">
            <div class="daily-menu-item" @click="handleToRecommend" :class="{on:type==='recommend'}">
                每日推荐
            </div>
            <div class="daily-menu-item" @click="showThemes = !showThemes" :class="{on: type === 'daily'}">
                主题日报{{showThemes}}
            </div>
            <ul v-show="showThemes">
                <li v-for="(item,index) in themes" :key="index">
                    <a :class="{on:item.id === themeId && type==='daily'}"
                       @click="handleToTheme(item.id)">{{item.name}}</a>
                </li>
            </ul>
        </div>
        <div class="daily-list" ref="list">
            <template v-if="type==='recommend'">
                <div v-for="list in recommendList">
                    <div class="daily-date">{{formatDay(list.date)}}</div>
                    <Item
                        v-for="item in list.stories"
                        :data="item"
                        :key="item.id"
                        @click.native="handleClick(item.id)"
                    ></Item>
                </div>
            </template>
            <template v-if="type==='daily'">
                <Item
                    v-for="item in list"
                    :data="item"
                    :key="item.id"
                    @click.native="handleClick(item.id)"
                ></Item>
            </template>
        </div>
        <daily-article :id="articleId"></daily-article>
    </div>
</template>

<script>
    //import vTitle from './components/title.vue';
    //import vButton from './components/button.vue' ;
    import Item from './components/item.vue';
    import dailyArticle from './components/dailyArticle.vue' ;
    import $ from './libs/util' ;

    export default {
        name: 'app',
        data() {
            return {
                themes: [],
                showThemes: false,
                type: 'recommend',
                recommendList: [],
                dailyTime: $.getTodayTime(),
                list: [],
                themeId: 0,
                articleId: 0,
                isLoading: false
            }
        },
        components: {
            // vTitle,
            // vButton
            dailyArticle,
            Item
        },
        methods: {
            handleToRecommend() {
                window.console.log($.getTodayTime());
                this.type = 'recommend';
                this.recommendList = [];
                this.dailyTime = $.getTodayTime();
                this.getRecommendList();
            },
            getRecommendList() {
                this.isLoading = true;
                const prevDay = $.prevDay(this.dailyTime + 86400000);
                $.ajax.get('news/before/' + prevDay).then((res) => {
                    //window.console.log(res);
                    this.recommendList.push(res);
                    this.isLoading = false;
                })
            },
            handleToTheme(id) {
                this.type = 'daily';
                this.themeId = id;
                this.list = [];
                $.ajax.get('theme/' + id).then((res) => {
                    this.list = res.stories.filter((item) => {
                        return item.type !== 1
                    })
                })
            },
            getThemes() {
                $.ajax.get('themes').then((res) => {
                    window.console.log(res);
                    this.themes = res.others;
                })
            },
            formatDay(date) {
                let month = date.substr(4, 2);
                let day = date.substr(6, 2);
                if (month.substr(0, 1) === '0') {
                    month = month.substr(1, 1);
                }
                if (day.substr(0, 1) === '0') {
                    day = day.substr(1, 1);
                }
                return `${month}月${day}日`
            },
            handleClick(id){
                window.console.log(id);
                this.articleId = id;
            }

            // handleClick(e){
            //     //window.console.log(e);
            //     //this.$router.push('/about/123')
            //     //this.$router.replace('/about/123')
            //     //this.$router.go(-1)
            // }
        },
        mounted() {
            this.getRecommendList();
            this.getThemes();
            const $list = this.$refs.list;
            $list.addEventListener('scroll', () => {
                if (this.type === 'daily' || this.isLoading) return;
                if
                (
                    $list.scrollTop
                    + document.body.clientHeight
                    >= $list.scrollHeight
                )
                {
                    this.dailyTime -= 86400000;
                    this.getRecommendList();
                }
            });

        }
    }
</script>

<style>
    /*#app {*/
    /*font-family: 'Avenir', Helvetica, Arial, sans-serif;*/
    /*-webkit-font-smoothing: antialiased;*/
    /*-moz-osx-font-smoothing: grayscale;*/
    /*text-align: center;*/
    /*color: #2c3e50;*/
    /*margin-top: 60px;*/
    /*}*/
    /*.red{*/
    /*color:red;*/
    /*}*/
</style>
