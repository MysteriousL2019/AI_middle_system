<template>
  <d2-container better-scroll type="card">
    <el-card>
    <template slot="header">Resource Monitor</template>

          <!-- Hello World<br />
    Visualize the atlas to see the current total resource usage and the usage of
    a user. (such as GPU, memory and other resources) -->


      <!-- <el-card>
        <ve-pie :data="chartDataPie" :settings="chartSettings" :title="title"></ve-pie>
      </el-card> -->
      
      <!-- <el-card>
        <ve-pie :data="chartDataPie2" :settings="chartSettings" :title="title2"></ve-pie>
      </el-card> -->
      
      <el-card>
        <div class="title">
          <div class="title-text">{{title.text}}</div>
        </div>
        <el-row justify="space-between">
          <el-col :span="10"> 
            <el-card>
            <h2 class="text-16px font-bold">Chart Data</h2>
            <p class="light-gray">Overview Of system resources</p>
            <!-- <h2 class="text-16px font-bold">{{this.chartDataPie.rows[0].value}}</h2> -->
            <h2 class="text-16px font-bold">
               <!-- <d2-count-up :end="this.chartDataPie.rows[0].value" :duration="3"/> -->
               <d2-count-up :end="(this.chartDataPie.rows[0].value-this.chartDataPie.rows[1].value)" :duration="3"/>

            </h2>

            <p class="light-gray">Number of Available CPU in system</p>
            <!-- <h2 class="text-16px font-bold">{{this.chartDataPie.rows[1].value}}</h2> -->
            <h2 class="text-16px font-bold">
               <d2-count-up :end="this.chartDataPie.rows[1].value" :duration="3"/>
            </h2>
            <p class="light-gray">Number of used CPU by users in system</p>
            <h2 class="text-20px font-bold">
               <d2-count-up :end="(this.chartDataPie.rows[0].value)" :duration="3"/>
            </h2>
            <p class="light-gray">Number of CPU in system</p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <ve-pie :data="chartDataPie" :settings="chartSettings" ></ve-pie>
          </el-col>
        </el-row>
      </el-card>


      <el-card>
        <div class="title">
          <div class="title-text">{{title2.text}}</div>
        </div>
        <el-row justify="space-between">
          <el-col :span="10"> 
            <el-card>
            <h2 class="text-16px font-bold">Chart Data</h2>
            <p class="light-gray">Overview Of system resources</p>
            <!-- <h2 class="text-16px font-bold">{{this.chartDataPie2.rows[0].value}}</h2> -->
            <h2 class="text-16px font-bold">
               <d2-count-up :end="(this.chartDataPie2.rows[0].value-this.chartDataPie2.rows[1].value)" :duration="3"/>

            </h2>
            <p class="light-gray">Number of Available GPU in system</p>
            <!-- <h2 class="text-16px font-bold">{{this.chartDataPie2.rows[1].value}}</h2> -->
            <h2 class="text-16px font-bold">
               <d2-count-up :end="this.chartDataPie2.rows[1].value" :duration="3"/>
            </h2>
            <p class="light-gray">Number of used GPU by users in system</p>
            <h2 class="text-20px font-bold">
               <d2-count-up :end="this.chartDataPie2.rows[0].value" :duration="3"/>
               <!-- <d2-count-up :end="(this.chartDataPie2.rows[0].value+this.chartDataPie2.rows[1].value)" :duration="3"/> -->
            </h2>
            <p class="light-gray">Number of GPU in system</p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <ve-pie :data="chartDataPie2" :settings="chartSettings" ></ve-pie>
          </el-col>
        </el-row>
      </el-card>


      <el-card>
        <div class="title">
          <div class="title-text">{{title3.text}}</div>
        </div>
        <el-row justify="space-between">
          <el-col :span="10"> 
            <el-card>
            <h2 class="text-16px font-bold">Chart Data</h2>
            <p class="light-gray">Overview Of system resources</p>
            <!-- <h2 class="text-16px font-bold">{{this.chartDataPie3.rows[0].value}}</h2> -->
            <h2 class="text-16px font-bold">
               <d2-count-up :end="(this.chartDataPie3.rows[0].value-this.chartDataPie3.rows[1].value)" :duration="3"/>

            </h2>
            <p class="light-gray">Number of Available Hard Disk in system</p>
            <!-- <h2 class="text-16px font-bold">{{this.chartDataPie3.rows[1].value}}</h2> -->
            <h2 class="text-20px font-bold">
               <d2-count-up :end="this.chartDataPie3.rows[1].value" :duration="3"/>
            </h2>
            <p class="light-gray">Number of used Hard Disk by users in system</p>
            <h2 class="text-20px font-bold">
               <d2-count-up :end="this.chartDataPie3.rows[0].value" :duration="3"/>

               <!-- <d2-count-up :end="(this.chartDataPie3.rows[0].value+this.chartDataPie3.rows[1].value)" :duration="3"/> -->
            </h2>
            <p class="light-gray">Number of Hard Disk in system</p>
            </el-card>
          </el-col>
          <el-col :span="8">
            <ve-pie :data="chartDataPie3" :settings="chartSettings" ></ve-pie>
          </el-col>
        </el-row>
      </el-card>

      <!-- <el-card>
        <ve-line :data="chartData"></ve-line>
        <ve-histogram :data="chartData" ></ve-histogram>
      </el-card> -->

    </el-card>

  </d2-container>
</template>

<script>
import d2ContainerCard from "@/components/d2-container/components/d2-container-card.vue";
import CountTo from 'vue-count-to';
export default {
  components: { CountTo },
  created(){
      console.log("!!!!");
      this.getChartDataPie();
      this.getChartDataPie2();
      this.getChartDataPie3();
      this.endValue=this.chartDataPie.rows[0].value;
      console.log("@@@");

  },
  mounted(){
      console.log("!!!!");
      this.getChartDataPie();
      this.getChartDataPie2();
      this.getChartDataPie3();

      console.log("@@@");

  },
  data() {
    return {
      chartSettings : {
        // roseType: 'radius',
        // color:['#E4004F','#ffff00']
        color: ["#FF9900", "#DC3912"]

      },

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
      title : {
          text: "CPU resources of system",
          x: "left",
          textStyle: {
            color: "#49ffb9",//标题颜色
            fontWeight: "bold",//粗体
            fontSize: 24  //字体大小
          }
        },
        title2 : {
          text: "GPU resources of system",
          x: "left",
          textStyle: {
            color: "#84ffc3",//标题颜色
            fontWeight: "bold",//粗体
            fontSize: 24  //字体大小
          }
        },
        title3 : {
          text: "Hard Disk resources of system",
          x: "left",
          textStyle: {
            color: "#84ffc3",//标题颜色
            fontWeight: "bold",//粗体
            fontSize: 24  //字体大小
          }
        },
      chartDataPie:{

        columns:["label","value"],
        rows:[
          {label:"numberofCPU",value:0},
          {label:"numberofUsedCPU",value:0},
        ]
      },
      chartDataPie2:{
        columns:["label","value"],
        rows:[
          {label:"numberofGPU",value:0},
          {label:"numberofUsedGPU",value:0},
        ]
      },
      chartDataPie3:{
        columns:["label","value"],
        rows:[
          {label:"numberofDisk",value:0},
          {label:"numberofUsedDisk",value:0},
        ]
      }


    };
  },
  methods:{
    async getChartDataPie(){
      console.log("ssssssssssssssss");
      const { data: res } = await this.$http.post(
        "getCPUPlot",
        // this.queryInfo
      );
      console.log(res);
      console.log("!!!!! numberALL",res.numberCPU);
      console.log("!!!!! numberUsed",res.numberUsedCPU);
      if(res){

        this.chartDataPie.rows[0].value = res.numberCPU;
        this.chartDataPie.rows[1].value = res.numberUsedCPU;
        // 踩坑，注意要这样写，
        // this.chartDataPie.columns = [{ label: 'number of CPU' }, { label: 'number of Used CPU' }];
        // this.chartDataPie.rows = [{ numberCPU: res.numberCPU, numberUsedCPU: res.numberUsedCPU }];

          // this.chartDataPie.columns =['number of CPU','number of Used CPU']
          // this.chartDataPie.rows = [{"numberCPU":res.numberCPU,"numberUsedCPU":res.numberUsedCPU}]
      }
      console.log(this.chartDataPie);
      console.log("chartData: "+this.chartData);
    },

    async getChartDataPie2(){
      console.log("ssssssssssssssss");
      const { data: res } = await this.$http.post(
        "getGPUPlot",
      );
      console.log(res);
      console.log("!!!!! numberALL",res.numberGPU);
      console.log("!!!!! numberUsed",res.numberUsedGPU);
      if(res){

        this.chartDataPie2.rows[0].value = res.numberGPU;
        this.chartDataPie2.rows[1].value = res.numberUsedGPU;

      }
      console.log(this.chartDataPie2);
    },

    async getChartDataPie3(){
      console.log("ssssssssssssssss");
      const { data: res } = await this.$http.post(
        "getHDPlot",
        // this.queryInfo
      );
      console.log(res);
      console.log("!!!!! numberALL",res.numberHD);
      console.log("!!!!! numberUsed",res.numberUsedHD);
      if(res){

        this.chartDataPie3.rows[0].value = res.numberHD;
        this.chartDataPie3.rows[1].value = res.numberUsedHD;
      }
    },
  }
};
</script>

<style >
.light-gray {
  color: #aaa;
}
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  padding: 20px;
}

.title-text {
  /* color: #84ffc3; */
  color: #3fffc5;

  font-weight: bold;
  font-size: 24px;
}

.chart-data {
  margin-top: 20px;
  padding: 20px;
}

.chart-data h2 {
  font-size: 20px;
  font-weight: bold;
}
.content-text{
  color: #000000;
  /* font-weight: bold; */
  font-size: 20px;
}
</style>