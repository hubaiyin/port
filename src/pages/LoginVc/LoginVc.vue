<template>
  <div class="main">
    <div class="left">
      <div class="logo">
        <img src="../../assets/logo.png">
      </div>
      <div class="title">
        <span>港口码头集装箱管理<br>智慧绿色云服务平台</span>
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
          <input type="text" placeholder="请输入手机号">
          <img src="../../assets/user.png" alt="">
        </div>
        <!-- password -->
        <div class="password">
          <input type="password" placeholder="请输入密码">
          <img src="../../assets/password.png" alt="">
        </div>
        <!-- verify -->
        <div class="verify">
          <img src="../../assets/verify.png" alt="">
          <input type="text" placeholder="验证码">
          <div class="code" @click="refreshCode">
            <identify :identifyCode="identifyCode"></identify>
          </div>
        </div>
        <!-- btn -->
        <div class="btn">
          <span>登 录</span>
        </div>
        <!-- footer -->
        <div class="footer">
          <div class="forget">
            <span><a >忘记密码?</a></span>
          </div>
          <div class="regist">
            <span>没有账号？</span>
            <span class="reg" @click="toRegister()"><a >注册</a></span>
          </div>
        </div>
      </div>
      <div class="registBox" v-show="status === 'register' ">
        <!-- regTitle -->
        <div class="regTitle"><span>注册 Sign on</span></div>
        <div class="inner">
          <!-- phone -->
          <div class="phone">
            <input type="text" placeholder="请输入手机号">
            <img src="../../assets/phone.png" alt="">
          </div>
          <!-- msg -->
          <div class="msg">
            <input type="text" placeholder="请输入短信验证码">
            <img src="../../assets/msg.png" alt="">
          </div>
          <!-- password -->
          <div class="password">
            <input type="text" placeholder="请输入密码">
            <img src="../../assets/password.png" alt="">
          </div>
          <!-- rePassword -->
          <div class="rePassword">
            <input type="text" placeholder="请再次输入密码">
            <img src="../../assets/rePassword.png" alt="">
          </div>
          <!-- invite -->
          <div class="invite">
            <input type="text" placeholder="请输入邀请码">
            <img src="../../assets/invite.png" alt="">
          </div>
        </div>
        <div class="btn">
          <span>登 录</span>
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
import identify from '@/component/identify.vue';
  export default {
    components:{ identify },
    name:"dataVc",
    data() {
      return {
        identifyCodes: "1234567890",
        identifyCode: "",
        status:'register'
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
          this.identifyCode += this.identifyCodes[
            this.randomNum(0, this.identifyCodes.length)
          ];
        }
        console.log(this.identifyCode);
      },
      toRegister(){
        this.status = 'register'
      },
      toLogin() {
        this.status = 'login'
      }
    }
  }
</script>
<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
}
.main {
  border: 2px solid red;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content:center;
  .left,.right {
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
        color: #0D1E42;
      }
    }
  }
  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    .loginBox {
      // border: 2px solid green;
      box-shadow: -5px 5px 10px -4px rgb(148, 148, 148) , 8px -5px 8px -6px rgb(218, 218, 218);
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
        justify-content:space-around ;
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
      .phone , .password {
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
        .regist , .forget {
          span > a {
            cursor: pointer;
            font-weight: 700;
            color: #58B6EE;
          }
          a:link {
              text-decoration: none;
              color: #58B6EE;
          }
          a:visited {
              text-decoration: none;
              color: #58B6EE;
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
      box-shadow: -5px 5px 10px -4px rgb(148, 148, 148) , 8px -5px 8px -6px rgb(218, 218, 218);
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
      .phone,.msg,.password,.rePassword,.invite {
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
      font-size: 0.9rem;
      cursor:pointer;
    }
    .log {
      font-size: 0.9rem;
      color: #58B6EE;
      font-weight: 700;
    }
  }
}
</style>