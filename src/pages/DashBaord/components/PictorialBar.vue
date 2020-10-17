<template>
  <div class="pictorial-bar" ref="chart"></div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import echarts from "echarts";
@Component
export default class PictorialBar extends Vue {
  private chart: any;
  // number: 0;
  @Prop({ type: Number, default: 0 }) number!: number;
  @Prop({ type: String, default: "%" }) unit!: string;
  @Prop({ type: String, default: "标题" }) title!: string;
  @Prop({ type: String, default: "#fff" }) titleColor!: string;
  @Prop({ type: String, default: "副标题" }) subTitle!: string;
  @Prop({ type: String, default: "#fff" }) subTitleColor!: string;
  @Prop({ type: Boolean, default: true }) showTitle!: boolean;
  @Prop({ type: Boolean, default: true }) showNumber!: boolean;
  @Prop({ type: String, default: "#fff" }) numberColor!: string;
  @Prop({ type: Array, default: () => [4, 32] }) symbolSize!: number[];
  @Prop({ type: Number, default: 2 }) symbolMargin!: number;
  @Prop({ type: Array, default: () => [78, 90] }) region!: [number, number];
  @Prop({ type: Array, default: () => ["#183143", "#33244c", "#542526"] })
  colors!: [string, string, string];
  @Prop({ type: Array, default: () => ["#40aeff", "#ba61ff", "#ff3a42"] })
  activeColors!: [string, string, string];
  @Watch("number") function(newVal: number) {
    this.$nextTick(() => {
      this.updateChart();
    });
  }
  mounted() {
    this.initChart();
  }
  updateChart() {
    const lv = this.region;
    const val = this.number > 100 ? 100 : this.number;
    this.chart.setOption({
      title: {
        show: this.showNumber,
        text: (val || 0) + this.unit,
      },
      grid: {
        right: this.showNumber ? 70 : 1,
        left: this.showTitle ? 54 : 1,
        top: 0,
        bottom: 0,
      },
      series: [
        {
          name: "vl1",
          type: "pictorialBar",
          data: [val > lv[0] ? lv[0] : val],
        },
        {
          name: "vl2",
          type: "pictorialBar",
          data: [val > lv[1] ? lv[1] : val],
        },
        {
          name: "vl3",
          type: "pictorialBar",
          data: [val > 100 ? 100 : val],
        },
      ],
      yAxis: {
        show: this.showTitle,
        axisLabel: {
          formatter:
            "{back| " + this.title + " }\n{downTxt|" + this.subTitle + "}",
        },
      },
    });
  }
  initChart() {
    const chart: any = (this.chart = echarts.init(this.$refs.chart));
    const lv = this.region;
    const val = this.number > 100 ? 100 : this.number;
    const {
      colors,
      activeColors,
      symbolMargin,
      symbolSize,
      titleColor,
      subTitleColor,
      numberColor,
    } = this;
    const option = {
      backgroundColor: "rgba(0,0,0,0)",
      title: {
        show: this.showNumber,
        text: (val || 0) + this.unit,
        right: 0,
        // textAlign: 'center',
        textStyle: {
          color: numberColor,
          fontSize: 24,
          fontWeight: "bold",
          lineHeight: "36",
        },
      },
      grid: {
        right: this.showNumber ? 70 : 1,
        left: this.showTitle ? 54 : 1,
        top: 0,
        bottom: 0,
      },
      xAxis: [
        {
          type: "value",
          axisPointer: {
            type: "shadow",
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          splitLine: {
            show: false,
          },
          axisLabel: {
            show: false,
          },
        },
      ],
      yAxis: {
        type: "category",
        show: this.showTitle,
        inverse: true,
        axisLabel: {
          formatter:
            "{back| " + this.title + " }\n{downTxt|" + this.subTitle + "}",
          rich: {
            back: {
              align: "center",
              lineHeight: 24,
              fontSize: 18,
              fontWeight: "bold",
              fontFamily: "digifacewide",
              color: titleColor,
            },
            downTxt: {
              lineHeight: 16,
              fontSize: 14,
              align: "center",
              color: subTitleColor,
            },
          },
        },
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        data: [""],
      },
      series: [
        {
          name: "vl1",
          type: "pictorialBar",
          label: {
            noraml: {
              show: false,
            },
          },
          barGap: "10%",
          itemStyle: {
            color: activeColors[0],
          },
          symbolClip: true,
          symbol: "roundRect",
          // barGap: "-100%",
          symbolRepeat: true,
          symbolSize: symbolSize,
          symbolMargin: symbolMargin,
          z: 6,
          data: [val > lv[0] ? lv[0] : val],
        },
        {
          name: "vl2",
          type: "pictorialBar",
          barGap: "10%",
          label: {
            noraml: {
              show: false,
            },
          },
          symbol: "roundRect",
          symbolClip: true,
          itemStyle: {
            color: activeColors[1],
          },
          // barGap: "-100%",
          symbolRepeat: true,
          symbolSize: symbolSize,
          symbolMargin: symbolMargin,
          z: 5,
          data: [val > lv[1] ? lv[1] : val],
        },
        {
          name: "vl3",
          type: "pictorialBar",
          label: {
            noraml: {
              show: false,
            },
          },
          symbol: "roundRect",
          symbolRepeat: true,
          symbolClip: true,
          symbolSize: symbolSize,
          symbolMargin: symbolMargin,
          itemStyle: {
            color: activeColors[2],
          },
          barCategoryGap: "40%",
          z: 4,
          data: [val > 100 ? 100 : val],
        },
        {
          name: "bg3",
          type: "pictorialBar",
          label: {
            noraml: {
              show: false,
            },
          },
          color: "#fff",
          symbol: "roundRect",
          symbolRepeat: true,
          symbolSize: symbolSize,
          // symbolClip: true,
          symbolMargin: symbolMargin,
          itemStyle: {
            color: colors[2],
          },
          barCategoryGap: "40%",
          z: 1,
          data: [100],
        },
        {
          name: "bg2",
          type: "pictorialBar",
          barGap: "10%",
          label: {
            noraml: {
              show: false,
            },
          },
          symbol: "roundRect",
          // symbolClip: true,
          itemStyle: {
            color: colors[1],
          },
          // barGap: "-100%",
          symbolRepeat: true,
          symbolSize: symbolSize,
          // symbolClip: true,
          symbolMargin: symbolMargin,
          z: 2,
          data: [lv[1]],
        },
        {
          name: "bg1",
          type: "pictorialBar",
          label: {
            noraml: {
              show: false,
            },
          },
          barGap: "10%",
          itemStyle: {
            color: colors[0],
          },
          // symbolClip: true,
          symbol: "roundRect",
          // barGap: "-100%",
          symbolRepeat: true,
          symbolSize: symbolSize,
          // symbolClip: true,
          symbolMargin: symbolMargin,
          z: 3,
          data: [lv[0]],
        },
      ],
    };
    chart.setOption(option);
    window.addEventListener("resize", this.chart.resize);
  }
  beforeDestroy() {
    this.chart && window.removeEventListener("resize", this.chart.resize);
  }
}
</script>

<style scoped lang="scss">
.pictorial-bar {
  height: 40px;
  width: 100%;
}
</style>
