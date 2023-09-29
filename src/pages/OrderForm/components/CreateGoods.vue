<template>
  <div class="Goods">
    <el-form ref="form" :model="keyword" label-width="125px" :rules="rule">
      <div class="goods">
        <el-form-item label="箱号" prop="container[0].number">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入箱号"
            v-model="keyword.container[0].number"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物名称">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入货物名称"
            v-model="keyword.container[0].name"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物数量" prop="container[0].num">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入货物数量"
            v-model.number="keyword.container[0].num"
          ></el-input>
        </el-form-item>
        <el-form-item label="货物类型">
          <el-select multiple v-model="keyword.container[0].type" size="mini">
            <el-option label="冷藏" value="冷藏"></el-option>
            <el-option label="干货" value="干货"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分票信息">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入分票信息"
            v-model="keyword.container[0].votesMsg"
          ></el-input>
        </el-form-item>
        <el-form-item label="货箱重量">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入货箱重量"
            v-model.number="keyword.container[0].weight"
          ></el-input>
        </el-form-item>
        <el-form-item label="货箱比例">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入货箱比例 1*1*1"
            v-model="keyword.container[0].volume"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 分割线 -->
      <div class="client">
        <el-form-item label="委托人编号" prop="client.id">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入编号"
            v-model="keyword.client.id"
          ></el-input>
        </el-form-item>
        <el-form-item label="运单号">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入运单号"
            v-model="keyword.client.trackingNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="提单号">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入提单号"
            v-model="keyword.client.loadingNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="银行账单">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入银行账单"
            v-model="keyword.client.waybillNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入备注"
            v-model="keyword.client.remark"
          ></el-input>
        </el-form-item>
      </div>
      <!-- 分割线 -->
      <div class="ship">
        <el-form-item label="船公司ID" prop="ship.companyId">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入船公司ID"
            v-model.number="keyword.ship.companyId"
          ></el-input>
        </el-form-item>
        <el-form-item label="载重吨">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入载重吨"
            v-model.number="keyword.ship.weight"
          ></el-input>
        </el-form-item>
        <el-form-item label="船名/航次">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入船名"
            v-model="keyword.ship.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="起点港口" prop="startPort">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入起点港口"
            v-model="keyword.startPort"
          ></el-input>
        </el-form-item>
        <el-form-item label="途径港口">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入途径港口"
            v-model="keyword.middlePort"
          ></el-input>
        </el-form-item>
        <el-form-item label="终点港口" prop="endPort">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入终点港口"
            v-model="keyword.endPort"
          ></el-input>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入备注"
            v-model="keyword.ship.remark"
          ></el-input>
        </el-form-item>
      </div>
      <div class="button">
        <el-button type="primary" @click="send">完成</el-button>
      </div>
    </el-form>
  </div>
</template>
<script>
import request from "@/api/request";
export default {
  name: "CreateGoods",
  props: {
    type: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    // console.log(this.type);
  },
  data() {
    return {
      keyword: {
        type: this.type,
        startPort: null,
        middlePort: null,
        endPort: null,
        container: [
          {
            name: null,
            number: null,
            num: 1,
            type: null,
            votesMsg: null,
            weight: null,
            volume: null,
          },
        ],
        client: {
          id: null,
          trackingNumber: null,
          loadingNumber: null,
          waybillNumber: null,
          remark: null,
        },
        notifyPerson: [
          {
            name: null,
            phone: null,
            address: null,
            carNumber: null,
          },
        ],
        ship: {
          companyId: null,
          weight: null,
          name: null,
          remark: null,
        },
      },
      rule: {
        "client.id": [
          {
            required: true,
            message: "不能为空",
          },
        ],
        "container[0].number": [
          {
            required: true,
            message: "不能为空",
          },
        ],
        "ship.companyId": [
          {
            required: true,
            message: "不能为空",
          },
          {
            type: "number",
            message: "必须是数字",
          },
        ],
        "container[0].num": [
          {
            required: true,
            message: "不能为空",
          },
          {
            type: "number",
            message: "必须是数字",
          },
        ],
        startPort: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
        endPort: [
          {
            required: true,
            message: "不能为空",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    send() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await request({
            method: "post",
            url: "/api/order-management/order/b",
            data: this.keyword,
          })
            .then((res) => {
              // console.log(res);
              if (res.data.code !== "00000") {
                this.$notify({
                  title: "失败",
                  message: res.data.message,
                  type: "error",
                });
                return;
              }
              this.$emit("close");
            })
            .catch((err) => {
              this.$notify({
                title: "失败",
                message: err.message + " 请重试",
                type: "error",
              });
            });
        } else {
          this.$notify({
            title: "警告",
            message: "有的数据不合法",
            type: "warning",
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.Goods {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  background: #f8f9fa;
  .el-form {
    display: flex;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    .ship,
    .client,
    .goods {
      width: 100%;
      height: 27%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      background: #fff;
      padding: 10px;
      padding-left: 7%;
      box-sizing: border-box;
      border-radius: 12px;
    }
    .client {
      height: 19%;
    }

    .ship,
    .client {
      margin-top: 20px;
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
      ::v-deep .el-input__inner {
        background-color: #f6f6f6;
        border: 1px solid #f6f6f6;
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
    .button {
      margin-top: 6%;
      display: flex;
      justify-content: center;
      ::v-deep .el-button--primary {
        color: #fff;
        background-color: #3362f6;
        border-color: #3362f6;
        width: 100px;
      }
    }
  }
}
</style>