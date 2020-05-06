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
        <h4 class="title" style="text-align: center">注册</h4>
        <van-field
          v-model="username"
          label="手机号码"
          left-icon="manager"
          name="username"
          v-validate="'required|username'"
          :error-message="errors.first('username')"
          placeholder="请输入手机号码"
        />
        <van-field
          style="margin-top: 10px"
          v-model="sms"
          name="sms"
          center
          clearable
          left-icon="envelop-o"
          label="验证码"
          v-validate="'required'"
          :error-message="errors.first('sms')"
          placeholder="短信验证码"
        >
          <template #button>
            <van-button
              v-if="time <= 0"
              size="small"
              @click="smsSend()"
              round
              type="primary"
              >发送验证码</van-button
            >
            <van-button v-else size="small" disabled round type="primary">
              <van-count-down
                @finish="timeChange"
                :time="time"
                format=" ss 秒"
              />
            </van-button>
          </template>
        </van-field>

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
        <van-field
          style="margin-top: 10px"
          v-model="password1"
          clearable
          label="确认密码"
          left-icon="lock"
          placeholder="请输入确认密码"
          name="password1"
          v-validate="'required|confirmed:password'"
          :error-message="errors.first('password1')"
          type="password"
        />
      </van-cell-group>

      <van-button
        round
        style="color:#ffffff;margin-top: 20px"
        type="primary"
        :disabled="disabled"
        @click="login"
        block
      >
        注册
      </van-button>

      <div style="padding-top: 20px;color: #fffbe8;text-align: center">
        <a @click="$router.push('/login')"> 登录</a>
      </div>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      username: "",
      password: "",
      password1: "",
      disabled: false,
      smsDisabled: false,
      sms: "",
      time: 0
    };
  },
  created() {
    this.timeLive();
  },
  methods: {
    smsSend: function() {
      if (!/^1[3456789]\d{9}$/.test(this.username)) {
        return this.$toast("手机号码填写错误");
      } else {
        if (this.time > 0) {
          return this.$toast("请稍后再发");
        } else {
          let param = {
            type: "register",
            mobile: this.username
          };
          this.$api.registerSms(param).then(res => {
            console.log(res);
            this.$rtoast(res.data, () => {
              if (res.data.ret == 0) {
                localStorage.setItem(
                  "register_sms",
                  new Date().getTime() + 60000
                );
                this.time = 60000;
              }
            });
          });
        }
      }
    },
    timeLive() {
      let now = new Date().getTime();
      let time = localStorage.getItem("register_sms") - now;
      this.time = time < 0 ? 0 : time;
    },
    timeChange(val) {
      this.time = 0;
      console.log(this.time, val);
    },
    login: function() {
      this.disabled = true;
      this.$validator.validateAll().then(res => {
        if (res === true) {
          let data = {
            username: this.username,
            password: this.password,
            password1: this.password1,
            code: this.sms
          };
          this.$api
            .register(data)
            .then(res => {
              this.$rtoast(res.data, () => {
                if (res.data.ret == 0) {
                  let moblie = this.username;
                  this.$router.push(`/login?name=${moblie}`);
                }
              });

              this.disabled = false;
            })
            .catch(err => {
              console.log(err);
              this.$toast("提交失败，请稍后再试...");
              this.disabled = false;
            });
        } else {
          this.$toast("请按要求填写表单数据");
          this.disabled = false;
        }
      });
    }
  }
};
</script>

<style scoped>
#login {
  width: 100vw;
  height: 100vh;
  background: #0081ff;
  padding: 0px 0px 0px 0px;
  overflow: hidden;
}

#bg {
  text-align: center;
  min-height: 100px;
  margin-top: 60px;
}

.title {
  color: #fffbe8;
  margin: 15px 0;
}
#login >>> .van-field {
  border: 1px solid #ffffff !important;
  /*height: 60px;*/
  /*line-height: 60px;*/
  background: #0081ff;
  color: #ffffff;
  border-radius: 30px;
  overflow: hidden;
}

.form {
  width: 75%;
  margin: 15px auto;
}

.van-cell-group {
  background-color: #0081ff;
  overflow: hidden;
}

#login >>> .van-hairline--top,
.van-hairline--top-bottom {
  position: static;
}
#login >>> input {
  color: #ffffff;
}

#login >>> input::-webkit-input-placeholder {
  color: #ccc;
}
#login >>> input::-moz-input-placeholder {
  color: #ccc;
}
#login >>> input::-ms-input-placeholder {
  color: #ccc;
}
</style>
