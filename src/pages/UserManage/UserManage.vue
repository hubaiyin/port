<template>
  <div class="userManage">
    <div class="header">用户列表</div>
    <div class="buttons">
      <el-button type="primary" size="small" @click="dialogVisible1 = true">
        <i class="el-icon-plus el-icon--left"></i>新建
      </el-button>
    </div>
    <div class="body">
      <el-table
        :data="list"
        style="width: 100%"
        height="580px"
        v-loading="loading"
      >
        <el-table-column
          fixed
          prop="id"
          label="编号"
          width="60"
          style="display: flex; justify-content: center"
        >
        </el-table-column>
        <el-table-column fixed prop="name" label="姓名"> </el-table-column>
        <el-table-column fixed prop="avatarUrl" label="头像">
          <template slot-scope="scope">
            <el-avatar
              shape="circle"
              :size="40"
              :src="scope.row.avatarUrl"
            ></el-avatar>
          </template>
        </el-table-column>
        <el-table-column fixed prop="jobNumber" label="工号"> </el-table-column>
        <el-table-column fixed prop="job" label="职务"> </el-table-column>
        <el-table-column fixed prop="workTime" label="工时"> </el-table-column>
        <el-table-column fixed prop="status" label="状态">
          <template> 状态良好 </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small"
              >查看</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      :visible.sync="dialogVisible1"
      top="6vh"
      width="800px"
      :before-close="handleClose"
    >
      <create-people v-if="dialogVisible1"></create-people>
    </el-dialog>
    <el-dialog
      :visible.sync="dialogVisible2"
      width="600px"
      :before-close="handleClose"
    >
      <div class="detail">
        <div class="avator">
          <el-avatar :size="80" :src="details.avatarUrl"></el-avatar>
          <div class="base">
            <h3>{{ details.name }}</h3>
            <div class="baseInform">
              <div class="sex">No.{{ details.id }}</div>
              <div class="department">{{ details.department }}</div>
            </div>
          </div>
        </div>
        <div class="information">
          <div>
            入职时间：<span>{{ details.entryTime }}</span>
          </div>
          <div>
            性别<span>{{ details.gender }}</span>
          </div>
          <div>
            联系方式：<span>{{ details.phone }}</span>
          </div>
          <div>
            学历：<span>{{ details.education }}</span>
          </div>
          <div>
            年龄：<span>{{ details.age }}</span>
          </div>
          <div>
            地址：<span>{{ details.address }}</span>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import CreatePeople from "./components/CreatePeople.vue";
import request from "@/api/request";
export default {
  name: "UserManage",
  components: { CreatePeople },
  data() {
    return {
      list: [],
      details: {
        id: null,
        name: null,
        department: null,
        entryTime: null,
        phone: null,
        gender: null,
        job: null,
        education: null,
        age: null,
        address: null,
        avatarUrl: null,
      },
      loading: false,
      dialogVisible1: false,
      dialogVisible2: false,
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    async handleClick(row) {
      this.loading = true;
      await request({
        method: "get",
        url: "/api/management/personnel/detail",
        params: {
          userId: row.id,
        },
      }).then(
        ({ data }) => {
          if (data.code !== "00000") {
            this.$notify({
              title: "错误",
              message: data.message + "\n" + "将于2秒后回到登录页面",
              type: "error",
              duration: 2000,
              onClose: () => {
                localStorage.clear("token");
                this.$router.replace("/");
              },
            });
            return;
          }
          console.log(data.data);
          this.loading = false;
          this.details = data.data.personnelDetailData;
          this.dialogVisible2 = true;
        },
        (err) => {
          this.loading = false;
          this.$notify({
            title: "请求失败",
            type: "error",
            message: err.message + " 请稍后刷新重试",
          });
        }
      );
    },
    async getList() {
      this.loading = true;
      await request({
        method: "get",
        url: "/api/management/personnel/list",
      }).then(
        ({ data }) => {
          // console.log(data);
          this.loading = false;
          if (data.code !== "00000") {
            this.$notify({
              title: "错误",
              message: data.message + "\n" + "将于5秒后回到登录页面",
              type: "error",
              onClose: () => {
                setTimeout(() => {
                  localStorage.clear("token");
                  this.$router.replace("/");
                }, 5000);
              },
            });
            return;
          }
          this.list = data.data.list;
        },
        (err) => {
          this.loading = false;
          this.$notify({
            title: "请求失败",
            type: "error",
            message: err.message + " 请稍后刷新重试",
          });
        }
      );
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done(_);
        })
        .catch(() => {
          // console.log(_);
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.userManage {
  background: #fff;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  display: flex;
  flex-direction: column;
  .header {
    font-weight: bold;
    font-size: 24px;
    box-sizing: border-box;
    padding-bottom: 10px;
  }
  .buttons {
    padding-bottom: 8px;
    display: flex;
    justify-content: flex-end;
    margin-right: 3%;
    ::v-deep .el-button {
      font-size: 15px;
      padding: 10px 18px;
    }
  }
  .body {
    flex: 1;
    ::v-deep .cell {
      display: flex;
      justify-content: center;
    }
  }
  ::v-deep .el-dialog {
    border-radius: 10px;
  }
  ::v-deep .el-dialog__body {
    padding-top: 0;
  }
  .detail {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 300px;
    justify-content: space-around;
    .avator {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 48%;
      .base {
        .baseInform {
          display: flex;

          .sex,
          .department {
            color: #fff;
            display: flex;
            justify-content: center;
            padding: 5px 0;
            border-radius: 5px;
          }
          .sex {
            width: 60px;
            background: #cccccc;
          }
          .department {
            width: 100px;
            background: #3871e0;
            margin-left: 5px;
          }
        }
      }
    }
    .information {
      box-sizing: border-box;
      width: 95%;
      margin-top: 20px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      height: 150px;
      div {
        width: 49%;
        box-sizing: border-box;
        padding: 2px 0;
        display: flex;
        flex-direction: column;
        font-weight: bold;
        font-size: 15px;
        span {
          margin-top: 6px;
          font-weight: normal;
          font-size: 12px;
        }
      }
    }
  }
}
</style>