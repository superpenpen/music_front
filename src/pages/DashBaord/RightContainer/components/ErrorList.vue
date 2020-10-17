<template>
  <div class="error-list">
    <div class="head">
      <div class="t1">故障类型</div>
      <div class="t2">主机</div>
      <div class="t3">虚拟机</div>
      <div class="t4">时间</div>
    </div>
    <div></div>
    <div class="swiper-container" ref="swiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide">
          <div class="t1">CPU过载</div>
          <div class="t2">HOST01</div>
          <div class="t3">1LAVER</div>
          <div class="t4">2020-08-06 15:36:12</div>
        </div>
        <div class="swiper-slide">
          <div class="t1">CPU过载</div>
          <div class="t2">HOST01</div>
          <div class="t3">1LAVER</div>
          <div class="t4">2020-08-06 15:36:12</div>
        </div>
        <div class="swiper-slide">
          <div class="t1">CPU过载</div>
          <div class="t2">HOST01</div>
          <div class="t3">1LAVER</div>
          <div class="t4">2020-08-06 15:36:12</div>
        </div>
        <div class="swiper-slide">
          <div class="t1">CPU过载</div>
          <div class="t2">HOST01</div>
          <div class="t3">1LAVER</div>
          <div class="t4">2020-08-06 15:36:12</div>
        </div>
        <div class="swiper-slide">
          <div class="t1">CPU过载</div>
          <div class="t2">HOST01</div>
          <div class="t3">1LAVER</div>
          <div class="t4">2020-08-06 15:36:12</div>
        </div>
        <div class="swiper-slide">
          <div class="t1">CPU过载</div>
          <div class="t2">HOST01</div>
          <div class="t3">1LAVER</div>
          <div class="t4">2020-08-06 15:36:12</div>
        </div>
        <div class="swiper-slide">
          <div class="t1">CPU过载</div>
          <div class="t2">HOST01</div>
          <div class="t3">1LAVER</div>
          <div class="t4">2020-08-06 15:36:12</div>
        </div>
        <div class="swiper-slide">
          <div class="t1">CPU过载</div>
          <div class="t2">HOST01</div>
          <div class="t3">1LAVER</div>
          <div class="t4">2020-08-06 15:36:12</div>
        </div>
        <div class="swiper-slide">
          <div class="t1">CPU过载</div>
          <div class="t2">HOST01</div>
          <div class="t3">1LAVER</div>
          <div class="t4">2020-08-06 15:36:12</div>
        </div>
        <div class="swiper-slide">
          <div class="t1">CPU过载</div>
          <div class="t2">HOST01</div>
          <div class="t3">1LAVER</div>
          <div class="t4">2020-08-06 15:36:12</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.min.css";
@Component
export default class ErrorList extends Vue {
  private swiper: Swiper | null = null;
  beforeDestroy() {}
  mounted() {
    this.initSwiper();
  }
  initSwiper() {
    const swiper = (this.swiper = new Swiper(this.$refs.swiper as HTMLElement, {
      loop: true,
      speed: 3000,
      autoplay: {
        delay: 0,
        // disableOnInteraction: false,
        // waitForTransition: false,
      },
      direction: "vertical", // 垂直切换选项
      slidesPerView: 7,
      // spaceBetween: 10,
    }));
    // swiper.autoplay.start();
  }
}
</script>

<style scoped lang="scss">
.error-list {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  .head {
    color: rgb(47, 130, 243);
    line-height: 34px;
  }
  .swiper-container {
    flex: 1;
    overflow: hidden;
    width: 100%;
  }

  .swiper-slide {
    color: rgb(163, 182, 234);

    &:nth-child(odd) {
      background: rgb(20, 31, 66);
    }
  }
  .head,
  .swiper-slide {
    display: flex;
    align-items: center;
    font-size: 12px;

    .t1 {
      width: 25%;
      padding: 0 12px;
    }
    .t2 {
      width: 20%;
      padding: 0 12px;
    }
    .t3 {
      width: 20%;
      padding: 0 12px;
    }
    .t4 {
      width: 35%;
      padding: 0 12px;
    }
  }
}
</style>
