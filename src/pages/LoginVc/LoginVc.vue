<template>
  <div class="main">
    <div class="left">
      <div class="logo">
        <img src="../../assets/logo.png" />
      </div>
      <div class="title">
        <span>港口码头集装箱管理<br />智慧绿色云服务平台</span>
      </div>
    </div>
    <div class="right">
      <div class="loginBox" v-show="status === 'login'">
        <!-- title -->
        <div class="loginTitle"><span>登录 Login</span></div>
        <!-- select -->
        <div class="select">
          <div class="first"><span>账户密码登录</span></div>
          <div class="divide">|</div>
          <div class="second"><span>手机短信登录</span></div>
        </div>
        <!-- phone -->
        <div class="phone">
          <input type="text" placeholder="请输入手机号" v-model="phone" />
          <img src="../../assets/user.png" alt="" />
        </div>
        <!-- password -->
        <div class="password">
          <input type="password" placeholder="请输入密码" v-model="password" />
          <img src="../../assets/password.png" alt="" />
          <div class="tip">
            <span>{{ tip }}</span>
          </div>
        </div>
        <!-- verify -->
        <div class="verify">
          <img src="../../assets/verify.png" alt="" />
          <input type="text" placeholder="验证码" v-model="verify" />
          <div class="code" @click="refreshCode">
            <identify :identifyCode="identifyCode"></identify>
          </div>
        </div>
        <!-- btn -->
        <div class="btn" @click="login(2)">
          <span>登 录</span>
        </div>
        <!-- footer -->
        <div class="footer">
          <div class="forget">
            <span><a>忘记密码?</a></span>
          </div>
          <div class="regist">
            <span>没有账号？</span>
            <span class="reg" @click="toRegister()"><a>注册</a></span>
          </div>
        </div>
      </div>
      <div class="registBox" v-show="status === 'register'">
        <!-- regTitle -->
        <div class="regTitle"><span>注册 Sign on</span></div>
        <div class="inner">
          <!-- phone -->
          <div class="phone">
            <input
              type="number"
              placeholder="请输入手机号"
              v-model="registParam.phone"
              style=""
            />
            <img src="../../assets/phone.png" alt="" />
          </div>
          <!-- msg -->
          <div class="msg">
            <input
              type="text"
              placeholder="短信验证码"
              v-model="registParam.msgCode"
            />
            <img src="../../assets/msg.png" alt="" />
            <button
              @click="sentMsg()"
              :class="{
                'disabled-style': getCodeBtnDisable,
                sentMsg: !getCodeBtnDisable,
              }"
              :disabled="getCodeBtnDisable"
            >
              <span class="sent">{{ codeBtnWord }}</span>
            </button>
          </div>
          <!-- password -->
          <div class="password">
            <input
              type="password"
              placeholder="请输入密码"
              v-model="registParam.password"
            />
            <img src="../../assets/password.png" alt="" />
          </div>
          <!-- rePassword -->
          <div class="rePassword">
            <input
              type="password"
              placeholder="请再次输入密码"
              v-model="registParam.rePassword"
            />
            <img src="../../assets/rePassword.png" alt="" />
          </div>
          <!-- invite -->
          <div class="invite">
            <input
              type="text"
              placeholder="请输入邀请码"
              v-model="registParam.inviteCode"
            />
            <img src="../../assets/invite.png" alt="" />
          </div>
        </div>
        <div class="tipBox">
          <span>{{ regTip }}</span>
        </div>
        <div class="btn" @click="register()">
          <span>注 册</span>
        </div>
        <div class="footer">
          <span>已有账号？</span>
          <span class="log" @click="toLogin">登录</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import identify from "@/component/identify.vue";
import request from "@/api/request";

export default {
  components: { identify },
  name: "dataVc",
  data() {
    return {
      identifyCodes: "1234567890",
      identifyCode: "",
      status: "register",
      phone: null,
      password: "",
      verify: null,
      tip: "",
      regTip: "",
      waitTime: 61,
      codeBtnWord: "获取验证码",
      getCodeBtnDisable: false,
      registParam: {
        phone: null,
        msgCode: null,
        password: "",
        rePassword: "",
        inviteCode: "",
      },
    };
  },
  mounted() {
    this.identifyCode = "";
    this.makeCode(this.identifyCodes, 4);
  },
  methods: {
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
    refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode +=
          this.identifyCodes[this.randomNum(0, this.identifyCodes.length)];
      }
      console.log(this.identifyCode);
    },
    toRegister() {
      this.status = "register";
    },
    toLogin() {
      this.status = "login";
    },
    check(way) {
      if (way === "login") {
        if (this.phone != null && this.password != "") {
          if (this.verify != this.identifyCode) {
            this.tip = "验证码错误";
            return false;
          }
          return true;
        } else {
          this.tip = "请检查信息是否填写完整！";
          return false;
        }
      }
    },
    checkRegister() {
      if (this.registParam.phone == null) {
        this.regTip = "手机号不能为空!";
        return false;
      }
      if (this.registParam.msgCode == null) {
        this.regTip = "短信验证码不能为空!";
        return false;
      }
      if (this.registParam.password == "") {
        this.regTip = "密码不能为空！";
        return false;
      }
      if (this.registParam.rePassword == "") {
        this.regTip = "二次密码不能为空!";
        return false;
      }
      if (this.registParam.password != this.registParam.rePassword) {
        this.regTip = "两次输入的密码不一致!";
        return false;
      }
      if (this.registParam.inviteCode == "") {
        this.regTip = "邀请码不能为空!";
        return false;
      }
      this.regTip = "";
      return true;
    },
    async login(way) {
      if (this.check("login")) {
        await request({
          method: "post",
          url: "/api/login/b",
          data: {
            type: way,
            phone: this.phone,
            password: this.password,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.data.code !== "00000") {
              this.tip = res.data.message;
              this.$message({
                message: "登录失败！",
                type: "error",
              });
            } else {
              window.localStorage.setItem("token", res.data.data.token);
              this.$message({
                message: "登录成功！",
                type: "success",
              });
              this.$router.push({ path: "/manage" });
            }
          })
          .catch((err) => {
            console.log(err);
            if (
              err.code === "ECONNABORTED" ||
              err.message === "Network Error" ||
              err.message.includes("timeout")
            ) {
              this.$message({
                message: "请求超时，请稍后重试",
                type: "error",
              });
            }
          });
      } else {
        this.$message({
          message: "登录失败！",
          type: "error",
        });
      }
      // this.$verify.check();
    },
    async register() {
      if (this.checkRegister()) {
        console.log(this.registParam);
        await request({
          method: "post",
          url: "/api/register/b",
          data: {
            phone: this.registParam.phone,
            inviteCode: this.registParam.inviteCode,
            code: this.registParam.msgCode,
            password: this.registParam.password,
          },
        }).then((res) => {
          console.log(res);
          if (res.data.code != "00000") {
            this.regTip = res.data.message;
            this.$message({
              message: "注册失败！",
              type: "error",
            });
          } else {
            this.$message({
              message: "注册成功！",
              type: "success",
            });
            this.status = "login";
          }
        });
      }
    },
    async sentMsg() {
      this.regTip = "";
      let reg = /^1[3456789]\d{9}$/;
      if (this.registParam.phone == null) {
        this.regTip = "请填写手机号!";
        return;
      }
      if (!reg.test(this.registParam.phone)) {
        this.regTip = "手机号不合法!";
        return;
      }
      if (this.registParam.inviteCode == "") {
        this.regTip = "请填写邀请码!";
        return;
      }
      console.log("手机号为：" + this.registParam.phone);
      await request({
        method: "post",
        url: "/api/register/send-code",
        data: {
          phone: this.registParam.phone,
          inviteCode: this.registParam.inviteCode,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code != "00000") {
            this.regTip = res.data.message;
            this.$message({
              message: "发送失败",
              type: "error",
            });
          } else {
            this.$message({
              message: "验证码发送成功!",
              type: "success",
            });
            let that = this;
            that.waitTime--;
            that.getCodeBtnDisable = true;
            this.codeBtnWord = `${this.waitTime}s 后重新获取`;
            let timer = setInterval(function () {
              if (that.waitTime > 1) {
                that.waitTime--;
                that.codeBtnWord = `${that.waitTime}s 后重新获取`;
              } else {
                clearInterval(timer);
                that.codeBtnWord = "获取验证码";
                that.getCodeBtnDisable = false;
                that.waitTime = 61;
              }
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  computed: {
    // getCodeBtnDisable:{
    //   get(){
    //       if(this.waitTime == 61){
    //           if(this.registParam.phone){
    //               return false;
    //           }
    //           return true;
    //       }
    //       return true;
    //   },
    //   set(){}
    // }
  },
};
</script>
<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.main {
  // border: 2px solid red;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  .left,
  .right {
    width: 44%;
    height: 90%;
    // border: 2px solid blue;
  }
  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .logo {
      // border: 2px solid green;
      width: 43%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .title {
      // border: 2px solid green;
      margin-top: 4%;
      span {
        font-size: 3.2rem;
        font-weight: 700;
        color: #0d1e42;
      }
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    .loginBox {
      // border: 2px solid green;
      box-shadow: -5px 5px 10px -4px rgb(148, 148, 148),
        8px -5px 8px -6px rgb(218, 218, 218);
      width: 55%;
      height: 70%;
      border-radius: 20px;
      ////////////
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      .loginTitle {
        span {
          font-weight: 700;
          font-size: 1.8rem;
        }
        margin-top: 5%;
      }
      .select {
        display: flex;
        // border: 2px solid orange;
        align-items: center;
        justify-content: space-around;
        width: 60%;
        .first {
          // width: 40%;
          // border: 2px solid black;
          border-top: 0;
          border-left: 0;
          border-bottom: 0;
        }
        .second {
          // border: 2px solid black;
        }
        .divide {
          font-size: 1.5rem;
        }
      }
      .phone,
      .password {
        height: 5%;
        width: 60%;
        // border: 2px solid pink;
        input {
          height: 100%;
          width: 100%;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          font-size: 0.9rem;
          padding-left: 35px;
        }
        input:focus {
          height: 100%;
          outline: none;
          border-bottom: 2px solid black;
        }
      }
      .phone {
        position: relative;
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          position: absolute;
          bottom: 20%;
        }
      }
      .password {
        position: relative;
        display: flex;
        align-items: center;
        img {
          width: 25px;
          height: 25px;
          position: absolute;
          bottom: 20%;
        }
        .tip {
          top: 110%;
          position: absolute;
          width: 100%;
          span {
            font-size: 0.6rem;
            color: red;
          }
        }
      }
      .verify {
        // border: 2px solid pink;
        // height: 5%;
        width: 60%;
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        input {
          height: 80%;
          width: 40%;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          font-size: 0.9rem;
          padding-left: 35px;
        }
        input:focus {
          height: 80%;
          outline: none;
          border-bottom: 2px solid black;
        }
        img {
          width: 25px;
          height: 25px;
          position: absolute;
          bottom: 20%;
        }
        .code {
          position: relative;
          left: 1.4%;
        }
      }
      .btn {
        // border: 2px solid pink;
        width: 63%;
        height: 8%;
        border-radius: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #101010;
        span {
          color: white;
          font-weight: 400;
        }
      }
      .footer {
        // border: 2px solid pink;
        width: 63%;
        display: flex;
        justify-content: space-between;
        font-size: 0.9rem;
        .regist,
        .forget {
          span > a {
            cursor: pointer;
            font-weight: 700;
            color: #58b6ee;
          }
          a:link {
            text-decoration: none;
            color: #58b6ee;
          }
          a:visited {
            text-decoration: none;
            color: #58b6ee;
          }
          a:active {
            text-decoration: none;
            color: blue;
          }
        }
      }
    }
    .registBox {
      // border: 2px solid red;
      box-shadow: -5px 5px 10px -4px rgb(148, 148, 148),
        8px -5px 8px -6px rgb(218, 218, 218);
      width: 55%;
      height: 75%;
      border-radius: 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
    }
    .regTitle {
      span {
        font-weight: 700;
        font-size: 1.8rem;
      }
      margin-top: 5%;
    }
    .inner {
      height: 60%;
      width: 100%;
      // border: 2px solid red;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      .phone,
      .msg,
      .password,
      .rePassword,
      .invite {
        height: 5%;
        width: 64%;
        position: relative;
        display: flex;
        align-items: center;
        input {
          height: 100%;
          width: 100%;
          border-top: 0;
          border-left: 0;
          border-right: 0;
          font-size: 0.9rem;
          padding-left: 35px;
          padding-bottom: 3px;
        }
        input:focus {
          height: 100%;
          outline: none;
          border-bottom: 2px solid black;
        }
        img {
          width: 25px;
          height: 25px;
          position: absolute;
          bottom: 10%;
        }
      }
      .phone input::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
      .phone input::-webkit-outer-spin-button,
      .phone input[type="number"] {
        -moz-appearance: textfield;
      }
      .msg {
        position: relative;
        .sentMsg {
          position: absolute;
          // border: 2px solid red;
          width: 40%;
          padding: 6px 0;
          bottom: 5%;
          border-radius: 6px;
          background-color: #0c1d41;
          // height: 100%;
          right: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          // height: 100%;
          span {
            font-size: 0.8rem;
            color: white;
            font-weight: 700;
          }
        }
      }
    }

    .btn {
      // border: 2px solid pink;
      width: 63%;
      height: 8%;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #101010;
      cursor: pointer;
      span {
        color: white;
        font-weight: 400;
      }
    }
    .tipBox {
      position: relative;
      bottom: 5%;
      // border: 2px solid red;
      width: 64%;
      // height: 5%;
      span {
        font-size: 0.85rem;
        color: red;
      }
    }
    .footer {
      font-size: 0.9rem;
      cursor: pointer;
    }
    .log {
      font-size: 0.9rem;
      color: #58b6ee;
      font-weight: 700;
    }
  }
  .disabled-style {
    position: absolute;
    // border: 2px solid red;
    width: 40%;
    padding: 6px 0;
    bottom: 5%;
    border-radius: 6px;
    background-color: #999999;
    // height: 100%;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    // height: 100%;
    span {
      font-size: 0.8rem;
      color: white;
      font-weight: 700;
    }
  }
  .disabled-style {
    position: absolute;
    // border: 2px solid red;
    width: 40%;
    padding: 6px 0;
    bottom: 5%;
    border-radius: 6px;
    background-color: #999999;
    // height: 100%;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    // height: 100%;
    span {
      font-size: 0.8rem;
      color: white;
      font-weight: 700;
    }
  }
}
</style>