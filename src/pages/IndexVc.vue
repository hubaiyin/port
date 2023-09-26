<template>
  <el-container>
    <el-header>
      <div class="header">
        <div class="left">
          <div class="logo">
            <img src="../assets/boat.png" alt="" />
          </div>
          <div class="title">港口码头集装箱管理智慧绿色云服务平台</div>
        </div>
        <div class="right">
          <div class="block" @click="jump('/manage/personal')">
            <el-avatar :size="32" src="/assets/logo.png"></el-avatar>
          </div>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-active="defaultActive" class="el-menu-vertical-demo">
          <el-menu-item
            v-for="item in routes"
            :key="item.index"
            :index="item.index"
            @click="jump(item.path)"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.message }}</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  name: "IndexVc",
  data() {
    return {
      defaultActive: "personal",
      routes: [
        {
          index: "orderform",
          icon: "el-icon-s-goods",
          message: "订单管理",
          path: "/manage/orderform",
        },
        {
          index: "planview",
          icon: "el-icon-menu",
          message: "堆场平面图",
          path: "/manage/planview",
        },
        {
          index: "usermanage",
          icon: "el-icon-s-custom",
          message: "用户管理",
          path: "/manage/usermanage",
        },
        {
          index: "datamanage",
          icon: "el-icon-s-marketing",
          message: "数据管理",
          path: "/manage/datamanage",
        },
        {
          index: "personal",
          icon: "el-icon-user-solid",
          message: "个人中心",
          path: "/manage/personal",
        },
      ],
    };
  },
  methods: {
    jump(path) {
      this.defaultActive = path.split("/")[2];
      this.$router.push(path);
    },
  },
  mounted() {
    this.defaultActive = this.$route.path.split("/")[2];
  },
};
</script>
<style lang="scss" scoped>
.el-container {
  height: 100%;
  width: 100%;
  .el-header {
    height: 7% !important;
    background: #242c3b;
    box-sizing: border-box;
    .header {
      color: #ffffffeb;
      font-size: 19px;
      height: 100%;
      font-weight: 800;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        height: 100%;
        display: flex;
        align-items: center;
        .logo {
          height: 60%;
          img {
            height: 100%;
          }
        }
        .title {
          margin-left: 20px;
        }
      }
      .right {
        display: flex;
        align-items: center;
        .block {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
      }
    }
  }
  .el-container {
    height: 93%;
    width: 100%;
    .el-aside {
      .el-menu {
        border: none;
        .el-menu-item {
          font-size: 15px;
          i::before {
            font-size: 20px;
          }
        }
      }
    }
    .el-main {
      background: #f7f8fae2;
    }
  }
}
</style>