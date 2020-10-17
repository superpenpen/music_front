<template>
  <div class="border-img-box" :class="type" :style="{
      width: widthStyle,
      height: heightStyle
  }">
    <div class="inner">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";

@Component
export default class ComponentName extends Vue {
  @Prop({ type: String }) type!: string;
  @Prop({ type: [String, Number] }) width!: string | number;
  @Prop({ type: [String, Number] }) height!: string | number;
  get widthStyle(): string {
    if (typeof this.width == "string") {
      return this.width;
    } else {
      return this.width + "px";
    }
  }
  get heightStyle(): string {
    if (typeof this.height == "string") {
      return this.height;
    } else {
      return this.height + "px";
    }
  }
}
</script>

<style scoped lang="scss">
$blueImg: "../../../assets/dashBaord/border_blue.png";
$greenImg: "../../../assets/dashBaord/border_green.png";
$redImg: "../../../assets/dashBaord/border_red.png";
.border-img-box {
  border: 20px solid transparent;
  border-image: url($blueImg) 20 20 repeat;
  position: relative;
  &.danger {
    border-image: url($redImg) 20 20 repeat;
  }
  &.success {
    border-image: url($greenImg) 20 20 repeat;
  }
  .inner {
    position: absolute;
    top: 0;
    left: -2px;
    right: -1px;
    margin: 0 -17px;
    bottom: 0;
  }
}
</style>
