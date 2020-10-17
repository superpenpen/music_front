<template>
  <div class="chart-gauge" ref="chart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class PieChart extends Vue {
  private chart: any;
  @Prop({ type: Number, default: 0 }) number!: number;
  mounted() {
    this.initChart();
  }
  beforeDestroy() {}
  initChart() {
    const chart: any = (this.chart = echarts.init(this.$refs.chart));
    const { number } = this;
    const option = {
      series: [
        {
          name: "数字",
          type: "gauge",
          radius: "98%",
          center: ["50%", "56%"],
          // detail: {
          //   formatter: "{value}%",
          // },
          splitLine: {
            show: false,
          },
          axisTick: {
            length: 6,
            splitNumber: 2,
            lineStyle: {
              color: "#03f0fa",
              width: 1,
              opacity: 0.5,
            },
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          detail: {
            formatter: "{value}",
            offsetCenter: ["0", "1%"],
            textStyle: {
              fontSize: 24,
              color: "#fff",
            },
          },
          pointer: {
            show: false,
          },
          data: [
            {
              value: number,
            },
          ],
          z: 12,
        },
        {
          name: "刻度盘",
          type: "gauge",
          radius: "98%",
          center: ["50%", "56%"],
          z: 5,
          detail: {
            formatter: "{value}%",
            show: false,
          },
          splitLine: {
            length: 8,
            lineStyle: {
              color: "#03f0fa",
              width: 2,
            },
          },
          axisTick: {
            length: 6,
            splitNumber: 2,
            lineStyle: {
              color: "#03f0fa",
              width: 1,
              opacity: 0.5,
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 6,
              color: [[1, "#12315a"]],
            },
          },
          axisLabel: {
            distance: 3,
            color: "#fff",
            fontSize: 10,
          },
          // detail: {
          //   show: false,
          // },
        },
        {
          name: "指针下半圆背景",
          type: "gauge",
          z: 2,
          radius: "87%",
          center: ["50%", "56%"],
          // axisLine: {
          //   lineStyle: {
          //     color: [[1, "19356b"]],
          //     width: 7,
          //     opacity: 0.7,
          //   },
          // },
          axisLine: {
            show: true,
            lineStyle: {
              width: 6,
              color: [[1, "#12315a"]],
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          pointer: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          detail: {
            show: false,
          },
        },
        {
          name: "指针下半圆渐变",
          type: "gauge",
          z: 2,
          radius: "80%",
          center: ["50%", "56%"],
          axisLine: {
            lineStyle: {
              color: [
                [
                  1,
                  new echarts.graphic.RadialGradient(0.5, 0.5, 0.5, [
                    {
                      offset: 0,
                      color: "rgba(0,0,0,0)",
                    },
                    {
                      offset: 1,
                      color: "#0f215b",
                    },
                  ]),
                ],
              ],
              width: 30,
              opacity: 0.7,
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          pointer: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          detail: {
            show: 0,
          },
        },
        {
          name: "圆形刻度外圆环",
          type: "gauge",
          z: 2,
          radius: "40%",
          center: ["50%", "56%"],
          startAngle: 225,
          endAngle: -134,
          detail: {
            show: false,
          },
          pointer: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 2,
              color: [
                [(number - number * 0.25) / 100, "#2361ea"],
                [1, "#2C3638"],
              ],
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          data: [
            {
              value: number,
            },
          ],
        },
        {
          name: "圆形刻度",
          type: "gauge",
          z: 2,
          radius: "36%",
          center: ["50%", "56%"],
          startAngle: 225,
          endAngle: -134,
          detail: {
            show: false,
          },
          pointer: {
            show: false,
          },
          axisLine: {
            show: true,
            lineStyle: {
              width: 6,
              color: [
                [(number - number * 0.25) / 100, "#2361ea"],
                [1, "#2C3638"],
              ],
            },
          },
          splitLine: {
            length: 6,
            lineStyle: {
              color: "#373d4e",
            },
          },
          axisTick: {
            length: 6,
            splitNumber: 6,
            lineStyle: {
              color: "#373d4e",
              width: 2,
            },
          },
          axisLabel: {
            show: false,
          },
          data: [
            {
              value: number,
            },
          ],
        },
        {
          name: "指针下半圆背景active",
          type: "gauge",
          z: 2,
          radius: "87%",
          center: ["50%", "56%"],
          axisLine: {
            show: true,
            lineStyle: {
              width: 6,
              color: [
                [number / 100, "#3c74f0"],
                [1, "#12315a"],
              ],
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          pointer: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          detail: {
            show: false,
          },
        },
        {
          name: "指针下半圆渐变active",
          type: "gauge",
          z: 2,
          radius: "80%",
          center: ["50%", "56%"],
          axisLine: {
            lineStyle: {
              color: [
                [
                  number / 100,
                  new echarts.graphic.RadialGradient(1.3, 0.5, 1, [
                    {
                      offset: 0,
                      color: "rgba(0,0,0,0)",
                    },
                    {
                      offset: 1,
                      color: "#336fed",
                    },
                  ]),
                ],
                [1, "rgba(0,0,0,0)"],
              ],
              width: 30,
              opacity: 0.7,
            },
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
          pointer: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          detail: {
            show: 0,
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
.chart-gauge {
  width: 200px;
  height: 100%;
}
</style>
