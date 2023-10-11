<template>

  <d2-container better-scroll type="card">

    <template slot="header">User Management</template>

    <div class="d2-pt d2-pb">
      <el-card>
      <!-- 间隙 ,此处为按钮和搜索框间的距离-->
      <el-row :gutter="25">
        <!-- 列宽 -->
        <el-col :span="10">
          <!-- 搜索添加 v-model是将按钮提供数据绑定，@clear是将搜索栏清楚后，也要将搜出来的数据清楚 -->
            <el-input placeholder="please input wanted user name" v-model="queryInfo.query" clearable @clear="getList">
            <!-- <el-input placeholder="请输入搜索内容" > -->
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
            </el-input>
         </el-col>

          <el-col :span="10">
            <!-- 添加用户按钮 -->
            <el-button type="primary" @click="addDialogVisible=true" round>add User</el-button>
         </el-col>

          <!-- <el-col :span="12">
      <div class="sub-title my-2 text-sm text-gray-600">
        list suggestions when activated
      </div>
      <el-autocomplete
        v-model="state1"
        :fetch-suggestions="querySearch"
        clearable
        class="inline-input w-50"
        placeholder="Please Input"
        @select="handleSelect"
      />
    </el-col> -->
      </el-row>



            <!-- 用户列表。用于改、查 , 其中，border是边框，stripe是隔行变色 -->
      <el-table :data="userList" border stripe>
        <!--索引列 -->
          <el-table-column type="index" align="center" header-align="center"></el-table-column>
          <el-table-column label="id" prop="idUser" align="center" header-align="center"></el-table-column>
          <el-table-column label="Name" prop="username" align="center" header-align="center"></el-table-column>
          <el-table-column label="Gender" prop="gender" align="center" header-align="center"></el-table-column>
          <el-table-column label="email" prop="email" align="center" header-align="center"></el-table-column>
          <el-table-column label="state" prop="isAvailable" align="center" header-align="center"></el-table-column>

              <!-- 作用域插槽 ,用来绑定数据的-->
        
      <!-- </el-table-column> -->

        
          <el-table-column label="option" align="center" header-align="center">

          <template slot-scope="scope">

            <!-- 修改 -->
                  <!-- 更改 -->
            <div style="text-align: center">
              <el-button type="primary" icon="el-icon-edit" size="small"  @click="showEditDialog(scope.row.idUser)" circle></el-button>
                    <!-- 删除 -->
              <el-button type="danger" icon="el-icon-delete" size="small" @click="deleteUser(scope.row.idUser)" circle></el-button>
            </div>
              <!-- <el-switch
                v-model="check_flag"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @click="turnTo(scope.row.idUser)">
              </el-switch> -->
            </template>
            
          </el-table-column>


      </el-table>

      <!-- 分页组件 size-change 每页最大的变化 current-change 当前最大变化 layout功能组件 -->
        <div>
            <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="queryInfo.pageNum"
                  :page-sizes="[1, 2, 5, 100]"
                  :page-size="queryInfo.pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                ></el-pagination>
        </div>
    </el-card>
    </div>
    <!-- <div class="d2-pt d2-pb">
      内容
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    <p>including CRUD to user datassssssssssssss</p>
    </div> -->
    <!-- <template slot="footer">Page userManagement Footer</template> -->


    <!-- 新增用户区域 -->
    <el-dialog title="add User" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="120px">
            
            
            <el-form-item label="UserName" prop="username">
                <el-input  suffix-icon="el-icon-edit" v-model="addForm.username"></el-input>
            </el-form-item>

            <el-form-item label="Password" prop="password">
                <el-input  suffix-icon="el-icon-edit" type="password" v-model="addForm.password"></el-input>
            </el-form-item>

            <el-form-item label="Gender" prop="gender">
              <el-radio-group v-model="addForm.gender">
                <el-radio label="Female"></el-radio>
                <el-radio label="Male"></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="Email" prop="email">
                <el-input v-model="addForm.email"></el-input>
            </el-form-item>


        </el-form>

<!-- 底部内容 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible=false"> Cancel</el-button>
            <el-button type="primary" @click="addUser"> Submit</el-button>
          </span>

    </el-dialog>

    <!-- 修改对话框,设定是，idUser和username都不能修改， -->
     <el-dialog title="edit User" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
        <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="120px">
            
            <el-form-item label="UserName" prop="username" >
                <el-input  suffix-icon="el-icon-edit" v-model="editForm.username" disabled></el-input>
            </el-form-item>

            <el-form-item label="Email" prop="email">
                <el-input v-model="editForm.email"></el-input>
            </el-form-item>

        </el-form>

<!-- 底部内容 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="editDialogVisible=false"> Cancel</el-button>
            <el-button type="primary" @click="editUserInfo"> Submit</el-button>
            
          </span>

    </el-dialog>
  </d2-container>

</template>

<script>
export default {
  name: "userManagement",
  created(){
    this.getList();
  },
  data(){
    return{
      queryInfo:{
        query:"",//查询的信息
        pageNum:1,
        pageSize:5,
      },
      logForm:{
        username:'',
        usertype:'',
        time:'',
        operationType:'',
        result:''
      },
      userList:[],
    
      total:0,

      addDialogVisible:false,//添加用户的对话框的显示或隐藏
      addForm:{
        username:'',
        password:'',
        gender:'',
        cellphone:'',
        email:'',
      },//在这里拿输入的信息

      // 修改用户的信息：
      editForm:{
        email:[],
      },
      // 页面的显示和隐藏，修改用户栏
      editDialogVisible:false,
      // 表单验证
      addFormRules:{
          username:[
            {required:true,message:'Please input User Name',trigger:'blur'},
            {min:2,max:8,message:'please input 2-8 length',trigger:'blur'},
          ],
          password:[
                {required:true,message:'Please input password',trigger:'blur'},
                {pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{5,15}$/,message:'Contains uppercase, lowercase, numbers, and a length of 5-15'},
                {min:5,max:15,message:'Please provide 5 to 15 lengths',trigger:'blur'},
          ],
          gender:[
              {required:true,message:'Please select gender'},
              // {min:4,max:4,message:''}
          ],

          email:[
            {required:true,message:'Please enter email',trigger:'blur'},
              {pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/, message:'Please enter the correct format'}
          ],
      },
  
      editFormRules:{

          email:[
            {required:true,message:'Please enter email',trigger:'blur'},
            {pattern:/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(.[a-zA-Z0-9_-]+)+$/, message:'Please enter the correct format'}
          ],

      },

    }

    
  },
  methods:{
    //获得所有用户
      async getList(){
        console.log("this is getList");
        console.log("this is "+this.$Name);
        console.log("this is "+this.$type);
        console.log("this is "+this.$Time);

        // 创建了data类型的res，data类型在上面定义了，就是有queryInfo，还有userList，还有total
          // const {data:res}=await this.$http.get("getUserInfo",{params:this.queryInfo});
          const {data:res}=await this.$http.post("getUserInfo",this.queryInfo);
          
          console.log(res);
          console.log("total " +res.number);
          console.log("data  "+res.result);
          this.total=res.number;

          this.userList=res.result;
          console.log("total: "+this.total);
          console.log("userList: "+this.userList);
      },
      // 当页面变化的时候
      handleSizeChange(newSize){
        this.queryInfo.pageSize=newSize;
        // getList,将userList传进去
        this.getList();
      },
      // pageNum 的触发动作
      handleCurrentChange(newPage){
          this.queryInfo.pageNum=newPage;
          this.getList();
      },
      // 这是清零的操作
      addDialogClosed(){
          this.$refs.addFormRef.resetFields();
      },
      
      addUser(){

          console.log("addUser的第一个方法");
          // 如果表单的数据无效，就不能往下进行
            this.$refs.addFormRef.validate(async valid=>{
                // console.log("true");

                console.log(valid);
                // 如果没有验证成功——数据无效
              if(!valid) return ;
              console.log("到这里的？？");
              this.$setOperationTime(new Date());
              const {data:res}=await this.$http.post("addUser",this.addForm);

              console.log("res   "+res);
              this.logForm.result='success';
              this.logForm.username=this.$Name;
              this.logForm.usertype=this.$type;
              this.logForm.time=this.$OperationTime;
              this.logForm.operationType='addUer';
              console.log("this !!!!!!!!!!!!!!");
              console.log(this.logForm);
              console.log("this !!!!!!!!!!!!!!");

              if(res!="success"){
                  this.logForm.result='Fail';
                  const {data: res2}=await this.$http.post("saveLog",this.logForm);
                  return this.$message.error("操作失败!!~");
              }
              const {data: res2}=await this.$http.post("saveLog",this.logForm);

              this.$message.success("操作成功!!~");
              this.addDialogVisible=false;
              this.getList();
           });
        },
      
        // 删除事件,根据主键，删除用户
        async deleteUser(idUser){
          console.log("是idUser"+idUser); 

          // 这是信息提示框
          const confirmResult =await this.$confirm("This operation will delete the user forever, click 'Yes' to continue. ",'HINT',{
            confirmButtonText:'Yes',
            // confirmButtonText:'Cancel',
            type:'warning'
          }).catch(err=>err);   //后面这个catch是异常处理

          if(confirmResult!='confirm'){
            // 如果选择了取消
            return this.$message.info("The operation has been canceled!!!");
          }
            // 如果继续操作
            // this.$http.delete
          console.log("点击了继续");
          this.$setOperationTime();
          const {data:res}=await this.$http.delete("deleteUser?idUser="+idUser);
          // const {data:res}=await this.$http.post("deleteUser",this.idUser);
        
          this.logForm.result='success';
          this.logForm.username=this.$Name;
          this.logForm.usertype=this.$type;
          this.logForm.time=this.$OperationTime;
          this.logForm.operationType='deleteUser';
            // 看返回结果
            if(res!="success"){
              // 不成功，
              this.logForm.result='Fail';
              const {data: res2}=await this.$http.post("saveLog",this.logForm);
              return this.$message.error('fail to delete the user!!');
            }
            console.log(res);
            const {data: res2}=await this.$http.post("saveLog",this.logForm);

            this.$message.success('success to delete!! ');
            this.getList();

        },
        // 展示修改框
        async showEditDialog(idUser){
            console.log("this is the show 修改狂");
            console.log(idUser);
            const {data:res}=await this.$http.delete("getUpdate?idUser="+idUser);

            // res返回的是json串
            this.editForm=res;
            this.editDialogVisible=true;


        },

        // 修改狂清零
        editDialogClosed(){
          this.$refs.editFormRef.resetFields();
        },
      // 最终提交的时候submit的监听函数
        editUserInfo(){
          // 数据的格式判断
            this.$refs.editFormRef.validate(async valid=>{
                if(!valid) return ;
                console.log("valid  "+valid);
                this.$setOperationTime(new Date());
                this.logForm.username=this.$Name;
                this.logForm.usertype=this.$type;
                this.logForm.time=this.$OperationTime;
                this.logForm.operationType='editUser';

                const {data:res}=await this.$http.post("editUser",this.editForm);
                const {data: res2}=await this.$http.post("saveLog",this.logForm);

                if(res!="success") {
                    this.logForm.result='Fail';
                    
                    const {data: res2}=await this.$http.post("saveLog",this.logForm);

                    return this.$message.error("更改User信息失败！！！！！~~~");
                }
                this.logForm.result='success';
                const {data: res3}=await this.$http.post("saveLog",this.logForm);

                this.$message.success("成功更改个人信息！！！");
                // 隐藏
                this.editDialogVisible=false;
                this.getList();
            });
        },
  }
};
</script>
