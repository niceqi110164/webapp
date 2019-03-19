<template>
    <div>
        个人主页
    </div>
</template>

<script>
    export default {
        name: "user",
        mounted(){
            window.console.log(this.$route.params.cid)
        }
    }
</script>

<style scoped>

</style>