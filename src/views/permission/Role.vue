<template>
  <div class="app-container role">
    <div class="head filter-container">
      <el-form>
        <el-form-item>
          <el-button class="create-role-button" type="primary" size="small" icon="el-icon-plus"
            v-if="hasPerm('role:insert')" @click="showInsertDialog()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="body">
      <el-table class="role-table" size="mini" height="100%" border fit
        :data="roles" :row-style="tableRowStyle" :cell-style="tableCellStyle">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column label="角色名称" prop="roleName" min-width="80" align="center"></el-table-column>
        <el-table-column label="角色描述" prop="descInfo" min-width="100" align="center"></el-table-column>
        <el-table-column label="创建用户" prop="createUserId" min-width="40" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="80" align="center"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" min-width="80" align="center"></el-table-column>

        <el-table-column label="用户名称" min-width="80" align="center">
          <template slot-scope="scope">
            <div v-for="user in scope.row.users" :key="user.userId">
              <div v-text="user.userName" style="display: inline-block; vertical-align: middle"></div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="菜单&权限" min-width="160" align="center">
          <template slot-scope="scope">
            <div>
              <div style="text-align: left" v-for="menu in scope.row.menus" :key="menu.menuCode">
                <span style="width: 100px; display: inline-block; text-align: right">{{menu.menuName}}</span>
                <el-tag type="primary" style="margin-left: 5px;" v-for="perm in menu.permissions" :key="perm.permissionId" v-text="perm.permissionName"></el-tag>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80" align="center" v-if="hasPerm('role:update') && hasPerm('role:delete')">
          <template slot-scope="scope">
            <div>
              <el-button type="primary" size="small" @click="showUpdateDialog(scope.$index)">修改</el-button>
              <el-button type="danger" size="small" v-if="scope.row.users && scope.row.users.length===0" @click="deleteRole(scope.$index)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div class="pagination-container">
        <el-pagination background layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize" :page-sizes="[10, 20, 50, 100]" :total="total" :pager-count="5" :current-page="currentPage" 
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
        </el-pagination>
      </div>
    </div>

    <!--添加/编辑角色对话框-->
		<el-dialog class="role-dialog" top="6vh" :title="titleMap[dialogType]" :visible.sync="showDialog" :close-on-click-modal="false" :before-close="handleClose">
			<el-form ref="roleForm" label-position="right" label-width="100px" :model="roleForm" :rules="roleFormRules">
        <el-row>
          <el-col>
            <el-form-item label="角色名称" prop="roleName">
              <el-input type="text" v-model="roleForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="角色描述" prop="descInfo">
              <el-input type="text" v-model="roleForm.descInfo"></el-input>
            </el-form-item>
            <el-form-item label="菜单&权限" required>
              <div v-for="(menu, index) in allPermission" :key="menu.id">
                <span style="width: 100px; display: inline-block;">
                  <el-button :type="isNoneMenuSelected(index)?'':(isAllMenuSelected(index)?'success':'primary')" size="mini" style="width: 120px;"
                    @click="checkAll(index)">{{menu.menuName}}
                  </el-button>
                </span>
                <div style="display: inline-block; margin-left: 50px;">
                  <el-checkbox-group v-model="roleForm.permissions">
                    <el-checkbox v-for="perm in menu.permissions" :key="perm.id" :label="perm.id" @change="checkRequired(perm, index)">
                      <span :class="{requiredPermission:perm.requiredPermission===1}">{{perm.permissionName}}</span>
                    </el-checkbox>
                  </el-checkbox-group>
                </div>
              </div>
              <p style="color: #848484;">说明: 红色权限为对应菜单内的必选权限</p>
            </el-form-item>
          </el-col>
        </el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('roleForm'), showDialog =false">取消</el-button>
				<el-button v-if="dialogType=='insert'" type="success" @click="insertRole()">创建</el-button>
        <el-button v-else type="primary" @click="updateRole()">提交</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getRoles, insertRole, updateRole, deleteRole, getAllPermission } from '@/api/role'

export default {
  data() {
    return {
      // table
      roles: [],
      page: 1,
      pageSize: 10,
      total: 0,
      currentPage: 1,

      filters: {
        username: ''
      },

      // dialog
      showDialog: false,
      dialogType: 'insert',
      titleMap: {
        insert: '新建角色',
        update: '编辑角色'
      },
      allPermission: [],

      // form
      roleForm: {
        roleId: '',
        roleName: '',
        descInfo: '',
        // status: 1,
        permissions: []
      },

      // rules
      roleFormRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getRoles()
    this.getAllPermission()
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getRoles() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        userId: this.userId,
        date: new Date().getTime()
      }
      getRoles(params).then(res => {
        if (res.code === 1) {
          this.roles = res.data.roles
          this.total = res.data.total
        }
      })
    },
    getAllPermission() {
      getAllPermission().then(res => {
        if (res.code === 1) {
          this.allPermission = res.data.allPermission
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.roleForm.roleName = ''
      this.roleForm.descInfo = ''
      this.roleForm.status = 1
      this.roleForm.permissions = []
    },
    showInsertDialog() {
      this.roleForm.roleName = ''
      this.roleForm.descInfo = ''
      this.roleForm.status = 1
      this.roleForm.permissions = []
      this.dialogType = 'insert'
      this.showDialog = true
    },
    insertRole() {
      if (!this.checkRoleName()) {
        return
      }
      if (!this.checkPermissionNum()) {
        return
      }
      insertRole(this.roleForm).then(res => {
        const code = res.code
        const msg = res.msg
        if (code !== 1) {
          this.$message({
            message: '创建失败：' + msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: '创建成功',
            type: 'success'
          })
          this.resetForm('roleForm')
          this.getRoles()
          this.showDialog = false
        }
      })
    },
    showUpdateDialog($index) {
      const role = this.roles[$index]
      this.roleForm.roleId = role.roleId
      this.roleForm.roleName = role.roleName
      this.roleForm.descInfo = role.descInfo
      this.roleForm.status = role.status
      this.roleForm.permissions = []
      for (let i = 0; i < role.menus.length; i++) {
        var perm = role.menus[i].permissions
        for (let j = 0; j < perm.length; j++) {
          this.roleForm.permissions.push(perm[j].permissionId)
        }
      }
      this.dialogType = 'update'
      this.showDialog = true
    },
    updateRole() {
      if (!this.checkRoleName()) {
        return
      }
      if (!this.checkPermissionNum()) {
        return
      }
      updateRole(this.roleForm).then(res => {
        const code = res.code
        const msg = res.msg
        if (code !== 1) {
          this.$message({
            message: '编辑失败：' + msg,
            type: 'error'
          })
        } else {
          this.$message({
            message: '编辑成功',
            type: 'success'
          })
          this.getRoles()
          this.showDialog = false
        }
      })
    },
    deleteRole($index) {
      this.$confirm('确定删除此角色?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const user = this.roles[$index]
        deleteRole(user).then(res => {
          const code = res.code
          const msg = res.msg
          if (code !== 1) {
            this.$message({
              message: '删除失败：' + msg,
              type: 'error'
            })
          } else {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getRoles()
          }
        })
      })
    },
    // 修改table样式
    tableRowStyle({ row, rowIndex }) {
      return 'height: 45px;'
    },
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      return 'padding: 10px'
    },
    handleClose() {
      this.resetForm('roleForm')
      this.showDialog = false
    },
    handleCurrentChange(val) {
      this.page = val
      this.getRoles()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getRoles()
    },

    isNoneMenuSelected(index) {
      // 判断本级菜单内的权限是否一个都没选
      const menu = this.allPermission[index].permissions
      let result = true
      for (let j = 0; j < menu.length; j++) {
        if (this.roleForm.permissions.indexOf(menu[j].id) > -1) {
          result = false
          break
        }
      }
      return result
    },
    isAllMenuSelected(index) {
      // 判断本级菜单内的权限是否全选了
      const menu = this.allPermission[index].permissions
      let result = true
      for (let j = 0; j < menu.length; j++) {
        if (this.roleForm.permissions.indexOf(menu[j].id) < 0) {
          result = false
          break
        }
      }
      return result
    },
    checkAll(index) {
      // 点击菜单, 相当于全选按钮
      const v = this
      if (v.isAllMenuSelected(index)) {
        v.noPermSelected(index) // 如果已经全选了, 则全部取消
      } else {
        v.allPermSelected(index) // 如果尚未全选, 则全选
      }
    },
    allPermSelected(index) {
      // 全部选中
      const menu = this.allPermission[index].permissions
      for (let j = 0; j < menu.length; j++) {
        this.addUnique(menu[j].id, this.roleForm.permissions)
      }
    },
    noPermSelected(index) {
      // 全部取消选中
      const menu = this.allPermission[index].permissions
      for (let j = 0; j < menu.length; j++) {
        const idIndex = this.roleForm.permissions.indexOf(menu[j].id)
        if (idIndex > -1) {
          this.roleForm.permissions.splice(idIndex, 1)
        }
      }
    },
    addUnique(val, arr) {
      // 数组内防重复地添加元素
      const index = arr.indexOf(val)
      if (index < 0) {
        arr.push(val)
      }
    },
    checkRequired(perm, index) {
      const permId = perm.id
      if (this.roleForm.permissions.indexOf(permId) > -1) {
        this.makeReuqiredPermissionChecked(index) // 如果之前未勾选本权限,现在勾选完之后, roleForm里就会包含本id
      } else {
        // 取消选中事件
        if (perm.requiredPermission === 1) {
          this.noPermSelected(index) // 如果是必勾权限,就把本菜单的权限全部移出
        }
      }
    },
    makeReuqiredPermissionChecked(index) {
      // 将本菜单必选的权限勾上
      const menu = this.allPermission[index].permissions
      for (let j = 0; j < menu.length; j++) {
        const perm = menu[j]
        if (perm.requiredPermission === 1) {
          this.addUnique(perm.id, this.roleForm.permissions) // 找到本菜单的必选权限,将其勾上
        }
      }
    },
    checkRoleName(roleId) {
      // 校验名称重复
      const roleName = this.roleForm.roleName
      if (!roleName) {
        this.$message.error('请填写角色名称')
        return false
      }
      return true
    },
    checkPermissionNum() {
      // 校验至少有一种权限
      if (this.roleForm.permissions.length === 0) {
        this.$message.error('请至少选择一种权限')
        return false
      }
      return true
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .role {
    height: 100%;
    padding-top: 5px;
    padding-bottom: 5px;
    .head {
      height: 3%;
      width:100%;
    }
    .body {
      height: 90.2%;
      width: 100%;
      padding-top: 20px;
    }
    .footer {
      height: 2%;
      width: 100%;
      padding-top: 20px;
      .pagination-container {
        float: right;
      }
    }
    .requiredPermission {
      color: #ff0e13
    }
  }
</style>
