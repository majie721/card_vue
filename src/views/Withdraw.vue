<template>
    <div>
        <div>
            <van-nav-bar
                    title="提现"
                    @click-left="$router.go(-1)"
                    left-arrow
            >
                <span slot="right" class="kefu" >
                <i class="iconfont iconkefu"></i>
                    客服
                </span>
            </van-nav-bar>
        </div>
        <div class="money">
            <img width="100px" style="margin-top: 40px;" src="https://hm-1258945893.cos.ap-chengdu.myqcloud.com/card/money1.png" alt="">
        </div>
        <div>
            <p class="ye">我的余额</p>
            <div class="money">
                ¥ {{money}}
            </div>
        </div>
        <div style="text-align: center">
            <div>
                <van-button :disabled="money<=0" type="primary" @click="withdrawTip()">立即提现</van-button>
            </div>
            <div style="margin-top: 20px">
                <van-button  type="info">发送账单</van-button>
            </div>
        </div>

        <van-button type="primary" @click="confrimWithdraw">登录</van-button>
        <van-dialog
                v-model="isShow"
                show-cancel-button
                title="提现信息"
        >
           <p class="confrim-p"><span class="confrim-lable">账号类型:</span> {{currentAccount.name}}</p>
            <p class="confrim-p"><span class="confrim-lable">收款账号:</span> {{currentAccount.account_no}}
                <van-button  class="modify" type="primary" size="mini" @click="changeBank()">更改</van-button>
            </p>
            <p class="confrim-p"><span class="confrim-lable">金额:</span> {{this.money}}</p>
        </van-dialog>


        <van-action-sheet v-model="listShow" title="更换账号">
            <div class="content">
                <van-radio-group v-model="currentAccount">
                    <div class="bank-list account-item"  v-for="(item,index) in list"  :key="index">
                        <van-row justify="center" align="center" type="flex" style="padding-left: 10px">
                            <van-col span="3"><van-radio  :name="item" /></van-col>
                            <van-col span="4" ><img class="account-image" @click="currentAccount=item" :src="typePng(item.type)" alt=""> </van-col>
                            <van-col span="14" @click="currentAccount=item">
                                <div style="padding-left: 10px;color:#000000">{{item.account_no}}</div>
                                <div style="padding-left: 10px;color:gray;font-size: small">{{item.account_name}}</div>
                            </van-col>
                        </van-row>
                    </div>
                </van-radio-group>
                <van-button class="s-btn"  plain type="primary" @click="listShow=false" block>确认</van-button>
                <van-button class="s-btn" plain type="warning" @click="$router.push('/bankList')" block>编辑账号</van-button>
            </div>
        </van-action-sheet>
    </div>
</template>

<script>
    import {hideLoading} from "../tools/loading";

    export default {
        name: "Withdraw",
        data(){
          return {
              money:'--.--',
              accountTypes:[],
              list:[],
              currentAccount:{},
              isShow:false, //提现确认弹框
              listShow:false

          }
        },
        created() {
            this.banlance()
            this.bankList()
        },
        methods:{
            withdrawTip:function () {
                this.$dialog.confirm({
                    title: '提现需知',
                    messageAlign:'left',
                    message: "1.转账到支付宝账号免手续费(推荐)。\n2.转账到银行卡需扣除0.6%的手续费。\n3.当日提现最大限额5万元。"
                }).then((res) => {
                    console.log(res);
                    if(this.list.length==0){
                        this.addBank()
                    }else{
                        this.confrimWithdraw()
                    }

                }).catch(() => {

                });
            },
            addBank:function(){
                this.$dialog.alert({
                    title:"提示",
                    message:"您还没有添加收款账号,请先添加"
                }).then(()=>{
                    this.$router.push("/bankList")
                })
            },
            changeBank:function(){
                this.listShow = true;
            },
            withdraw:function(){
                this.$api.withdraw().then(res=>{
                    this.$rtoast(res)
                }).catch(
                    this.$toast.fail('提现失败,请联系管理员处理')
                )
            },
            confrimWithdraw:function(){
                this.isShow = true
            },
            banlance:function () {
                this.$api.userBalance().then(res=>{
                    this.money  = res.data.data
                })
            },
            bankList:function () {
                this.$api.accountsData().then(res=>{
                    this.accountTypes=res.data.data.type;
                    this.list=res.data.data.accounts;
                    if(this.list.length>0){
                        this.currentAccount = this.list[0];//先给个默认值
                        for(let i=0;i<this.list.length;i++){
                            if(this.list[i]['default']==1){
                                this.currentAccount = this.list[i];
                                break;
                            }
                        }
                    }
                })
            },
            typePng:function (type) {
                return `https://hm-1258945893.cos.ap-chengdu.myqcloud.com/h5/${type}.png`
            },
        }
    }
</script>

<style scoped>
    .money{
        height: 160px;
        width: 100%;
        text-align: center;
    }

    .ye{
        text-align: center;
        margin: 8px 0px
    }
    .money{
        text-align: center;
        font-size: 30px;
        font-weight: bolder
    }

    .van-button>>>{
        height: 36px;
        line-height: 36px;
    }

    .confrim-p{
        padding-left: 20px;
    }

    .confrim-lable{
        width: 70px;
        display: inline-block;
        text-align-last: justify;
    }

    .modify{
     height: 24px;
    line-height: 24px;
    }

    .bank-list{
        background-color: #ffffff;
        min-height: 60px;
        width: 94%;
        margin: 10px auto;
        border-radius: 12px;
        box-shadow:4px 4px 10px #8799a3;
        border:1px solid white;
        overflow: hidden;
    }

    .account-item{
        margin-top: 10px;
        max-height: 90px;
    }

    .account-image{
        height: 60px;
        /*margin-top: 10px;*/
        /*margin-left: 10px;*/
    }

    .iconbianji{
        color: grey;
    }

    .content {
        margin: 8px 5px;
        padding-bottom: 30px;
    }
    .s-btn>>>{
        width: 94%;
        margin: 20px auto;
        height: 40px;
        border-radius: 10px;
    }
</style>