<template>
  <div class="bottom-container-wrapper">
    <transition name="bottom-move-out">
      <div v-show="containerHidden" class="bottom-container overburden">
        <ChartPie />
        <ChartGauge :number="30" />
        <ChartGauge :number="60" />
        <ChartGauge :number="100" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import { State, Getter, Action, namespace } from "vuex-class";
import ChartPie from "./components/ChartPie.vue";
import ChartGauge from "./components/ChartGauge.vue";

@Component({
  components: {
    ChartPie,
    ChartGauge,
  },
})
export default class BottomContainer extends Vue {
  @State("containerHidden") containerHidden!: boolean;
  beforeDestroy() {}
}
</script>
<style>
.bottom-move-out-enter-active {
  transition: all 0.8s ease;
}
.bottom-move-out-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.bottom-move-out-enter,
.bottom-move-out-leave-to {
  transform: translateY(100%);
  /* opacity: 0; */
}
</style>
<style scoped lang="scss">
.bottom-container-wrapper {
  position: absolute;
  height: 0;
  bottom: 0;
  width: 100%;
  left: 0;
}
.bottom-container {
  // width: 9.6rem;
  position: absolute;
  height: 2.25rem;
  left: 4.5rem;
  right: 5.1rem;
  bottom: 0.54rem;
  z-index: 100;
  display: flex;
  justify-content: space-around;
  padding-right: 0.2rem;
}
</style>
