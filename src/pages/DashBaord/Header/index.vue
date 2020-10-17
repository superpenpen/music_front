<template>
  <div class="dashBaord-header-wrapper">
    <transition name="top-move-out">
      <div v-show="containerHidden" class="dashBaord-header overburden">
        <h1 class="logo">
          <img src="../../../assets/dashBaord/logo.png" alt />
        </h1>
        <HeaderTopRight />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, namespace } from "vuex-class";
import HeaderTopRight from "./components/HeaderTopRight.vue";
@Component({
  components: {
    HeaderTopRight,
  },
})
export default class DashBaordHeader extends Vue {
  @State("containerHidden") containerHidden!: boolean;
}
</script>
<style>
.top-move-out-enter-active {
  transition: all 0.8s ease;
}
.top-move-out-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.top-move-out-enter,
.top-move-out-leave-to {
  transform: translateY(-100%);
  /* opacity: 0; */
}
</style>
<style scoped lang="scss">
.dashBaord-header-wrapper {
  position: absolute;
  top: 0;
  height: 0;
  left: 0;
  width: 100%;
}
.dashBaord-header {
  width: 100%;
  height: 1.36rem;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  z-index: 100;
  padding: 0.26rem 0 0 0.36rem;
  display: flex;
  justify-content: space-between;
  padding-right: 0.46rem;
  .logo {
    margin: 0;
    height: 0.89rem;
    width: 4.64rem;
  }
}
</style>
