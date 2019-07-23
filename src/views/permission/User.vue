<template>
  <div class="app-container user">
    <div class="head filter-container">
      <el-form>
        <el-form-item>
          <el-button class="create-user-button" type="primary" size="small" icon="el-icon-plus"
            v-if="hasPerm('user:insert')" @click="showInsertDialog()">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="body">
      <el-table class="user-table" size="mini" height="100%" border fit 
        :data="users" :row-style="tableRowStyle" :cell-style="tableCellStyle">
        <el-table-column label="序号" type="index" width="60" align="center"></el-table-column>
        <el-table-column label="用户名称" prop="username" min-width="90" align="center"></el-table-column>
        <el-table-column label="用户密码" prop="password" min-width="90" align="center"></el-table-column>
        <el-table-column label="用户描述" prop="descInfo" min-width="150" align="center"></el-table-column>
        <el-table-column label="用户角色" min-width="90" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-text="scope.row.roleName" v-if="scope.row.roleId===1"></el-tag>
            <el-tag type="primary" v-text="scope.row.roleName" v-else></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="创建用户" prop="createUserId" min-width="60" align="center"></el-table-column>
        <el-table-column label="用户状态" prop="status" min-width="60" align="center">
          <template slot-scope="scope">
            <el-tag type="success" v-text="'启用'" v-if="scope.row.status===1"></el-tag>
            <el-tag type="danger" v-text="'禁用'" v-else></el-tag>
          </template>
        </el-table-column>
        <el-table-column label="电子邮件" prop="email" min-width="90" align="center"></el-table-column>
        <el-table-column label="联系电话" prop="phone" min-width="90" align="center"></el-table-column>
        <el-table-column label="联系地址" prop="address" min-width="90" align="center"></el-table-column>
        <el-table-column label="创建时间" prop="createTime" min-width="100" align="center"></el-table-column>
        <el-table-column label="更新时间" prop="updateTime" min-width="100" align="center"></el-table-column>
        <el-table-column label="操作" min-width="150" align="center" v-if="hasPerm('user:update') && hasPerm('user:delete')">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click="showUpdateDialog(scope.$index)">编辑</el-button>
            <el-button type="success" size="small" v-if="scope.row.status==0" @click="updateUserStatus(scope.$index, 1)">启用</el-button>
            <el-button type="danger" size="small" v-if="scope.row.status==1" @click="updateUserStatus(scope.$index, 0)">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <div class="pagination-container">
        <el-pagination background layout="total, sizes, prev, pager, next, jumper"
          :page-size="pageSize" :page-sizes="[15, 30, 50, 100]" :total="total" :pager-count="5" :current-page="currentPage" 
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange">
        </el-pagination>
      </div>
    </div>

    <!--添加/编辑用户对话框-->
		<el-dialog class="user-dialog" :title="titleMap[dialogType]" :visible.sync="showDialog" :close-on-click-modal="false" :before-close="handleClose">
			<el-form ref="userForm" label-position="right" label-width="100px" :model="userForm" :rules="userFormRules">
        <el-row>
          <el-col>
            <el-form-item label="用户名称" prop="username">
              <el-input type="text" v-model="userForm.username"></el-input>
            </el-form-item>
            <el-form-item label="用户密码" prop="password">
              <el-input type="text" v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item label="用户描述" prop="descInfo">
              <el-input type="text" v-model="userForm.descInfo"></el-input>
            </el-form-item>
            <el-form-item label="用户角色" required>
              <el-select v-model="userForm.roleId" placeholder="请选择角色">
                <el-option v-for="role in roles" :key="role.roleId" :label="role.roleName" :value="role.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电子邮件" prop="email">
              <el-input type="text" v-model="userForm.email"></el-input>
            </el-form-item>
            <el-form-item label="联系电话" prop="phone">
              <el-input type="text" v-model="userForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="联系地址" prop="address">
              <el-input type="text" v-model="userForm.address"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="resetForm('userForm'), showDialog =false">取消</el-button>
				<el-button v-if="dialogType=='insert'" type="success" @click="insertUser()">创建</el-button>
        <el-button v-else type="primary" @click="updateUser()">提交</el-button>
			</div>
		</el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUsers, getAllRoles, insertUser, updateUser, deleteUser, updateUserStatus } from '@/api/user'

export default {
  data() {
    return {
      // table
      users: [],
      page: 1,
      pageSize: 15,
      total: 0,
      currentPage: 1,

      filters: {
        username: ''
      },

      // dialog
      showDialog: false,
      dialogType: 'insert',
      titleMap: {
        insert: '新建用户',
        update: '编辑用户'
      },

      // form
      userForm: {
        username: '',
        password: '',
        descInfo: '',
        roleId: '',
        createUserId: 0,
        email: '',
        phone: '',
        address: ''
      },

      // rules
      userFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'change' }
        ]
      },

      roles: []
    }
  },
  created() {
    this.getUsers()
    if (this.hasPerm('user:insert') || this.hasPerm('user:update')) {
      this.getAllRoles()
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    getUsers() {
      const params = {
        page: this.page,
        pageSize: this.pageSize,
        userId: this.userId,
        date: new Date().getTime()
      }
      getUsers(params).then(res => {
        if (res.code === 1) {
          this.users = res.data.users
          this.total = res.data.total
        }
      })
    },
    getAllRoles() {
      getAllRoles().then(res => {
        if (res.code === 1) {
          this.roles = res.data.roles
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.userForm.username = ''
      this.userForm.password = ''
      this.userForm.descInfo = ''
      this.userForm.roleId = ''
      this.userForm.status = 1
      this.userForm.email = ''
      this.userForm.phone = ''
      this.userForm.address = ''
    },
    showInsertDialog() {
      this.userForm.username = ''
      this.userForm.password = ''
      this.userForm.descInfo = ''
      this.userForm.roleId = ''
      this.userForm.status = 1
      this.userForm.email = ''
      this.userForm.phone = ''
      this.userForm.address = ''
      this.dialogType = 'insert'
      this.showDialog = true
    },
    insertUser() {
      this.$refs.userForm.validate((valid) => {
        if (valid && this.userForm.roleId !== '') {
          insertUser(this.userForm).then(res => {
            const code = res.code
            const msg = res.msg
            if (code !== 1) {
              this.$message({
                message: '创建失败：' + msg,
                type: 'error'
              })
            } else {
              this.$message({
                message: '创建成功！',
                type: 'success'
              })
              this.resetForm('userForm')
              this.getUsers()
              this.showDialog = false
            }
          })
        } else {
          this.$message({
            message: '请求参数缺失',
            type: 'error',
            duration: 2 * 1000
          })
        }
      })
    },
    showUpdateDialog($index) {
      const user = this.users[$index]
      this.userForm.id = user.id
      this.userForm.username = user.username
      this.userForm.password = user.password
      this.userForm.descInfo = user.descInfo
      this.userForm.roleId = user.roleId
      this.userForm.createUserId = user.createUserId
      this.userForm.status = user.status
      this.userForm.email = user.email
      this.userForm.phone = user.phone
      this.userForm.address = user.address
      this.dialogType = 'update'
      this.showDialog = true
    },
    updateUser() {
      updateUser(this.userForm).then(res => {
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
          this.getUsers()
          this.showDialog = false
        }
      })
    },
    deleteUser($index) {
      this.$confirm('确定删除此用户?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const user = this.users[$index]
        deleteUser(user).then(res => {
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
            this.getUsers()
          }
        })
      })
    },
    updateUserStatus($index, status) {
      var confirmMsg = ''
      if (status === 1) {
        confirmMsg = '确定启用该用户吗？'
      } else {
        confirmMsg = '确定禁用该用户吗？'
      }
      this.$confirm(confirmMsg, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          userId: this.users[$index].id,
          status: status
        }
        updateUserStatus(params).then(res => {
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
            this.getUsers()
          }
        })
      })
    },
    // 修改table样式
    tableRowStyle({ row, rowIndex }) {
      return 'height: 45px;'
    },
    tableCellStyle({ row, column, rowIndex, columnIndex }) {
      return 'padding: 1px'
    },
    handleClose() {
      this.resetForm('userForm')
      this.showDialog = false
    },
    handleCurrentChange(val) {
      this.page = val
      this.getUsers()
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getUsers()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .user {
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
  }
</style>
