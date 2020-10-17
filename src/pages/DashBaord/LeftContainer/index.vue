<template>
  <div class="left-container-wrapper">
    <transition name="left-move-out">
      <div v-show="containerHidden" class="left-container overburden">
        <Timer />
        <div class="line-chart-box">
          <CardHeader title="近7天资源利用率" />
          <ChartLine :chartData="chartLineData" />
        </div>
        <div class="line-bar-chart-box">
          <CardHeader title="CPU/内存/硬盘利用率" />
          <div class="bar-chart-con">
            <RollLine
              color="#1cb3ff"
              ref="cpuLine"
              opacityColor="rgba(0,0,0,0)"
              :chartData="cpuLineData"
            />
            <PictorialBar
              style="margin: 10px 0 22px;"
              :number="cpuBarNum"
              title="CPU"
              subTitle="使用率"
            />
            <RollLine
              color="#8d5afe"
              ref="memoryLine"
              opacityColor="rgba(0,0,0,0)"
              :chartData="memoryLineData"
            />
            <PictorialBar
              style="margin: 10px 0 22px;"
              :number="memoryBarNum"
              title="内存"
              subTitle="使用率"
            />
            <RollLine
              color="#faa005"
              ref="diskLine"
              opacityColor="rgba(0,0,0,0)"
              :chartData="diskListData"
            />
            <PictorialBar
              style="margin: 10px 0 22px;"
              :number="diskBarNum"
              title="硬盘"
              subTitle="使用率"
            />
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, namespace } from "vuex-class";
import CardHeader from "../components/CardHeader.vue";
import PictorialBar from "../components/PictorialBar.vue";
import RollLine from "../components/RollLine.vue";
import ChartLine from "./components/ChartLine.vue";
import Timer from "./components/Timer.vue";
import { randomNumBoth } from "@/utils";
import dayjs from "dayjs";
@Component({
  components: {
    PictorialBar,
    RollLine,
    CardHeader,
    ChartLine,
    Timer,
  },
})
export default class LeftContent extends Vue {
  chartLineData: any[] = [];
  cpuBarNum: number = 0;
  cpuLineData: any[] = [];
  memoryBarNum: number = 0;
  memoryLineData: any[] = [];
  diskBarNum: number = 0;
  diskListData: any[] = [];
  @State("containerHidden") containerHidden!: boolean;
  created() {
    this.createLineData();
    setInterval(this.updateChartData, 1500);
  }
  updateChartData() {
    // this.cpuBarNum = randomNumBoth(0, 100);
    (this.$refs.cpuLine as RollLine).addChartData({
      value: randomNumBoth(0, 100),
      time: dayjs().add(1, "hour").format("HH:MM"),
    });
    // this.memoryBarNum = randomNumBoth(0, 100);
    (this.$refs.memoryLine as RollLine).addChartData({
      value: randomNumBoth(0, 100),
      time: dayjs().add(1, "hour").format("HH:MM"),
    });
    // this.diskBarNum = randomNumBoth(0, 100);
    (this.$refs.diskLine as RollLine).addChartData({
      value: randomNumBoth(0, 100),
      time: dayjs().add(1, "hour").format("HH:MM"),
    });
  }
  createLineData() {
    const cuptime = dayjs();
    this.cpuBarNum = randomNumBoth(0, 100);
    this.cpuLineData = new Array(200).fill({}).map((item) => {
      return {
        value: randomNumBoth(0, 100),
        time: cuptime.add(1, "hour").format("HH:MM"),
      };
    });

    const memorytime = dayjs();
    this.memoryBarNum = randomNumBoth(0, 100);
    this.memoryLineData = new Array(100).fill({}).map((item) => {
      return {
        value: randomNumBoth(0, 100),
        time: memorytime.add(1, "hour").format("HH:MM"),
      };
    });

    const disktime = dayjs();
    this.diskBarNum = randomNumBoth(0, 100);
    this.diskListData = new Array(100).fill({}).map((item) => {
      return {
        value: randomNumBoth(0, 100),
        time: disktime.add(1, "hour").format("HH:MM"),
      };
    });

    const charttime = dayjs();
    this.chartLineData = new Array(10).fill({}).map((item) => {
      return {
        value: randomNumBoth(40, 50),
        time: disktime.add(1, "date").format("HH:MM"),
      };
    });
  }
}
</script>
<style>
.left-move-out-enter-active {
  transition: all 0.8s ease;
}
.left-move-out-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.left-move-out-enter,
.left-move-out-leave-to {
  transform: translateX(-100%);
  /* opacity: 0; */
}
</style>
<style scoped lang="scss">
.left-container-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 0;
}
.left-container {
  position: absolute;
  left: 0;
  top: 1.36rem;
  bottom: 0;
  width: 4.5rem;
  z-index: 100;
  padding-left: 0.4rem;
  display: flex;
  flex-direction: column;
  padding-bottom: 54px;
  .line-chart-box {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-top: 32px;
  }
  .line-bar-chart-box {
    height: 50%;
    min-height: 356px;
    display: flex;
    margin-top: 14px;
    flex-direction: column;
    .bar-chart-con {
      flex: 1;
      display: flex;
      flex-direction: column;
      .roll-line {
        flex: 1;
      }
    }
  }
}
</style>

