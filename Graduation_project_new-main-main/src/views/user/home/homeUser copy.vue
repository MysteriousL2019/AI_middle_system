<template>
  <d2-container>
    <template slot="header">Page homeUser Header</template>
    Hello World
    <p>sssss</p>
      <el-upload
        class="upload-demo"
        ref="upload"
        :action="uploadURL"
        :drag="true"
        :http-request="customUpload"
        :data="{uploader: uploaderName}"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :auto-upload="false"
        :headers="{'Content-type': 'multipart/form-data'}"
      >
        <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
        <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        <div slot="tip" class="el-upload__tip">只能上传 .pkl 文件</div>
      </el-upload>

  </d2-container>

</template>

<script>
import axios from 'axios'

export default {
  name: 'homeUser',
  data() {
    return {
      uploaderName: 'Alice',
      fileList: [],
      uploadURL: 'http://localhost:9090/file/upload',
    }
  },
  methods: {
    // 自定义上传方法
    customUpload(file, callback) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('uploader', this.uploaderName)
      axios.post(this.uploadURL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        callback(response.data)
      }).catch(error => {
        console.log(error)
        callback(error)
      })
    },
    // customUpload(file, callback) {

    //   return new Promise((resolve, reject) => {
    //       // 创建 formData 对象
    //       const formData = new FormData()
    //       // 将上传的文件和自定义参数添加到 formData 中
    //       formData.append('file', file)
    //       formData.append('uploader', this.uploaderName)

    //       // 发起 POST 请求
    //       this.$axios.post(this.uploadURL, formData)
    //         .then(res => {
    //           // 将后端返回的数据保存到 file 对象中
    //           file.url = res.data.url
    //           file.uploader = res.data.uploader
    //           resolve(res.data) // 将 result 传入 resolve 函数
    //         })
    //         .catch(error => {
    //           reject(error)
    //         })
    //     })
    // },

    handleSuccess(response, file) {
      //上传成功后调用的
      console.log('handleSuccess')
      const { url, uploader } = response
      const fileInfo = {
        name: file.name,
        url,
        uploader,
        date: new Date(),
      }
      this.fileList.push(fileInfo)
      this.$message.success('上传成功')
    },
    beforeUpload(file) {
      /**
       * 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。	
       */
      console.log('beforeUpload')
      const isPkl = file.name.endsWith('.pkl')
      if (!isPkl) {
        this.$message.error('只能上传 .pkl 文件')
      }
      return isPkl
    },
    submitUpload() {
      console.log('submitUpload')
      this.$refs.upload.submit()
    },
  },
}
</script>
