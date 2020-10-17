<template>
  <div class="chart-line" ref="chart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class ChartLine extends Vue {
  @Prop({ type: Array, default: () => [] }) chartData!: {
    [propName: string]: any;
  }[];
  private chart: any;
  mounted() {
    this.initChart();
  }
  beforeDestroy() {
    this.chart && window.removeEventListener("resize", this.chart.resize);
  }
  initChart() {
    console.log(this.chartData)
    const xAxisData = this.chartData.map((item) => item.time);
    const seriesData = this.chartData.map((item) => item.value);
    const chart: any = (this.chart = echarts.init(this.$refs.chart));
    const option = {
      grid: {
        right: 1,
        left: 1,
        top: 3,
        bottom: "10%",
      },
      xAxis: {
        boundaryGap: false,
        data: xAxisData,
        axisLine: {
          lineStyle: {
            color: "#9a9ca0",
            width: 2,
          },
        },
        splitLine: {
          //坐标轴在 grid 区域中的分隔线。
          show: true,
          lineStyle: {
            color: "#3f424b",
          },
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#9a9ca0",
        },
      },
      yAxis: [
        {
          boundaryGap: [0, "50%"],
          type: "time",
          axisLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          splitLine: {
            show: false,
          },
        },
      ],
      series: [
        {
          name: "成交",
          type: "line",
          smooth: true,
          symbol: "none",
          stack: "a",
          lineStyle: {
            normal: {
              width: 4,
              color: {
                type: "linear",

                colorStops: [
                  {
                    offset: 0,
                    color: "#7e27e8", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "#32eeff", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
          },
          areaStyle: {
            normal: {
              //barBorderRadius: 7,
              color: new echarts.graphic.LinearGradient(0, 0, 1, 1, [
                {
                  offset: 0,
                  color: "#7e27e8",
                },
                {
                  offset: 0,
                  color: "#7e27e8",
                },
                {
                  offset: 1,
                  color: "#32eeff",
                },
                {
                  offset: 1,
                  color: "#32eeff",
                },
              ]),
            },
          },
          data: seriesData
        },
      ],
    };
    chart.setOption(option);
    window.addEventListener("resize", this.chart.resize);
  }
}
</script>

<style scoped lang="scss">
.chart-line {
  flex:1;
  // height: 300px;
}
</style>
