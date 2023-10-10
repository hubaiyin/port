<template>
  <div class="container">
    <div class="header">
      <div class="back" @click="goBack()">
        <div class="icon">
          <img src="../../assets/back.png" alt="" />
        </div>
        <span>返回</span>
      </div>
      <div class="title">
        <div class="icon">
          <img src="../../assets/data.png" alt="" />
        </div>
        <span>污染监测</span>
      </div>
    </div>
    <div class="content">
      <div class="charts">
        <div class="chart double" v-for="item in datas" :key="item.title.text">
          <dv-border-box-11 :title="item.title.text"
            ><div class="chartBox">
              <Charts :chartOption="item" /></div
          ></dv-border-box-11>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Charts from "@/component/Echarts.vue";
export default {
  name: "DataManage",
  components: { Charts },
  data() {
    return {
      status: true,
      timer: null,
    };
  },
  mounted() {
    // console.log(this.data);
    this.getDatas({ url: "/api/iot/sensor/data", that: this });
    this.timer = setInterval(() => {
      this.getDatas({ url: "/api/iot/sensor/data", that: this });
    }, 5000);
    this.$router.afterEach(() => {
      clearInterval(this.timer);
      console.log("bye");
    });
  },
  methods: {
    ...mapActions("charts", ["getDatas"]),
    goBack() {
      this.$router.push({ path: "/manage" });
    },
  },
  computed: {
    ...mapGetters("charts", ["datas"]),
  },
  watch: {
    status: {
      handler() {
        clearInterval(this.timer);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e9e7e7;
  background-image: linear-gradient(to top, #292f84, #281dbb, #2b2d9d);
  // background: linear-gradient(#193eae, #0b31a3  , #132d78);
  .header {
    // border: 2px solid red;
    margin-top: 0.5%;
    width: 99%;
    height: 8%;
    display: flex;
    // align-items: center;
    .back {
      // border: 2px solid green;
      display: flex;
      align-items: center;
      justify-content: center;
      .icon {
        cursor: pointer;
        // border: 2px solid red;
        width: 50%;
        height: 80%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        cursor: pointer;
        font-family: "novence", "半展开", "粗体";
        font-size: 1.5rem;
      }
    }
    .title {
      // border: 2px solid green;
      width: 70%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 8%;
      .icon {
        // border: 2px solid red;
        width: 6%;
        height: 100%;
        margin-right: 0.9%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      span {
        font-family: "novence", "半展开", "粗体";
        font-size: 4rem;
        box-sizing: border-box;
        padding-bottom: 1%;
        font-weight: 700;
      }
    }
  }
  .content {
    flex: 1;
    box-sizing: border-box;
    width: 99%;
    // border: 1px solid rebeccapurple;
    margin-bottom: 0.2%;
    display: flex;
    flex-direction: column;
    align-items: center;

    .charts {
      flex: 1;
      width: 100%;
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      align-items: center;
      box-sizing: border-box;
      padding-bottom: 0.3%;
      .chart {
        width: 49.5%;
        height: 32%;
        // background: rgba($color: #091942, $alpha: 0.1);
        border-radius: 30px;
        .chartBox {
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>