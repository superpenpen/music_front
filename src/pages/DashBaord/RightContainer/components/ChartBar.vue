<template>
  <div class="chart-line" ref="chart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class ChartBar extends Vue {
  private chart: any;
  mounted() {
    this.initChart();
  }
  beforeDestroy() {
    this.chart && window.removeEventListener("resize", this.chart.resize);
  }
  initChart() {
    var data = [
      {
        ny: "1月",
        bl: 50,
      },
      {
        ny: "2月",
        bl: 40,
      },
      {
        ny: "3月",
        bl: 20,
      },
      {
        ny: "4月",
        bl: 10,
      },
      {
        ny: "5月",
        bl: 0,
      },
      {
        ny: "6月",
        bl: 11,
      },
      {
        ny: "7月",
        bl: 100,
      },
      {
        ny: "8月",
        bl: 33,
      },
    ];
    var xData = [],
      yData = [];
    var seriesdata_bj = [];

    data.map(function (a, b) {
      xData.push(a.ny);
      if (a.bl === 0) {
        yData.push({ name: a.ny, value: a.bl });
      } else {
        yData.push({ name: a.ny, value: a.bl });
      }
      seriesdata_bj.push(100);
    });
    const chart: any = (this.chart = echarts.init(this.$refs.chart));
    const option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "line",
          lineStyle: {
            opacity: 0,
          },
        },
      },
      grid: {
        left: 2,
        right: 2,
        bottom: "5%",
        top: 2,
        containLabel: true,
        z: 22,
      },
      xAxis: [
        {
          type: "category",
          data: [
            "8:00",
            "9:00",
            "10:00",
            "11:00",
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
          ],
          axisTick: {
            alignWithLabel: true,
            show: false,
          },
          // offset: 20,
          axisLine: {
            lineStyle: {
              color: "rgb(181, 181, 181)",
              type: "dashed",
            },
          },
          axisLabel: {
            show: true,
            color: "rgb(116, 119, 130)",
          },
        },
      ],
      yAxis: [
        {
          type: "value",
          show: false,
          max: 100,
          min: 0,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#0c3b71",
            },
          },
          axisLabel: {
            show: false,
            color: "black",
            formatter: "{value}%",
          },
        },
      ],
      series: [
        {
          name: "使用率",
          type: "bar",
          barWidth: "15%",
          barGap: "-85%",
          itemStyle: {
            normal: {
              barBorderRadius: 30,
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(8,113,254)",
                },
                {
                  offset: 1,
                  color: "rgb(28,199,255)",
                },
              ]),
            },
          },
          data: [30, 50, 10, 70, 90, 30, 50, 10, 70],
          zlevel: 11,
        },
        {
          name: "总比",
          type: "bar",
          barWidth: "10%",
          barGap: "-85%",
          data: [100, 100, 100, 100, 100, 100, 100, 100, 100],
          itemStyle: {
            normal: {
              color: "rgb(41, 49, 84)",
              barBorderRadius: 30,
            },
          },
          zlevel: 9,
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
  // min-height: 200px;
}
</style>