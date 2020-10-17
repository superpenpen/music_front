<template lang="html">
  <div class="page-grid" :style="{ margin: wrapMargin }">
    <template v-if="list&&list.length">
      <div class="item-wrap"
        :style="{
           padding: padding
        }"
        :class="`col-${s_column}`"
        v-for="(item,index) in list"
        :key="index">
          <slot v-bind:item="item" v-bind:index="index"></slot>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import { isPlainArray, throttle } from "@/utils";
@Component
export default class GridList extends Vue {
  private gridChage: any | null;
  @Prop({ type: Number, default: () => [] }) list!: any[];
  @Prop({ type: [Number, Array], default: 10 }) gutter!: number | number[];
  @Prop({ type: Number, default: 5 }) column!: number;
  @Prop({ type: Number, default: 0 }) xs!: number;
  @Prop({ type: Number, default: 0 }) sm!: number;
  @Prop({ type: Number, default: 0 }) md!: number;
  @Prop({ type: Number, default: 0 }) lg!: number;
  @Prop({ type: Number, default: 0 }) xl!: number;
  @Prop({ type: Number, default: 0 }) xxl!: number;
  s_xs: number =
    this.xs ||
    this.sm ||
    this.md ||
    this.lg ||
    this.xl ||
    this.xxl ||
    this.column;
  s_sm: number =
    this.sm || this.md || this.lg || this.xl || this.xxl || this.column;
  s_md: number = this.md || this.lg || this.xl || this.xxl || this.column;
  s_lg: number = this.lg || this.xl || this.xxl || this.column;
  s_xl: number = this.xl || this.xxl || this.column;
  s_xxl: number = this.xxl || this.column;
  s_column: number = this.column;
  get wrapMargin() {
    if (isPlainArray(this.gutter)) {
      return (this.gutter as number[])
        .reduce((a, b) => `${a} -${b}px`, "")
        .substr(0);
    }
    return `-${this.gutter}px`;
  }
  get padding() {
    if (isPlainArray(this.gutter)) {
      return (this.gutter as number[])
        .reduce((a, b) => `${a} ${b}px`, "")
        .substr(0);
    }
    return `${this.gutter}px`;
  }
  beforeDestroy() {
    if (this.gridChage) {
      window.removeEventListener("resize", this.gridChage);
      this.gridChage = null;
    }
  }
  mounted() {
    this.gridChage = throttle(() => {
      const wW = document.documentElement.clientWidth;
      if (this.s_xxl && wW >= 1600) {
        this.s_column = this.s_xxl;
      } else if (this.s_xl && wW >= 1200 && wW < 1600) {
        this.s_column = this.s_xl;
      } else if (this.s_lg && wW >= 992 && wW < 1200) {
        this.s_column = this.s_lg;
      } else if (this.s_md && wW >= 768 && wW < 992) {
        this.s_column = this.s_md;
      } else if (this.s_sm && wW >= 576 && wW < 768) {
        this.s_column = this.s_sm;
      } else if (this.s_xs && wW < 576) {
        this.s_column = this.s_xs;
      }
    }, 100);
    this.gridChage();
    window.addEventListener("resize", this.gridChage);
  }
}
</script>

<style lang="scss" scoped>
.page-grid {
  display: flex;
  flex-flow: row wrap;
  .col-2 {
    width: 50%;
  }
  .col-3 {
    width: 33.333333333333%;
  }
  .col-4 {
    width: 25%;
  }
  .col-5 {
    width: 20%;
  }
  .col-6 {
    width: 16.666666666667%;
  }
  .empty-foot {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
</style>
