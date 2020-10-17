<template>
  <div class="card-title">{{title}}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";

@Component
export default class CardTitle extends Vue {
  @Prop({ type: String }) title!: string;

  beforeDestroy() {}
}
</script>

<style scoped lang="scss">
.card-title {
  position: relative;
  padding-left: 13px;
  line-height: 40px;
  &:before {
    content: "";
    display: block;
    width: 5px;
    height: 20px;
    background: #408dfd;
    border-radius: 2.5px;
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    
  }
}
</style>
