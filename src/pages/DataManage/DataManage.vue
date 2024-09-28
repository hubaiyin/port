<template>
  <div class="container">
    <div class="top">
      <div class="topbnt_left fl">
        <div @click="goBack">返回</div>
        <div>
          当前气温
          <div>34.6°C</div>
        </div>
        <div>
          风速风向
          <div>南风10m/s</div>
        </div>
        <div>
          湿度
          <div>98%</div>
        </div>
      </div>
      <div class="title">数据大屏展示</div>
      <div class="fr topbnt_right">
        <div>
          能见度
          <div>600m</div>
        </div>
        <div>
          潮汐数据
          <div>256cm</div>
        </div>
        <div>
          海流信息
          <div>160cm/s</div>
        </div>
        <div>
          降水量
          <div>300mm</div>
        </div>
      </div>
    </div>
    <div class="medium">
      <div class="left">
        <div class="table">
          <div
            style="
              height: 25px;
              text-align: center;
              margin-top: 9px;
              color: #fff;
            "
          >
            订单信息
          </div>
          <dv-scroll-board
            :config="config1"
            @click="getRows"
            style="width: 306px; height: 486px; margin-top: 5px"
          />
        </div>
        <div class="bottom">
          <div
            style="
              height: 25px;
              text-align: center;
              margin-top: 9px;
              color: #fff;
            "
          >
            港口设施利用情况
          </div>
          <echarts :chartOption="pieoption"></echarts>
        </div>
      </div>
      <div class="center">
        <div class="video">
          <div
            style="
              height: 25px;
              text-align: center;
              margin-top: 14px;
              color: #fff;
            "
          >
            港口运营效率指标
          </div>
          <video
            id="video"
            autoplay
            src="../../../public/VCG2225737793.mp4"
          ></video>
        </div>
        <div class="bottom">
          <div class="l">
            <div
              style="
                height: 25px;
                text-align: center;
                margin-top: 9px;
                color: #fff;
              "
            >
              港口运营效率指标
            </div>
            <echarts :chartOption="efflineoption"></echarts>
          </div>
          <div class="r">
            <div
              style="
                height: 25px;
                text-align: center;
                margin-top: 9px;
                color: #fff;
              "
            >
              港口运营效率指标
            </div>
            <echarts :chartOption="effbaroption"></echarts>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="table">
          <div
            style="
              height: 25px;
              text-align: center;
              margin-top: 9px;
              color: #fff;
            "
          >
            货物状态
          </div>
          <dv-scroll-board
            :config="config2"
            @click="getRows"
            style="width: 306px; height: 486px; margin-top: 5px"
          />
        </div>
        <div class="bottom">
          <div
            style="
              height: 25px;
              text-align: center;
              margin-top: 9px;
              color: #fff;
            "
          >
            港口设备报警情况
          </div>
          <dv-scroll-board
            :config="config3"
            @click="getRows"
            style="width: 306px; height: 316px; margin-top: 5px"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echarts from "@/component/Echarts.vue";
export default {
  components: { Echarts },
  name: "DataManage",
  data() {
    return {
      status: true,
      timer: null,
      config1: {
        header: ["IMO号", "目的地", "载货量", "航行状态"],
        data: [
          [
            "#1219810",
            "珍珠港",
            "3吨",
            '<span style="color:#7be7d2">航行中</span>',
          ],
          [
            "#1912810",
            "黄埔港",
            "2吨",
            '<span style="color:#7be7d2">航行中</span>',
          ],
          [
            "#1914810",
            "蛇口港",
            "4吨",
            '<span style="color:#e5f072">在港</span>',
          ],
          [
            "#1969810",
            "中山港",
            "3吨",
            '<span style="color:#e5f072">在港</span>',
          ],
          [
            "#1819810",
            "天津港",
            "3吨",
            '<span style="color:#7be7d2">航行中</span>',
          ],
          [
            "#1919840",
            "北海港",
            "4吨",
            '<span style="color:#7be7d2">航行中</span>',
          ],
          [
            "#1919710",
            "防城港",
            "3吨",
            '<span style="color:#e5f072">在港</span>',
          ],
          [
            "#1919812",
            "东莞港",
            "2吨",
            '<span style="color:#7be7d2">航行中</span>',
          ],
          [
            "#1912712",
            "北海港",
            "3吨",
            '<span style="color:#e5f072">在港</span>',
          ],
          [
            "#1719812",
            "东莞港",
            "2吨",
            '<span style="color:#e5f072">在港</span>',
          ],
        ],
        rowNum: 8,
        columnWidth: [82, 65, 65],
      },
      config2: {
        header: ["货物编号", "货物描述", "运输状态"],
        data: [
          ["#A23901", "生鸡肉", '<span style="color:#7be7d2">已送达</span>'],
          ["#A23801", "鲍鱼", '<span style="color:#e2e770">在途</span>'],
          ["#A23904", "冰箱", '<span style="color:#7be7d2">已送达</span>'],
          ["#A21901", "芯片", '<span style="color:#e2e770">在途</span>'],
          ["#A24921", "显卡", '<span style="color:#e2e770">在途</span>'],
          ["#A23701", "原料", '<span style="color:#7be7d2">已送达</span>'],
          ["#A23941", "矿石", '<span style="color:#7be7d2">已送达</span>'],
          ["#A21961", "龙虾", '<span style="color:#e2e770">在途</span>'],
          ["#A28721", "电脑主板", '<span style="color:#7be7d2">已送达</span>'],
          ["#A24991", "CPU", '<span style="color:#e2e770">在途</span>'],
        ],
        rowNum: 8,
      },
      config3: {
        header: ["警报区域", "发生时间", "警报等级"],
        data: [
          [
            "停车场",
            "2023-12-16 17:16",
            '<span style="color:#ff0339">三级</span>',
          ],
          [
            "停车场",
            "2023-5-11 08:06",
            '<span style="color:#2e98d4">一级</span>',
          ],
          ["港口", "2023-5-9 17:24", '<span style="color:#e5f072">二级</span>'],
          ["港口", "2022-3-18 7:16", '<span style="color:#2e98d4">一级</span>'],
          [
            "停车场",
            "2023-3-16 15:16",
            '<span style="color:#2e98d4">一级</span>',
          ],
          [
            "港口",
            "2023-1-16 14:16",
            '<span style="color:#e5f072">二级</span>',
          ],
          [
            "港口",
            "2022-12-16 17:16",
            '<span style="color:#e5f072">二级</span>',
          ],
          [
            "港口",
            "2021-12-16 11:16",
            '<span style="color:#e5f072">二级</span>',
          ],
          [
            "停车场",
            "2021-11-16 15:16",
            '<span style="color:#2e98d4">一级</span>',
          ],
          [
            "港口",
            "2021-10-16 14:16",
            '<span style="color:#e5f072">二级</span>',
          ],
        ],
        rowNum: 8,
        columnWidth: [82, 135, 90],
      },
      pieoption: {
        tooltip: {
          trigger: "item",
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: "50%",
            data: [
              { value: 1048, name: "码头占用率" },
              { value: 735, name: "仓库空间使用情况" },
              { value: 580, name: "堆场使用情况" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      },
      warnoption: {
        tooltip: {
          trigger: "axis",
        },
        grid: {
          top: "12%",
          left: "14%",
          right: "8%",
          bottom: "8%",
        },
        xAxis: {
          data: [
            "2001-04-11",
            "2001-04-12",
            "2001-04-13",
            "2001-04-14",
            "2001-04-15",
            "2001-04-16",
            "2001-04-17",
            "2001-04-18",
            "2001-04-19",
            "2001-04-20",
            "2001-04-21",
            "2001-04-22",
            "2001-04-23",
            "2001-04-24",
            "2001-04-25",
            "2001-04-26",
            "2001-04-27",
            "2001-04-28",
            "2001-04-29",
            "2001-04-30",
            "2001-05-01",
            "2001-05-02",
            "2001-05-03",
            "2001-05-04",
            "2001-05-05",
            "2001-05-06",
            "2001-05-07",
            "2001-05-08",
            "2001-05-09",
            "2001-05-10",
            "2001-05-11",
            "2001-05-12",
            "2001-05-13",
            "2001-05-14",
            "2001-05-15",
            "2001-05-16",
          ],
        },
        yAxis: {},
        visualMap: {
          show: false,
          pieces: [
            {
              gt: 0,
              lte: 50,
              color: "#93CE07",
            },
            {
              gt: 50,
              lte: 100,
              color: "#FBDB0F",
            },
            {
              gt: 100,
              lte: 150,
              color: "#FC7D02",
            },
            {
              gt: 150,
              lte: 200,
              color: "#FD0100",
            },
            {
              gt: 200,
              lte: 300,
              color: "#AA069F",
            },
            {
              gt: 300,
              color: "#AC3B2A",
            },
          ],
        },
        series: {
          name: "报警次数",
          type: "line",
          data: [
            129, 64, 61, 79, 121, 130, 150, 205, 154, 81, 140, 119, 156, 72,
            108, 124, 94, 157, 100, 158, 277, 332, 303, 238, 500, 99, 93, 104,
            74, 68, 90, 114, 142, 126, 185, 402,
          ],
          markLine: {
            silent: true,
            lineStyle: {
              color: "#333",
            },
          },
        },
      },
      efflineoption: {
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "Email",
            type: "line",
            stack: "Total",
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "Union Ads",
            type: "line",
            stack: "Total",
            data: [220, 182, 191, 234, 290, 330, 310],
          },
        ],
      },
      effbaroption: {
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          data: ["Rainfall", "Evaporation"],
        },
        xAxis: [
          {
            type: "category",
            // prettier-ignore
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "Rainfall",
            type: "bar",
            data: [
              2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4,
              3.3,
            ],
          },
          {
            name: "Evaporation",
            type: "bar",
            data: [
              2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0,
              2.3,
            ],
          },
        ],
      },
    };
  },
  mounted() {
    // console.log(this.data);
    this.$router.afterEach(() => {
      clearInterval(this.timer);
      console.log("bye");
    });
    const video = document.querySelector("#video");
    video.addEventListener("ended", () => {
      video.currentTime = 0;
      video.play();
    });
  },
  methods: {
    getRows(config) {
      console.log("config", config.row);
    },
    goBack() {
      this.$router.push({ path: "/manage" });
    },
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
  height: 1080px;
  width: 1920px;
  box-sizing: border-box;
  padding: 0 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #e9e7e7;
  background-image: url("../../../public/bg.jpg");
  // background: linear-gradient(#193eae, #0b31a3  , #132d78);
  .top {
    display: flex;
    height: 90px;
    width: 100%;
    margin-bottom: 15px;
    justify-content: space-between;
    .topbnt_left,
    .topbnt_right {
      height: 50px;
      width: 500px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      align-self: flex-end;
      div {
        background-image: url("../../../public/bnt.png");
        background-size: auto;
        background-repeat: no-repeat;
        width: 91px;
        height: 35px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
        position: relative;
        div {
          display: none;
        }
      }
      div:hover {
        background-image: url("../../../public/bntactive.png");
        div {
          display: block;
          position: absolute;
        }
      }
    }
    .title {
      line-height: 90px;
      font-size: 46px;
      font-weight: bold;
    }
  }
  .medium {
    height: 930px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left {
      .table {
        height: 548px;
        width: 341px;
        background-image: url("../../../public/arightboxtop.png");
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .bottom {
        height: 376px;
        width: 342px;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        background-image: url("../../../public/aleftboxtbott.png");
      }
    }
    .center {
      width: 1140px;
      .video {
        width: 1140px;
        height: 554px;
        background-image: url("../../../public/amiddboxttop.png");
        background-size: contain;
        display: flex;
        flex-direction: column;
        video {
          height: 486px;
          margin-top: 10px;
        }
      }
      .bottom {
        margin-top: 10px;
        display: flex;
        justify-content: space-around;
        .l {
          height: 374px;
          width: 561px;
          background-image: url(('../../../public/amiddboxtbott1.png'));
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .r {
          height: 376px;
          width: 574px;
          background-image: url(('../../../public/amiddboxtbott2.png'));
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      }
    }
    .right {
      .table {
        height: 548px;
        width: 341px;
        background-image: url("../../../public/arightboxtop.png");
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .bottom {
        height: 376px;
        width: 342px;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 10px;
        background-image: url("../../../public/aleftboxtbott.png");
      }
    }
  }
}
</style>
