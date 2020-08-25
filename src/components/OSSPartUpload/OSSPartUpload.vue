<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-08-23 17:33:28
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-25 15:28:22
-->
<template>
  <div>
    <a-upload
      accept=".wgt, .apk"
      :file-list="fileList"
      :remove="handleRemove"
      :before-upload="beforeUpload"
    >
      <a-button :disabled="fileList.length > 0">
        <a-icon type="upload" />选择文件
      </a-button>
    </a-upload>

    <a-progress :percent="state.uploadPercent" />

    <!-- <a-button
      type="primary"
      :disabled="fileList.length === 0"
      :loading="state.isUploading"
      style="margin-top: 16px"
      @click="handleUpload"
    >{{ state.isUploading ? 'Uploading' : 'Start Upload' }}</a-button>-->
  </div>
</template>

<script>
import OSS from 'ali-oss'

export default {
  name: 'OSSPartUpload',

  data() {
    return {
      state: {
        // 是否正在上传
        isUploading: false,

        // 上传进度
        uploadPercent: 0,
      },
      // 上传的文件列表
      fileList: [],
      // OSS 客户端
      client: null,
    }
  },

  methods: {
    // 使用临时凭据初始化OSS客户端
    async onInitOSSClient() {
      try {
        const res = await this.$api.Common.getOSSStsConfig()
        if (res.success) {
          const { AccessKeyId, AccessKeySecret, SecurityToken, bucket, region } = res.data
          this.client = new OSS({
            accessKeyId: AccessKeyId,
            accessKeySecret: AccessKeySecret,
            stsToken: SecurityToken,
            bucket,
            region,
          })
          // this.$notification.success({
          //   message: '成功',
          //   description: '初始化OSS客户端成功',
          // })
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      }
    },

    // 处理进度条显示
    handleProgressDiaplay(progress) {
      this.state.uploadPercent = parseInt(progress * 100)
    },

    // 移除文件
    async handleRemove(file) {
      const index = this.fileList.indexOf(file)
      const newFileList = this.fileList.slice()
      newFileList.splice(index, 1)
      this.fileList = newFileList

      // 取消分片上传
      if (this.state.isUploading) {
        this.client.cancel()
      }

      // 进度条重置
      this.state.uploadPercent = 0

      // 传递到父组件
      this.$emit('on-remove')
    },

    // 清空文件
    onCleanFile() {
      this.fileList = []

      // 取消分片上传
      if (this.state.isUploading) {
        this.client.cancel()
      }

      // 进度条重置
      this.state.uploadPercent = 0
    },

    // 上传之前
    beforeUpload(file) {
      this.fileList = [...this.fileList, file]
      // OSS上传
      this.handleUpload()
      return false
    },

    // 处理文件上传
    async handleUpload() {
      const { fileList } = this

      this.state.isUploading = true
      try {
        const date = new Date()
        const fileName = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}/${date.getTime()}.${fileList[0].name}`
        // object-name可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
        const result = await this.client.multipartUpload(fileName, fileList[0], {
          progress: this.handleProgressDiaplay,
        })

        this.$emit('on-upload-complete', result)
      } catch (e) {
        // this.$notification.error({
        //   message: '失败',
        //   description: e.message,
        // })
        // 捕获超时异常。
        if (e.code === 'ConnectionTimeoutError') {
          console.log('TimeoutError')
          // do ConnectionTimeoutError operation
        }
        console.log(e)
      } finally {
        this.state.isUploading = false
      }
    },

    // 取消文件上传
    // async onAbortMultipartUpload() {
    //   const result = await this.client.abortMultipartUpload(name, uploadId)
    // },
  },

  mounted() {
    // 使用临时凭据初始化OSS客户端
    this.onInitOSSClient()
  },
}
</script>

<style>
</style>
