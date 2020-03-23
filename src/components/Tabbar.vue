<template>
    <div>
        <van-tabbar v-model="active" safe-area-inset-bottom  @change="onChange">
            <van-tabbar-item name="home">
                <span>首页</span>
                <i  slot="icon" class="iconfont van-icon  iconyemian1"></i>
            </van-tabbar-item>

            <van-tabbar-item name="sell">
                <span>卖卡</span>
                <i  slot="icon" class="iconfont van-icon iconmaichu"></i>
            </van-tabbar-item>

            <van-tabbar-item name="buy">
                <span>权益</span>
                <i  slot="icon" class="iconfont van-icon iconmai1"></i>
            </van-tabbar-item>

            <van-tabbar-item name="account">
                <span>我的</span>
                <i  slot="icon" class="iconfont van-icon  iconuser"></i>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    export default {
        name: "tabbar",
        data:function () {
            return {
                active:'home'
            }
        },

        created:function(){
            let current_router_name = this.$route.name;
            if(['home'].indexOf(current_router_name) !=-1){
                this.active = 'home';
            }else if(['sell'].indexOf(current_router_name) !=-1){
                this.active = 'sell';
            }else if(['buy'].indexOf(current_router_name) !=-1){
                this.active =  'buy';
            }else{
                this.active = 'account';
            }
        },

        methods:{
            onChange:function (index) {
                if(this.$route.name != index){
                    this.$router.push(index)
                }
            }
        },
    }
</script>

<style scoped>

</style>
