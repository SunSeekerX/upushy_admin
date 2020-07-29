<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-07-28 09:28:09
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-07-29 17:28:59
-->

<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="state.isCreateShow = true">新建</a-button>
      </div>

      <!-- 资源表格 -->
      <a-table
        :columns="tableColumns"
        :data-source="tableData"
        :loading="state.isTableLoading"
        rowKey="id"
      >
        <!-- url -->
        <!-- <a-tag slot="url" slot-scope="url" color="blue">{{ onFormatUrl(url) }}</a-tag> -->
        <span slot="url" slot-scope="url">{{ onFormatUrl(url) }}</span>

        <!-- 整包更新 -->
        <span slot="isFullUpdated" slot-scope="isFullUpdated">{{ isFullUpdated === 0 ? '否' : '是' }}</span>

        <!-- 强制更新 -->
        <span slot="isForceUpdate" slot-scope="isForceUpdate">{{ isForceUpdate === 0 ? '否' : '是' }}</span>

        <!-- 操作 -->
        <!-- <a-button slot="action" type="primary">查看资源</a-button> -->
        <template slot="action" slot-scope="text, record,index">
          <a-button @click="onEdit(record)">编辑</a-button>

          <a-popconfirm
            title="确定删除该资源?"
            ok-text="确定"
            cancel-text="取消"
            @confirm="onDelete(record, index)"
          >
            <a-button type="danger">删除</a-button>
          </a-popconfirm>
        </template>
      </a-table>

      <!-- 新建资源 -->
      <a-modal
        title="新建资源"
        :width="640"
        :visible="state.isCreateShow"
        :confirmLoading="state.isCreateLoading"
        @ok="onConfirm"
        @cancel="state.isCreateShow = false"
      >
        <a-form :form="form" v-bind="formLayout">
          <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
          <!-- <a-form-item v-show="model && model.id > 0" label="主键ID">
              <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
          </a-form-item>-->
          <a-form-item label="项目ID">
            <a-input
              disabled
              v-decorator="[
                'projectId',
                {
                  rules: [
                    {
                      required: true,
                      type: 'string',
                      message: '请输入项目ID！',
                    },
                  ],
                  initialValue: id,
                },
              ]"
            />
          </a-form-item>

          <a-form-item label="版本">
            <a-input
              v-decorator="[
                'version',
                {
                  rules: [
                    { required: true, type: 'string', message: '请输入版本！' },
                  ],
                },
              ]"
            />
          </a-form-item>

          <a-form-item label="版本号">
            <a-input
              type="tel"
              inputmode="numeric"
              @change="
                e => (e.target.value = e.target.value.replace(/\D/g, ''))
              "
              v-decorator="[
                'versionCode',
                {
                  rules: [
                    {
                      required: true,
                      type: 'integer',
                      transform: val => Number(val),
                      message: '请输入正确的版本号！',
                    },
                  ],
                },
              ]"
            />
          </a-form-item>

          <a-form-item label="备注">
            <a-textarea
              v-decorator="[
                'remark',
                {
                  rules: [
                    { required: true, type: 'string', message: '请输入备注！' },
                  ],
                },
              ]"
            />
          </a-form-item>

          <a-form-item label="是否强制更新">
            <a-radio-group
              v-decorator="[
                'isForceUpdate',
                {
                  initialValue: 0,
                  rules: [
                    {
                      required: true,
                      message: '请选择是否强制更新！',
                    },
                  ],
                },
              ]"
            >
              <a-radio :value="0">否</a-radio>
              <a-radio :value="1">是</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item label="是否整包更新">
            <a-radio-group
              v-decorator="[
                'isFullUpdated',
                {
                  initialValue: 0,
                  rules: [
                    {
                      required: true,
                      message: '请选择是否强制更新！',
                    },
                  ],
                },
              ]"
            >
              <a-radio :value="0">否</a-radio>
              <a-radio :value="1">是</a-radio>
            </a-radio-group>
          </a-form-item>

          <!-- 这里设置为another解决点击label触发input -->
          <a-form-item label="资源包" for="another">
            <div>
              <a-upload
                v-decorator="[
                  'url',
                  {
                    valuePropName: 'file',
                    getValueFromEvent: normFile,
                    rules: [
                      {
                        required: true,
                        message: '请上传资源包！',
                      },
                    ],
                  },
                ]"
                name="file"
                :action="uploadAcrion"
                @change="handleChange"
              >
                <a-button :disabled="fileList.length > 0">
                  <a-icon type="upload" />点击上传资源
                </a-button>
              </a-upload>
            </div>
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 编辑资源 -->
      <a-modal
        title="编辑资源"
        :width="640"
        :visible="state.isEditFormShow"
        :confirmLoading="state.isEditLoading"
        @ok="onEditConfirm"
        @cancel="state.isEditFormShow = false"
      >
        <a-form-model
          ref="ruleForm"
          :model="editForm"
          :rules="editFormRules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="ID" prop="id">
            <a-input v-model="editForm.id" disabled="disabled" />
          </a-form-model-item>

          <a-form-model-item label="版本" prop="version">
            <a-input v-model="editForm.version" />
          </a-form-model-item>

          <a-form-model-item label="版本号" prop="versionCode">
            <a-input v-model="editForm.versionCode" />
          </a-form-model-item>

          <a-form-model-item label="备注" prop="remark">
            <a-textarea v-model="editForm.remark" />
          </a-form-model-item>

          <a-form-item label="是否强制更新" prop="isForceUpdate">
            <a-radio-group v-model="editForm.isForceUpdate">
              <a-radio :value="0">否</a-radio>
              <a-radio :value="1">是</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item label="是否整包更新" prop="isFullUpdated">
            <a-radio-group v-model="editForm.isFullUpdated">
              <a-radio :value="0">否</a-radio>
              <a-radio :value="1">是</a-radio>
            </a-radio-group>
          </a-form-item>

          <a-form-item label="资源包地址" prop="url">
            <a-input v-model="editForm.url" disabled="disabled" />
          </a-form-item>

          <!-- <a-form-item label="资源包" prop="url">
            <div>
              <a-upload
                name="file"
                :action="uploadAcrion"
                @change="handleChange"
                :defaultFileList="editFileList"
              >
                <a-button :disabled="fileList.length > 0">
                  <a-icon type="upload" />点击上传资源
                </a-button>
              </a-upload>
            </div>
          </a-form-item>-->
        </a-form-model>
      </a-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'BasicSource',
  data() {
    return {
      // 项目id
      id: '',
      state: {
        // 表格是否加载
        isTableLoading: false,

        // 创建表格是否显示
        isCreateShow: false,
        isCreateLoading: false,

        // 修改表格是否显示
        isEditFormShow: false,
        isEditLoading: false,
      },

      // 表头
      tableColumns: [
        // ID
        {
          title: 'ID',
          dataIndex: 'id',
        },
        // 版本
        {
          title: '版本',
          dataIndex: 'version',
        },
        // 版本号
        {
          title: '版本号',
          dataIndex: 'versionCode',
        },
        // 下载地址
        {
          title: '下载地址',
          dataIndex: 'url',
          scopedSlots: { customRender: 'url' },
          width: 200,
          // ellipsis: true,
        },
        // 强制更新
        {
          title: '强制更新',
          dataIndex: 'isForceUpdate',
          scopedSlots: { customRender: 'isForceUpdate' },
        },
        // 强制更新
        {
          title: '整包更新',
          dataIndex: 'isFullUpdated',
          scopedSlots: { customRender: 'isFullUpdated' },
        },
        // 备注
        {
          title: '备注',
          dataIndex: 'remark',
        },
        // 创建时间
        {
          title: '创建时间',
          dataIndex: 'createdTime',
        },
        // 更新时间
        {
          title: '更新时间',
          dataIndex: 'updatedTime',
        },
        // 操作
        {
          title: '操作',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
        },
      ],

      // 表格数据
      tableData: [],
      fileList: [],

      // 编辑的行数据
      editForm: {},
      editFileList: [],
      editFormRules: {},
      labelCol: { xs: { span: 24 }, sm: { span: 7 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 13 } },

      // 上传文件地址
      uploadAcrion: `${process.env.VUE_APP_API_BASE_URL}/api/upload`,

      formLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 13 },
        },
      },

      form: this.$form.createForm(this),
    }
  },
  methods: {
    // 获取资源列表
    async onGetSources() {
      try {
        this.state.isTableLoading = true
        const res = await this.$api.Source.sources({
          id: this.id,
        })
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })
          this.tableData = res.data
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.isTableLoading = false
      }
    },

    // 创建项目
    async onCreateSource({
      projectId,
      version,
      versionCode,
      url,
      isForceUpdate,
      isFullUpdated,
      remark,
    }) {
      try {
        const res = await this.$api.Source.createSource({
          projectId,
          version,
          versionCode,
          url,
          isForceUpdate,
          isFullUpdated,
          remark,
        })
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })

          // 添加数据
          this.tableData.push(res.data)
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
        console.log(res)
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.isCreateLoading = false
      }
    },

    // 新建资源确认
    onConfirm() {
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.onCreateSource(values)
        } else {
          this.state.isCreateLoading = false
        }
      })
    },

    normFile(e) {
      if (e.fileList.length && e.fileList[0].response) {
        return e.fileList[0].response.data.customName
      } else {
        return ''
      }
    },

    handleChange(info) {
      const status = info.file.status
      console.log(info)
      // if (status !== 'uploading') {
      //   this.fileList = info.fileList
      //   // console.log(info.file, info.fileList)
      // }

      if (status === 'done') {
        this.$message.success(`${info.file.name} 上传成功。`)
      } else if (status === 'error') {
        this.$message.error(`${info.file.name} 上传失败。`)
      }

      this.fileList = info.fileList
    },

    onFormatUrl(url) {
      return `${process.env.VUE_APP_OSS_BASE_URL}/${url}`
    },

    // 点击编辑
    onEdit(record) {
      this.editFileList = []
      // this.form.setFieldsValue(pick(record, fields))
      this.editFileList.push({
        url: record.url,
      })
      this.editForm = record
      this.state.isEditFormShow = true
      // console.log(record)
    },

    // 编辑确定
    async onEditConfirm() {
      try {
        const res = await this.$api.Source.updateSource(this.editForm)
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
        console.log(res)
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.isCreateLoading = false
      }
    },

    // 删除
    async onDelete(record, index) {
      try {
        const res = await this.$api.Source.deleteSource({
          id: record.id,
        })

        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })

          this.tableData.splice(index, 1)
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
        console.log(res)
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.isCreateLoading = false
      }
    },
  },
  created() {
    // 获取项目id
    this.id = this.$route.params.id
  },
  mounted() {
    // 获取资源列表
    this.onGetSources()
  },
}
</script>

<style lang="scss" scoped></style>
