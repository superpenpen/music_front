<template>
  <div class="right-container-wrapper">
    <transition name="right-move-out">
      <div v-show="containerHidden" class="right-container overburden">
        <div class="item-box">
          <CardHeader title="资源评分" />
          <Resources class="content" />
        </div>
        <div class="item-box">
          <CardHeader title="资源评分" />
          <ChartBar class="content" />
        </div>
        <div class="item-box">
          <CardHeader title="故障警告" />
          <ErrorList class="content" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import { State, Getter, Action, namespace } from "vuex-class";
import CardHeader from "../components/CardHeader.vue";
import Resources from "../RightContainer/components/Resources.vue";
import ChartBar from "../RightContainer/components/ChartBar.vue";
import AlarmList from "../RightContainer/components/ChartBar.vue";
import ErrorList from "../RightContainer/components/ErrorList.vue";
@Component({
  components: {
    Resources,
    CardHeader,
    ChartBar,
    ErrorList,
  },
})
export default class RightContainer extends Vue {
  @State("containerHidden") containerHidden!: boolean;
  beforeDestroy() {}
}
</script>
<style>
.right-move-out-enter-active {
  transition: all 0.8s ease;
}
.right-move-out-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.right-move-out-enter,
.right-move-out-leave-to {
  transform: translateX(100%);
  /* opacity: 0; */
}
</style>
<style scoped lang="scss">
.right-container-wrapper {
  position: absolute;
  right: 0;
  height: 100%;
  width: 0;
  top: 0;
}
.right-container {
  position: absolute;
  right: 0;
  top: 2.3rem;
  bottom: 0;
  width: 5.1rem;
  z-index: 100;
  padding-right: 0.5rem;
  padding-bottom: 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .item-box {
    height: 33%;
    display: flex;
    flex-direction: column;
    .content {
      flex: 1;
    }
  }
}
</style>
