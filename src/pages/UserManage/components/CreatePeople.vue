<template>
  <div class="box">
    <el-form
      v-show="!isShow"
      ref="form"
      :model="inform"
      label-width="125px"
      :rules="rule"
    >
      <div class="goods">
        <el-form-item label="姓名" prop="name">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入姓名"
            v-model="inform.name"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门ID" prop="departmentId">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入部门ID"
            v-model.number="inform.departmentId"
          ></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="job">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入部门"
            v-model="inform.job"
          ></el-input>
        </el-form-item>
        <el-form-item label="工号" prop="jobNumber">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入工号"
            v-model="inform.jobNumber"
          ></el-input>
        </el-form-item>
        <el-form-item label="学历">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入学历"
            v-model="inform.education"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select
            v-model.number="inform.gender"
            placeholder="请选择性别"
            size="mini"
          >
            <el-option label="男" :value="1"> </el-option>
            <el-option label="女" :value="0"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入职位"
            v-model="inform.position"
          ></el-input>
        </el-form-item>
        <el-form-item label="户口所在地">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入户口所在地"
            v-model="inform.address"
          ></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入年龄"
            v-model.number="inform.age"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话号码" prop="phone">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入电话号码"
            v-model.number="inform.phone"
          ></el-input>
        </el-form-item>
        <el-form-item label="婚姻状态">
          <el-select
            v-model="inform.maritalStatus"
            placeholder="请选择"
            size="mini"
          >
            <el-option label="已婚" value="已婚"> </el-option>
            <el-option label="未婚" value="未婚"> </el-option>
            <el-option label="离异" value="离异"> </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入籍贯"
            v-model="inform.nativePlace"
          ></el-input>
        </el-form-item>
        <el-form-item label="健康状态">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入健康状态"
            v-model="inform.healthStatus"
          ></el-input>
        </el-form-item>
        <el-form-item label="政治面貌">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入政治面貌"
            v-model="inform.politicCountenance"
          ></el-input>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入民族"
            v-model="inform.nation"
          ></el-input>
        </el-form-item>
        <el-form-item label="职位意向">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入职位意向"
            v-model="inform.jobIntention"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入邮箱"
            v-model="inform.email"
          ></el-input>
        </el-form-item>
        <el-form-item label="教育背景">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入教育背景"
            v-model="inform.educationalBackground"
          ></el-input>
        </el-form-item>
        <el-form-item label="工作经历">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入工作经历"
            v-model="inform.workingExperience"
          ></el-input>
        </el-form-item>
        <el-form-item label="英语水平">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入英语水平"
            v-model="inform.englishLevel"
          ></el-input>
        </el-form-item>
        <el-form-item label="计算机水平">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入计算机水平"
            v-model="inform.computerLevel"
          ></el-input>
        </el-form-item>
        <el-form-item label="普通话水平">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入普通话水平"
            v-model="inform.mandarinLevel"
          ></el-input>
        </el-form-item>
        <el-form-item label="其他技能">
          <el-input
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入其他技能"
            v-model="inform.otherSkills"
          ></el-input>
        </el-form-item>
        <el-form-item label="自我评价">
          <el-input
            type="textarea"
            :rows="2"
            size="mini"
            style="padding-right: 15px"
            placeholder="请输入自我评价"
            v-model="inform.selfAssessment"
          ></el-input>
        </el-form-item>
      </div>
      <div class="button">
        <el-button type="primary" @click="send">点击生成验证码</el-button>
      </div>
    </el-form>
    <div class="showCode" v-show="isShow">
      <h3>
        邀请码将于<strong>{{ time }}失效</strong>
      </h3>
      <h2>电话号码：{{ inform.phone }}</h2>
      <h2>
        邀请码：<strong style="color: red">{{ code }}</strong>
      </h2>
    </div>
  </div>
</template>

<script>
import request from "@/api/request";
export default {
  name: "CreatePeople",
  data() {
    return {
      inform: {
        name: null,
        departmentId: null,
        job: null,
        jobNumber: null,
        education: null,
        gender: 0,
        position: null,
        address: null,
        age: null,
        phone: null,
        avatarUrl: "http://dummyimage.com/100x100",
        maritalStatus: null,
        nativePlace: null,
        healthStatus: null,
        politicCountenance: null,
        nation: null,
        jobIntention: null,
        email: null,
        educationalBackground: null,
        workingExperience: null,
        englishLevel: null,
        computerLevel: null,
        mandarinLevel: null,
        otherSkills: null,
        selfAssessment: null,
      },
      rule: {
        name: [{ required: true, message: "必须填写姓名" }],
        departmentId: [{ required: true, message: "必须填写部门ID" }],
        job: [{ required: true, message: "必须填写部门" }],
        jobNumber: [{ required: true, message: "必须填写工号" }],
        position: [{ required: true, message: "必须填写职位" }],
        age: [{ required: true, message: "必须填写年龄" }],
        phone: [{ required: true, message: "必须填写电话号码" }],
        address: [{ required: true, message: "必须填写位置" }],
        nation: [{ required: true, message: "必须填写民族" }],
        email: [{ required: true, message: "必须填写邮箱" }],
      },
      time: "",
      code: "",
      isShow: false,
    };
  },
  methods: {
    send() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          await request({
            method: "post",
            url: "/api/register/invite-code",
            data: this.inform,
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
              // this.time = new Date(res.data.data.expirationTime);
              this.time = this.$moment(res.data.data.expirationTime).format(
                "YYYY-MM-DD hh:mm:ss"
              );
              this.code = res.data.data.inviteCode;
              this.isShow = true;
            })
            .catch(() => {
              this.$notify({
                title: "失败",
                message: "请重试",
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
.box {
  height: 100%;
  width: 100%;
  .el-form {
    display: flex;
    width: 100%;
    height: 550px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    flex-wrap: wrap;
    .goods {
      width: 100%;
      height: 85%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      background: #fff;
      padding: 10px;
      padding-left: 3%;
      box-sizing: border-box;
      border-radius: 12px;
    }
    .el-form-item {
      margin-bottom: 0 !important;
      margin-left: 3%;
      width: 30%;
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
      ::v-deep .el-input__inner {
        background-color: #f6f6f6;
        border: 1px solid #f6f6f6;
      }
    }
    .button {
      margin-top: 3%;
      display: flex;
      justify-content: center;
      ::v-deep .el-button--primary {
        color: #fff;
        background-color: #3362f6;
        border-color: #3362f6;
      }
    }
  }
  .showCode {
    height: 250px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h2 {
      margin-top: 60px;
    }
  }
}
</style>