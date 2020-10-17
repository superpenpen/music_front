<template>
  <div class="timer">
    <div class="date">
      <span>{{date}}</span>
      <br />
      <span>Today</span>
    </div>
    <div class="week">{{week}}</div>
    <div class="hour">{{hour}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
@Component
export default class Timer extends Vue {
  date: string = "";
  hour: string = "";
  week: string = "";
  setInter: number | null = null;
  created() {
    this.getTimer();
    this.setInterTime();
  }
  setInterTime() {
    this.setInter = setInterval(this.getTimer, 1000);
  }
  getTimer() {
    const dayDate = dayjs();
    this.date = dayDate.format("YYYY.MM.DD");
    this.hour = dayDate.format("HH:mm:ss");
    this.week = this.formatWeek(dayDate.day());
  }
  formatWeek(week: number): string {
    switch (week) {
      case 0:
        return "周日";
      case 1:
        return "周一";
      case 2:
        return "周二";
      case 3:
        return "周三";
      case 4:
        return "周四";
      case 5:
        return "周五";
      case 6:
        return "周六";
      default:
        return "周一";
    }
  }
  beforeDestroy() {
    this.setInter && clearInterval(this.setInter);
  }
}
</script>

<style scoped lang="scss">
.timer {
  color: #fff;
  display: flex;
  .date {
    font-size: 24px;
    color: rgb(166, 171, 186);
    text-align: right;
  }
  .week {
    font-size: 24px;
    color: rgba(166, 171, 186, 0.664);
    width: 24px;
    margin-left: 6px;
    margin-right: 20px;
  }
  .hour {
    font-size: 62px;
    line-height: 54px;
    font-family: "Microsoft YaHei";
    color: rgb(255, 255, 255);
    font-weight: 100;
  }
}
</style>
