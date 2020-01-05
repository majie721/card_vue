<template>
    <div>
        <van-popup
                v-model="editPopupShow"
                position="bottom"
                round
                :close-on-click-overlay="false"
                :safe-area-inset-bottom="true"
                class="edit-popup"
        >
            <van-cell-group class="edit-popup-item box">
                <van-field
                        v-model="account_no"
                        required
                        clearable
                        :label="accountLabel"
                        :placeholder="accountPlaceholder"
                        name="account_no"
                        v-validate="'required'"
                        :error-message="errors.first('account_no')"
                />

                <van-field
                        v-model="account_name"
                        required
                        clearable
                        :placeholder="accountNameToast"
                        label="姓名"
                        name="account_name"
                        v-validate="'required'"
                        :error-message="errors.first('account_name')"
                />

            </van-cell-group>

            <van-cell class="edit-popup-item" title="设为默认收款账号" >
                <van-switch size="20px"  v-model="is_default" />
            </van-cell>

            <van-button class="edit-popup-item edit-btn" type="info" @click="addAccount()">{{opName}}</van-button>
            <van-button class="edit-popup-item edit-btn mg20" @click="$emit('update:editPopupShow',false)" type="default">取消</van-button>

        </van-popup>
    </div>
</template>

<script>
    export default {
        name: "AccountEdit",
        props:{
            editPopupShow:{
                type:Boolean,
                default: false
            },
            type:{
                type:String,
                default:'bank',
            },
            len:{
                type:Number,  //用户是否有了银行卡的标记
                default:0
            },
            model:{
                type:Object
            }
        },
        data:function () {
            return {
                account_no:'',
                account_name:"",
                is_default:'',
                id:0
            }
        },

        methods:{
            addAccount:function () {
                this.$validator.validateAll().then((result) => {
                    if(result){
                        let param ={
                            id:this.id,
                            type:this.type,
                            account_no: this.account_no,
                            account_name: this.account_name,
                            default:this.len>0?this.is_default:true, //如果是添加第一张卡,设置为默认
                        }
                        this.$api.addUserAccount(param).then(res=>{
                            this.$rtoast(res.data);
                            this.$emit('update:editPopupShow',false);
                            this.$emit('updateData'); //更新父组件的数据
                        })
                    }
                })
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
            },
            opName(){
               return  this.id>0?'修改':'添加'
            }
        },

        watch:{
            model(){
                console.log(this.model);
                if(this.model.account_name !=undefined){
                    this.account_name = this.model.account_name;
                };
                if(this.model.account_no !=undefined){
                    this.account_no = this.model.account_no;
                };
                if(this.model.default !=undefined){
                    this.is_default = this.model.default==1?true:false;
                };
                if(this.model.id !=undefined){
                    this.id = this.model.id;
                }
            }
        }

    }
</script>

<style scoped>
    .edit-popup{
        height: 80%;
        background-color: #f2f2f2;
    }

    .box{
        margin-top: 40px !important;
    }

    .edit-popup-item{
        width: 94%;
        margin: 10px auto;
    }

    .edit-btn{
        margin-top: 40px;
        display: block;
    }

    .mg20{
        margin-top: 20px;
    }

    .box  >>> .van-field__label span{
        display: inline-block;
        min-width: 78px;
        text-align: justify;
        text-align-last: justify;
    }
</style>
