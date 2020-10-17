<template>
  <div class="login">
    <div class="tlbg"></div>
    <div class="trbg"></div>
    <div class="rbbg"></div>
    <div class="left-content"></div>
    <el-card class="login-form">
      <div class="logo">
        <img src="../../assets/login/llogo.png" alt />
      </div>
      <el-form label-width="0" style="padding-top:28px;" :model="loginForm">
        <el-form-item>
          <el-input class="input-item" type="text" v-model="loginForm.userName">
            <i class="icon" slot="prefix">
              <img src="../../assets/login/user.png" alt />
            </i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="input-item" type="password" v-model="loginForm.password"  @keyup.enter.native="handleLogin">
            <i class="icon" slot="prefix">
              <img src="../../assets/login/pwd.png" alt />
            </i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="box-sh"></div>
    </el-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Ref, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { UserLoginParams, UserLoginResponse } from "@/api/user";
@Component
export default class Login extends Vue {
  loginForm: {
    userName: string;
    password: string;
  } = {
    userName: "",
    password: "",
  };
  @Action("user/userLogin") userLogin!: (
    data: UserLoginParams
  ) => Promise<UserLoginResponse>;
  created() {}
  mounted() {}
  beforeDestroy() {}
  handleLogin() {
    this.userLogin({
      ...this.loginForm,
    }).then((res) => {
      if(res.code!=0){
       this.$message.error(res.msg);
      }else{
        console.log(res);
        this.$router.push("/home");
      }
    });
  }
}
</script>

<style scoped lang="scss">
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
  overflow: hidden;
  justify-content: space-around;
  background: url(../../assets/login/bg.jpg);
  // background-image: linear-gradient(
  //   135deg,
  //   rgb(52, 120, 255) 0%,
  //   rgb(76, 169, 255) 100%
  // );
  .tlbg {
    position: absolute;
    width: 530px;
    height: 153px;
    top: 0;
    left: 10%;
    z-index: 10;
    // background: url(../../assets/login/ltt.png) no-repeat top right;
    background-size: contain;
  }
  .trbg {
    position: absolute;
    right: 0;
    top: 0;
    // background: url(../../assets/login/tr.png) no-repeat top right;
    width: 1465px;
    height: 970px;
  }
  .rbbg {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 222px;
    height: 400px;
    // background: url(../../assets/login/rtb.png) no-repeat top right;
    background-size: contain;
  }

  .left-content {
    // background: url(../../assets/login/lt.png) no-repeat top right;
    width: 1065px;
    height: 990px;
    position: relative;
    // z-index: 10;
  }
  .login-form {
    position: relative;
    z-index: 10;
    width: 510px;
    flex-shrink: 0;
    // height: 670px;
    padding: 0 72px;
    padding-bottom: 80px;
    margin-right: 260px;
    overflow: initial;
    .box-sh {
      position: absolute;
      bottom: -194px;
      width: 722px;
      height: 227px;
      left: -106px;
      /* right: 0; */
      margin: auto;
      background: url(../../assets/login/boxs.png) no-repeat;
      background-size: contain;
    }
    .logo {
      border-bottom: 2px solid #136be5;
      display: flex;
      justify-content: center;
      padding-bottom: 20px;

      margin-top: 36px;
    }
    .icon {
      display: inline-block;
      width: 52px;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .input-item {
      display: flex;
      align-items: center;
      ::v-deep .el-input__inner {
        line-height: 44px;
        height: 44px;
        border: 0;
        padding-left: 72px;
      }
      border-bottom: 2px solid #bcc2ca;
      margin: 28px 0;
    }
    .login-btn {
      width: 100%;
      height: 62px;
      border-radius: 31px;
      padding: 0;
      font-size: 20px;
    }
  }
}
</style>
