<template>
    <div>
        <van-nav-bar
                title="收款账号"
                @click-left="$router.go(-1)"
                left-arrow
                class="header-bar"
        />



        <div class="bank-list" v-if="list.length==0">
            <div class="kong">
                <img src="../assets/kong2.png" alt="">
                <p>空空如也~</p>
            </div>
        </div>
        <div v-else>
            <van-radio-group v-model="currentAccount">
                <div class="bank-list account-item"  v-for="(item,index) in list"  :key="index">
                    <van-row justify="center" align="center" type="flex" style="padding-left: 10px">
                        <van-col span="3"><van-radio  :name="item.id" /></van-col>
                        <van-col span="4" ><img class="account-image" @click="currentAccount=item.id" :src="typePng(item.type)" alt=""> </van-col>
                        <van-col span="14" @click="currentAccount=item.id">
                            <div style="padding-left: 10px;color:#000000">{{item.account_no}}</div>
                            <div style="padding-left: 10px;color:gray;font-size: small">{{item.account_name}}</div>
                        </van-col>
                        <van-col span="3" @click="editAccount(item)">
                            <van-icon class="iconfont iconbianji" ></van-icon>
                        </van-col>
                    </van-row>
                </div>
            </van-radio-group>
        </div>


        <van-popup
                v-model="popupShow"
                round
                position="bottom"
                closeable
                close-icon="close"
                :safe-area-inset-bottom="true"
                :style="{ height: '350' }"
        >
            <div class="van-action-sheet__header van-hairline--bottom">选择收款账号类型</div>
            <van-radio-group  v-for="(val,key) in accountTypes"  :key="key" v-model="type">
            <div class="account-type van-hairline--bottom"  @click="typeHandle(key)">
                <img class="png" :src="typePng(key)" alt="">
                <span class="name">添加{{val}}账号</span>
                <van-radio class="right-icon" :name="key" />
            </div>
            </van-radio-group>

        </van-popup>


        <AccountEdit
                :editPopupShow.sync="editPopupShow"
                :type="type"
                :len="list.length"
                :model ="model"
                @updateData="initData" ></AccountEdit>
        <van-button round class="add-btn" size="large" type="info" @click="popupShow=true">添加账号</van-button>
        <p style="text-align: center;color: #f37b1d">如需添加对公账号,请联系客服处理~</p>

    </div>
</template>

<script>
    import AccountEdit from '../components/AccountEdit'
    export default {

        name: "BankList",

        components:{
            AccountEdit
        },

        data:function () {
            return {
                list:[], //用户收款账号列表
                accountTypes:{},
                popupShow:false,
                editPopupShow:false,
                type:'bank',
                account_no:'',//账号
                account_name:'',//账号名名称
                bank_id:'',//银行id
                is_default:false,//默认
                currentAccount:0,
                model:{}  //编辑模型
            }
        },

        methods:{
            initData:function () {
                this.$api.accountsData().then(res=>{
                    this.accountTypes=res.data.data.type;
                    this.list=res.data.data.accounts;
                    if(this.list.length>0){
                        this.currentAccount = this.list[0]['id'];//先给个默认值
                        for(let i=0;i<this.list.length;i++){
                            if(this.list[i]['default']==1){
                                this.currentAccount = this.list[i]['id'];
                                break;
                            }
                        }
                    }
                })
            },
            typePng:function (type) {
                return `https://hm-1258945893.cos.ap-chengdu.myqcloud.com/h5/${type}.png`
            },
            typeHandle:function (type) {
                this.type = type;
                this.popupShow = false;
                this.editPopupShow =true;
            },
            editAccount:function (item) {
                this.type =item.type;
                this.model= item
                this.editPopupShow =true;
            }

        },

        computed:{
            accountNameToast(){
                if(this.type ==='bank'){
                    return '请填写银行卡用户姓名'
                }else{
                    return '请填写支付宝账号实名姓名'
                }
            },

            accountLabel(){
                if(this.type ==='bank'){
                    return '银行卡号'
                } else{
                    return '支付宝账号'
                }
            },
            accountPlaceholder(){
                if(this.type ==='bank'){
                    return '请输入银行卡号'
                } else{
                    return '请输入支付宝账号(邮箱和手机号格式)'
                }
            }
        },

        created() {
            this.initData();
        }

    }
</script>

<style scoped>
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

    .add-cell{
        padding:0 0 0 25px;
        line-height: 80px;
    }

    .add-cell  .van-cell__right-icon{
        height: 80px;
        line-height: 80px;
    }

    .add-cell .van-cell__title{
        /*margin-left: 20px;*/
    }

    .icontianjia{
        color: #0081ff;
        font-size: 25px;
    }

    .add-btn{
        width: 94%;
        margin: 40px 3% 0;
        height: 44px;
        line-height: 44px;
    }

    .kong{
       text-align: center;
    }

    .kong p{
        text-align: center;
        font-size: small;
        color: gray;
    }

    .account-type{
        height: 60px;
        width:96%;
        line-height: 60px;
        text-align: center;
        display: flex;
    }

    .account-type .png{
        /*margin-top: 10px;*/
        height: 40px;
        margin-top: 10px;
        margin-left: 20px;
    }

    .account-type .name{
        margin-top: 10px;
        line-height: 40px;
        height: 40px;
        color: #000;
        margin-left: 5px;
    }

    .right-icon{
        margin-left:auto
    }




    .iconbianji{
        color: grey;
    }

</style>
