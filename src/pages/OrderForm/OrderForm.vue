<template>
  <div class="orderBox">
    <div class="options">
      <div class="title">订单管理</div>
      <div class="option">
        <el-form ref="form" :model="keyword" label-width="125px">
          <el-form-item label="订单编号">
            <el-input
              size="mini"
              style="padding-right: 15px"
              placeholder="请输入订单编号"
              v-model="keyword.orderNumber"
            ></el-input>
          </el-form-item>
          <el-form-item label="箱号">
            <el-input
              size="mini"
              style="padding-right: 15px"
              placeholder="请输入箱号"
              v-model="keyword.containerNumber"
            ></el-input>
          </el-form-item>
          <el-form-item label="货物类型">
            <el-select multiple v-model="keyword.containerType" size="mini">
              <el-option label="冷藏" value="冷藏"></el-option>
              <el-option label="干货" value="干货"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="进港/出港">
            <el-select v-model="keyword.portStatus" size="mini">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="出港" value="1"></el-option>
              <el-option label="进港" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="货物实际到港时间">
            <el-col :span="22">
              <el-date-picker
                type="date"
                v-model="keyword.reallyArrival"
                format="yyyy 年 MM 月 dd 日"
                value-format="yyyy-MM-dd"
                style="width: 100%"
                size="mini"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="keyword.status" size="mini">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="未审核" :value="0"></el-option>
              <el-option label="未开始" :value="1"></el-option>
              <el-option label="进行中" :value="2"></el-option>
              <el-option label="已完成" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="进程">
            <el-select v-model="keyword.processing" size="mini">
              <el-option label="全部" :value="null"></el-option>
              <el-option label="正常" value="0"></el-option>
              <el-option label="被驳回" value="1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="预计进出港时间" style="width: 50%">
            <el-date-picker
              v-model="timeRange"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="mini"
              @change="setTime"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div class="buttons">
          <el-button type="primary" size="small" @click="search"
            >查询</el-button
          >
          <el-button size="small" icon="el-icon-refresh-right" @click="reset"
            >重置</el-button
          >
        </div>
      </div>
    </div>
    <div class="forms">
      <div class="head">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
        >
          <el-menu-item index="goods" @click="changeForm('goods', 0)"
            >货主/货代</el-menu-item
          >
          <el-menu-item index="boats" @click="changeForm('boats', 1)"
            >船公司/船代</el-menu-item
          >
        </el-menu>
        <div class="buttons">
          <el-dropdown @command="handleCommand">
            <el-button type="primary" size="small">
              新建<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">货主/货代</el-dropdown-item>
              <el-dropdown-item command="1">船公司/船代</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-button size="small" type="info" @click="showNone"
            >批量发送</el-button
          >
          <el-button size="small" type="danger" @click="deletes"
            >批量删除</el-button
          >
        </div>
      </div>
      <div class="content">
        <el-table
          ref="form"
          v-show="activeIndex === 'goods'"
          v-loading="loading && type === 0"
          :data="clientList"
          height="400px"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="25"></el-table-column>
          <el-table-column prop="id" label="编号"> </el-table-column>
          <el-table-column prop="orderNumber" label="订单号"> </el-table-column>
          <el-table-column prop="clientName" label="客户名称">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in clientListProp"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.prop === 'createAt' ? 180 : 130"
          >
          </el-table-column>
          <el-table-column
            prop="exceptArrivalAt"
            label="预计到港时间"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="process" label="进程">
            <template slot-scope="scope">
              {{ process[scope.row[scope.column.property]] }}
            </template>
          </el-table-column>
          <el-table-column prop="portStatus" label="进港/出港" width="100">
            <template slot-scope="scope">
              {{ scope.row[scope.column.property] === 0 ? "进港" : "出港" }}
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态">
            <template
              slot-scope="scope"
              v-if="status[scope.row[scope.column.property]] !== '异常'"
            >
              {{ status[scope.row[scope.column.property]] }}
            </template>
            <template
              v-if="status[scope.row[scope.column.property]] === '异常'"
              slot-scope="scope"
            >
              <el-button
                type="text"
                @click="view(scope.$index, scope.row)"
                style="color: red"
                >{{ status[scope.row[scope.column.property]] }}</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="details" label="详情信息" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.$index, scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="send" label="发送" fixed="right">
            <template slot-scope="scope">
              <i
                style="font-size: 18px"
                class="el-icon-s-promotion"
                @click="send(scope.$index, scope.row)"
              ></i>
            </template>
          </el-table-column>
          <el-table-column prop="delete" label="删除" fixed="right">
            <template slot-scope="scope">
              <i
                style="font-size: 18px"
                class="el-icon-delete-solid"
                @click="deleteOne(scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          ref="form2"
          v-show="activeIndex === 'boats'"
          :data="shipList"
          height="350px"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          v-loading="loading && type === 1"
        >
          <el-table-column type="selection" width="25"></el-table-column>
          <el-table-column prop="id" label="编号"> </el-table-column>
          <el-table-column prop="orderNumber" label="订单号" width="150">
          </el-table-column>
          <el-table-column prop="clientName" label="客户名称">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in shipListProp"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.prop === 'shipCompanyName' ? 140 : 100"
          >
          </el-table-column>
          <el-table-column
            prop="exceptArrivalAt"
            label="预计到港时间"
            width="180"
          >
          </el-table-column>
          <el-table-column prop="process" label="进程">
            <template slot-scope="scope">
              {{ process[scope.row[scope.column.property]] }}
            </template>
          </el-table-column>
          <el-table-column prop="details" label="详情信息" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="view(scope.$index, scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column>
          <el-table-column prop="send" label="发送" fixed="right">
            <template slot-scope="scope">
              <i
                style="font-size: 18px"
                class="el-icon-s-promotion"
                @click="send(scope.$index, scope.row)"
              ></i>
            </template>
          </el-table-column>
          <el-table-column prop="delete" label="删除" fixed="right">
            <template slot-scope="scope">
              <i
                style="font-size: 18px"
                class="el-icon-delete-solid"
                @click="deleteOne(scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 10px"
          :page-size="size"
          layout="total, prev, pager, next"
          :total="total"
          :current-page.sync="page"
          @current-change="getList"
        >
        </el-pagination>
      </div>
    </div>
    <div class="cover" v-if="isShow">
      <div class="icon">
        <i class="el-icon-circle-close" @click="isShow = false"></i>
      </div>
      <div class="optionContent">
        <create-goods @close="close" :type="createType"></create-goods>
      </div>
    </div>
    <el-dialog
      top="6vh"
      :visible.sync="dialogVisible"
      width="900px"
      :before-close="handleClose"
    >
      <detail-vc v-if="dialogVisible" @shutDown="shut" :ID="ID"></detail-vc>
    </el-dialog>
  </div>
</template>
<script>
import request from "@/api/request";
import DetailVc from "./components/DetailVc.vue";
import CreateGoods from "./components/CreateGoods.vue";
export default {
  name: "OrderForm",
  components: { CreateGoods, DetailVc },
  data() {
    return {
      timeRange: null,
      keyword: {
        orderNumber: null,
        containerNumber: null,
        containerType: null,
        portStatus: null,
        exceptArrivalAt: null,
        status: null,
        processing: null,
        exceprArrivalAtBegin: null,
        exceptArrivalAtEnd: null,
        reallyArrival: null,
      },
      createType: 0,
      isShow: false,
      size: 20,
      total: 100,
      page: 1,
      loading: false,
      clientList: [],
      shipList: [],
      clientListProp: [
        {
          prop: "containerType",
          label: "货物类型",
        },
        {
          prop: "createAt",
          label: "下单时间",
        },
      ],
      shipListProp: [
        {
          prop: "shipCompanyName",
          label: "船名",
        },
        {
          prop: "shipName",
          label: "航次",
        },
        {
          prop: "startPort",
          label: "始发港",
        },
        {
          prop: "middlePort",
          label: "中途港",
        },
        {
          prop: "endPort",
          label: "终点港",
        },
      ],
      status: {
        0: "异常",
        1: "待处理",
        2: "进行中",
        3: "已完成",
        4: "已取消",
      },
      process: {
        0: "待装载",
        1: "已装载",
        2: "已转运",
        3: "已卸载",
        4: "在存储中",
      },
      activeIndex: "goods",
      type: 0,
      orderList: [],
      dialogVisible: false,
      ID: null,
    };
  },
  mounted() {
    this.activeIndex = "goods";
    this.type = 0;
    this.getList();
    // console.log(data);
    // console.log(request.post());
  },
  methods: {
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done(_);
        })
        .catch(() => {
          // console.log(_);
        });
    },
    setTime(e) {
      // console.log(e);
      this.keyword.exceprArrivalAtBegin = e[0];
      this.keyword.exceptArrivalAtEnd = e[1];
    },
    onSubmit() {
      // console.log("submit!");
    },
    changeForm(title, type) {
      this.activeIndex = title;
      this.type = type;
      this.orderList = [];
      this.$refs.form.clearSelection();
      this.$refs.form2.clearSelection();
      this.reset();
    },
    view(index, row) {
      console.log(index);
      this.dialogVisible = true;
      this.ID = row.id;
    },
    send() {
      this.showNone();
    },
    async deleteOne(row) {
      let deleteList = [row.id];
      this.loading = true;
      await request({
        method: "delete",
        url: "/api/order-management/order/b",
        data: {
          deleteList: deleteList,
        },
      })
        .then(() => {
          this.loading = false;
          this.getList();
        })
        .catch((err) => {
          this.loading = false;
          this.$notify({
            title: "删除失败",
            type: "error",
            message: err.message + " 请稍后重试",
          });
        });
    },
    search() {
      this.getList();
    },
    reset() {
      this.timeRange = null;
      for (const key in this.keyword) {
        this.keyword[key] = null;
      }
      this.page = 1;
      this.getList();
    },
    async getList() {
      this.loading = true;
      await request({
        method: "post",
        url: "/api/order-management/order/list/b",
        data: {
          type: this.type,
          page: this.page,
          size: this.size,
          keyWord: this.keyword,
        },
      }).then(
        ({ data }) => {
          // console.log(data);
          this.loading = false;
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
          if (this.type === 0) {
            this.clientList = data.data.clientList;
          } else {
            this.shipList = data.data.shipList;
          }
          this.total = data.data.pageData.total;
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
    handleSelectionChange(val) {
      this.orderList = val;
      // console.log(this.orderList);
    },
    showNone() {
      this.$message({
        message: "功能暂未开放",
        type: "warning",
      });
    },
    async deletes() {
      if (!this.orderList.length) {
        this.$message({
          message: "请至少选择一项",
          type: "error",
        });
        return;
      }
      let deleteList = [];
      this.orderList.map((item) => {
        // console.log(item.id);
        deleteList.push(item.id);
      });
      this.loading = true;
      await request({
        method: "delete",
        url: "/api/order-management/order/b",
        data: {
          deleteList: deleteList,
        },
      })
        .then((res) => {
          this.loading = false;
          // console.log(res);
          if (res.data.code !== "00000") {
            this.$notify({
              title: "删除失败",
              message: res.data.message,
              type: "error",
            });
            return;
          }
          this.getList();
        })
        .catch((err) => {
          this.loading = false;
          this.$notify({
            title: "删除失败",
            type: "error",
            message: err.message + " 请稍后重试",
          });
        });
    },
    createGoods() {
      this.createType = 0;
      this.isShow = true;
    },
    createBoats() {
      // console.log("hi");
      this.createType = 1;
      this.isShow = true;
    },
    close() {
      // console.log("hi");
      this.isShow = false;
      this.getList();
    },
    handleCommand(command) {
      // console.log(command);
      if (command === 0) this.createGoods();
      else this.createBoats();
    },
    shut() {
      this.$confirm("确认关闭？")
        .then(() => {
          this.dialogVisible = false;
        })
        .catch(() => {});
    },
  },
};
</script>
<style lang="scss" scoped>
.orderBox {
  ::v-deep .el-dialog {
    border-radius: 20px;
  }
  position: relative;
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 16px;
  box-sizing: border-box;
  .options {
    height: 25%;
    width: 100%;
    border-bottom: 3px solid #e8eaee;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    .title {
      font-weight: 800;
      font-size: 20px;
      padding-bottom: 5px;
      box-sizing: border-box;
    }
    .option {
      flex: 1;
      width: 100%;
      display: flex;
      .el-form {
        display: flex;
        width: 90%;
        height: 100%;
        background: #fff;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        ::v-deep .el-input__inner {
          background-color: #f6f6f6;
          border: 1px solid #f6f6f6;
        }
        .el-form-item {
          margin-bottom: 0 !important;
          width: 33%;
          height: 30px;
          display: flex;
          align-items: center;
          ::v-deep .el-form-item__label {
            text-align: left !important;
            color: #969ba4;
            line-height: 20px;
          }
          ::v-deep .el-form-item__content {
            margin-left: 0 !important;
          }
          .line {
            display: flex;
            justify-content: center;
            align-items: center;
          }
          ::v-deep .el-range-editor--mini .el-range-input {
            font-size: 12px;
            background: #f6f6f6;
          }
        }
      }
      .buttons {
        display: flex;
        flex-direction: column;
        ::v-deep .el-button + .el-button {
          margin-left: 0;
        }
        .el-button {
          margin-bottom: 10px;
          font-size: 12px;
        }
        ::v-deep .el-button--primary {
          color: #fff;
          background-color: #3362f6;
          border-color: #3362f6;
        }
      }
    }
  }
  .forms {
    height: 75%;
    display: flex;
    flex-direction: column;
    .head {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      .el-menu {
        width: 40%;
      }
      ::v-deep .el-menu.el-menu--horizontal {
        border-bottom: none;
      }
      ::v-deep .el-menu--horizontal > .el-menu-item {
        height: 40px;
        line-height: 40px;
      }
      .buttons {
        display: flex;
        width: 250px;
        justify-content: space-between;
        align-items: center;
        ::v-deep .el-button + .el-button {
          margin-left: 0;
        }
        .el-button {
          font-size: 12px;
          width: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }
        ::v-deep .el-button--primary {
          color: #fff;
          background-color: #3362f6;
          border-color: #3362f6;
        }
        .el-dropdown {
          vertical-align: top;
        }
        .el-dropdown + .el-dropdown {
          margin-left: 15px;
        }
        .el-icon-arrow-down {
          font-size: 12px;
        }
      }
    }
    .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: flex-end;
      ::v-deep .cell {
        display: flex;
        justify-content: center;
      }
      .el-icon-s-promotion:before {
        font-size: 20px;
        cursor: pointer;
      }
      .el-icon-delete-solid:before {
        font-size: 20px;
        cursor: pointer;
      }
    }
  }
  .cover {
    position: absolute;
    top: 0;
    left: 0;
    background: #f8f9fa;
    height: 100%;
    width: 100%;
    z-index: 999;
    // padding: 16px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    .icon {
      background: #fff;
      .el-icon-circle-close:before {
        content: "\e78d";
        font-size: 32px;
        color: #969ba4;
      }
      padding: 10px;
      padding-left: 2.5%;
      box-sizing: border-box;
      border-radius: 12px 12px 0 0;
    }
    .optionContent {
      flex: 1;
    }
  }
  ::v-deep .el-dialog {
    background: #e8eaee;
  }
}
</style>