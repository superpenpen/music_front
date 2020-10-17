<template>
  <div class="menu">
    <router-link tag="div" class="menu-item" to="/home">
      <div class="active_bg"></div>
      <IconFont class="icon" type="caidan-" />
      <div class="text">总览</div>
    </router-link>
    <router-link tag="div" class="menu-item" to="/userList">
      <div class="active_bg"></div>
      <IconFont class="icon" type="yonghu" />
      <div class="text">用户管理</div>
    </router-link>
    <router-link tag="div" class="menu-item" to="/modelList">
      <div class="active_bg"></div>
      <IconFont class="icon" type="moxing" />
      <div class="text">模型空间</div>
    </router-link>
    <router-link tag="div" class="menu-item" to="/illation">
      <div class="active_bg"></div>
      <IconFont class="icon" type="fangdajing" />
      <div class="text">推理服务</div>
    </router-link>
    <router-link tag="div" class="menu-item" to="/shipintuilirenwu">
      <div class="active_bg"></div>
      <IconFont class="icon" type="fangdajing" />
      <div class="text">视频推理任务</div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";

@Component
export default class Menu extends Vue {
  @Prop({ type: Number }) selTabName!: number;

  beforeDestroy() {}
}
</script>

<style scoped lang="scss">
.menu {
  .menu-item {
    width: 100%;
    height: 92px;
    position: relative;
    text-align: center;
    margin: 0 auto;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-top: 20px;
    .text {
      font-size: 16px;
      color: #fff;
      margin-top: 12px;
    }
    .icon {
      color: #fff;
      font-size: 28px;
    }
    &.router-link-active{

      .active_bg {
        display: block;
      }
    }
    .active_bg {
      position: absolute;
      display: none;
      background: url("../../../../assets/menu_item_bg.png");
      height: 124px;
      width: 130px;
      z-index: -1;
      top: -18px;
      right: 0;
    }
  }
}
</style>
