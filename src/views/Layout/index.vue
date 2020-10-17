<template>
  <el-container class="app-layout">
    <Sidebar />
    <el-container class="app-layout-container">
      <ContainerMain />
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { Getter, Action, namespace } from "vuex-class";
import Sidebar from "./components/Sidebar.vue";
import ContainerMain from "./components/ContainerMain.vue";
@Component({
  components: {
    Sidebar,
    ContainerMain,
  },
})
export default class Layout extends Vue {}
</script>

<style scoped lang="scss">
.app-layout {
  height: 100%;
}
</style>
