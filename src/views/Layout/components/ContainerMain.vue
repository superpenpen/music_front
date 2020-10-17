<template>
  <el-main class="app-container">
    <ScrollView>
      <router-view />
    </ScrollView>
  </el-main>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class ContainerMain extends Vue {}
</script>

<style scoped lang="scss">
.app-container {
  background: #eff2f6;
  // height: ;
  padding: 0;
}
</style>
