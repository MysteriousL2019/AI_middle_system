<template>
  <div class="page-login">
    <div class="page-login--layer page-login--layer-area">
      <ul class="circles">
        <li v-for="n in 10" :key="n"></li>
      </ul>
    </div>
    <div
      class="page-login--layer page-login--layer-time"
      flex="main:center cross:center">
      {{time}}
    </div>
    <div class="page-login--layer">
      <div
        class="page-login--content"
        flex="dir:top main:justify cross:stretch box:justify">
        <div class="page-login--content-header">
          <p class="page-login--content-header-motto">
            Time is the most valuable of all treasures
          </p>
        </div>
        <div
          class="page-login--content-main"
          flex="dir:top main:center cross:center">
          <!-- logo -->
          <!-- <img class="page-login--logo" src="./image/logo@2x.png"> -->
          <h1 class="title">AI Model Management System</h1>
          <!-- form -->
          <div class="page-login--form">
            <el-card shadow="never">
              <el-form
                ref="loginForm"
                label-position="top"
                :rules="rules"
                :model="formLogin"
                size="default">
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model="formLogin.username"
                    placeholder="user name">
                    <i slot="prepend" class="fa fa-user-circle-o"></i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="password">
                  <el-input
                    type="password"
                    v-model="formLogin.password"
                    placeholder="password">
                    <i slot="prepend" class="fa fa-keyboard-o"></i>
                  </el-input>
                </el-form-item>
                <!-- <el-form-item prop="code"> -->
                  <!-- <el-input
                    type="text"
                    v-model="formLogin.code"
                    placeholder="code"> -->
                    <!-- <template slot="append"> -->

                      <!-- <img class="login-code" src="./image/login-code.png"> -->

                    <!-- </template> -->
                  <!-- </el-input> -->
                <!-- </el-form-item> -->
                <el-button
                  size="default"
                  @click="loginSystem"
                  type="primary"
                  class="button-login">
                  login
                </el-button>
              </el-form>
            </el-card>
            <p
              class="page-login--options"
              flex="main:justify cross:center">
              <!-- <span><d2-icon name="question-circle"/> 忘记密码</span> -->
              <!-- <span>注册用户</span> -->
              <span @click="changeDialogVisible=true"><d2-icon name="question-circle"/> forget the password</span>

            </p>
            <!-- quick login -->
            <!-- <el-button class="page-login--quick" size="default" type="info" @click="dialogVisible = true">
              快速选择用户（测试功能）
            </el-button> -->
          </div>
        </div>
        <div class="page-login--content-footer">
          <!-- <p class="page-login--content-footer-locales">
            <a
              v-for="language in $languages"
              :key="language.value"
              @click="onChangeLocale(language.value)">
              {{ language.label }}
            </a>
          </p> -->
          <p class="page-login--content-footer-locales">
            <!-- Author: Li Fangzheng   |  -->
            <!-- Student ID: 2019213710 | -->
            <!-- QMID: 190896302 -->
            <a href="#" class="content">Author: Li Fangzheng   |  </a>
            <a href="#" class="content">Student ID: 2019213710 | </a>
            <a href="#" class="content">QMID: 190896302</a>
            <!-- Copyright -->
            <!-- <d2-icon name="copyright"/> -->
            <!-- 2018 D2 Projects 开源组织出品 -->
            <!-- <a href="https://github.com/FairyEver">
              @FairyEver
            </a> -->
          </p>
          <!-- <p class="page-login--content-footer-options">
            <a href="#">帮助</a>
            <a href="#">隐私</a>
            <a href="#">条款</a>
          </p> -->
        </div>
      </div>
    </div>
    <el-dialog
      title="快速选择用户"
      :visible.sync="dialogVisible"
      width="400px">
      <el-row :gutter="10" style="margin: -20px 0px -10px 0px;">
        <el-col v-for="(user, index) in users" :key="index" :span="8">
          <div class="page-login--quick-user" @click="handleUserBtnClick(user)">
            <d2-icon name="user-circle-o"/>
            <span>{{user.name}}</span>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
      <!-- 修改密码 -->
    <el-dialog title="change password" :visible.sync="changeDialogVisible" width="50%" @close="changeDialogClosed">
        <el-form :model="form" :rules="addFormRules" ref="addFormRef" label-width="120px">
            <el-form-item label="UserName" prop="username">
                <el-input  suffix-icon="el-icon-edit" v-model="form.username"></el-input>
            </el-form-item>

            <el-form-item label="Password" prop="password">
                <el-input  suffix-icon="el-icon-edit" type="password" v-model="form.password"></el-input>
            </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button @click="changeDialogVisible=false"> Cancel</el-button>
          <el-button type="primary" @click="changePassword"> Next</el-button>
          
        </span>
    </el-dialog>
    <el-dialog title="change password 2" :visible.sync="changePasswordVisible" width="50%" @close="changePasswordClosed">
        <el-form :model="formSubmit" :rules="submitFormRules" ref="FormRef" label-width="120px">

            <el-form-item label="New Password" prop="password2">
                <el-input  suffix-icon="el-icon-edit" type="password" v-model="formSubmit.password1"></el-input>
            </el-form-item>

            <el-form-item label="Input Again" prop="password2">
                <el-input  suffix-icon="el-icon-edit" type="password" v-model="formSubmit.password2"></el-input>
            </el-form-item>
          <el-button @click="changePasswordVisible=false"> Cancel</el-button>
          <el-button type="primary" @click="submitPassword"> Submit</el-button>
        </el-form>
    </el-dialog>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { mapActions } from 'vuex'
import localeMixin from '@/locales/mixin.js'
export default {
  mixins: [
    localeMixin
  ],
  data () {
    return {
      addFormRules:{
        username:[
            {required:true,message:'Please input user name',trigger:'blur'},
            {min:2,max:8,message:'please 2-8 length',trigger:'blur'},
          ],
          password:[
                {required:true,message:'please input password',trigger:'blur'},
            {pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{5,15}$/,message:'Contains uppercase, lowercase, numbers, and a length of 5-15'},
            {min:5,max:15,message:'Please provide 5 to 15 lengths',trigger:'blur'},
        ],
      },
      submitFormRules:{
        password1:[
            {required:true,message:'please input password',trigger:'blur'},
            {pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{5,15}$/,message:'Contains uppercase, lowercase, numbers, and a length of 5-15'},
            {min:5,max:15,message:'Please provide 5 to 15 lengths',trigger:'blur'},
        ],
        password2:[
            {required:true,message:'please input password again',trigger:'blur'},
            {pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{5,15}$/,message:'Contains uppercase, lowercase, numbers, and a length of 5-15'},
            {min:5,max:15,message:'Please provide 5 to 15 lengths',trigger:'blur'},
            {
              validator: (rule, value, callback) => {
                if (value !== this.formSubmit.password1) {
                  callback(new Error(' The passwords entered two times are inconsistent.'))
                } else {
                  callback()
                }
              },
              trigger: 'blur'
            },
        ],
      },
      form: {
        username: '',
        password:'',
        gender:'',
        email:'',

      },
      formSubmit:{
        username:'',
        password1:'',
        password2:'',
        personValue:'',
      },
      time: dayjs().format('HH:mm:ss'),
      // 快速选择用户
      dialogVisible: false,
      changePasswordVisible:false,
      changeDialogVisible:false,
      users: [
        {
          name: 'Admin',
          username: 'admin',
          password: 'admin'
        },
        {
          name: 'Editor',
          username: 'editor',
          password: 'editor'
        },
        {
          name: 'User1',
          username: 'user1',
          password: 'user1'
        }
      ],
      // 表单
      //预设密码
      formLogin: {
        username: 'lfz',
        password: '20010509ZSERRt!',
        // code: 'v9am'
      },
      // 表单校验
      rules: {
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  mounted () {
    this.timeInterval = setInterval(() => {
      this.refreshTime()
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(this.timeInterval)
  },
  methods: {
        async submitPassword(){
            this.$refs.FormRef.validate(async valid=>{
              if(valid){
                  console.log("hhhhhhhhhh  "+this.formSubmit.username);
                  const {data:res}=await this.$http.post("changePassword",this.formSubmit);
                  console.log(res);
                  if(res==1){
                      this.$message.success("operate successfully!");
                      this.changePasswordClosed();
                      this.changePasswordVisible=false;
                  }else{
                        this.$message.error("error operation!");
                  }
              }
            });
    },
    async changePassword(){
            this.$refs.addFormRef.validate(async valid=>{
              if(valid){
                this.formSubmit.username=this.form.username;
                const {data:res}=await this.$http.post("checkPassword",this.form);
                if(res==-1){
                  return this.$message.error("error password");
                }
                this.formSubmit.personValue=res;
                this.changeDialogVisible=false;
                console.log("nnnnnnnnnn   "+this.formSubmit.username);
                this.changePasswordVisible=true;
                this.$message.success("success operation");
              }
            });
    },
    changeDialogClosed(){
        this.$refs.addFormRef.resetFields();
    },
    changePasswordClosed(){
        this.$refs.FormRef.resetFields();
        this.formSubmit.password1 = '';
        this.formSubmit.password2 = '';
    },
    ...mapActions('d2admin/account', [
      'login'
    ]),
    refreshTime () {
      this.time = dayjs().format('HH:mm:ss')
    },
    /**
     * @description 接收选择一个用户快速登录的事件
     * @param {Object} user 用户信息
     */
    handleUserBtnClick (user) {
      this.formLogin.username = user.username
      this.formLogin.password = user.password
      this.submit()
    },

  // checkFlag(){
  //   if(res.flag=="ok1" || res.flag=="ok2")
  //     return 1;
  //   return 0;
  // },
  async saveNewLogin(){
    
    const { data: res } = await this.$http.get("saveNewLogin?loginTime="+this.$Time+"&userName="+this.$Name+"&userType="+this.$type );

    console.log("res !!!!xxxxxx "+res);
  },
  loginSystem(){
          // 提交申请请求，此处的valid是指admin和密码符合标准规范
      this.$refs.loginForm.validate(async (valid) => {
          console.log("hhh");
        
        if (valid) {

            
            // const { data: res } = await this.$http.post("test");
            console.log(this.formLogin.username);
            console.log(this.formLogin.password);

            // this.loginForm是在上面封装的用户名和密码
            const { data: res } = await this.$http.post("login", this.formLogin);
            console.log("res: "+res);
            console.log("res:flag   "+res.flag);
            console.log("res user: "+res.user);

            if (res.flag == "ok1") {
                      // 
              // window.sessionStorage.setItem("flag", "ok1"); // session 放置
              // this.$Time=new Date().toString()
              this.$setTime(new Date());
              this.$setUserPlace('New York, USA');
              this.$setUserName(res.userName);
              this.$setUserType("Super Admin");
              this.$message.success("Hello, Admin:"+res.userName);
              this.saveNewLogin();
              // this.checkFlag()
              this.login({
                  username: this.formLogin.username,
                  password: this.formLogin.password
                })
              .then(() => {
                  this.$router.push({
                    name:'index',
                    params:{
                    parm:res.flag,
                    }
                  })
              })
              // next({
              //   name:"/index",
              //   params:{
              //     parm:res.flag,
              //   }
              // })
            } else if(res.flag=="ok2"){

                // window.sessionStorage.setItem("flag", "ok2"); // session 放置
                this.$message.success("Hello, User:"+res.userName);
                this.$setTime(new Date());
                this.$setUserPlace('New York, USA');
                this.$setUserName(res.userName);
                this.$setUserType("Personal User");
                this.$setIdUser(res.idUser);
                this.$setGender(res.gender);
                this.saveNewLogin();

                this.login({
                  username: this.formLogin.username,
                  password: this.formLogin.password
                })
                .then(() => {
                    this.$router.push({
                      name:'index',
                      // query:{//这个会在url显示
                      params:{
                      parm:res.flag,
                      }
                    })
                })
            } 
        }else {
              // 登录表单校验失败
              this.$message.error('表单校验失败，请检查')
            }
      });
  },

    /**
     * @description 提交表单
     */
    // 提交登录信息
    submit () {
      this.$refs.loginForm.validate((valid) => {


      // if(valid){
        // console.log(this.formLogin.username)
      //   console.log(this.formLogin.password)

      //   // const {data:res}=await this.$http.post("login",this.formLogin);
      //   // console.log("res: "+res);
      //   // console.log("res:flag   "+res.flag);
      //   // console.log("res user: "+res.user);
      //   if(this.formLogin.username=='admin'){
      //         this.$router.replace(this.$route.query.redirect || '/')
      //   }else{
      //       this.$router.replace(this.$route.query.redirect || '/homeUser')
      //   }
      // }        

        // ************************************************************** */ 
        // 原本的
        if (valid) {
          // 登录
          // 注意 这里的演示没有传验证码
          // 具体需要传递的数据请自行修改代码
          this.login({
            username: this.formLogin.username,
            password: this.formLogin.password
          })
            .then(() => {
              // 重定向对象不存在则返回顶层路径
              console.log(this.$route.params)
              console.log("1111111111")
              console.log(this.formLogin.username)
              console.log("1111111111")
            //   this.$router.push({
            //   path:'/',
            //   query:{
            //   parm:this.formLogin,
            //   }
            // })
       
              if(this.formLogin.username=='admin'){
                // this.$router.replace(this.$route.query.redirect || '/')
         
                       this.$router.push({
                    path:'/',
                    // name:'../index/page',
                    query:{
                    parm:this.formLogin.username,
                    }
                  })
              
              
              }
              else{
                // this.$router.replace(this.$route.query.redirect || '/homeUser')

                this.$router.push({
                  path:'/',
                  query:{
                  parm:this.formLogin.username,
                  }
                })

              }
            })
        } 
        //************************************************************** */ 
        
        
        
        else {
          // 登录表单校验失败
          this.$message.error('表单校验失败，请检查')
        }
      })
    }
  }
}
</script>

<style lang="scss">
.content {
  color: #666;
  font-weight: bold;
  font-size: 1.2em;
  background-color: transparent;
  font-family: "Times New Roman", Times, serif;

}
.title {
  color: #666;
  font-weight: bold;
  font-size: 2.5em;
  background-color: transparent;
  // font-family: Arial, sans-serif;
  font-family: "Times New Roman", Times, serif;
}
.page-login {
  @extend %unable-select;
  $backgroundColor: #F0F2F5;
  // ---
  background-color: $backgroundColor;
  height: 100%;
  position: relative;
  // 层
  .page-login--layer {
    @extend %full;
    overflow: auto;
  }
  .page-login--layer-area {
    overflow: hidden;
  }
  // 时间
  .page-login--layer-time {
    font-size: 24em;
    font-weight: bold;
    color: rgba(0, 0, 0, 0.03);
    overflow: hidden;
  }
  // 登陆页面控件的容器
  .page-login--content {
    height: 100%;
    min-height: 500px;
  }
  // header
  .page-login--content-header {
    padding: 1em 0;
    .page-login--content-header-motto {
      margin: 0px;
      padding: 0px;
      color: $color-text-normal;
      text-align: center;
      font-size: 12px;
    }
  }
  // main
  .page-login--logo {
    width: 240px;
    margin-bottom: 2em;
    margin-top: -2em;
  }
  // 登录表单
  .page-login--form {
    width: 280px;
    // 卡片
    .el-card {
      margin-bottom: 15px;
    }
    // 登录按钮
    .button-login {
      width: 100%;
    }
    // 输入框左边的图表区域缩窄
    .el-input-group__prepend {
      padding: 0px 14px;
    }
    .login-code {
      height: 40px - 2px;
      display: block;
      margin: 0px -20px;
      border-top-right-radius: 2px;
      border-bottom-right-radius: 2px;
    }
    // 登陆选项
    .page-login--options {
      margin: 0px;
      padding: 0px;
      font-size: 14px;
      color: $color-primary;
      margin-bottom: 15px;
      font-weight: bold;
    }
    .page-login--quick {
      width: 100%;
    }
  }
  // 快速选择用户面板
  .page-login--quick-user {
    @extend %flex-center-col;
    padding: 10px 0px;
    border-radius: 4px;
    &:hover {
      background-color: $color-bg;
      i {
        color: $color-text-normal;
      }
      span {
        color: $color-text-normal;
      }
    }
    i {
      font-size: 36px;
      color: $color-text-sub;
    }
    span {
      font-size: 12px;
      margin-top: 10px;
      color: $color-text-sub;
    }
  }
  // footer
  .page-login--content-footer {
    padding: 1em 0;
    .page-login--content-footer-locales {
      padding: 0px;
      margin: 0px;
      margin-bottom: 15px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
        margin: 0 .5em;
        &:hover {
          color: $color-text-main;
        }
      }
    }
    .page-login--content-footer-copyright {
      padding: 0px;
      margin: 0px;
      margin-bottom: 10px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      color: $color-text-normal;
      a {
        color: $color-text-normal;
      }
    }
    .page-login--content-footer-options {
      padding: 0px;
      margin: 0px;
      font-size: 12px;
      line-height: 12px;
      text-align: center;
      a {
        color: $color-text-normal;
        margin: 0 1em;
      }
    }
  }
  .p{
    font-size: 20px;
    font-family:"宋体","仿宋",sans-serif;
  }
  // 背景
  .circles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0px;
    padding: 0px;
    li {
      position: absolute;
      display: block;
      list-style: none;
      width: 20px;
      height: 20px;
      background: #FFF;
      animation: animate 25s linear infinite;
      bottom: -200px;
      @keyframes animate {
        0%{
          transform: translateY(0) rotate(0deg);
          opacity: 1;
          border-radius: 0;
        }
        100%{
          transform: translateY(-1000px) rotate(720deg);
          opacity: 0;
          border-radius: 50%;
        }
      }
      &:nth-child(1) {
        left: 15%;
        width: 80px;
        height: 80px;
        animation-delay: 0s;
      }
      &:nth-child(2) {
        left: 5%;
        width: 20px;
        height: 20px;
        animation-delay: 2s;
        animation-duration: 12s;
      }
      &:nth-child(3) {
        left: 70%;
        width: 20px;
        height: 20px;
        animation-delay: 4s;
      }
      &:nth-child(4) {
        left: 40%;
        width: 60px;
        height: 60px;
        animation-delay: 0s;
        animation-duration: 18s;
      }
      &:nth-child(5) {
        left: 65%;
        width: 20px;
        height: 20px;
        animation-delay: 0s;
      }
      &:nth-child(6) {
        left: 75%;
        width: 150px;
        height: 150px;
        animation-delay: 3s;
      }
      &:nth-child(7) {
        left: 35%;
        width: 200px;
        height: 200px;
        animation-delay: 7s;
      }
      &:nth-child(8) {
        left: 50%;
        width: 25px;
        height: 25px;
        animation-delay: 15s;
        animation-duration: 45s;
      }
      &:nth-child(9) {
        left: 20%;
        width: 15px;
        height: 15px;
        animation-delay: 2s;
        animation-duration: 35s;
      }
      &:nth-child(10) {
        left: 85%;
        width: 150px;
        height: 150px;
        animation-delay: 0s;
        animation-duration: 11s;
      }
    }
  }
}
</style>
