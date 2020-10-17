<template>
  <div class="card-header">
    <div>{{title}}</div>
    <div class="line"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import { Getter, Action, namespace } from "vuex-class";

@Component
export default class CardHeader extends Vue {
  @Prop({ type: String }) title!: string;
  beforeDestroy() {}
}
</script>

<style scoped lang="scss">
.card-header {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: rgb(212, 217, 233);
  line-height: .36rem;
  font-size: 22px;
  padding-left: .16rem;
  margin-bottom: .1rem;
  font-weight: 100;
  .line {
    border: 0.5px solid #fff;
    opacity: 0.969;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    &:before {
      content: "";
      display: block;
      width: 0.1rem;
      height: 0.1rem;
      background: #fff;
      border-radius: 50%;
      position: absolute;
      left: -1px;
      top: 0;
      bottom: 0;
      margin: auto 0;
    }
  }
}
</style>
