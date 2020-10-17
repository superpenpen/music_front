<template>
  <div class="page-wrap">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from 'vue-property-decorator';

@Component
export default class PageWrap extends Vue {
    // @Prop({ type: Number }) selTabName!: number;
    
    beforeDestroy(){}
}
</script>

<style scoped lang="scss">
.page-wrap{
  padding: 20px;
}
</style>
