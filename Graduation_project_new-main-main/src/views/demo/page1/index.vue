<template>
  <d2-container better-scroll type="card">
    <template slot="header">Action Monitor</template>
    <!-- Hello World<br /> -->
    <!-- View operation: such as what data user1 uploaded at what time, and a series -->
    <!-- of information. Update regularly. -->
    <div>
      <el-card>
        <!-- 间隙 ,此处为按钮和搜索框间的距离-->
        <el-row :gutter="25">
          <!-- 列宽 -->
          <el-col :span="10">
            <!-- 搜索添加 v-model是将按钮提供数据绑定，@clear是将搜索栏清楚后，也要将搜出来的数据清楚 -->
            <el-input
              placeholder="please input wanted user name"
              v-model="queryInfo.query"
              clearable
              @clear="getList"
            >
              <!-- <el-input placeholder="请输入搜索内容" > -->
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getList"
              ></el-button>
            </el-input>
          </el-col>
        </el-row>

        <!-- 用户列表。用于改、查 , 其中，border是边框，stripe是隔行变色 -->
        <el-table :data="logList" border stripe>
          <!--索引列 -->
          <el-table-column
            type="index"
            align="center"
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="userName"
            prop="username"
            align="center"
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="time"
            prop="time"
            align="center"
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="userType"
            prop="usertype"
            align="center"
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="operationtype"
            prop="operationType"
            align="center"
            header-align="center"
          ></el-table-column>
          <el-table-column
            label="result"
            prop="result"
            align="center"
            header-align="center"
          ></el-table-column>
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
  </d2-container>
</template>

<script>
export default {
  name: "LogList",
  data(){
    return{
      queryInfo:{
        query:"",//查询的信息
        pageNum:1,
        pageSize:5,
      },
      logList:[],
      total:0,

    }
  },
  created(){
    this.getList();
  },
  methods: {

    async getList(){
      const {data:res}=await this.$http.post("getAllLogs",this.queryInfo);
      console.log(res);
      console.log("total " +res.number);
      console.log("data  "+res.result);
      this.total=res.number;
      this.logList=res.result;
      console.log("total: "+this.total);
      console.log("loglist: "+this.logList);
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
  },
};
</script>
