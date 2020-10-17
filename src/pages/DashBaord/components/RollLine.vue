<template>
  <div class="roll-line" ref="chart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import echarts from "echarts";
import { namespace } from "vuex-class";

@Component
export default class RollLine extends Vue {
  private chart: any;
  @Prop({ type: Boolean, default: true }) reverse!: boolean;
  @Prop({ type: String, default: "#6c50f3" }) color!: string;
  @Prop({ type: Boolean, default: false }) showxAxis!: boolean;
  @Prop({ type: String, default: "rgba(255,255,255,0)" }) opacityColor!: string;
  @Prop({ type: Array, default: () => [] }) chartData!: {
    [propName: string]: any;
  }[];
  private xAxisData: any[] = [];
  private seriesData: any[] = [];
  @Watch('chartData',{deep: true}) onChangeData(newData){
    this.undateChart(newData)
  }
  mounted() {
    this.initChart();
    console.log(this);
  }
  undateChart(newData:any[]) {
    this.xAxisData = newData.map((item) => item.time);
    this.seriesData = newData.map((item) => item.value);
    this.chart.setOption({
      xAxis: {
        data: this.xAxisData,
      },
      series: [
        {
          type: "line",
          data: this.seriesData,
        },
      ],
    })
  }
  addChartData(item: any) {
    this.xAxisData.unshift(item.time);
    this.seriesData.unshift(item.value);
    this.xAxisData.pop();
    this.seriesData.pop();
    this.chart.setOption({
      xAxis: {
        data: this.xAxisData,
      },
      series: [
        {
          type: "line",
          data: this.seriesData,
        },
      ],
    });
  }
  initChart() {
    console.log(this.chartData);
    this.xAxisData = this.chartData.map((item) => item.time);
    this.seriesData = this.chartData.map((item) => item.value);
    this.chart = echarts.init(this.$refs.chart);
    const option = {
      grid: {
        right: this.showxAxis ? "5%" : 0,
        left: this.showxAxis ? "5%" : 0,
        top: 0,
        bottom: this.showxAxis ? "30%" : 0,
      },
      xAxis: {
        show: this.showxAxis,
        boundaryGap: 0,
        type: "category",
        data: this.xAxisData.reverse(),
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
      },
      yAxis: {
        show: false,
        type: "value",
      },
      series: [
        {
          type: "line",
          data: this.seriesData.reverse(),
          symbol: "none",
          itemStyle: {
            color: this.color,
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: this.color,
                  },
                  {
                    offset: 0.5,
                    color: this.color,
                  },
                  {
                    offset: 1,
                    color: this.opacityColor,
                  },
                ],
                false
              ),
            },
          },
        },
      ],
    };
    this.chart.setOption(option);
    window.addEventListener("resize", this.chart.resize);
  }
  beforeDestroy() {
    this.chart && window.removeEventListener("resize", this.chart.resize);
  }
}
</script>

<style scoped lang="scss">
.roll-line {
  // height: 60px;
  width: 100%;
}
</style>
