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
        <!-- id -->
        <a-tooltip slot="id" slot-scope="id">
          <template slot="title">{{ id }}</template>
          {{ id }}
        </a-tooltip>

        <!-- 项目名称 -->
        <template slot="name" slot-scope="text, { id, name }">
          <router-link :to="{ name: 'BasicSource', query: {id: id}}">{{ name }}</router-link>
        </template>

        <!-- 操作 -->
        <span slot="action" slot-scope="text, record">
          <a-button @click="onClickUpdate(record)">修改</a-button>

          <a-popconfirm
            title="确定要删除该项目吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="onDelete(record.id)"
          >
            <a-button type="danger">删除</a-button>
          </a-popconfirm>
        </span>

        <!-- 创建时间 -->
        <template slot="createdTime" slot-scope="createdTime">{{ $util.formatTime(createdTime) }}</template>

        <!-- 更新时间 -->
        <template slot="updatedTime" slot-scope="updatedTime">{{ $util.formatTime(updatedTime) }}</template>
      </a-table>

      <!-- 新建项目 -->
      <a-modal
        title="新建项目"
        :width="640"
        :visible="state.isCreateShow"
        :confirmLoading="state.isCreateLoading"
        @ok="onCreateProject"
        @cancel="state.isCreateShow = false"
      >
        <a-form-model ref="createForm" :rules="rules" :model="createForm" v-bind="formLayout">
          <a-form-model-item ref="name" label="项目名" prop="name">
            <a-input v-model="createForm.name" :max-length="50" />
          </a-form-model-item>

          <a-form-model-item ref="describe" label="项目描述" prop="describe">
            <a-input v-model="createForm.describe" :max-length="200" />
          </a-form-model-item>
        </a-form-model>
      </a-modal>

      <!-- 修改项目 -->
      <a-modal
        title="修改项目"
        :width="640"
        :visible="state.isUpdateShow"
        :confirmLoading="state.isUpdateLoading"
        @ok="onUpdateProject"
        @cancel="state.isUpdateShow = false"
      >
        <a-form-model ref="updateForm" :rules="rules" :model="updateForm" v-bind="formLayout">
          <a-form-model-item ref="name" label="项目名" prop="name">
            <a-input v-model="updateForm.name" :max-length="50" />
          </a-form-model-item>

          <a-form-model-item ref="describe" label="项目描述" prop="describe">
            <a-input v-model="updateForm.describe" :max-length="200" />
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
        // 是否表格正在加载
        loading: false,
        // 是否显示新建modal
        isCreateShow: false,
        // 是否创建按钮加载
        isCreateLoading: false,
        // 是否显示修改modal
        isUpdateShow: false,
        // 是否修改按钮加载
        isUpdateLoading: false,
      },
      // 表头
      columns: [
        {
          title: 'ID',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' },
          width: 300,
        },
        {
          title: '项目名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        // 创建时间
        {
          title: '创建时间',
          dataIndex: 'createdTime',
          scopedSlots: { customRender: 'createdTime' },
          width: 150,
        },
        // 更新时间
        {
          title: '更新时间',
          dataIndex: 'updatedTime',
          scopedSlots: { customRender: 'updatedTime' },
          width: 150,
        },
        {
          title: '操作',
          scopedSlots: { customRender: 'action' },
        },
      ],
      // 表单校验规则
      rules: {
        // 项目名称
        name: [
          {
            required: true,
            message: '请输入项目名！',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 50,
            message: 'Length should be 1 to 50',
            trigger: 'blur',
          },
        ],
        // 项目描述
        describe: [
          {
            required: false,
            message: '请输入项目描述！',
            trigger: 'blur',
          },
          {
            min: 0,
            max: 200,
            message: 'Length should be 0 to 200',
            trigger: 'blur',
          },
        ],
      },
      // 新建表单
      createForm: {
        // 项目名称
        name: '',
        // 项目描述
        describe: '',
      },
      // 修改表单
      updateForm: {
        // 项目名称
        name: '',
        // 项目描述
        describe: '',
        // ID
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

    async onDelete(id) {
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
    //
    async updateData() {
      try {
        const res = await this.$api.Project.updateProject({
          id: this.createForm.id,
          name: this.createForm.name,
          describe: this.createForm.describe,
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

    // 点击编辑
    onClickUpdate(record) {
      Object.assign(this.updateForm, record)
      this.state.isUpdateShow = true
    },

    // 创建项目
    async onCreateProject() {
      this.state.isCreateLoading = true

      this.$refs.createForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$api.Project.createProject(this.createForm)
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
        } else {
          this.state.isCreateLoading = false
        }
      })
    },

    // 修改项目
    async onUpdateProject() {
      this.state.isUpdateLoading = true

      this.$refs.updateForm.validate(async valid => {
        if (valid) {
          try {
            const res = await this.$api.Project.updateProject(this.updateForm)
            if (res.success) {
              this.$notification.success({
                message: '成功',
                description: res.message,
              })
              this.state.isUpdateShow = false
              this.onGetProjects()
            } else {
              this.$handleError.handleRequestFail(res.message)
            }
          } catch (error) {
            this.$handleError.handleApiRequestException(error)
          } finally {
            this.state.isUpdateLoading = false
          }
        } else {
          this.state.isUpdateLoading = false
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
