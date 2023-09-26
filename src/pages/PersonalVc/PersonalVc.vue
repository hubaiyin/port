<template>
  <div class="main">
    <div class="up">
      <div class="avatar">
        <img :src="info.avatarUrl" alt="">
      </div>
      <div class="name">
        <span>{{ info.name }}</span>
      </div>
      <div class="profession">
        <span>{{ info.position }}</span>
      </div>
    </div>
    <div class="down">
      <div class="title">
        <span>详细信息</span>
      </div>
      <div class="moreInfo">
        
      </div>
    </div>
  </div>
</template>

<script>
import request from '@/api/request';
export default {
  name: "PersonalVc",
  data() {
    return {
      nickName:"",
      profession:"",
      info:{}
    }
  },
  mounted() {
    this.getInfo();
  },
  methods: {
      async getInfo(){
        await request({
          method:"get",
          url:"/api/personal-center/detail",
        })
        .then(res => {
          console.log(res);
          this.info = res.data.data
        })
        .catch(err => {
          console.log(err);
        })
      }
  },
};
</script>

<style lang="scss" scoped>
.main {
  // border:2px solid red;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .up {
    background-color: #e2eefb;
    width: 100%;
    height: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    .avatar {
      width: 90px;
      height: 90px;
      background-color: rgb(178, 178, 178);
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;       
      }
    }
    .name {
      width: 5%;
      // border: 2px solid red;
      display: flex;
      align-items: center;
      justify-content: center;
      span {
        font-size: 1.2rem;
        font-weight: 700;
      }
    }
    .profession {
      width: 10%;
      // border: 2px solid red;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  .down {
    margin-top: 1.5%;
    width: 100%;
    height: 46%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      width: 98%;
      // border: 2px solid #e3e3e3;
      margin-top: 1%;
      // height: 10%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      span {
        font-weight: 700;
        font-size: 1.1rem;
        color: rgb(84, 84, 84);
      }
    }
    .moreInfo {
      width: 98%;
      margin-top: 1%;
      border: 2px solid red;
      height: 80%;
    }
  }
}
</style>