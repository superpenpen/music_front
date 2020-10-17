<template>
  <div class="card">
    <CardTitle :title="title"></CardTitle>
    <div class="card-content">
        <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import CardTitle from "./CardTitle.vue";
@Component({
  components: {
    CardTitle,
  },
})
export default class ComponentName extends Vue {
  @Prop({ type: String }) title!: string;
  beforeDestroy() {}
}
</script>

<style scoped lang="scss">
.card {
  display: flex;
  flex-direction: column;
  .card-content {
      flex: 1;
  }
}
</style>
