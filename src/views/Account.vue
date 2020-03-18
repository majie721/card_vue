<template>
<div>
    <div class="header">
        <van-nav-bar
                title="个人中心"
                @click-left="$router.go(-1)"
                left-arrow
                class="header-bar"
        />
        <div>
            <van-row class="user-base">
                <van-col span="8">
                    <van-image
                            :round="true"
                            width="80"
                            height="80"
                            :src="userInfo.avatar|cdn"
                    />
                </van-col>
                <van-col span="15">
                        <div class="name">{{userInfo.name}}</div>
                        <div class="text"><span class="lable">余额</span>:￥{{balance}}</div>
                        <div class="id"><span class="lable">账号ID</span>:{{userInfo.id}}</div>
                </van-col>
            </van-row>
        </div>

    </div>
    <div class="info">
        <van-divider class="line">
           我的信息
        </van-divider>
        <div>
            <van-row class="user-info">
                <van-col span="6" @click="clickHandle('/withdraw')">
                    <div class="buss-png">
                        <van-icon  class="iconfont van-icon iconyue1" dot  color="#fbbd08"></van-icon>
                    </div>
                   <span class="buss-name">提现</span>
                </van-col>
                <van-col span="6" @click="clickHandle('/orders')">
                    <div class="buss-png">
                        <van-icon  class="iconfont van-icon iconicon-" color="#1989fa"></van-icon>
                    </div>
                    <span class="buss-name">我的订单</span>
                </van-col>
                <van-col span="6" @click="clickHandle('/workOrders')">
                    <div class="buss-png">
                        <van-icon  class="iconfont van-icon iconorder"  color="#1cbbb4"></van-icon>
                    </div>
                    <span class="buss-name">我的工单</span>
                </van-col>
                <van-col span="6" @click="clickHandle('/messages')">
                    <div class="buss-png">
                        <van-icon v-if="unreadNum>0"  class="iconfont van-icon iconxiaoxi" :info="unreadNum" color="#39b54a"></van-icon>
                        <van-icon v-else  class="iconfont van-icon iconxiaoxi"  color="#39b54a"></van-icon>
                    </div>
                    <span class="buss-name">消息中心</span>
                </van-col>
            </van-row>
        </div>
    </div>
    <div class="item">
            <van-cell title="收款账号" is-link value="内容" to="bankList"/>
            <van-cell title="提现记录" is-link value="内容" />
            <van-cell title="常见问题" is-link value="内容" to="questions"/>
            <van-cell title="意见反馈" is-link value="内容"  to="feedback"/>
    </div>
    <ATabbar></ATabbar>
</div>
</template>

<script>
    export default {
        name: "Account",

        data:function(){
            return {
                accountType:{},
                userInfo:{},
                balance:'--.--',
                unreadNum:0
            }
        },

        methods:{
            initData:function () {
                let userInfo  = JSON.parse( localStorage.getItem('user'))
                if(userInfo.id>0){
                    this.userInfo = userInfo;
                    this.$api.userBalance().then(res=>{
                        this.balance = res.data.data.balance
                        this.unreadNum = res.data.data.unreadMsgNum

                    })
                }else{
                    this.$api.userInfo().then(res=>{
                        this.userInfo = res.data.data
                        this.balance = res.data.data.balance
                    })
                }

                this.$api.accountsData().then(res=>this.accountType=res.data.data)
            },
            clickHandle:function (path) {
                if('/workOrders' ==path){
                    return this.$toast.fail('功能暂未开放');
                }else{
                    this.$router.push(path)
                }

            }
        },

        created() {
            this.initData();
        },

    }
</script>

<style scoped>
    .header{
        border-radius: 15px 15px 0 0;
        background-color: #0081ff;
        color: #ffffff;
        height: 180px;
        overflow: hidden;
    }
    .header-bar{
        background-color: #0081ff;
        color: #ffffff;
    }

    .van-nav-bar__text{
        color: white;
    }

     .van-nav-bar .van-icon{
       color: #ffffff;
    }

    .header-bar >div{
        color: #ffffff;
    }

    .van-hairline--bottom::after{
        border-bottom-width:0px;
    }

    .user-base{
        height: 80px;
        margin-top: 10px;
        text-align: center;
        line-height: 80px;
    }

    .user-base .name{
        height: 22px;
        line-height: 22px;
        font-size: 20px;
        padding: 0;
        margin-top: 15px;
        text-align:left ;
    }

    .user-base .text{
        font-size: 14px;
        height: 20px;
        line-height: 20px;
        padding: 0px;
        text-align:left ;
        margin-top: 2px;
    }

    .user-base .id{
        font-size: 10px;
        height: 14px;
        line-height: 14px;
        padding: 0px;
        text-align:left ;
        margin-top: 2px;
    }

    .user-base .lable{
        width: 40px;
        text-align-last: justify;
        display: inline-block;
    }

    .info{

        width: 94%;
        height: 120px;
        margin: -20px auto;
        border-radius: 12px;
        background-color: white;
        box-shadow:4px 4px 10px #8799a3;
        border:1px solid white;
    }

    .info .line{
        color: #1989fa;
        borderColor: #1989fa;
        padding: 0 16px
    }

    .van-divider{
        margin: 8px;
    }
    .user-info{
        /*margin-top: 10px;*/
        height: 80px;
        /*line-height: 80px;*/
        text-align: center;
    }

    .user-info .iconfont{
        margin: 10px 0;
        font-size: 32px;
    }

    .buss-png{
        height: 40px;
    }

    .buss-name{
       margin-top: 10px;
        display: inline-block;
        font-size: 13px;
        color: #aaaaaa;
    }

    .name span{
        font-size: 14px;
    }

    .item{
        width: 94%;
        min-height: 100px;
        margin: 30px auto;
        border-radius: 12px;
        background-color: white;
        box-shadow:4px 4px 10px #8799a3;
        border:1px solid white;
        overflow: hidden;
    }

</style>
