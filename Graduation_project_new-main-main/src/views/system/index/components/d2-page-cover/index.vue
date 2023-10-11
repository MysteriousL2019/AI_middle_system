<template>
  <d2-container better-scroll>
  <div>
    <!-- <div class="d2-page-cover"> -->
    <el-row type="flex" gutter="2" > 
      <el-col :span="11">
        <el-card class="box-card">
          <div class="user">
            <!-- <img src="@/assets/images/male.png" /> -->
            <img v-if="this.$type=='Super Admin'" src="@/assets/images/admin_blue.png" />

            <img v-if="this.$Gender=='M' && this.$type=='Personal User'" src="@/assets/images/male.png" />
            <img v-if="this.$Gender=='F' && this.$type=='Personal User'" src="@/assets/images/female.png" />
            <div class="UserInfo">
              <p class="name">{{ this.$Name }}</p>
              <p class="position">{{ this.$type }}</p>
            </div>
          </div>
          <div class="login-time">
            <p class="P">
              last login time: <span>{{ this.$Time }}</span>
            </p>
            <!-- <p class="P"> -->
              <!-- last login place: <span>{{ this.$userPlace }}</span> -->
            <!-- </p> -->
          </div>
        </el-card>
        <el-card class="box-card" style="margin-top: 20px">
          <el-table :data="LoginTable" border stripe>
            <el-table-column type="index" align="center" header-align="center"></el-table-column>
            <el-table-column label="LoginTime" prop="loginTime" align="center" header-align="center"></el-table-column>
            <el-table-column label="User Name" prop="userName" align="center" header-align="center"></el-table-column>
            <el-table-column label="User Type" prop="userType" align="center" header-align="center"></el-table-column>

          </el-table>
          <!-- <el-table :data="tableData" stripe style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              align="center"
              header-align="center"
            >
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址"
              align="center"
              header-align="center"
            >
            </el-table-column>
          </el-table> -->
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card class="box-card-right">
          <div slot="header" class="system_info">
            <span>Announcement</span>

            <el-button @click="ChangeState" v-if="this.$type=='Super Admin'" style="float: right; padding: 3px 0" type="text"
              >Operation</el-button>
          </div>
          <!-- <div v-for="o in 3" :key="o" class="text item">
            {{ "系统的相关维护公告 " + o }}
            <el-divider></el-divider>
          </div> -->
          <el-input
            placeholder="Please Input"
            v-model="input1"
            :disabled="temp"
            class="custom-disabled-input"
            >
          </el-input>
            <el-divider></el-divider>

          <el-input
            placeholder="Please Input"
            v-model="input2"
            :disabled="temp"
            class="custom-disabled-input"
            >
          </el-input>
            <el-divider></el-divider>

          <el-input
            placeholder="Please Input "
            v-model="input3"
            :disabled="temp"
            class="custom-disabled-input"
            >
          </el-input>
        </el-card>
        <el-card class="box-card-right">
            <el-row justify="space-between">
                <el-col :span="10"> 
                    <el-card>
                        <h2 class="text-16px font-bold">Chart Data</h2>
                       <p class="light-gray">Overview Of system resources number</p>
                        <h2 class="text-16px font-bold">
                          <d2-count-up :end="(this.chartDataPie.rows[1].value)" :duration="3"/>
                        </h2>
                        <p class="light-gray">Number of CPU in system</p>
                        <h2 class="text-20px font-bold">
                          <d2-count-up :end="this.chartDataPie.rows[0].value" :duration="3"/>
                        </h2>
                        <p class="light-gray">Number of GPU in system</p>
                        <h2 class="text-20px font-bold">
                          <d2-count-up :end="this.chartDataPie.rows[2].value" :duration="3"/>
                        </h2>
                        <p class="light-gray">Number of hardDisk in system</p>
                    </el-card>
                </el-col>
              <el-col :span="12"> 
                <ve-pie :data="chartDataPie" :settings="chartSettings"  ></ve-pie>
              </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

  </div>
  </d2-container>
</template>
<script>
// import { defineComponent } from '@vue/composition-api'

export default {
  name: "homePage",
  async created(){
    await this.getThisAnnouncement();
    await this.getLoginTable();
    await this.getChartDataPie();
  },
  mounted(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.showPosition);
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  },
  data() {
    return {
      chartSettings:{
        roseType:'radius',  
      },
      chartDataPie:{
        columns:["label","value"],
        rows:[
          {label:"GPU",value:0},
          {label:"CPU",value:0},
          {label:"Disk",value:0},

          
          // {label:"numberofUsedGPU",value:0},
        ]
      },
      logForm:{
        username:'',
        usertype:'',
        time:'',
        operationType:'',
        result:''
      },
      temp:true,
      input1:[],
      input2:[],
      input3:[],
      LoginTable:[],
      tableData: [
        {
          date: "2023-01-02",
          name: "lfz",
          address: "New York, USA",
        },
        {
          date: "2023-01-02",
          name: "lfz",
          address: "New York, USA",
        },
        {
          date: "2023-01-02",
          name: "lfz",
          address: "New York, USA",
        },
        {
          date: "2023-01-02",
          name: "lfz",
          address: "New York, USA",
        },
      ],
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      
    };
  },
  methods:{
    async getChartDataPie(){
      const { data: res } = await this.$http.post(
        "getCPUPlot",
        // this.queryInfo
      );
      const { data: res2 } = await this.$http.post(
        "getGPUPlot",
        // this.queryInfo
      );
      const { data: res3 } = await this.$http.post(
        "getHDPlot",
        // this.queryInfo
      );
      this.chartDataPie.rows[1].value=res.numberCPU;
      this.chartDataPie.rows[0].value=res2.numberGPU;
      this.chartDataPie.rows[2].value=res3.numberHD;
    },
    async getLoginTable(){
        const {data:res}=await this.$http.post("getLoginTable",{});
        this.LoginTable=res.result;
        console.log("this is xxxxxx "+this.LoginTable);

    },
    async ChangeState(){
          console.log("truetruetruetruetruetrue 这是changestate");
          this.temp=!this.temp;
          //意味着刚刚修改完，需要将修改的结果提交到后台的数据库
          if(this.temp){
            const params = {
              input1: this.input1,
              input2: this.input2,
              input3: this.input3
            };
            const {data:res}=await this.$http.post("changeAnnouncement",params);
            console.log(res);
            if(res){
              // this.$message
                this.$message.success('successfully change');
                this.$setOperationTime(new Date());
                this.logForm.result='success';
                this.logForm.username=this.$Name;
                this.logForm.usertype=this.$type;
                this.logForm.time=this.$OperationTime;
                this.logForm.operationType='changeAnnouncement';
            }else{
              this.$setOperationTime(new Date());
              this.logForm.result='fail';
              this.logForm.username=this.$Name;
              this.logForm.usertype=this.$type;
              this.logForm.time=this.$OperationTime;
              this.logForm.operationType='changeAnnouncement';
              this.$message.error("error operated");
            }
            const {data: res2}=await this.$http.post("saveLog",this.logForm);

            console.log("truetruetruetruetruetrue "+res);
          }
      },
      async getThisAnnouncement(){
          const {data:res}=await this.$http.post("getAnnouncement",{});
          console.log(res);
          console.log("hhhhhhhhh  "+res);

          // console.log("input hhhhhhhhh "+res[0]);
          this.input1=res[0];
          this.input2=res[1];
          this.input3=res[2];
          // console.log("input1   hhhhhhhhh"+this.input1);
      },
  },
};
</script>

<style lang="scss" scoped>
.custom-disabled-input .el-input__inner,
.custom-disabled-input .el-input__prefix,
.custom-disabled-input .el-input__suffix {
  opacity: 1;
  color: #333;
  background-color: #f5f7fa;
}
.test{
    display:flex;
    flex-wrap:wrap;
}
.d2-page-cover {
  @extend %full;
  @extend %unable-select;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  .d2-page-cover__logo {
    img {
      width: 200px;
    }
  }
  .d2-page-cover__title {
    margin: 0px;
    margin-bottom: 20px;
    font-weight: bold;
    color: $color-text-main;
  }
  .d2-page-cover__sub-title {
    margin: 0px;
    margin-bottom: 5px;
    color: $color-text-normal;
  }
  .d2-page-cover__build-time {
    margin: 0px;
    margin-bottom: 10px;
    font-size: 12px;
    color: $color-text-placehoder;
  }
}
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;

  //线条
  border-bottom: 1px solid #999;
  margin-bottom: 20px;
  img {
    margin-left: 40px;

    width: 150px;
    height: auto;
    // border-radius: %;
  }
  .UserInfo {
    margin-left: 40px;
    .name {
      //Admin名字大小
      font-size: 28px;
      margin-bottom: 10px;
    }
    .position {
      font-size: 18px;
      color: grey;
    }
  }
}
.login-time {
  P {
    font-size: 14px;
    color: #999999;
    line-height: 28px;
    margin: 0px;
    padding: 0px;
  }
}
.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
.box-card {
  width: 480px;
  max-width: 100%;
}
.box-card-right{
  margin-top:20px;
  width: 720px;
  max-width: 100%;
  .system_info{
    font-size:22px;
    color:black;
  }
}
</style>
