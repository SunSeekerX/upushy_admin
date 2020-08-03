<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="state.isCreateShow = true">新建</a-button>
      </div>

      <a-table :columns="columns" :data-source="data" :loading="state.loading" rowKey="id">
        <span slot="action" slot-scope="{ id }">
          <a-button @click="onUpdate(id)" type="primary">修改数据</a-button>
          <a-button @click="onDelete(id)" type="danger">删除</a-button>
        </span>
      </a-table>

      <!-- 新建 -->
      <a-modal
        title="新建"
        :width="640"
        :visible="state.isCreateShow"
        :confirmLoading="state.isCreateLoading"
        @ok="onConfirm"
        @cancel="state.isCreateShow = false"
      >
        <a-form-model
          ref="ruleForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="name" label="字典名" prop="name">
            <a-input v-model="form.name" />
          </a-form-model-item>

          <a-form-model-item ref="type" label="字典类型" prop="type">
            <a-input v-model="form.type" />
          </a-form-model-item>

          <a-form-model-item label="状态" prop="status">
            <a-radio-group v-model="form.status">
              <a-radio :value="0">正常</a-radio>
              <a-radio :value="1">停用</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item label="备注" prop="remark">
            <a-input v-model="form.remark" type="textarea" />
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button style="margin-left: 10px;" @click="resetForm">重置</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'SystemDict',

  data() {
    return {
      state: {
        loading: false,

        isCreateShow: false,

        isCreateLoading: false,
      },
      columns: [
        // ID
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },

        // Name
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },

        // Type
        {
          title: 'Type',
          dataIndex: 'type',
          key: 'type',
        },

        // Status
        {
          title: 'Status',
          dataIndex: 'status',
          key: 'status',
        },

        // Remark
        {
          title: 'Remark',
          dataIndex: 'remark',
          key: 'remark',
        },

        // CreatedTime
        {
          title: 'CreatedTime',
          dataIndex: 'createdTime',
          key: 'createdTime',
        },

        // UpdatedTime
        {
          title: 'UpdatedTime',
          dataIndex: 'updatedTime',
          key: 'updatedTime',
        },

        // Action
        {
          title: 'Action',
          key: 'action',
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ],
      data: [],
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 },
      },
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
      form: {
        // 字典类型名
        name: '',
        // 字典类型名
        type: '',
        // 状态（0正常 1停用
        status: 0,
        // 备注
        remark: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '请输入字典类型名',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 100,
            message: 'Length should be 1 to 100',
            trigger: 'blur',
          },
        ],
        type: [
          {
            required: true,
            message: '请输入字典类型',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 100,
            message: 'Length should be 1 to 100',
            trigger: 'blur',
          },
        ],
        status: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'change',
          },
        ],
        remark: [
          {
            required: true,
            message: '请输入备注',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 500,
            message: 'Length should be 1 to 500',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    // 获取字典类型列表
    async onGetList() {
      try {
        this.state.loading = true
        const res = await this.$api.Dict.getDictList({
          pageNum: 1,
          pageSize: 10,
        })

        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })

          this.data = res.data.records
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.loading = false
      }
    },

    // 创建项目
    async onCreate() {
      try {
        const res = await this.$api.Dict.addDictType(this.form)
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })

          // 添加数据
          
          // this.data.push(res.data)
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

    // 创建确认
    onConfirm() {
      this.state.isCreateLoading = true
      // console.log(this.$refs)
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.onCreate()
        } else {
          this.state.isCreateLoading = false
          return false
        }
      })
    },

    // 删除字典类型
    onDelete() {
      console.log('删除')
    },

    // 修改字典类型
    onUpdate() {
      console.log('修改')
    },

    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
  },

  mounted() {
    // 获取字典类型列表
    this.onGetList()
  },
}
</script>

<style lang="scss" scoped></style>
