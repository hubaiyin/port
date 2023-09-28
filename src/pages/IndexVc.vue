<template>
  <el-container>
    <el-header>
      <div class="header">
        <div class="left">
          <div class="logo">
            <img src="../assets/boat.png" alt="" />
          </div>
          <div class="title">港口智核服务平台</div>
        </div>
        <div class="right">
          <el-dropdown
            style="height: 100%; display: flex; align-items: center"
            @command="quit"
          >
            <div class="block" @click="jump('/manage/personal')">
              <img :src="info.avatarUrl" alt="" />
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto">
        <el-menu
          :default-active="defaultActive"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
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
import request from "@/api/request";
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
      info: {
        avatarUrl: null,
      },
      isCollapse: false,
      change: null,
    };
  },
  methods: {
    jump(path) {
      this.defaultActive = path.split("/")[2];
      this.$router.push(path);
    },
    debounce(func, delay = 200) {
      let timer = null;
      return function (...args) {
        const context = this;

        if (timer) {
          clearTimeout(timer);
        }

        timer = setTimeout(() => {
          func.apply(context, args);
          timer = null;
        }, delay);
      };
    },
    async getInfo() {
      await request({
        method: "get",
        url: "/api/personal-center/detail",
      })
        .then((res) => {
          console.log(res);
          this.info = res.data.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    quit() {
      this.$notify({
        type: "success",
        title: "退出成功",
        message: "将于两秒后返回登录页",
        onClose: () => {
          localStorage.clear("token");
          this.$router.replace("/");
        },
      });
    },
  },
  mounted() {
    if (document.documentElement.clientWidth <= 1100) {
      this.isCollapse = true;
    }
    this.defaultActive = this.$route.path.split("/")[2];
    this.change = this.debounce(() => {
      if (document.documentElement.clientWidth <= 1100) {
        this.isCollapse = true;
      } else {
        this.isCollapse = false;
      }
    });
    window.addEventListener("resize", this.change);
    this.getInfo();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.change);
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
        height: 100%;
        .block {
          display: flex;
          align-items: center;
          cursor: pointer;
          height: 70%;
          img {
            height: 100%;
            border-radius: 50%;
          }
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
          font-size: 14px;
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