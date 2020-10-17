<template>
  <div class="user-avatar">
    <i class="img-w">
      <img src="../../../assets/avatar.png" alt />
    </i>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{nickName}}
        <i class="el-icon-caret-bottom el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="pwdEdit">修改密码</el-dropdown-item>
        <el-dropdown-item @click.native="loginout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
      <el-dialog width="600px" :title="'修改密码'" :visible.sync="dialogVisible" @before-close="dialogVisible=false">
        <el-form  :model="dialogForm" ref="dialogForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="原密码" prop="password">
            <el-input type="password" :disabled="dialogForm.id"  v-model="dialogForm.password" placeholder="请输入原密码"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="passwordNew">
            <el-input type="password" v-model="dialogForm.passwordNew" placeholder="请输入新密码"  @keyup.enter.native="handleSubmit"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleSubmit">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import { userPasswordEdit } from "@/api/user";
@Component
export default class UserAvatar extends Vue {
  @Getter("userId") userId!:number;
  @Getter("nickName") nickName!: string;
  @Action("user/userSignOut") userSignOut!: () => void;
  dialogVisible: boolean = false;
  dialogForm: {
    id?: number;
    password: string;
    passwordNew: string;
  } = {
    id: undefined,
    password: "",
    passwordNew: "",
  };
  loginout() {
    this.userSignOut();
    this.$router.push('/login')
  };
  pwdEdit(){
    this.dialogForm.id = undefined;
    this.dialogForm = {
      id: undefined,
      password: "",
      passwordNew: "",
    };
    this.dialogVisible = true;
  };
  handleSubmit(){
    const {...params } = this.dialogForm;
    userPasswordEdit({
      id: this.userId,
      password: params.password,
      passwordNew: params.passwordNew
    }).then((res) => {
      if(res.code!== 0){
        this.$message.error(res.msg);
      }else{
       this.$message.success("密码修改成功");
       this.dialogVisible = false
      }
    });
    
  }
    
}
</script>

<style scoped lang="scss">
.user-avatar {
  color: #fff;
  line-height: 38px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 60px;
  .img-w {
    display: block;
  }
  ::v-deep .el-dropdown-link {
    color: #fff;
    font-size: 16px;
  }
}
</style>
