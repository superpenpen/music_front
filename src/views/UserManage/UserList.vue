<template>
  <PageWrap>
    <div class="user-list">
      <el-card class="box-card">
        <el-form :inline="true" ref="searchForm" :model="searchForm" class="demo-form-inline">
          <el-form-item label prop="userName">
            <el-input v-model="searchForm.userName" placeholder="账号" @keyup.enter.native="getUserList"></el-input>
          </el-form-item>
          <el-form-item label prop="nickName">
            <el-input v-model="searchForm.nickName" placeholder="昵称" @keyup.enter.native="getUserList"></el-input>
          </el-form-item>
          <el-form-item label prop="roleId">
            <el-select v-model="searchForm.roleId" placeholder="角色">
              <el-option label="超级管理员" value="0" :disabled="roleId!=0"></el-option>
              <el-option label="管理员" value="1" :disabled="roleId!=0&&roleId!=1"></el-option>
              <el-option label="普通用户" value="2"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="getUserList">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" icon="el-icon-refresh" @click="resetSearchForm">重置</el-button>
          </el-form-item>
          <el-form-item>
            <el-button v-if="roleId!=2" type="primary" icon="el-icon-plus" @click="handleUserAdd">创建</el-button>
          </el-form-item>
        </el-form>
        <el-table v-loading="tableLoading" :data="tableData" style="margin-top:20px">
          <el-table-column label="账号" prop="userName"></el-table-column> 
          <el-table-column label="昵称" prop="nickName"></el-table-column>
          <el-table-column label="角色" prop="roleId" width="180">
            <template slot-scope="scope">
              <span slot="reference">{{scope.row.roleId | roleName}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" icon="el-icon-edit" @click="handleEditUser(scope.$index, scope.row)" v-if="roleId!=2">修改</el-button>
              <el-button size="mini" type="warning" icon="el-icon-refresh-right" v-if="roleId==0" @click="handleResetPwd(scope.$index, scope.row)">重置密码</el-button>
              <el-button size="mini" icon="el-icon-delete" type="danger" v-if="roleId==0" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          v-show="tableData.length"
          style="margin-top:20px"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNumber"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </el-card>
      <el-dialog width="600px" :title="dialogForm.id?'修改':'新增'" :visible.sync="dialogVisible" @before-close="dialogVisible=false">
        <el-form  :model="dialogForm" :rules="dialogFormRules" ref="dialogForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="账号" prop="userName">
            <el-input :disabled="dialogForm.id"  v-model="dialogForm.userName" placeholder="账号"></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickName">
            <el-input :disabled="dialogForm.id&&roleId==2" v-model="dialogForm.nickName" placeholder="昵称"></el-input>
            <template v-if="dialogForm.id">
              <el-button type="primary" v-if="roleId!=2" @click="nickNameEdit(dialogForm)">修改</el-button>
            </template>
          </el-form-item>
          <el-form-item label="角色" prop="roleId">
            <el-select style="width:100%;" :disabled="dialogForm.id&&roleId!=0" v-model="dialogForm.roleId" placeholder="请选择角色">
              <el-option v-if="roleId==0" label="超级管理员" :value="0"></el-option>
              <el-option label="管理员" :value="1"></el-option>
              <el-option label="普通用户" :value="2"></el-option>
            </el-select>
            <template v-if="dialogForm.id">
              <el-button type="primary" v-if="roleId==0" @click="loginRoleEdit(dialogForm)">修改</el-button>
            </template>
          </el-form-item>
        </el-form>
        <span slot="footer" v-if="!dialogForm.id" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleAddSubmit">确 定</el-button>
        </span>
        <span slot="footer" v-else class="dialog-footer">
          <el-button @click="dialogVisible = false">关 闭</el-button>
        </span>
      </el-dialog>
    </div>
  </PageWrap>
</template>

<script lang="ts">
// 管理员roleid是1，超级管理员admin是0，普通用户是2
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { UserListItem } from "@/api/user";
import {
  userList,
  userCreate,
  userDelete,
  userPwdReset,
  userEditNickName,
  userEditRole
} from "@/api/user";
@Component
export default class UserList extends Vue {
  @Prop({ type: Number }) selTabName!: number;
  @Getter("roleId") roleId!: string;
  dialogVisible: boolean = false;
  pageNumber: number = 1;
  pageSize: number = 10;
  total: number = 0;
  tableData: any[] = [];
  searchForm = {
    userName: "",
    nickName: "",
    roleId: "",
  };
  dialogForm: {
    id?: number;
    userName: string;
    nickName: string;
    roleId?: number;
  } = {
    id: undefined,
    userName: "",
    nickName: "",
    roleId: undefined
  };
  dialogFormRules = {
    userName: [
      // { required: true, message: "请输入活动名称", trigger: "blur" },
      // { required: true, min: 5, message: "长度在 5 个字符以上", trigger: "blur" },
    ],
  };
  tableLoading: boolean = false;
  created() {
    this.getUserList();
  }
  beforeDestroy() {}
  handleSizeChange(pageSize: number) {
    this.pageNumber = 1;
    this.pageSize = pageSize;
    this.getUserList();
  }
  handleCurrentChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.getUserList();
  }
  resetSearchForm() {
    (this.$refs["searchForm"] as any).resetFields();
    this.getUserList();
  }
  nickNameEdit(params: UserListItem) {
    userEditNickName({
      id: params.id,
      nickName: params.nickName,
    }).then((res) => {
      if(res.code!== 0){
        this.$message.error(res.msg);
      }else{
        this.getUserList();
        this.$message.success("用户昵称修改成功");
      }
    });
  }

  loginRoleEdit(params: UserListItem) {
    userEditRole({
      id: params.id,
      roleId: params.roleId,
    }).then((res) => {
      if(res.code!== 0){
          this.$message.error(res.msg);
      }else{
        this.getUserList();
        this.$message.success("用户角色修改成功");
      }
    });
  }
  handleResetPwd(index: number, row: UserListItem) {
    this.$confirm("此操作将重置该用户密码, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      userPwdReset({
        id: row.id,
      }).then((res) => {
        if(res.code!== 0){
          this.$message.error(res.msg);
        }else{
          this.$message({
            type: "success",
            message: "重置成功!",
          });
        }
      });
    });
  }
  handleUserAdd() {
    this.dialogForm.id = undefined;
    this.dialogForm = {
      id: undefined,
      userName: "",
      nickName: "",
      roleId: undefined
    };
    this.dialogVisible = true;
  }
  handleEditUser(index: number, row: UserListItem) {
    this.dialogForm = {
      id: row.id,
      userName: row.userName,
      nickName: row.nickName!,
      roleId: row.roleId,
    };
    this.dialogVisible = true;
  }
  handleAddSubmit() {
    if (!this.dialogForm.id) {
      const { id, ...params } = this.dialogForm;
      userCreate({
        userName: params.userName,
        nickName: params.nickName,
        roleId: params.roleId!,
      }).then((res) => {
        if(res.code!== 0){
          this.$message.error(res.msg);
        }else{
          this.getUserList();
          this.dialogVisible = false;
        }
      });
    }
  }
  handleDelete(index: number, row: UserListItem) {
    this.$confirm("此操作将永久删除用户, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(() => {
      userDelete({
        userId: row.id,
      }).then((res) => {
        if(res.code!== 0){
          this.$message.error(res.msg);
        }else{
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.getUserList();
        }
      });
    });
  }
  getUserList() {
    this.tableLoading = true;
    userList({
      ...this.searchForm,
      page: this.pageNumber,
      size: this.pageSize,
    }).then((res) => {
      this.tableLoading = false
      this.tableData = res.data.records
      this.total =res.data.total      
    });
  }
}
</script>

<style scoped lang="scss">
.user-list {
  ::v-deep .el-table--small td, .el-table--small th{
    padding: 12px 0px;
  }
  ::v-deep .el-form-item__content {
    display: flex;
    .el-button {
      margin-left: 10px;
    }
  }
}
</style>
