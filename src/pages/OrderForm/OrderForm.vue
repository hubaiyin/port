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
            <el-select v-model="keyword.containerType" size="mini">
              <el-option label="全部" :value="null"></el-option>
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
              <el-option label="未审核" value="0"></el-option>
              <el-option label="未开始" value="1"></el-option>
              <el-option label="进行中" value="2"></el-option>
              <el-option label="已完成" value="3"></el-option>
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
            <!-- <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="开始日期"
                v-model="keyword.exceprArrivalAtBegin"
                style="width: 100%"
                size="mini"
              ></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
              <el-date-picker
                type="date"
                placeholder="结束日期"
                v-model="keyword.exceptArrivalAtEnd"
                style="width: 100%"
                size="mini"
              ></el-date-picker>
            </el-col> -->
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
          <el-button type="primary" size="small">新建</el-button>
          <el-button size="small" icon="el-icon-plus" style="width: 90px"
            >批量操作</el-button
          >
        </div>
      </div>
      <div class="content">
        <el-table
          v-show="activeIndex === 'goods'"
          :data="clientList"
          height="400px"
          style="width: 100%"
        >
          <el-table-column prop="id" label="编号"> </el-table-column>
          <el-table-column prop="orderNumber" label="订单号"> </el-table-column>
          <el-table-column prop="clientName" label="客户名称">
          </el-table-column>
          <el-table-column
            v-for="(item, index) in clientListProp"
            :key="index"
            :prop="item.prop"
            :label="item.label"
            :width="item.prop === 'createAt' ? 180 : 90"
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
                >编辑</el-button
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
                @click="deletes(scope.$index, scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <el-table
          v-show="activeIndex === 'boats'"
          :data="shipList"
          height="350px"
          style="width: 100%"
        >
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
                >编辑</el-button
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
                @click="deletes(scope.$index, scope.row)"
              ></i>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 10px"
          :page-size="size"
          layout="total, prev, pager, next"
          :total="total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import request from "@/api/request";
export default {
  name: "OrderForm",
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
      size: 20,
      total: 100,
      page: 1,
      clientList: [
        {
          id: 1,
          orderNumber: "TJUT123",
          clientName: "徐嘉豪",
          containerType: "冷藏",
          portStatus: 0,
          createAt: "2023-02-09 02:30:00",
          exceptArrivalAt: "2023-02-12 02:30:00",
          status: 0,
          process: 0,
        },
      ],
      shipList: [
        {
          id: 19,
          orderNumber: "J7NYOWNZDC5T",
          clientName: "梅书豪",
          shipCompanyName: "天津码头公司",
          shipName: "K3SNM8",
          startPort: "天津",
          middlePort: "上海",
          endPort: "广州",
          exceptArrivalAt: null,
          process: 0,
        },
      ],
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
    setTime(e) {
      console.log(e);
      this.keyword.exceprArrivalAtBegin = e[0];
      this.keyword.exceptArrivalAtEnd = e[1];
    },
    onSubmit() {
      console.log("submit!");
    },
    changeForm(title, type) {
      this.activeIndex = title;
      this.type = type;
      this.reset();
    },
    view(index, row) {
      console.log(index, row);
    },
    send(index, row) {
      console.log(index, row);
    },
    deletes(index, row) {
      console.log(index, row);
    },
    search() {
      this.getList();
    },
    reset() {
      for (const key in this.keyword) {
        this.keyword[key] = null;
      }
      this.page = 1;
      this.getList();
    },
    async getList() {
      await request({
        method: "post",
        url: "/api/order-management/order/list/b",
        data: {
          type: this.type,
          page: this.page,
          size: this.size,
          keyWord: this.keyword,
        },
      }).then(({ data }) => {
        console.log(data);
        if (data.status === "Failed") {
          localStorage.clear("token");
          this.$notify({
            title: "错误",
            message: data.message + "\n" + "将于5秒后回到登录页面",
            type: "error",
            // onClose: () => {
            //   setTimeout(() => {
            //     this.$router.replace("/");
            //   }, 5000);
            // },
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.orderBox {
  height: 100%;
  width: 100%;
  background: #fff;
  padding: 16px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .options {
    height: 25%;
    width: 100%;
    border-bottom: 3px solid #e8eaee;
    display: flex;
    flex-direction: column;
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
    flex: 1;
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
        width: 180px;
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
}
</style>