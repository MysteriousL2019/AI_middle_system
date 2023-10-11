<template>
  <d2-container>
    <template slot="header">Page personalInfo Header</template>
    <!-- Hello World
    <p>sssss</p> -->
    <el-row>
      <el-col :span="18">
      <el-card title="个人信息" label-width="90px" :style="{ width: '35%' }">
          <el-form :model="infoForm" :rules="FormRules" ref="FormRef" >
            <el-form-item label="Name" prop="name">
              <el-input v-model="infoForm.name" :disabled="true"/>
            </el-form-item>
            <el-form-item label="Password" prop="password" >
              <el-input v-model="infoForm.password" :disabled="true"/>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input v-model="infoForm.email" />
            </el-form-item>
            <el-form-item label="Gender" prop="gender">
              <el-input v-model="infoForm.gender" :disabled="true"/>
            </el-form-item>


          </el-form>
          <el-card style="text-align: center;">
            <el-button type="primary" @click="onSubmit">submit</el-button>
          </el-card>

      </el-card>
      </el-col>
      <el-col  :span="27">
      <el-card label-width="90px" :style="{ width: '100%' }">
          <el-image src="E:\\RickAndMorty头像.png" fit="cover"></el-image>

      </el-card>
      </el-col>
    </el-row>
  </d2-container>

</template>

<script>
export default {
  name: "personalInfo",
   data() {
    return {
      infoForm: {
        name: [],
        email: [],
        password:[],
        gender:[],
      },
      // FormRules:{
      //   email:[
      //   {required:true,message:'please input email',trigger:'blur'},

      //   {pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/, message:'please input right format xxx@xx.x', trigger: 'blur'}  
      // ],
      // },
    FormRules: {
        email: [
          { required: true, message: 'Please input email', trigger: 'blur' },
          
          { pattern: /^[\w]+@[A-Za-z]+(\.[A-Za-z0-9]+){1,2}$/, message: 'Please input a valid email address', trigger: 'blur' }

          // { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)*\.[a-zA-Z]{2,4}$/, message: 'Please input a valid email address', trigger: 'blur' }
        ],
      }

    }
  },
  created(){
      this.getPersonalInfo();
  },
  methods: {

      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      async getPersonalInfo(){
          // const {res:data}
          console.log("this is getPersonal INFOxxxxxxxxxxxxxxxx");
            const { data: res } = await this.$http.delete("getPersonalInfo?userName="+ this.$Name);
            this.infoForm.name=res.name;
            this.infoForm.email=res.email;
            this.infoForm.password=res.password;
            this.infoForm.gender=res.gender;
            console.log("xxxxxxxxxx "+this.infoForm);
            console.log("xxxxxxxx" +res.name);


      },
     async onSubmit() {
      this.$refs.FormRef.validate(async valid=>{
          // if(!valid) return ;
          // console.log("uccess operation  form "+this.infoForm.email);
          // this.$message.success("success operation ");
        if (valid) {
          // 提交表单数据
          console.log("uccess operation  form "+this.infoForm.email);
            const { data: res } = await this.$http.delete("changeEmail?email="+this.infoForm.email );
            if(res){
                this.$message.success("success operation ");

            }
          
        } else {
          console.log('表单验证失败');
          this.$message.error("fail to validate the form! ");
        }
      });
    },
  },
}
    
</script>
