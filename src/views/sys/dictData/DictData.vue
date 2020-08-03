<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="state.isCreateShow = true">新建</a-button>
      </div>

      <!-- 数据表格 -->
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="state.loading"
        rowKey="id"
        :pagination="pagination"
        @change="pageChange"
      >
        <!-- 状态 -->
        <template slot="status" slot-scope="status">
          <a-tag :color="status === 0 ? 'blue' : 'red'">{{ status === 0 ? '正常' : '停用' }}</a-tag>
        </template>

        <!-- 是否默认 -->
        <template slot="isDefault" slot-scope="isDefault">
          <a-tag :color="isDefault === 0 ? 'blue' : 'red'">{{ isDefault === 0 ? '默认' : '否' }}</a-tag>
        </template>

        <template slot="action" slot-scope="{ id }, record, index">
          <a-button @click="onUpdate(record)" type="primary">修改数据</a-button>

          <a-popconfirm title="确定删除?" ok-text="确定" cancel-text="取消" @confirm="onDelete(id, index)">
            <a-button type="danger">删除</a-button>
          </a-popconfirm>
        </template>
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
          <a-form-model-item ref="label" label="字典标签" prop="label">
            <a-input v-model="form.label" />
          </a-form-model-item>

          <a-form-model-item ref="value" label="字典键值" prop="value">
            <a-input v-model="form.value" />
          </a-form-model-item>

          <a-form-model-item label="状态" prop="status">
            <a-radio-group v-model="form.status">
              <a-radio :value="0">正常</a-radio>
              <a-radio :value="1">停用</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item label="是否默认" prop="isDefault">
            <a-radio-group v-model="form.isDefault">
              <a-radio :value="0">正常</a-radio>
              <a-radio :value="1">停用</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item ref="sort" label="字典排序" prop="sort">
            <a-input v-model="form.sort" type="tel" />
          </a-form-model-item>

          <a-form-model-item label="备注" prop="remark">
            <a-input v-model="form.remark" type="textarea" />
          </a-form-model-item>

          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button style="margin-left: 10px;" @click="resetForm">重置</a-button>
          </a-form-model-item>
        </a-form-model>
      </a-modal>

      <!-- 修改 -->
      <a-modal
        title="修改"
        :width="640"
        :visible="state.isEditShow"
        :confirmLoading="state.isEditLoading"
        @ok="onEditonfirm"
        @cancel="state.isEditShow = false"
      >
        <a-form-model
          ref="editForm"
          :model="editForm"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="label" label="字典标签" prop="label">
            <a-input v-model="editForm.label" />
          </a-form-model-item>

          <a-form-model-item ref="value" label="字典键值" prop="value">
            <a-input v-model="editForm.value" />
          </a-form-model-item>
        

          <a-form-model-item label="状态" prop="status">
            <a-radio-group v-model="editForm.status">
              <a-radio :value="0">正常</a-radio>
              <a-radio :value="1">停用</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item label="是否默认" prop="isDefault">
            <a-radio-group v-model="form.isDefault">
              <a-radio :value="0">正常</a-radio>
              <a-radio :value="1">停用</a-radio>
            </a-radio-group>
          </a-form-model-item>

          <a-form-model-item ref="sort" label="字典排序" prop="sort">
            <a-input v-model="editForm.sort" type="tel" />
          </a-form-model-item>

          <a-form-model-item label="备注" prop="remark">
            <a-input v-model="editForm.remark" type="textarea" />
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
      dictTypeId: '',

      state: {
        loading: false,

        isCreateShow: false,
        isCreateLoading: false,
        // 修改是否显示
        isEditShow: false,
        // 修改是否加载
        isEditLoading: false,
      },

      columns: [
        // ID
        {
          title: '字典编码',
          dataIndex: 'id',
          key: 'id',
        },

        // Name
        {
          title: '字典标签',
          dataIndex: 'label',
        },

        // Type
        {
          title: '字典键值',
          dataIndex: 'value',
        },

        // Status
        {
          title: '状态',
          dataIndex: 'status',
          scopedSlots: { customRender: 'status' },
        },

        // Status
        {
          title: '是否默认',
          dataIndex: 'isDefault',
          scopedSlots: { customRender: 'isDefault' },
        },

        // Remark
        {
          title: '备注',
          dataIndex: 'remark',
          key: 'remark',
        },

        // CreatedTime
        {
          title: '创建时间',
          dataIndex: 'createdTime',
          key: 'createdTime',
        },

        // UpdatedTime
        {
          title: '修改时间',
          dataIndex: 'updatedTime',
          key: 'updatedTime',
        },

        // Action
        {
          title: '操作',
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
        },
      ],

      tableData: [],

      pagination: {
        total: 0,
        pageSize: 10,
        defaultCurrent: 1,
        pageNum: 1,
      },

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

      // 新增表格
      form: {
        // 字典标签
        label: '',
        // 字典类型名
        value: '',
        // 状态（0正常 1停用
        status: 0,
        // 是否默认（0是 1否）
        isDefault: 0,
        // 字典排序
        sort: 0,
        // 备注
        remark: '',
      },

      // 修改表格
      editForm: {
        // ID
        id: '',
        // 字典标签
        label: '',
        // 字典类型名
        value: '',
        // 状态（0正常 1停用
        status: 0,
        // 是否默认（0是 1否）
        isDefault: 0,
        // 字典排序
        sort: 0,
        // 备注
        remark: '',
      },

      rules: {
        label: [
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
        value: [
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
        isDefault: [
          {
            required: true,
            message: '请选择是否默认',
            trigger: 'change',
          },
        ],
        remark: [
          // {
          //   required: true,
          //   message: '请输入备注',
          //   trigger: 'blur',
          // },
          {
            min: 0,
            max: 500,
            message: 'Length should be 1 to 500',
            trigger: 'blur',
          },
        ],
      },
    }
  },

  methods: {
    // 获取数据
    async onGetList() {
      try {
        this.state.loading = true
        const res = await this.$api.Dict.getDictDataList({
          dictTypeId: this.dictTypeId,
          pageNum: this.pagination.pageNum,
          pageSize: this.pagination.pageSize,
        })

        if (res.success) {
          this.tableData = res.data.records
          this.pagination.total = res.data.total
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.loading = false
      }
    },

    pageChange(e) {
      this.pagination.pageNum = e.current
      this.onGetList()
    },

    // 创建确认
    onConfirm() {
      this.state.isCreateLoading = true
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.onCreate()
        } else {
          this.state.isCreateLoading = false
          return false
        }
      })
    },

    // 创建项目
    async onCreate() {
      try {
        const res = await this.$api.Dict.addDictData({
          ...this.form,
          dictTypeId: this.dictTypeId,
        })
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })

          // 获取数据
          this.onGetList()
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.isCreateLoading = false
      }
    },

    // 修改确认
    onEditonfirm() {
      this.state.isEditLoading = true
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.onEdit()
        } else {
          this.state.isCreateLoading = false
          return false
        }
      })
    },

    // 修改项目
    async onEdit() {
      try {
        const res = await this.$api.Dict.editDictData(this.editForm)
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })

          // 获取数据
          this.onGetList()
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.isEditLoading = false
        this.state.isEditShow = false
      }
    },

    // 删除字典类型
    async onDelete(id, index) {
      try {
        const res = await this.$api.Dict.removeDictData({
          id: id,
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
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.isCreateLoading = false
      }
    },

    // 修改字典类型
    onUpdate(record) {
      Object.assign(this.editForm, record)
      // this.editForm = record
      this.state.isEditShow = true
    },

    // 重置新增表单
    resetForm() {
      this.$refs.ruleForm.resetFields()
    },
    // 重置修改表单
    resetEditForm() {
      this.$refs.editForm.resetFields()
    },
  },

  mounted() {
    this.dictTypeId = this.$route.query.id
    // 获取字典类型列表
    this.onGetList()
  },
}
</script>

<style lang="scss" scoped></style>
