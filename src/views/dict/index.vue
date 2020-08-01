<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="state.isCreateShow = true">新建</a-button>
      </div>

      <a-table :columns="columns" :data-source="data" :loading="state.loading" rowKey="id">
        <span slot="action" slot-scope="{id}">
          <router-link :to="{ path: `/source/sources/${id}`}">
            <a-button type="primary">查看资源</a-button>
          </router-link>
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
  name: 'BasicProject',
  data() {
    return {
      state: {
        loading: false,

        isCreateShow: false,

        isCreateLoading: false,
      },
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
        },
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Describe',
          dataIndex: 'describe',
          key: 'describe',
        },
        {
          title: 'CreatedTime',
          dataIndex: 'createdTime',
          key: 'createdTime',
        },
        {
          title: 'UpdatedTime',
          dataIndex: 'updatedTime',
          key: 'updatedTime',
        },
        {
          // dataIndex: 'name',
          key: 'action',
          title: 'Action',
          // slots: { title: 'customTitle' },
          scopedSlots: { customRender: 'action' },
        },
        // {
        //   dataIndex: 'name',
        //   key: 'name',
        //   slots: { title: 'customTitle' },
        //   scopedSlots: { customRender: 'name' },
        // },
        // {
        //   title: 'Age',
        //   dataIndex: 'age',
        //   key: 'age',
        // },
        // {
        //   title: 'Address',
        //   dataIndex: 'address',
        //   key: 'address',
        // },
        // {
        //   title: 'Tags',
        //   key: 'tags',
        //   dataIndex: 'tags',
        //   scopedSlots: { customRender: 'tags' },
        // },
        // {
        //   title: 'Action',
        //   key: 'action',
        //   scopedSlots: { customRender: 'action' },
        // },
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
    // 获取项目列表
    async onGetProjects() {
      try {
        this.state.loading = true
        const res = await this.$api.Project.projects()
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })

          this.data = res.data
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
  },
  mounted() {
    // 获取项目列表
    this.onGetProjects()
  },
}
</script>

<style lang="scss" scoped>
</style>
