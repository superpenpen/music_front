<template>
  <div class="header-list-right">
    <BorderImgBox class="item" type="success" width="138px" height="176px">
      <div class="box-content">
        <div class="number">
          <span>05</span>/
          <span>32</span>
        </div>
        <PictorialBar
          :showTitle="false"
          :showNumber="false"
          :symbolSize="[2,50]"
          :colors="['#09382d','#493919','#471425']"
          :region="[70,90]"
          :activeColors="['#26ed7f','#e7a41a','#eb1d61']"
          :number="100"
        />
        <div style="margin-top:20px">主机使用</div>
      </div>
    </BorderImgBox>
    <BorderImgBox class="item" width="110px" height="110px">
      <div class="mini-box-content">
        <div class="number">132</div>
        <div>虚拟机使用</div>
      </div>
    </BorderImgBox>
    <BorderImgBox class="item" width="110px" height="110px">
      <div class="mini-box-content">
        <div class="number">132</div>
        <div>用户数</div>
      </div>
    </BorderImgBox>
    <BorderImgBox class="item" type="danger" width="110px" height="110px">
      <div class="mini-box-content">
        <div class="number">132</div>
        <div>主机故障数</div>
      </div>
    </BorderImgBox>
    <BorderImgBox class="item" width="110px" height="110px">
      <div class="mini-box-content">
        <div class="number">132</div>
        <div>漏洞数</div>
      </div>
    </BorderImgBox>
    <BorderImgBox class="item" width="110px" height="110px">
      <div class="mini-box-content">
        <div class="number">132</div>
        <div>基线弱点</div>
      </div>
    </BorderImgBox>
    <BorderImgBox class="item" width="110px" height="110px">
      <div class="mini-box-content">
        <div class="number">132</div>
        <div>网站后门</div>
      </div>
    </BorderImgBox>
    <div class="foot-bg"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BorderImgBox from "../../components/BorderImgBox.vue";
import PictorialBar from "../../components/PictorialBar.vue";
@Component({
  components: {
    BorderImgBox,
    PictorialBar,
  },
})
export default class HeaderTopRight extends Vue {}
</script>

<style scoped lang="scss">
.header-list-right {
  display: flex;
  position: relative;
  height: 172px;
  .item{
    margin: 0 4px;
  }
  .box-content {
    color: #fff;
    padding: 0 18px;
    text-align: center;
    .number {
      font-size: 28px;
      font-weight: bold;
      line-height: 52px;
    }
  }
  .mini-box-content {
    color: rgb(178, 180, 203);
    font-size: 12px;
    text-align: center;
    .number {
      font-size: 28px;
      color: #fff;
      line-height: 54px;
      font-weight: bold;
    }
  }
  .foot-bg{
    position: absolute;
    bottom: 12px;
    right: 0;
    width: 82%;
    height: 20px;
    background: url('../../../../assets/dashBaord/hrb.png');
  }
}
</style>
