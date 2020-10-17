<template>
  <div class="">
    ComponentName
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from 'vue-property-decorator';
import { Getter, Action, namespace } from "vuex-class";
// import Problem from 'Problem'
const lessonModule = namespace("lesson");
@Component
export default class ComponentName extends Vue {
    @Prop({ type: Number }) selTabName!: number;
    @Prop({ type: Boolean, default: true }) show!: boolean;
    @Getter("userId") userId!: string;
    @lessonModule.State("videoIntegral") videoIntegral!: number;
    @lessonModule.Action("setVideoIntegral") setVideoIntegral!: (
        videoIntegral: number
    ) => void;
    // @Ref() problemCom!: Problem;
    @Watch("videoId") function(newVal: number) {
    
    }
    // @Watch("$route.path", { immediate: true, deep: true }) function(
    //     nVal: string
    // ) {
        // this.tabPath = nVal;
    // }
    // @Action("user/userLogin") userLogin!: (
    //     data: LoginPackage
    // ) => Promise<UserInfo>;
    // beforeDestroy(){}
}
</script>

<style scoped lang="scss">

</style>
