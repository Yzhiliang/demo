<template>
  <div id="admin-Login">
    <div class="form-content">
      <!-- 左边 -->
      <div  class="form-left">
        <div class="form-left-img"></div>
        <h3 class="from-left-h3">智学无忧后台管理系统</h3>
        <p class="from-left-p">做最有态度、责任、良心的教育</p>
      </div>
      <!-- 右边 -->
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="0px" class="demo-ruleForm">
        <el-form-item  prop="account">
          <el-input type="text" v-model="ruleForm2.account"  prefix-icon="el-icon-s-custom"></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input type="password" v-model="ruleForm2.pass" prefix-icon="el-icon-lock"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">记住密码</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default { 
     data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入账号'));
        } else {
          callback();
        }
      };
      return {
        checked: false,
        ruleForm2: {
          pass: '111111',
          account: '13189898989'
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          account: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      // 登录
      submitForm(formName) {
        // console.log(formName)
       
          var _this=this
        this.axios.get('http://192.168.1.188/api/OAuth/authenticate?stuMobile='+_this.ruleForm2.account+'&stuPassword='+_this.ruleForm2.pass,
        ).then(function(res){
           _this.$message({
				      	message: '登录成功',
				      	type: 'success'
            });
          sessionStorage.tokei=res.data.access_token
          console.log(res.data)
          _this.$router.push({"path":'/Home'})
        }).catch(function(req){
          // console.log(req)
          if(_this.ruleForm2.account.trim()==''||_this.ruleForm2.pass.trim()==''){
              _this.$message.error('账号或者密码不能为空！');
                return false;
            }else{
              _this.$message.error('账号或者密码错误，请重新输入！');
                return false;
            }
        })


        // this.$refs[formName].validate((valid) => {
        //   // console.log(valid)
        //   if (valid) {
             
        //   } else {
        //     // console.log(_this.ruleForm2.account)
        //     if(_this.ruleForm2.account.trim()==''||_this.ruleForm2.pass.trim()==''){
        //       this.$message.error('账号或者密码不能为空！');
        //         return false;
        //     }else{
          
        // });
      }
    }
};
</script>

<style scoped>
/* 最大框架 */
#admin-Login{
    /* width: 350px; */
    background: url("../assets/background.jpg") 0px 0px no-repeat;
    /* height: 670px; */
    height: 100%;
    margin: auto;
    overflow: hidden;
    /* border: 1px solid rgb(255, 0, 0); */
}
/* 中间的登录和图片的父框架 */
.form-content{
  /* border: 1px solid rgb(98, 61, 17); */
  border-radius: 8px;
  box-shadow: 0px 0px 10px 10px #4283D6;
  background-color: #D8ECF5;
  display: flex;
  width: 600px;
  height: 320px;
  overflow: hidden;
  margin: auto;
  margin-top: 150px;
}
/* 中间左边内容 */
.form-left{
  width: 52.9%;
  border-right: 1px solid transparent;
  border-image: -webkit-linear-gradient(white, green, white)3 10 3;
}

/* 登录框架 */
.el-button--primary{
  background-color: #67C239;
  border-color:#67C239 ;
  width: 90%;
}

/* 记住密码 */
/deep/.el-form-item__content{
  line-height: 1px;
  text-align: left;
}

/* 登录按钮框 */
.el-form-item--feedback{
  width: 75%;
  margin: auto;
  margin-bottom: 25px;
}
/* 中间右边登录 */
.demo-ruleForm{
    width: 46.9%;
    padding-top: 50px; 
}

/* 左边内容 */
.form-left-img{
  width: 120px;
  height: 120px;
  margin: auto;
  box-shadow: 0px 0px 10px 3px #ccc;
  margin-top: 25px;
  margin-bottom: 30px;
  border: 1px solid #ccc;
  border-radius: 50%;
  background: url('../assets/favicons .jpg') 6px 3px no-repeat;
  background-size: 90%;
}
.from-left-h3{
  color: #169489;
  text-align: center;
}
.from-left-p{color: #999;font-size: 14px;margin-top: 30px;text-align: center;}

/deep/ .el-icon-lock{
  color: #67C239;
  font-size: 22px;
}
/deep/ .el-icon-s-custom{
  color: #67C239;
  font-size: 22px;
}

</style>
