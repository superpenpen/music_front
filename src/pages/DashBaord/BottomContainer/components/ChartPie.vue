<template>
  <div class="pie-chart" ref="chart"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class PieChart extends Vue {
  private chart: any;
  mounted() {
    this.initChart();
  }
  beforeDestroy() {}
  initChart() {
    const chart: any = (this.chart = echarts.init(this.$refs.chart));
    let echartData = [
      {
        name: "A类",
        value: "20",
      },
      {
        name: "B类",
        value: "40",
      },
      {
        name: "C类",
        value: "60",
      },
      {
        name: "D类",
        value: "19",
      },
      {
        name: "E类",
        value: "36",
      },
    ];
    const option = {
      color: ["#64a9ff", "#50e5ff", "#3a73eb", "#0b2965", "#0652dc"],
      series: [
        {
          type: "pie",
          zlevel: 1,
          silent: true,
          radius: ["40%", "43%"],
          center: ["50%", "50%"],
          hoverAnimation: false,
          label: {
            normal: {
              show: false,
            },
          },
          color: "#6a91a7",
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [1],
        },
        {
          type: "pie",
          radius: ["56%", "80%"],
          center: ["50%", "50%"],
          data: echartData,
          // hoverAnimation: false,
          itemStyle: {
            normal: {
              //   borderColor: bgColor,
              borderWidth: 2,
            },
          },
          avoidLabelOverlap: false,
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold",
            },
          },
          labelLine: {
            show: false,
          },
          label: {
            show: false,
            position: "center",
            verticalAlign: "middle",
            align: "center",
            fontSize: 32,
            formatter: "{c}%",
          },
        },
      ],
    };
    let index = 0;
    function toogleHighlight() {
      chart.dispatchAction({
        type: "highlight",
        seriesIndex: 1,
        dataIndex: index,
      });

      chart.dispatchAction({
        type: "downplay",
        seriesIndex: 1,
        dataIndex: index - 1 < 0 ? echartData.length - 1 : index - 1,
      });
      if (index >= echartData.length-1) {
        index = 0;
      } else {
        index++;
      }
    }
    toogleHighlight()
    setInterval(toogleHighlight, 2000);

    chart.setOption(option);
    window.addEventListener("resize", this.chart.resize);
  }
}
</script>

<style scoped lang="scss">
.pie-chart {
  width: 200px;
  height: 100%;
}
</style>
