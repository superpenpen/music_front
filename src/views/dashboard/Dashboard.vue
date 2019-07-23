<template>
  <div class="dashboard-container">
    <div class="dashboard-text">userId: {{ userId }}</div>
    <div class="dashboard-text">userName: {{ userName }}</div>
    <div class="dashboard-text">roleId: {{ roleId }}</div>
    <div class="dashboard-text">roleName: {{ roleName }}</div>
    <div class="dashboard-text">permissions: {{ permissions }}</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'userId',
      'userName',
      'roleId',
      'roleName',
      'permissions'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
