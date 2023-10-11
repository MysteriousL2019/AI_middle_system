<template>
  <d2-container better-scroll type="card">
    <template slot="header">Resources View Management</template>
    <!-- Hello World<br>
    Resources View Management -->


      <div class="d2-pt d2-pb">
    <el-card>
        <el-collapse v-model="activeName" accordion>
          <el-collapse-item title="Available CPU Resource" name="1">
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

                </el-row>
                    <!-- 用户列表。用于改、查 , 其中，border是边框，stripe是隔行变色 -->
                <el-table :data="CPUList" border stripe >
                  <!--索引列 -->
                    <el-table-column type="index" align="center" header-align="center"></el-table-column>
                    <el-table-column label="id" prop="idCPU" align="center" header-align="center"></el-table-column>
                    <el-table-column label="type" prop="typeCPU" align="center" header-align="center"></el-table-column>
                    <el-table-column label="RAM" prop="rAMCPU" align="center" header-align="center"></el-table-column>
                    <!-- <el-table-column label="User_located" prop="user_idUser" align="center" header-align="center"></el-table-column> -->
                    <el-table-column label="bandwidth" prop="bandwidth" align="center" header-align="center"></el-table-column>
                    <el-table-column label="state" prop="isAvailable" align="center" header-align="center"></el-table-column>

                        <!-- 作用域插槽 ,用来绑定数据的-->
                  
                <!-- </el-table-column> -->

                  
                    <el-table-column label="option" align="center" header-align="center">

                    <template slot-scope="scope">
                        <div style="text-align: center">
                            <el-button type="info" icon="el-icon-finished" size="medium" plain round @click="UserCPU(scope.row.idCPU)" ></el-button>
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
          <el-collapse-item title="Available GPU Resource" name="2">

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

                </el-row>
                    <!-- 用户列表。用于改、查 , 其中，border是边框，stripe是隔行变色 -->
                <el-table :data="GPUList" border stripe>
                  <!--索引列 -->
                    <el-table-column type="index" align="center" header-align="center"></el-table-column>
                    <el-table-column label="id" prop="idGPU" align="center" header-align="center"></el-table-column>
                    <el-table-column label="type" prop="typeGPU" align="center" header-align="center"></el-table-column>
                    <!-- <el-table-column label="User_located" prop="user_idUser" align="center" header-align="center"></el-table-column> -->
                    <el-table-column label="videoMemory" prop="videoMemory" align="center" header-align="center"></el-table-column>
                    <el-table-column label="state" prop="isAvailable" align="center" header-align="center"></el-table-column>

                        <!-- 作用域插槽 ,用来绑定数据的-->
                    <el-table-column label="option" align="center" header-align="center">

                    <template slot-scope="scope">
                        <div style="text-align: center">
                            <el-button type="info" icon="el-icon-finished" size="medium" plain round @click="UserGPU(scope.row.idGPU)" ></el-button>
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
          <el-collapse-item title="Available HardDisk Resource" name="3">
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

                </el-row>
                    <!-- 用户列表。用于改、查 , 其中，border是边框，stripe是隔行变色 -->
                <el-table :data="HardDiskList" border stripe>
                  <!--索引列 -->
                    <el-table-column type="index" align="center" header-align="center"></el-table-column>
                    <el-table-column label="id" prop="idhardDisk" align="center" header-align="center"></el-table-column>
                    <!-- <el-table-column label="User_located" prop="user_idUser" align="center" header-align="center"></el-table-column> -->
                    <el-table-column label="storage" prop="storage" align="center" header-align="center"></el-table-column>
                    <el-table-column label="usedStorage" prop="usedStorage" align="center" header-align="center"></el-table-column>

                    <el-table-column label="state" prop="isAvailable" align="center" header-align="center"></el-table-column>

                        <!-- 作用域插槽 ,用来绑定数据的-->
                  
                    <el-table-column label="option" align="center" header-align="center">

                    <template slot-scope="scope">
                        <div style="text-align: center">
                            <el-button type="info" icon="el-icon-finished" size="medium" plain round @click="UserHD(scope.row.idhardDisk)" ></el-button>
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
  </d2-container>
</template>

<script>
export default {
  name: 'resourceView',
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

      addDialogVisibleHD:false,//添加用户的对话框的显示或隐藏

      addDialogVisibleGPU:false,//添加用户的对话框的显示或隐藏

    }
    
  },
      methods:{
        async UserHD(idhardDisk,idUser){
                                // 这是信息提示框
          this.$setOperationTime(new Date());
          this.logForm.result='success';
          this.logForm.username=this.$Name;
          this.logForm.usertype=this.$type;
          this.logForm.time=this.$OperationTime;
          this.logForm.operationType='useHD';     
          const confirmResult =await this.$confirm("This operation will take the resources from cloud, click 'Yes' to continue. ",'HINT',{
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
          const {res:data}=await this.$http.get("UserHD?idhardDisk="+idhardDisk+"&idUser="+this.$idUser);
          const {data: res2}=await this.$http.post("saveLog",this.logForm);
          
          this.getHardDiskList();
          this.$message.success("successful operation!");

        },
        async UserGPU(idGPU,idUser){
                                // 这是信息提示框
          this.$setOperationTime(new Date());
          this.logForm.result='success';
          this.logForm.username=this.$Name;
          this.logForm.usertype=this.$type;
          this.logForm.time=this.$OperationTime;
          this.logForm.operationType='use GPU'; 

          const confirmResult =await this.$confirm("This operation will take the resources from cloud, click 'Yes' to continue. ",'HINT',{
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
          const {res:data}=await this.$http.get("UseGPU?idGPU="+idGPU+"&idUser="+this.$idUser);
          const {data: res2}=await this.$http.post("saveLog",this.logForm);

          this.getGPUList();
          this.$message.success("successful operation!");
        },
        async UserCPU(idCPU,idUser){
                    // 这是信息提示框

          this.$setOperationTime(new Date());
          this.logForm.result='success';
          this.logForm.username=this.$Name;
          this.logForm.usertype=this.$type;
          this.logForm.time=this.$OperationTime;
          this.logForm.operationType='use CPU'; 
          const confirmResult =await this.$confirm("This operation will take the resources from cloud, click 'Yes' to continue. ",'HINT',{
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

            const {res:data}=await this.$http.get("UseCPU?idCPU="+idCPU+"&idUser="+this.$idUser);
            const {data: res2}=await this.$http.post("saveLog",this.logForm);

            this.getCPUList();
            this.$message.success("successful operation!");

            // const {res:data}=await this.$http.post("UseCPU",{idCPU,idUser});
        },
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

          const {data:res}=await this.$http.post("getCPUViewInfo",this.queryInfoCPU);
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
          const {data:res2}=await this.$http.post("getGPUViewInfo",this.queryInfoGPU);

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
          const {data:res}=await this.$http.post("getHardDiskViewInfo",this.queryInfoHardDisk);

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

  }
}
</script>
