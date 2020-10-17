<template>
  <h1 class="logo" @click="openNew()">
    <a class="logo-lk" href="javascript:;">
      <img src="../../../assets/logo.png" alt />
    </a>
    <div class="text">
      <p class="ls">AICloud</p>
      <p>人工智能管理平台</p>
    </div>
  </h1>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Logo extends Vue {
  openNew(){
    window.open("http://192.168.2.182:82/aicloud_webgl/")
  }
}
</script>

<style scoped lang="scss">
.logo {
  font-size: 14px;
  color: rgb(207, 238, 255);
  font-weight: bold;
  text-align: center;
  width: 100%;
  line-height: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 12px 0 ;
  .logo-lk{
    display: block;
  }
  .ls {
    font-size: 16px;
  }
}
</style>
