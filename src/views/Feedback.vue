<template>
    <div>
        <div>
            <van-nav-bar
                    title="意见反馈"
                    @click-left="$router.go(-1)"
                    left-arrow
                    class="header-bar"
            >
            </van-nav-bar>
        </div>

        <p style="padding: 0px 15px;margin: 20px 0 0 0">请选择反馈类型：</p>
        <div style="background-color: #ffffff;padding: 10px 0px">
            <van-radio-group v-model="radio">
                <van-row type="flex" justify="center">
                    <van-col span="6" >
                        <van-radio name="1">产品建议</van-radio>
                    </van-col>
                    <van-col span="6">
                        <van-radio name="2">bug反馈</van-radio>
                    </van-col>
                    <van-col span="6">
                        <van-radio name="3">商务合作</van-radio>
                    </van-col>
                </van-row>
            </van-radio-group>
        </div>

        <p style="padding: 0px 15px;margin: 20px 0 0 0">请输入留言：</p>
        <div>
            <van-field
                    v-model="message"
                    rows="2"
                    autosize
                    type="textarea"
                    maxlength="300"
                    placeholder="请输入留言,留言内容10到300字符之间"
                    show-word-limit
                    name="message"
                    v-validate="'required|max:300|min:10'"
                    :error-message="errors.first('message')"
            />
        </div>

        <p style="padding: 0px 15px;margin: 20px 0 0 0">请输入联系人：</p>
        <van-field
                v-model="name"
                type="text"
                placeholder="请输入联系人姓名"
                name="name"
                v-validate="'required|min:2'"
                :error-message="errors.first('name')"
        />

        <p style="padding: 0px 15px;margin: 20px 0 0 0">请输入联系方式：</p>
        <van-field
                v-model="contactWay"
                type="text"
                placeholder="请输入联系方式：qq/手机号码/邮箱"
                name="contact"
                v-validate="'required|min:6'"
                :error-message="errors.first('contact')"
        />

        <van-button
                type="info"
                block style="margin-top: 25px"
                :disabled="disabled"
                @click="onSubmit">提交</van-button>



    </div>
</template>

<script>
    export default {
        name: "Feedback",
        data:function () {
            return {
                radio:'1',
                message:'',
                contactWay:'',
                name:'',
                disabled:false

            }
        },
        methods:{
            onSubmit:function () {
                this.disabled = true
                this.$validator.validateAll().then(res=>{
                    if(res===true){
                        let data = {
                            type:this.radio,
                            message:this.message,
                            contactWay: this.contactWay,
                            name:this.name
                        }
                        this.$api.feedBack(data).then(res=>{
                            this.$rtoast(res.data, ()=> {
                                this.$router.go('-1')
                            })
                            this.disabled = false
                        }).catch(res=>{
                            console.log(res);
                            this.$toast('提交失败，请稍后再试...')
                            this.disabled = false
                        })
                    }else{
                        this.$toast('请按要求填写表单数据')
                        this.disabled = false
                    }

                })
            }
        }

    }
</script>

<style scoped>

</style>