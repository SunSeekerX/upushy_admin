<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="createProject">新建</a-button>
      </div>

      <a-table
        :columns="columns"
        :data-source="data"
        :loading="state.loading"
        rowKey="id"
        :pagination="pagination"
        @change="pageChange"
      >
        <!-- 项目名称 -->
        <template slot="name" slot-scope="text, { id, name }">
          <router-link :to="{ name: 'BasicSource', query: {id: id}}">{{ name }}</router-link>
        </template>

        <!-- 操作 -->
        <span slot="action" slot-scope="{ id, name, describe }">
          <a-button @click="update(id,name,describe)">修改</a-button>

          <a-popconfirm title="确定要删除该项目吗?" ok-text="确认" cancel-text="取消" @confirm="delData(id)">
            <a-button type="danger">删除</a-button>
          </a-popconfirm>
        </span>
      </a-table>

      <a-modal
        title="新建项目"
        :width="640"
        :visible="state.isCreateShow"
        :rules="rules"
        :confirmLoading="state.isCreateLoading"
        @ok="onConfirm"
        @cancel="state.isCreateShow = false"
      >
        <a-form-model ref="editForm" :model="editForm" v-bind="formLayout">
          <!-- 检查是否有 id 并且大于0，大于0是修改。其他是新增，新增不显示主键ID -->
          <!-- <a-form-item v-show="model && model.id > 0" label="主键ID">
              <a-input v-decorator="['id', { initialValue: 0 }]" disabled />
          </a-form-item>-->
          <a-form-model-item ref="name" label="项目名" prop="name">
            <a-input v-model="editForm.name" />
          </a-form-model-item>

          <a-form-model-item ref="describe" label="项目描述" prop="describe">
            <a-input v-model="editForm.describe" />
          </a-form-model-item>
        </a-form-model>
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
        },
        {
          title: '项目名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '项目描述',
          dataIndex: 'describe',
        },
        {
          title: '创建时间',
          dataIndex: 'createdTime',
        },
        {
          title: '修改时间',
          dataIndex: 'updatedTime',
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' },
        },
      ],
      rules: {
        name: [
          {
            required: true,
            message: '请输入项目名！',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 10,
            message: 'Length should be 1 to 10',
            trigger: 'blur',
          },
        ],
        describe: [
          {
            required: true,
            message: '请输入至少五个字符的规则描述！',
            trigger: 'blur',
          },
          {
            min: 5,
            max: 10,
            message: 'Length should be 5 to 10',
            trigger: 'blur',
          },
        ],
      },
      editForm: {
        name: '',
        describe: '',
        id: '',
      },
      type: '',
      data: [],
      pagination: {
        total: 0,
        pageSize: 10,
        defaultCurrent: 1,
        pageNum: 1,
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
      // form: this.$form.createForm(this),
    }
  },
  methods: {
    // 获取项目列表
    async onGetProjects() {
      try {
        this.state.loading = true
        const res = await this.$api.Project.projects({
          pageNum: this.pagination.pageNum,
          pageSize: this.pagination.pageSize,
        })
        if (res.success) {
          this.data = res.data.records
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
      this.onGetProjects()
    },
    async delData(id) {
      try {
        const res = await this.$api.Project.deleteProject({
          id: id,
        })
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })
          this.onGetProjects()
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      }
    },
    async updateData() {
      try {
        const res = await this.$api.Project.updateProject({
          id: this.editForm.id,
          name: this.editForm.name,
          describe: this.editForm.describe,
        })
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })
          this.state.isCreateShow = false
          this.state.isCreateLoading = false
          this.onGetProjects()
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      }
    },
    createProject() {
      this.state.isCreateShow = true
      this.type = 'create'
    },
    update(id, name, describe) {
      this.state.isCreateShow = true
      this.editForm.id = id
      this.editForm.name = name
      this.editForm.describe = describe
      this.type = 'update'
    },
    // 创建项目
    async onCreateProject() {
      try {
        const res = await this.$api.Project.createProject({
          describe: this.editForm.describe,
          name: this.editForm.name,
        })
        if (res.success) {
          this.$notification.success({
            message: '成功',
            description: res.message,
          })
          this.state.isCreateShow = false
          // 添加数据
          this.data.push(res.data)
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.isCreateLoading = false
      }
    },

    // 创建项目确认
    onConfirm() {
      this.state.isCreateLoading = true
      // console.log(this.$refs)
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (this.type === 'create') {
            this.onCreateProject()
          } else {
            this.updateData()
          }
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

<style lang="scss" scoped></style>
