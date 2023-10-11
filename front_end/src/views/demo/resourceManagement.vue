<template>
  <d2-container better-scroll type="card">
    <template slot="header">Resource Management </template>
    <!-- Hello World -->
    <!-- <p>including CRUD to resources like CPU, GPU, data storage</p> -->
           <div class="d2-pt d2-pb">
              <el-card>
                  <el-collapse v-model="activeName" accordion>
                    <el-collapse-item title="CPU Resource" name="1">
                      <!-- <div>能检测所有available的CPU资源</div> -->
                          <el-row :gutter="25">
                              <!-- 列宽 -->
                              <el-col :span="10">
                                <!-- 搜索添加 v-model是将按钮提供数据绑定，@clear是将搜索栏清楚后，也要将搜出来的数据清楚 -->
                                  <el-input placeholder="please input number of CPU core" v-model="queryInfoCPU.query" clearable @clear="getCPUList">
                                  <!-- <el-input placeholder="请输入搜索内容" > -->
                                    <el-button slot="append" icon="el-icon-search" @click="getCPUList"></el-button>
                                  </el-input>
                              </el-col>

                                <el-col :span="10">
                                  <!-- 添加用户按钮 -->
                                  <el-button type="primary" @click="addDialogVisibleCPU=true" round>add CPU</el-button>
                              </el-col>
                          </el-row>
                              <!-- 用户列表。用于改、查 , 其中，border是边框，stripe是隔行变色 -->
                          <el-table :data="CPUList" border stripe >
                            <!--索引列 -->
                              <el-table-column type="index" align="center" header-align="center"></el-table-column>
                              <el-table-column label="id" prop="idCPU" align="center" header-align="center"></el-table-column>
                              <el-table-column label="type" prop="typeCPU" align="center" header-align="center"></el-table-column>
                              <el-table-column label="RAM" prop="rAMCPU" align="center" header-align="center"></el-table-column>
                              <el-table-column label="User_located" prop="user_idUser" align="center" header-align="center"></el-table-column>
                              <el-table-column label="bandwidth" prop="bandwidth" align="center" header-align="center"></el-table-column>
                              <el-table-column label="state" prop="isAvailable" align="center" header-align="center"></el-table-column>

                                  <!-- 作用域插槽 ,用来绑定数据的-->
                            
                          <!-- </el-table-column> -->

                            
                              <el-table-column label="option" align="center" header-align="center">

                              <template slot-scope="scope">
                                  <div style="text-align: center">
                                      <el-button type="danger" icon="el-icon-delete" size="medium" plain round @click="deleteCPU(scope.row.idCPU)" ></el-button>
                                  </div>
                                </template>
                                
                              </el-table-column>


                          </el-table>

                          <!-- 分页组件 size-change 每页最大的变化 current-change 当前最大变化 layout功能组件 -->
                            <div>
                                <el-pagination
                                      @size-change="handleSizeChangeCPU"
                                      @current-change="handleCurrentChangeCPU"
                                      :current-page="queryInfoCPU.pageNum"
                                      :page-sizes="[1, 2, 5, 100]"
                                      :page-size="queryInfoCPU.pageSize"
                                      layout="total, sizes, prev, pager, next, jumper"
                                      :total="totalCPU"
                                    ></el-pagination>
                            </div>





                    </el-collapse-item>
                    <el-collapse-item title="GPU Resource" name="2">

                      <!-- <div>能检测所有available的GPU资源</div> -->
                          <el-row :gutter="25">
                              <!-- 列宽 -->
                              <el-col :span="10">
                                <!-- 搜索添加 v-model是将按钮提供数据绑定，@clear是将搜索栏清楚后，也要将搜出来的数据清楚 -->
                                  <el-input placeholder="typeGPU" v-model="queryInfoGPU.query" clearable @clear="getGPUList">
                                  <!-- <el-input placeholder="请输入搜索内容" > -->
                                    <el-button slot="append" icon="el-icon-search" @click="getGPUList"></el-button>
                                  </el-input>
                              </el-col>

                                <el-col :span="10">
                                  <!-- 添加用户按钮 -->
                                  <el-button type="primary" @click="addDialogVisibleGPU=true" round>add GPU</el-button>
                              </el-col>
                          </el-row>
                              <!-- 用户列表。用于改、查 , 其中，border是边框，stripe是隔行变色 -->
                          <el-table :data="GPUList" border stripe>
                            <!--索引列 -->
                              <el-table-column type="index" align="center" header-align="center"></el-table-column>
                              <el-table-column label="id" prop="idGPU" align="center" header-align="center"></el-table-column>
                              <el-table-column label="type" prop="typeGPU" align="center" header-align="center"></el-table-column>
                              <!-- <el-table-column label="RAM" prop="rAMCPU"></el-table-column> -->
                              <el-table-column label="User_located" prop="user_idUser" align="center" header-align="center"></el-table-column>
                              <el-table-column label="videoMemory" prop="videoMemory" align="center" header-align="center"></el-table-column>
                              <el-table-column label="state" prop="isAvailable" align="center" header-align="center"></el-table-column>

                                  <!-- 作用域插槽 ,用来绑定数据的-->
                            

                            
                              <el-table-column label="option" align="center" header-align="center">

                              <template slot-scope="scope">
                                  <div style="text-align: center">
                                      <el-button type="danger" icon="el-icon-delete" size="medium" plain round @click="deleteGPU(scope.row.idGPU)" ></el-button>
                                  </div>     
                                </template>
                                
                              </el-table-column>


                          </el-table>

                          <!-- 分页组件 size-change 每页最大的变化 current-change 当前最大变化 layout功能组件 -->
                            <div>
                                <el-pagination
                                      @size-change="handleSizeChangeGPU"
                                      @current-change="handleCurrentChangeGPU"
                                      :current-page="queryInfoGPU.pageNum"
                                      :page-sizes="[1, 2, 5, 100]"
                                      :page-size="queryInfoGPU.pageSize"
                                      layout="total, sizes, prev, pager, next, jumper"
                                      :total="totalGPU"
                                    ></el-pagination>
                            </div>




                    </el-collapse-item>
                    <el-collapse-item title="HardDisk Resource" name="3">
                        <!-- <div>能检测所有available的HardDisk资源</div> -->
                          <el-row :gutter="25">
                              <!-- 列宽 -->
                              <el-col :span="10">
                                <!-- 搜索添加 v-model是将按钮提供数据绑定，@clear是将搜索栏清楚后，也要将搜出来的数据清楚 -->
                                  <el-input placeholder="please input total storage(number)" v-model="queryInfoHardDisk.query" clearable @clear="getHardDiskList">
                                  <!-- <el-input placeholder="请输入搜索内容" > -->
                                    <el-button slot="append" icon="el-icon-search" @click="getHardDiskList"></el-button>
                                  </el-input>
                              </el-col>

                                <el-col :span="10">
                                  <!-- 添加用户按钮 -->
                                  <el-button type="primary" @click="addDialogVisibleHD=true" round>add HD</el-button>
                              </el-col>
                          </el-row>
                              <!-- 用户列表。用于改、查 , 其中，border是边框，stripe是隔行变色 -->
                          <el-table :data="HardDiskList" border stripe>
                            <!--索引列 -->
                              <el-table-column type="index" align="center" header-align="center"></el-table-column>
                              <el-table-column label="id" prop="idhardDisk" align="center" header-align="center"></el-table-column>
                              <el-table-column label="User_located" prop="user_idUser" align="center" header-align="center"></el-table-column>
                              <el-table-column label="storage" prop="storage" align="center" header-align="center"></el-table-column>
                              <el-table-column label="usedStorage" prop="usedStorage" align="center" header-align="center"></el-table-column>

                              <el-table-column label="state" prop="isAvailable" align="center" header-align="center"></el-table-column>

                                  <!-- 作用域插槽 ,用来绑定数据的-->
                            
                            
                              <el-table-column label="option" align="center" header-align="center">

                              <template slot-scope="scope">
                                  <div style="text-align: center">
                                      <el-button type="danger" icon="el-icon-delete" size="medium" plain round @click="deleteHD(scope.row.idhardDisk)" ></el-button>
                                  </div>          
                                </template>
                                
                              </el-table-column>


                          </el-table>

                          <!-- 分页组件 size-change 每页最大的变化 current-change 当前最大变化 layout功能组件 -->
                            <div>
                                <el-pagination
                                      @size-change="handleSizeChangeHD"
                                      @current-change="handleCurrentChangeHD"
                                      :current-page="queryInfoHardDisk.pageNum"
                                      :page-sizes="[1, 2, 5, 100]"
                                      :page-size="queryInfoHardDisk.pageSize"
                                      layout="total, sizes, prev, pager, next, jumper"
                                      :total="totalHardDisk"
                                    ></el-pagination>
                            </div>

                    </el-collapse-item>
       
                </el-collapse>
              </el-card>
           </div>
           <!-- 新增cCP区域 -->
    <el-dialog title="add CPU" :visible.sync="addDialogVisibleCPU" width="50%" @close="addDialogClosedCPU">
        <el-form :model="addFormCPU" :rules="addFormCPURules" ref="addFormRef" label-width="120px">
            
            
            <el-form-item label="typeCPU" prop="typeCPU">
                <el-input  suffix-icon="el-icon-edit" v-model="addFormCPU.typeCPU"></el-input>
            </el-form-item>

            <el-form-item label="RAMCPU" prop="RAMCPU">
                <el-input  suffix-icon="el-icon-edit" v-model="addFormCPU.RAMCPU"></el-input>
            </el-form-item>

            <!-- <el-form-item label="bandwidth" prop="bandwidth">
              <el-radio-group v-model="addFormCPU.bandwidth">
                <el-radio label="Female"></el-radio>
                <el-radio label="Male"></el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="bandwidth" prop="bandwidth">
                <el-input  suffix-icon="el-icon-edit" v-model="addFormCPU.bandwidth"></el-input>
            </el-form-item>



        </el-form>

        
<!-- 底部内容 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisibleCPU=false"> Cancel</el-button>
            <el-button type="primary" @click="addCPU"> Submit</el-button>
            
          </span>

    </el-dialog>


               <!-- 新增GPU区域 -->
    <el-dialog title="add GPU" :visible.sync="addDialogVisibleGPU" width="50%" @close="addDialogClosedGPU">
        <el-form :model="addFormGPU" :rules="addFormGPURules" ref="addFormRef" label-width="120px">
            
            
            <el-form-item label="typeGPU" prop="typeGPU">
                <el-input  suffix-icon="el-icon-edit" v-model="addFormGPU.typeGPU"></el-input>
            </el-form-item>

            <el-form-item label="videoMemory" prop="videoMemory">
                <el-input  suffix-icon="el-icon-edit" v-model="addFormGPU.videoMemory"></el-input>
            </el-form-item>
            <!-- <el-form-item label="bandwidth" prop="bandwidth">
              <el-radio-group v-model="addFormCPU.bandwidth">
                <el-radio label="Female"></el-radio>
                <el-radio label="Male"></el-radio>
              </el-radio-group>
            </el-form-item> -->
        </el-form>

        
<!-- 底部内容 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisibleGPU=false"> Cancel</el-button>
            <el-button type="primary" @click="addGPU"> Submit</el-button>
            
          </span>

    </el-dialog>
    
               <!-- 新增hardDisk区域 -->
    <el-dialog title="add hardDisk" :visible.sync="addDialogVisibleHD" width="50%" @close="addDialogClosedHD">
        <el-form :model="addFormHD" :rules="addFormHDRules" ref="addFormRef" label-width="120px">
            
            
            <el-form-item label="storage" prop="storage">
                <el-input  suffix-icon="el-icon-edit" v-model="addFormHD.storage"></el-input>
            </el-form-item>

            <el-form-item label="usedStorage" prop="usedStorage">
                <el-input  suffix-icon="el-icon-edit" v-model="addFormHD.usedStorage"></el-input>
            </el-form-item>
        </el-form>

        
<!-- 底部内容 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisibleHD=false"> Cancel</el-button>
            <el-button type="primary" @click="addHD"> Submit</el-button>
            
          </span>

    </el-dialog>
  </d2-container>
</template>

<script>
export default {
  name: "Resource Management",
  created(){
    this.getCPUList();
    this.getGPUList();
    this.getHardDiskList();
  },
  data(){
    return{
      logForm:{
        username:'',
        usertype:'',
        time:'',
        operationType:'',
        result:''
      },
      queryInfoCPU:{
        query:"",//查询的信息
        pageNum:1,
        pageSize:5,
      },
      queryInfoGPU:{
        query:"",//查询的信息
        pageNum:1,
        pageSize:5,
      },
      queryInfoHardDisk:{
        query:"",//查询的信息
        pageNum:1,
        pageSize:5,
      },
        totalCPU:0,
        totalGPU:0,
        totalHardDisk:0,

        CPUList:[],
        GPUList:[],
        HardDiskList:[],
      addDialogVisibleCPU:false,//添加用户的对话框的显示或隐藏
      addFormCPU:{
        typeCPU:'',
        RAMCPU:'',
        bandwidth:'',
      },//在这里拿输入的信息

      addDialogVisibleHD:false,//添加用户的对话框的显示或隐藏
      addFormHD:{
        storage:'',
        usedStorage:'',
      },//在这里拿输入的信息

      addDialogVisibleGPU:false,//添加用户的对话框的显示或隐藏
      addFormGPU:{
        typeGPU:'',
        videoMemory:'',
      },//在这里拿输入的信息

    addFormCPURules:{
        typeCPU:[
          {required:true,message:'Please enter the number of CPU cores',trigger:'blur'},
          {pattern:/^[1-9]\d*$/,message:'Enter integer'},
          {min:1,max:8,message:'Please enter even numbers from 1 to 8 digits',trigger:'blur'},
        ],
        RAMCPU:[
          {required:true,message:'Please enter CPURAM',trigger:'blur'},
          // {pattern:/^[0-9]*[02468]\.?\d*$/,message:'偶数'},
          {pattern:/^[1-9]\d*$/,message:'integer'},
          {min:1,max:8,message:'Please provide 1 to 8 lengths',trigger:'blur'},

        ],
        bandwidth:[
            {required:true,message:'Please enter CPU bandwidth'},
            {pattern:/^[1-9]\d*$/,message:'Input must be a positive number'},

        ],
    },

     addFormGPURules:{
        typegGPU:[
          {required:true,message:'Please enter GPU model',trigger:'blur'},
          // {pattern:/^[0-9]*[02468]\.?\d*$/,message:'输入偶数'},
          {min:1,max:18,message:'Please enter at least 1 digit',trigger:'blur'},
        ],
        videoMemory:[
          {required:true,message:'Please input GPU graphics memory',trigger:'blur'},
          {pattern:/^[0-9]*[02468]\.?\d*$/,message:'even number'},
          {min:1,max:3,message:'Please provide 1-3 lengths',trigger:'blur'},

        ],

    },

     addFormHDRules:{
        storage:[
          {required:true,message:'Please enter the total capacity',trigger:'blur'},
          {pattern:/^[0-9]*[02468]\.?\d*$/,message:'even number'},
          {min:1,max:8,message:'Please enter even numbers from 1 to 8 digits',trigger:'blur'},
        ],
        usedStorage:[
          {required:true,message:'Please enter the used capacity',trigger:'blur'},
          {pattern:/^[0-9]\d*$/,message:'please enter a number'},
          {min:1,max:8,message:'Please provide 1 to 8 lengths',trigger:'blur'},

        ],
    },

    }
    
  },
    methods:{
            // 当页面变化的时候
      handleSizeChangeCPU(newSize){
        this.queryInfoCPU.pageSize=newSize;
        // this.queryInfoGPU.pageSize=newSize;
        // this.queryInfoHardDisk.pageSize=newSize;

        // getList,将userList传进去
        this.getCPUList();
        // this.getGPUList();
        // this.getHardDiskList();
      },
      handleSizeChangeGPU(newSize){
          this.queryInfoGPU.pageSize=newSize;
          this.getGPUList();
      },
      handleSizeChangeHD(newSize){
        this.queryInfoHardDisk.pageSize=newSize;
        this.getHardDiskList();
      },
      // pageNum 的触发动作
      handleCurrentChangeCPU(newPage){
          this.queryInfoCPU.pageNum=newPage;
          // this.queryInfoGPU.pageNum=newPage;
          // this.queryInfoHardDisk.pageNum=newPage;

          this.getCPUList();
          // this.getGPUList();
          // this.getHardDiskList();
      },
      handleCurrentChangeGPU(newPage){
        this.queryInfoGPU.pageNum=newPage;
        this.getGPUList();
      },
      handleCurrentChangeHD(newPage){
        this.queryInfoHardDisk.pageNum=newPage;

        this.getHardDiskList();
      
      },

    //获得所有用户
      async getCPUList(){
          console.log("this is getCPUList");

          const {data:res}=await this.$http.post("getCPUInfo",this.queryInfoCPU);
          console.log(res);
          console.log("total " +res.number);
          console.log("data  "+res.result);
          this.totalCPU=res.number;

          this.CPUList=res.result;
          console.log("total: "+this.totalCPU);
          console.log("List: "+this.CPUList);        
        // 创建了data类型的res，data类型在上面定义了，就是有queryInfo，还有userList，还有total
          // const {data:res}=await this.$http.get("getUserInfo",{params:this.queryInfo});
          // const {data:res}=await this.$http.post("getUserInfo",this.queryInfo);
          
          // console.log(res);
          // console.log("total " +res.number);
          // console.log("data  "+res.result);
          // this.total=res.number;

          // this.userList=res.result;
          // console.log("total: "+this.total);
          // console.log("userList: "+this.userList);
      },
      async getGPUList(){
        console.log("this is getGPUList");
          const {data:res2}=await this.$http.post("getGPUInfo",this.queryInfoGPU);

          // const {data:res}=await this.$http.get("getGPUInfo",{params:this.queryInfoGPU});
          console.log(res2);
          console.log("total " +res2.number);
          console.log("data  "+res2.result);
          this.totalGPU=res2.number;

          this.GPUList=res2.result;
          console.log("totalGPU: "+this.totalGPU);
          console.log("GPUList: "+this.GPUList);    
      },

      async getHardDiskList(){
          console.log("this is getHardDiskList");
          const {data:res}=await this.$http.post("getHardDiskInfo",this.queryInfoHardDisk);

          // const {data:res}=await this.$http.get("getHardDiskInfo",{params:this.queryInfoHardDisk});
          console.log(res);
          console.log("total " +res.number);
          console.log("data  "+res.result);
          this.totalHardDisk=res.number;

          this.HardDiskList=res.result;
          console.log("total: "+this.totalHardDisk);
          console.log("userList: "+this.HardDiskList);   
      },

        addDialogClosedCPU(){
          this.$refs.addFormRef.resetFields();
      },
      
        addDialogClosedGPU(){
          this.$refs.addFormRef.resetFields();
      },
        addDialogClosedHD(){
          this.$refs.addFormRef.resetFields();
      },




      // 删除事件,根据主键，删CPU
      async deleteCPU(idCPU){
        console.log("idCPU is"+idCPU); 
        this.$setOperationTime(new Date());
        this.logForm.result='success';
        this.logForm.username=this.$Name;
        this.logForm.usertype=this.$type;
        this.logForm.time=this.$OperationTime;
        this.logForm.operationType='deleteCPU';
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
        const {data:res}=await this.$http.delete("deleteCPU?idCPU="+idCPU);
        // const {data:res}=await this.$http.post("deleteUser",this.idUser);


          // 看返回结果
          if(res!="success"){
            // 不成功，
            this.logForm.result="fail";
            const {data: res2}=await this.$http.post("saveLog",this.logForm);
            return this.$message.error('fail to delete the CPU!!');
          }
          const {data: res2}=await this.$http.post("saveLog",this.logForm);
          console.log(res);
          this.$message.success('success to delete!! ');
          this.getCPUList();

      },


            // 删除事件,根据主键，删GPU
      async deleteGPU(idGPU){
        console.log("idGPU is"+idGPU); 
        this.$setOperationTime(new Date());
        this.logForm.result='success';
        this.logForm.username=this.$Name;
        this.logForm.usertype=this.$type;
        this.logForm.time=this.$OperationTime;
        this.logForm.operationType='deleteGPU';
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
        const {data:res}=await this.$http.delete("deleteGPU?idGPU="+idGPU);
        // const {data:res}=await this.$http.post("deleteUser",this.idUser);


          // 看返回结果
          if(res!="success"){
            // 不成功，
            this.logForm.result="fail";
            const {data: res2}=await this.$http.post("saveLog",this.logForm);
            return this.$message.error('fail to delete the GPU!!');
          }
          const {data: res2}=await this.$http.post("saveLog",this.logForm);
          console.log(res);
          this.$message.success('success to delete!! ');
          this.getGPUList();

      },


                  // 删除事件,根据主键，删Hard Disk
      async deleteHD(idhardDisk){
        console.log("idhardDisk is"+idhardDisk); 
        this.$setOperationTime(new Date());
        this.logForm.result='success';
        this.logForm.username=this.$Name;
        this.logForm.usertype=this.$type;
        this.logForm.time=this.$OperationTime;
        this.logForm.operationType='deleteHardDisk';
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
        const {data:res}=await this.$http.delete("deleteHD?idhardDisk="+idhardDisk);
        // const {data:res}=await this.$http.post("deleteUser",this.idUser);


          // 看返回结果
          if(res!="success"){
            // 不成功，
            this.logForm.result="fail";
            const {data: res2}=await this.$http.post("saveLog",this.logForm);

            return this.$message.error('fail to delete the hardDisk!!');
          }
          const {data: res2}=await this.$http.post("saveLog",this.logForm);
            console.log(res);
          this.$message.success('success to delete!! ');
          this.getHardDiskList();

      },



      addCPU(){
          console.log("addCPU");
          // 如果表单的数据无效，就不能往下进行
            this.$refs.addFormRef.validate(async valid=>{
                // console.log("true");

                console.log(valid);
                // 如果没有验证成功——数据无效
              if(!valid) return ;
              console.log("到这里的？？");
              this.$setOperationTime(new Date());
              this.logForm.result='success';
              this.logForm.username=this.$Name;
              this.logForm.usertype=this.$type;
              this.logForm.time=this.$OperationTime;
              this.logForm.operationType='addCPU';
              console.log(this.addFormCPU.typeCPU+' HHHHHHHHHH');
              console.log(this.addFormCPU.RAMCPU+' HHHHHHHHHH');
              const {data:res}=await this.$http.post("addCPU",this.addFormCPU);
              // const {data:res}=await this.$http.get("addCPU",{params:this.addFormCPU});

              console.log("res   "+res);
              if(res!="success"){
                this.logForm.result='fail';
                const {data: res2}=await this.$http.post("saveLog",this.logForm);
                  return this.$message.error("操作失败!!~");
              }
              const {data: res2}=await this.$http.post("saveLog",this.logForm);
              this.$message.success("操作成功!!~");
              this.addDialogVisibleCPU=false;
              this.getCPUList();
           });
        },
      

        addGPU(){
          console.log("addGPU");
          // 如果表单的数据无效，就不能往下进行
            this.$refs.addFormRef.validate(async valid=>{
                // console.log("true");

                console.log(valid);
                // 如果没有验证成功——数据无效
              if(!valid) return ;
              console.log("到这里的？？");
              this.$setOperationTime(new Date());
              this.logForm.result='success';
              this.logForm.username=this.$Name;
              this.logForm.usertype=this.$type;
              this.logForm.time=this.$OperationTime;
              this.logForm.operationType='addGPU';
              const {data:res}=await this.$http.post("addGPU",this.addFormGPU);

              console.log("res   "+res);
              if(res!="success"){
                  this.logForm.result='fail';
                  const {data: res2}=await this.$http.post("saveLog",this.logForm);
                  return this.$message.error("操作失败!!~");
              }
              const {data: res2}=await this.$http.post("saveLog",this.logForm);
              this.$message.success("操作成功!!~");
              this.addDialogVisibleGPU=false;
              this.getCPUList();
           });
        },


        addHD(){
          console.log("addHD");
          // 如果表单的数据无效，就不能往下进行
            this.$refs.addFormRef.validate(async valid=>{
                // console.log("true");

              console.log(valid);
                // 如果没有验证成功——数据无效
              if(!valid) return ;
              console.log("到这里的？？");
              this.logForm.result='success';
              this.logForm.username=this.$Name;
              this.logForm.usertype=this.$type;
              this.logForm.time=this.$OperationTime;
              this.logForm.operationType='addHardDisk';
              const {data:res}=await this.$http.post("addHD",this.addFormHD);

              console.log("res   "+res);
              if(res!="success"){
                  this.logForm.result='fail';
                  const {data: res2}=await this.$http.post("saveLog",this.logForm);

                  return this.$message.error("操作失败!!~");
              }
              const {data: res2}=await this.$http.post("saveLog",this.logForm);
              this.$message.success("操作成功!!~");
              this.addDialogVisibleHD=false;
              this.getCPUList();
           });
        },
  }
};
</script>
