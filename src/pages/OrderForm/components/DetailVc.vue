<template>
  <div class="detail">
    <div class="one">
      <div class="header">基本信息</div>
      <div class="content">
        <div>集装箱类型：{{ list.container[0].type }}</div>
        <div>集装箱重量：{{ list.container[0].weight }}</div>
        <div>集装箱比例：{{ list.container[0].volume }}</div>
        <div>集装箱箱号：{{ list.container[0].number }}</div>
        <div>起运港：{{ list.startPort }}</div>
        <div>中转港：{{ list.middlePort }}</div>
        <div>到达港：{{ list.endPort }}</div>
        <div>货物类型：{{ list.container[0].name }}</div>
        <div>分票信息：{{ list.container[0].votesMsg }}</div>
      </div>
    </div>
    <div class="two">
      <div class="header">承运人</div>
      <div class="content">
        <div>公司：{{ list.ship.companyName }}</div>
        <div>公司老板：{{ list.ship.bossName }}</div>
        <div>公司地址：{{ list.ship.address }}</div>
        <div>公司联系方式：{{ list.ship.phone }}</div>
        <div>公司ID：{{ list.ship.shipDetail.companyId }}</div>
        <div>公司备注：{{ list.ship.remark }}</div>
        <div>货船吨位：{{ list.ship.shipDetail.weight }}</div>
        <div>货船编号：{{ list.ship.shipDetail.name }}</div>
        <div>货船备注：{{ list.ship.shipDetail.remark }}</div>
      </div>
    </div>
    <div class="three">
      <div class="header">作业委托人</div>
      <div class="content">
        <div>全称：{{ list.client.name }}</div>
        <div>电话：{{ list.client.phone }}</div>
        <div>地址：{{ list.client.address }}</div>
        <div>委托编号：{{ list.client.detail.id }}</div>
        <div>运单编号：{{ list.client.detail.trackingNumber }}</div>
        <div>提单编号：{{ list.client.detail.loadingNumber }}</div>
        <div>银行账单：{{ list.client.detail.bankBill }}</div>
        <div>备注：{{ list.client.detail.remark }}</div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">确 定</el-button>
    </div>
  </div>
</template>
<script>
import request from "@/api/request";
export default {
  name: "DetailVc",
  props: {
    ID: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    // console.log(this.ID);
    this.getList();
  },
  data() {
    return {
      list: {
        startPort: null,
        middlePort: null,
        endPort: null,
        container: [
          {
            name: null,
            number: null,
            type: null,
            votesMsg: null,
            weight: null,
            volume: null,
          },
          {
            name: null,
            number: null,
            type: null,
            votesMsg: null,
            weight: null,
            volume: null,
          },
        ],
        client: {
          name: null,
          phone: null,
          address: null,
          detail: {
            id: null,
            trackingNumber: null,
            loadingNumber: null,
            bankBill: null,
            remark: null,
          },
        },
        ship: {
          companyName: null,
          bossName: null,
          address: null,
          phone: null,
          remark: null,
          shipDetail: {
            companyId: null,
            weight: null,
            name: null,
            remark: null,
          },
        },
      },
    };
  },
  methods: {
    close() {
      this.$emit("shutDown");
    },
    async getList() {
      await request({
        method: "get",
        url: "/api/order-management/order/b",
        params: {
          orderId: this.ID,
        },
      })
        .then((res) => {
          //   console.log(res);
          if (res.data.code !== "00000") {
            this.$notify({
              title: "查询失败",
              message: res.data.message,
              type: "error",
            });
            this.close();
            return;
          }
          this.list = res.data.data;
        })
        .catch((err) => {
          this.loading = false;
          this.$notify({
            title: "查询失败",
            type: "error",
            message: err.message + " 请关闭后重试",
          });
        });
    },
  },
};
</script>
<style lang="scss" scpoed>
.detail {
  height: 600px;
  .one,
  .two,
  .three {
    background: #fff;
    padding-bottom: 10px;
    .header {
      font-size: 18px;
      box-sizing: border-box;
      padding: 8px 20px;
      font-weight: bold;
    }
    .content {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-around;
      box-sizing: border-box;
      padding: 0 20px;
      div {
        width: 30%;
        height: 30px;
        display: flex;
        justify-content: baseline;
        align-items: center;
      }
    }
  }
  .two {
    margin-top: 20px;
  }
  .three {
    margin-top: 20px;
    .content {
      padding: 0 40px;
      div {
        width: 50%;
      }
    }
  }
  .dialog-footer {
    margin-top: 40px;
    display: flex;
    justify-content: center;
  }
}
</style>