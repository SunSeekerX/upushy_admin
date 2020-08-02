<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="state.isCreateShow = true">新建</a-button>
      </div>

      <a-table :columns="columns" :data-source="data" :loading="state.loading" rowKey="id">
        <span slot="action" slot-scope="{id}">
          <a-button @click="onUpdate(id)"  type="primary">修改数据</a-button>
          <a-button @click="onDelete(id)" type="danger">删除</a-button>
        </span>
      </a-table>

      <a-modal
        title="新建项目"
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

          <a-form-item label="项目名">
            <a-input
              v-decorator="['name', {rules: [{required: true, type: 'string', message: '请输入项目名！'}]}]"
            />
          </a-form-item>

          <a-form-item label="项目描述">
            <a-input
              v-decorator="['describe', {rules: [{required: true, min: 5, message: '请输入至少五个字符的规则描述！'}]}]"
            />
          </a-form-item>
        </a-form>
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
    // 获取字典类型列表
    async onGetList() {
      try {
        this.state.loading = true
        const res = await this.$api.Dict.getDictList({
          pageNum: 1,
          pageSize: 10,
        })

        if (res.success) {
          console.log(res)
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
    async onCreateProject({ describe, name }) {
      try {
        const res = await this.$api.Project.createProject({ describe, name })
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })

          // 添加数据
          this.data.push(res.data)
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

    // 创建项目确认
    onConfirm() {
      this.state.isCreateLoading = true
      console.log(this.$refs)
      this.form.validateFields((errors, values) => {
        if (!errors) {
          this.onCreateProject(values)
        } else {
          this.state.isCreateLoading = false
        }
      })
    },

    // 删除字典类型
    onDelete(){
      console.log('删除');
    },

    // 修改字典类型
    onUpdate(){
      console.log('修改');
    }
  },

  mounted() {
    // 获取字典类型列表
    this.onGetList()
  },
}
</script>

<style lang="scss" scoped>
</style>
