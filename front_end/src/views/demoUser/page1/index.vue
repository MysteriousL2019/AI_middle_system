
<template>
  <d2-container better-scroll type="card">
    <template slot="header">Data Management</template>
    <!-- Hello World<br> -->
    <!-- dataManagement -->
 
      <el-card>
        <el-upload 
        class="upload" 
        ref="upload" 
        action="string" 
        :auto-upload="true" 
        :http-request="uploadFile"
        :before-upload="beforeUpload"
        :on-change="handleChange" 
        :file-list="fileList" 
        :on-preview="handlePreview" 
        :on-remove="handleRemove" 
        multiple="multiple">
        <el-button slot="trigger" size="small" type="primary" @click="delFile">select file</el-button>
        <el-button 
                style="margin-left: 10px;"
                type="success"
                size="small"
                @click="onSubmit">submit</el-button>
        <div slot="tip" class="el-upload__tip">Only allowed files ended with .zip .tar .gz</div>

        </el-upload>   
        <el-table :data="logFileList" border stripe max-height="400px">
          <el-table-column prop="objectName" label="File Name"></el-table-column>
          <el-table-column prop="size" label="Size (KB)"></el-table-column>
          <el-table-column prop="lastModified" label="LastModifiedTime"></el-table-column>

          <el-table-column label="operation" width="100">
            <template slot-scope="scope">
              <el-button type="danger" size="small" @click="deleteFile(scope.row.objectName)" circle>del</el-button>
              <el-button type="primary" icon="el-icon-document-copy" size="small"  @click="downloadFile(scope.row.objectName)" circle></el-button>

            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <template slot="footer">
      </template>
  </d2-container>

</template>
<script>
// import { defineComponent } from '@vue/composition-api'
import axios from 'axios'

export default{
    data(){
        return{
        logForm:{
          username:'',
          usertype:'',
          time:'',
          operationType:'',
          result:''
        },
        // el-upload组件绑定的属性—— :file-list=“fileList”,渲染后fileList[index]是Object类型,而不是后台所需的File类型,
        // 而这个组件已经把对应的File类型存储到了fileList[index].raw这个属性里,直接拿来用就好.
        fileList: [],
        // 不支持多选
        multiple: false,
        formData: "",
        logFileList:[],
        queryInfo:{
            query:"",//查询的信息
            pageNum:1,
            pageSize:5,
          },

        }
    },
    created(){
      this.getList();
    },
    methods: {
      async downloadFile(filename){
          const confirmResult =await this.$confirm("This operation will download this file to local, click 'Yes' to continue. ",'HINT',{
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
          const {data:res}= await this.$http.get("zip/downloadStream?remoteFileName="+filename+"&localFileName="+filename);
          this.$message.success('download successfully! path E:\AIMiddlePlatformManagement'+filename);

      },
      // async downloadFile(filename){
      //     const confirmResult =await this.$confirm("This operation will download this file to local, click 'Yes' to continue. ",'HINT',{
      //       confirmButtonText:'Yes',
      //       // confirmButtonText:'Cancel',
      //       type:'warning'
      //     }).catch(err=>err);   //后面这个catch是异常处理
      //     if(confirmResult!='confirm'){
      //       // 如果选择了取消
      //       return this.$message.info("The operation has been canceled!!!");
      //     }
      //       // 如果继续操作
      //       // this.$http.delete
      //     console.log("点击了继续");
          
      //           try {
      //       const response = await this.$http.get('file/downResponse?remoteFileName=' + filename, {
      //         responseType: 'blob'
      //       });
      //       const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      //       const link = document.createElement('a');
      //       link.href = downloadUrl;
      //       link.setAttribute('download', filename);
      //       document.body.appendChild(link);
      //       link.click();
      //     } catch (error) {
      //       console.error(error);
      //     }
      // },
      async deleteFile(fileName){
                    // 这是信息提示框
          const confirmResult =await this.$confirm("This operation will delete the file in the minio forever, click 'Yes' to continue. ",'HINT',{
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

          this.$setOperationTime(new Date());
          this.logForm.result='success';
          this.logForm.username=this.$Name;
          this.logForm.usertype=this.$type;
          this.logForm.time=this.$OperationTime;
          this.logForm.operationType='deleteDataSet';

          const {data:res} = await this.$http.delete("zip/delete?path="+fileName);
          if(res!="success"){
            this.logForm.result="fail";

            const {data: res2}=await this.$http.post("saveLog",this.logForm);

            this.$message.error('delete error');
          }else{

            this.$message.success('delete success');
            this.getList();
            const {data: res2}=await this.$http.post("saveLog",this.logForm);

          }
      },
      async getList(){
          const {data:res}=await this.$http.get("zip/listObject");
          // console.log(res.objectName);
          // console.log(res.size);
          // console.log(res.lastModified);
          console.log("2222");
          console.log(res);
          console.log(res.data);

          console.log("1111");
          this.logFileList=res.data;
      },
      handleSuccess(response, file) {
        console.log("handleSuccess");

        const { url, uploader } = response
        const fileInfo = {
          name: file.name,
          url,
          uploader,
          date: new Date()
        }
        this.fileList.push(fileInfo)
        this.$message.success('上传成功')
      },
      beforeUpload(file) {
        console.log("beforeUpload");
        //离谱，第一个条件不知道干嘛的
        // const isPkl = file.type === 'application/octet-stream' && file.name.endsWith(".pkl")
        // const isPkl = file.name.endsWith(".pkl")
        const isPkl = file.name.endsWith(".zip") || file.name.endsWith(".tar") || file.name.endsWith(".gz");

        if (!isPkl) {
          this.$message.error('Only allowed files ended with .zip .tar .gz');
        }
        return isPkl
      },
        //保存按钮
        async onSubmit (file) {
            //这里加个全局的file list name的判断，如果file.name in file list。就不上传了
            // if(file.name)
            let formData = new FormData();
            formData.append("file", this.fileList[0].raw);//拿到存在fileList的文件存放到formData中
            console.log("this formData "+this.fileList);
            console.log("this formData "+this.fileList[0].raw);
            console.log("this formData "+formData);


        //下面数据是我自己设置的数据,可自行添加数据到formData(使用键值对方式存储)
            formData.append('uploader', this.$Name);
            this.$setOperationTime(new Date());
            this.logForm.result='success';
            this.logForm.username=this.$Name;
            this.logForm.usertype=this.$type;
            this.logForm.time=this.$OperationTime;
            this.logForm.operationType='submitDataSet';



            try {
                const {data:res} = await this.$http.post('http://localhost:9090/zip/upload', formData, {
                  headers: {
                    'Content-Type': 'multipart/form-data;charset=utf-8'
                  }
                });
                
                if (res) {
                  // this.$notify({
                  //   title: '成功',
                  //   message: '提交成功',
                  //   type: 'success',
                  //   duration: 1000
                  // });
                  const {data: res2}=await this.$http.post("saveLog",this.logForm);

                  this.$message.success('success to upload. ');
                  console.log("Success "+res.url);
                  console.log("Success "+res.uploader);
                  console.log("Success "+res.time);


                }
              } catch (error) {
                console.log(error);
                this.logForm.result="fail";

                const {data: res2}=await this.$http.post("saveLog",this.logForm);

              }
              this.getList();
        },
        //点击上传文件触发的额外事件,清空fileList
        delFile () {
        this.fileList = [];
        },
        handleChange (file, fileList) {
          
        this.fileList = fileList;
        // console.log(this.fileList, "sb");
        
        },
        //自定义上传文件
        uploadFile (file) {
        this.formData.append("file", file.file);
        // console.log(file.file, "sb2");
        },
        //删除文件
        handleRemove (file, fileList) {
        console.log(file, fileList);
        },
        // 点击文件
        handlePreview (file) {
        console.log(file);
        },
        
    }

}
</script>
