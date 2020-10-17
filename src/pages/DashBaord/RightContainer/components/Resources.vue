<template>
  <div class="resources">
    <div class="circle5">
      <div class="circle4">
        <div class="circle3">
          <div class="circle2">
            <div class="circle1">
              <div class="liquid-fill" ref="chart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="list">
      <div class="item">
        <div class="left">
          <div class="box-show-circle red">
            <div class="inner"></div>
          </div>
          <div class="label">CPU评分</div>
        </div>
        <div class="score">86</div>
      </div>
      <div class="item">
        <div class="left">
          <div class="box-show-circle red">
            <div class="inner"></div>
          </div>
          <div class="label">内存评分</div>
        </div>
        <div class="score">78</div>
      </div>
      <div class="item">
        <div class="left">
          <div class="box-show-circle yel">
            <div class="inner"></div>
          </div>
          <div class="label">磁盘评分</div>
        </div>
        <div class="score">78</div>
      </div>
      <div class="item">
        <div class="left">
          <div class="box-show-circle gre">
            <div class="inner"></div>
          </div>
          <div class="label">GPU评分</div>
        </div>
        <div class="score">78</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";
import echarts from "echarts";
import "echarts-liquidfill";
@Component
export default class Resources extends Vue {
  private chart: any;
  mounted() {
    this.initChart();
  }
  beforeDestroy() {}
  initChart() {
    const chart: any = (this.chart = echarts.init(this.$refs.chart));
    const option = {
      // grid: {
      //   top: "2.5%",
      //   right: "40",
      //   bottom: "2.5%",
      //   left: 0,
      // },
      series: [
        {
          type: "liquidFill",
          radius: "96%", // 半径大小
          center: ["50%", "50%"], // 布局位置
          data: [0.4, 0.4], // 水球波纹值
          backgroundStyle: "rgba(0,0,0,0)",
          // color: new echarts.graphic.RadialGradient(0.6, 0, 1, [
          //   {
          //     offset: 0,
          //     color: "#f00",
          //   },
          //   {
          //     offset: 1,
          //     color: "#0f0",
          //   },
          // ]),
          label: {
            show: true,
            color: "#fff",
            insideColor: "#fff",
            fontSize: 20,
            fontWeight: "bold",
            align: "center",
            baseline: "middle",
            position: "inside",
          },
          outline: {
            // 轮廓设置
            show: true,
            borderDistance: 0, // 轮廓间距
            itemStyle: {
              borderColor: "rgb(0, 160, 233)", // 轮廓颜色
              borderWidth: 2, // 轮廓大小
              shadowBlur: "none", // 轮廓阴影
            },
          },
        },
      ],
    };
    chart.setOption(option);
    window.addEventListener("resize", this.chart.resize);
  }
}
</script>

<style scoped lang="scss">
.resources {
  display: flex;
  align-items: center;
}
.circle5 {
  background: url(../../../../assets/dashBaord/cr5.png) no-repeat;
  width: 214px;
  height: 214px;
  position: relative;
  .circle4 {
    width: 180px;
    height: 180px;
    background: url(../../../../assets/dashBaord/cr4.png) no-repeat;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    .circle3 {
      width: 144px;
      height: 144px;
      background: url(../../../../assets/dashBaord/cr3.png) no-repeat;
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      margin: auto;
      .circle2 {
        width: 132px;
        height: 132px;
        background: url(../../../../assets/dashBaord/cr2.png) no-repeat;
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        margin: auto;
        .circle1 {
          width: 116px;
          height: 116px;
          background: url(../../../../assets/dashBaord/cr1.png) no-repeat;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
        .liquid-fill {
          width: 90px;
          height: 90px;
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          right: 0;
          margin: auto;
        }
      }
    }
  }
}
.list {
  flex: 1;
  margin-left: 42px;
  padding: 10px 0;
  height:100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.item {
  display: flex;
  flex-direction: row;
  // height: 48px;
  color: #fff;
  font-size: 14px;
  justify-content: space-between;
  align-items: center;
  padding-right: 4px;
  font-weight: bold;
  .box-show-circle {
    font-family: "PangMenZhengDao";

    &.red {
      border: 1px solid #f9173c;
      background: radial-gradient(rgba(0, 0, 0, 0), #f9173c);
      .inner {
        background: #840f2a;
        border: 1px solid #f9173c;
      }
    }
    &.yel {
      border: 1px solid #f99901;
      background: radial-gradient(rgba(0, 0, 0, 0), #f99901);
      .inner {
        background: #814916;
        border: 1px solid #f99901;
      }
    }
    &.gre {
      border: 1px solid #21e968;
      background: radial-gradient(rgba(0, 0, 0, 0), #21e968);
      .inner {
        background: #137e40;
        border: 1px solid #21e968;
      }
    }
    width: 22px;
    height: 22px;
    border-radius: 50%;
    position: relative;
    margin-right: 10px;
    .inner {
      width: 10px;
      height: 10px;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      margin: auto;
      border-radius: 50%;
    }
  }
  .left {
    display: flex;
    align-items: center;
  }
}
</style>
