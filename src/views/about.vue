<template>
    <div class="about">
        ABOUT页面
    </div>
</template>

<script>
    export default {
        name: "about",
        mounted(){
            window.console.log(this.$route.params.cid)
        }
    }
</script>

<style scoped>
    .about{
        height: 2000px;
    }
</style>