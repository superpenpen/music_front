<template>
  <el-aside class="app-sidebar" width="140px">
    <ScrollView>
    <Logo />
    <UserAvatar />
    <Menu />
    </ScrollView>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
// import { Getter, Action, namespace } from "vuex-class";
import Logo from './Logo.vue'
import UserAvatar from './UserAvatar.vue'
import Menu from './Menu/index.vue'
@Component({
  components:{
    Logo,
    UserAvatar,
    Menu
  }
})
export default class Sidebar extends Vue {}
</script>

<style scoped lang="scss">
.app-sidebar {
  // background: #3a84ff;
  background: #275554;


}

</style>
