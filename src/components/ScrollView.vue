<template>
  <el-scrollbar
    class="scroll-view"
    :class="`${mode}-scroll-view`"
    :wrapClass="wrapClass"
    :viewStyle="viewStyle"
  >
    <slot></slot>
  </el-scrollbar>
</template>
<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
@Component
export default class ScrollView extends Vue {
  @Prop({ type: String, default: "vertical" }) mode!: string;
  @Prop({ type: Object }) viewStyle!: object;
  get wrapClass() {
    if (this.mode === "horizontal") {
      return "scroll-inner-horizontal-view";
    }
    return "scroll-inner-vertical-view";
  }
}
</script>
<style lang="scss">
.vertical-scroll-view {
  & > .scroll-inner-vertical-view {
    overflow-x: hidden !important;
    margin-bottom: 0 !important;
    .el-scrollbar__view {
      min-height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  & > .el-scrollbar__bar.is-horizontal {
    display: none;
  }
}

.horizontal-scroll-view {
  & > .scroll-inner-horizontal-view {
    height: 146% !important;
  }
  & > .el-scrollbar__bar.is-horizontal {
    bottom: 0;
  }
  & > .el-scrollbar__bar.is-vertical {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.scroll-view {
  height: 100%;
  width: 100%;
}
</style>
