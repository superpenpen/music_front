<template>
  <div class="chart-bar" ref="chart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class ChartBar extends Vue {
  chart: any;
  @Prop({ type: Number }) selTabName!: number;
  mounted() {
    this.initChart();
  }
  beforeDestroy() {
    this.chart && window.removeEventListener("resize", this.chart.resize);
  }
  initChart() {
    const chart: any = (this.chart = echarts.init(this.$refs.chart));
    const option = {
      tooltip: {
        trigger: "axis",
      },
      grid: {
        right: "3%",
        left: "5%",
        top: "8%",
        bottom: "10%",
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          data: ["08-05", "08-05", "08-05", "08-05", "08-05", "08-05", "08-05"],
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
      yAxis: [
        {
          type: "value",
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
          name: "主机异常",
          type: "bar",
          data: [1, 3, 2, 1, 6, 2, 2],
          itemStyle: {
            normal: {
              color: "#f85f5f",
            },
          },
        },
        {
          name: "漏洞",
          type: "bar",
          data: [1, 4, 5, 7, 3, 7, 8],
          itemStyle: {
            normal: {
              color: "#377eff",
            },
          },
        },
        {
          name: "基线弱点",
          type: "bar",
          data: [5, 2, 2, 3, 1, 2, 3],
          itemStyle: {
            normal: {
              color: "#68c027",
            },
          },
        },
        {
          name: "网站后门",
          type: "bar",
          data: [1, 4, 5, 7, 3, 7, 8],
          itemStyle: {
            normal: {
              color: "#68c027",
            },
          },
        },
      ],
    };
    this.chart.setOption(option);
    window.addEventListener("resize", this.chart.resize);
  }
}
</script>

<style scoped lang="scss">
.chart-bar {
}
</style>
