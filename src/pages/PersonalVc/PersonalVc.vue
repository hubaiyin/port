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
        <span>{{ info.job }}</span>
      </div>
    </div>
    <div class="down">
      <div class="title">
        <span>详细信息</span>
      </div>
      <div class="moreInfo">
        <div class="left">
           <!--  -->
          <div class="education">
            <div class="title2"><span>学历：</span></div>
            <div class="res"><span>{{ info.education }}</span></div>
          </div>
          <!--  -->
          <div class="position">
            <div class="title2"><span>部门：</span></div>
            <div class="res"><span>{{ info.position }}</span></div>
          </div>
          <!--  -->
          <div class="address">
            <div class="title2"><span>地址：</span></div>
            <div class="res"><span>{{ info.address }}</span></div>
          </div>
          <!--  -->
          <div class="age">
            <div class="title2"><span>年龄：</span></div>
            <div class="res"><span>{{ info.age }}</span></div>
          </div>
          <!--  -->
          <div class="phone">
            <div class="title2"><span>电话：</span></div>
            <div class="res"><span>{{ info.phone }}</span></div>
          </div>
        </div>
        <div class="right">
          <!--  -->
          <div class="maritalStatus">
            <div class="title2"><span>婚姻状态：</span></div>
            <div class="res"><span>{{ info.maritalStatus }}</span></div>
          </div>
          <!--  -->
          <div class="nation">
            <div class="title2"><span>民族：</span></div>
            <div class="res"><span>{{ info.nation }}</span></div>
          </div>
          <!--  -->
          <div class="otherSkills">
            <div class="title2"><span>其他技能：</span></div>
            <div class="res"><span>{{ info.otherSkills }}</span></div>
          </div>
          <!--  -->
          <div class="politicCountenance">
            <div class="title2"><span>政治面貌：</span></div>
            <div class="res"><span>{{ info.politicCountenance }}</span></div>
          </div>
          <!--  -->
          <div class="email">
            <div class="title2"><span>邮箱：</span></div>
            <div class="res"><span>{{ info.email }}</span></div>
          </div>
        </div>
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
    height: 60%;
    box-sizing: border-box;
    padding-bottom: 2%;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    .title {
      width: 98%;
      // border: 2px solid #e3e3e3;
      margin-top: 1%;
      margin-bottom: 2%;
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
      width: 100%;
      margin-top: 1%;
      margin-left: 2%;
      // border: 2px solid blue;
      height: 100%;
      padding-left: 0%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .left {
        height: 100%;
        width: 30%;
        // border: 2px solid red;
        display: flex;
        // align-items: flex-start;
        flex-direction: column;
        justify-content: space-between;
        .education , .position , .address , .age , .phone {
          // border: 2px solid plum;
          margin-bottom: 1%;
          display: flex;
          align-items: center;
          align-items: flex-end;
          .title2 {
            // border:2px solid green;
            // width: 5%;
            span {
              font-weight: 700;
              font-size: 1rem;
            }
          }
          .res {
            // border: 2px solid red;
            margin-left: 1%;
          }
        } 
      }
      .right {
        height: 100%;
        width: 30%;
        // border: 2px solid red;
        display: flex;
        // align-items: flex-start;
        flex-direction: column;
        justify-content: space-between;
        .maritalStatus , .nation , .otherSkills , .politicCountenance , .email {
          margin-bottom: 1%;
          display: flex;
          align-items: center;
          align-items: flex-end;
        }
        .title2 {
          // border:2px solid green;
          // width: 5%;
          span {
            font-weight: 700;
            font-size: 1rem;
          }
        }
        .res {
          // border: 2px solid red;
          margin-left: 1%;
        }
      }
    }
  }
}
</style>