<template>
    <div>
        <van-nav-bar
                title="我的订单"
                @click-left="$router.go(-1)"
                left-arrow
                class="header-bar"
        />
        <van-tabs v-model="active" @change="tabChange()">
            <van-tab title="未完成"></van-tab>
            <van-tab title="已完成"></van-tab>
        </van-tabs>
        <div>
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
            >

                <van-card
                        class="card-order"
                        :thumb="item.image|cdn"
                        v-for="item in list" :key="item.id"
                >
                    <div slot="title" class="otitle">
                        <van-row>
                            <van-col span="18">
                                <span>{{item.product_name}}</span>
                            </van-col>
                            <van-col span="6" style="text-align: end">
                                <span class="ostatus" :style="StatusColor(item.status)">{{item.status_name}}</span>
                            </van-col>
                        </van-row>
                    </div>

                    <div slot="tags" style="margin-top: 3px">
                        <van-tag  type="success">{{item.discount}}折</van-tag>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <van-tag  v-if="item.urgent>0"  type="danger">加急处理{{item.urgent}}</van-tag>
                    </div>
                    <div slot="desc">
                        <van-row>
                            <van-col span="10">
                                订单ID: &nbsp;&nbsp;{{item.id}}
                            </van-col>
                            <van-col span="14" style="text-align: end" >
                                <span style="color:#8799a3">{{item.created_at}}</span>
                            </van-col>
                        </van-row>
                        <van-row>
                            <van-col span="20">
                                <span style="display: inline-block;font-size: 10px">卡片面额:</span>
                                <span style="display: inline-block;margin-left: 10px"><span style="font-size: 14px">{{item.faceval}}</span>元</span>
                            </van-col>
                            <van-col span="4">
                                <span style="">x{{item.num}} 张</span>
                            </van-col>
                        </van-row>
                        <van-row class="amount_row">
                            <van-col span="8" @click="$toast('提交总额 = 提交的张数×面值')">
                                <div class="th_amount ath_left">提交总额<van-icon name="question-o" /></div>
                                <div class="td_amount atd_left">{{item.total_amount}}</div>
                            </van-col>
                            <van-col span="8" @click="$toast('成功总额 = 处理成功的张数×面值')">
                                <div class="th_amount ath_center">成功总额 <van-icon name="question-o" /></div>
                                <div class="td_amount atd_center">{{item.success_amount}}</div>
                            </van-col>
                            <van-col span="8" @click="$toast('成功总额 = 成功总额×️折扣-加急处理费')">
                                <div class="th_amount ath_right">成功总额<van-icon name="question-o" /></div>
                                <div class="td_amount atd_right">{{item.pay_amount}}</div>
                            </van-col>
                        </van-row>
                    </div>

                    <div slot="footer">
                        <van-button plain hairline size="small" @click="copyOrderID(item.id)">复制订单号</van-button>
                        <van-button type="info" @click="toDetails(item.id)" size="small">订单详情</van-button>
                    </div>
                </van-card>
            </van-list>
        </div>
    </div>
</template>

<script>
    import { Tab, Tabs,Card} from "vant";

    export default {
        name: "Orders",

        components: {
            [Tab.name]: Tab,
            [Tabs.name]: Tabs,
            [Card.name]: Card,
        },

        data() {
            return {
                active: 0,
                list: [],
                loading: false,
                finished: false,
                page:1,
            };
        },
        methods: {
            onLoad() {
                let param = {
                    'otype':this.active ==0?1:2,
                     'page':this.page
                }

                this.$api.orders(param).then(res=>{
                    //console.log(res.data);
                    this.loading = false;
                    this.list.push(...res.data.data.data)
                    if(res.data.data.next_page_url==null){
                        this.finished = true;
                    }else{
                        this.page = res.data.data.current_page+1
                    }
                })
            },
            tabChange(name,title){
                this.list = [];
                this.loading= true;
                this.finished= false,
                this.page=1,
                this.onLoad();
            },
            copyOrderID(id){
                this.$copyText(id).then(
                    res => {
                        //console.log(res)
                        this.$toast(`复制成功【ID:${id}】，可直接去粘贴`);
                    },
                    err => {
                        this.$toast("复制失败");
                    }
                )
            },
            toDetails(id){
                let otype = this.active ==0?1:2;
                this.$router.push(`/ordersDetails/${id}/${otype}`)
            }
        },
        computed:{
            StatusColor(){
               return  function (status) {
                    if(status<=5){
                        return {color:"#3d8bf2"}
                    }else if(status==10){ //成功
                        return {color:"#58bd6b"}
                    }else if(status==9){ //失败
                        return {color:"#db3131"}
                    }else {
                        return {color:"#969799"}
                    }

                }
            }
        }
    }
</script>

<style scoped>
    .van-image{
        border: #8799a3 1px solid;
    }

    .otitle {
        max-height: 32px;
        font-weight: 500;
        line-height: 16px;
    }

    .ostatus{
        font-weight: 600;
        margin-left: 10px;
    }

    .th_amount{
        text-align: center;
        background-color: #cccccc;
    }

    .td_amount{
        text-align: center;
        color: #db3131;
    }


    .amount_row{
        border-radius: 5px;
        border: 1px solid #8799a3;
    }

    .ath_left{
        border-right: 1px solid #8799a3;
        border-bottom: 1px solid #8799a3;
        border-radius: 5px 0 0 0;
    }

    .ath_center{
        border-right: 1px solid #8799a3;
        border-bottom: 1px solid #8799a3;
    }

    .ath_right{
        border-bottom: 1px solid #8799a3;
        border-radius: 0 5px  0 0;

    }

    .atd_left{
        border-right: 1px solid #8799a3;
    }

    .atd_center{
        border-right: 1px solid #8799a3;
    }

    .atd_right{
    }

    .van-tag{
        padding: .1em .2em;
    }

    .card-order{
        width: 96%;
        min-height: 100px;
        margin: 5px auto;
        border-radius: 12px;
        background-color: white;
        -webkit-box-shadow: 4px 4px 10px #8799a3;
        box-shadow: 4px 4px 10px #8799a3;
        border: 1px solid white;
        overflow: hidden;
    }
</style>