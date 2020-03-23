<template>
    <div id="login">
        <div id="bg">
            <h2 class="title">销卡大师</h2>
            <van-image
                    width="100"
                    height="100"
                    round
                    src="https://hm-1258945893.cos.ap-chengdu.myqcloud.com/card/logo3.png"
            />
        </div>
        <div class="form">
            <van-cell-group>
                <h4 class="title" style="text-align: center">登录 </h4>
                <van-field
                        v-model="username"
                        label="手机号码"
                        left-icon="manager"
                        name="username"
                        v-validate="'required|username'"
                        :error-message="errors.first('username')"
                        placeholder="填写手机号码"
                />

                <van-field
                        style="margin-top: 10px"
                        v-model="password"
                        clearable
                        label="密码"
                        left-icon="lock"
                        placeholder="请填写密码"
                        name="password"
                        v-validate="'required|min:6'"
                        :error-message="errors.first('password')"
                        type="password"
                />
            </van-cell-group>

            <van-button
                    round
                    style="color:#ffffff;margin-top: 20px"
                    type="primary"
                    :disabled="disabled"
                    @click="login"
                    block>
                登录
            </van-button>

            <div style="padding-left: 30%;padding-top: 10px;color: #fffbe8">
                <a @click="$router.push('/register')"> 注册</a>
                <a @click="$router.push('/resetPassword')" style="margin-left: 50px"> 忘记密码</a>
            </div>


        </div>
        <div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                username:this.$route.query.name==undefined?'':this.$route.query.name,
                password: '',
                disabled:false
            };
        },
        methods:{
            login:function () {
                this.disabled=true;
                this.$validator.validateAll().then(res=>{
                    if(res===true){
                        let data = {
                            username:this.username,
                            password:this.password,
                        }
                        this.$api.loginData(data).then(res=>{
                            this.$rtoast(res.data, ()=> {
                                if(res.data.ret==0){
                                    let redirect = this.$route.query.redirect
                                    let   path = (redirect!=undefined&& redirect.length>0)?redirect:'/'
                                    this.$router.replace(path)
                                    localStorage.setItem('token', res.data.data.token);
                                    localStorage.setItem('user', JSON.stringify(res.data.data));

                                }
                            })

                            this.disabled = false
                        }).catch(err=>{
                            console.log(err);
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
    #login{
        width: 100vw;
        height: 100vh;
        background: #0081ff;
        padding: 0px 0px 0px 0px;
        overflow: hidden;
    }

    #bg{
        text-align: center;
        min-height: 100px;
        margin-top: 60px;
    }

    .title{
        color: #fffbe8;
        margin: 15px 0;
    }
    #login>>> .van-field{
        border: 1px solid #ffffff !important;
        /*height: 60px;*/
        /*line-height: 60px;*/
        background: #0081ff;
        color: #ffffff;
        border-radius: 30px;
        overflow: hidden;
    }

    .form{
        width: 75%;
        margin: 15px auto;
    }

    .van-cell-group{
        background-color: #0081ff;
        overflow: hidden;
    }

    #login >>> .van-hairline--top, .van-hairline--top-bottom{
        position: static;
    }
    #login >>> input{
        color: #ffffff;
    }

    #login>>>input::-webkit-input-placeholder {
        color: #ccc;
    }
    #login>>>input::-moz-input-placeholder {
        color: #ccc;
    }
    #login>>>input::-ms-input-placeholder {
        color: #ccc;
    }
</style>