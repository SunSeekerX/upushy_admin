<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-button type="primary" icon="plus" @click="state.isCreateShow = true"> 新建 </a-button>
      </div>

      <!-- 资源表格 -->
      <a-table
        :columns="tableColumns"
        :data-source="tableData"
        :loading="state.isTableLoading"
        rowKey="id"
        :pagination="pagination"
        @change="onPageChange"
        :scroll="{ x: 1500 }"
        :bordered="true"
      >
        <!-- id -->
        <a-tooltip slot="id" slot-scope="id">
          <template slot="title">{{ id }}</template>
          {{ id }}
        </a-tooltip>

        <!-- 项目名称 -->
        <template slot="name" slot-scope="text, { id, name }">
          <router-link :to="{ path: '/project/sources', query: { id: id } }">
            {{ name }}
          </router-link>
        </template>

        <!-- 创建时间 -->
        <template slot="createdTime" slot-scope="createdTime">
          {{ $util.formatTime(createdTime) }}
        </template>

        <!-- 更新时间 -->
        <template slot="updatedTime" slot-scope="updatedTime">
          {{ $util.formatTime(updatedTime) }}
        </template>

        <!-- 操作 -->
        <span slot="action" slot-scope="text, record">
          <a-row>
            <a-col :span="8">
              <a-button @click="onClickViewDesc(record)" type="primary" shape="circle" icon="search">
                <!-- 查看详情 -->
              </a-button>
            </a-col>
            <a-col :span="8">
              <a-button @click="onClickUpdate(record)" shape="circle" icon="edit"></a-button>
            </a-col>
            <a-col :span="8">
              <a-popconfirm
                title="确定要删除该项目吗?"
                ok-text="确认"
                cancel-text="取消"
                @confirm="onDelete(record.id)"
              >
                <a-button type="danger" shape="circle" icon="delete"></a-button>
              </a-popconfirm>
            </a-col>
          </a-row>

          <!-- <a-button @click="onClickViewDesc(record)" type="primary">
            查看详情
          </a-button>

          <a-button @click="onClickUpdate(record)">修改</a-button>

          <a-popconfirm
            title="确定要删除该项目吗?"
            ok-text="确认"
            cancel-text="取消"
            @confirm="onDelete(record.id)"
          >
            <a-button type="danger">删除</a-button>
          </a-popconfirm> -->
        </span>
      </a-table>

      <!-- 新建项目 -->
      <a-modal
        title="新建项目"
        :width="640"
        :visible="state.isCreateShow"
        :confirmLoading="state.isCreateLoading"
        @ok="onCreate"
        @cancel="state.isCreateShow = false"
      >
        <a-form-model
          ref="createForm"
          :rules="rules"
          :model="createForm"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="name" label="项目名" prop="name">
            <a-input v-model="createForm.name" :max-length="50" />
          </a-form-model-item>

          <a-form-model-item ref="describe" label="项目描述" prop="describe">
            <a-textarea :maxLength="255" v-model="createForm.describe" />
            <!-- <a-input v-model="createForm.describe" :max-length="200" /> -->
          </a-form-model-item>
        </a-form-model>
      </a-modal>

      <!-- 修改项目 -->
      <a-modal
        title="修改项目"
        :width="640"
        :visible="state.isUpdateShow"
        :confirmLoading="state.isUpdateLoading"
        @ok="onUpdate"
        @cancel="state.isUpdateShow = false"
      >
        <a-form-model
          ref="updateForm"
          :rules="rules"
          :model="updateForm"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item ref="name" label="项目名" prop="name">
            <a-input v-model="updateForm.name" :max-length="50" />
          </a-form-model-item>

          <a-form-model-item ref="describe" label="项目描述" prop="describe">
            <a-textarea :maxLength="255" v-model="updateForm.describe" />
            <!-- <a-input v-model="updateForm.describe" :max-length="200" /> -->
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </a-card>

    <!-- 查看详情 -->
    <a-modal
      title="查看详情"
      :width="640"
      :visible="state.isDescShow"
      @ok="state.isDescShow = false"
      @cancel="state.isDescShow = false"
    >
      <a-card :bordered="false">
        <a-descriptions :title="descRecord.id">
          <a-descriptions-item label="项目名称">
            {{ descRecord.name }}
          </a-descriptions-item>
        </a-descriptions>

        <a-divider style="margin-bottom: 32px" />

        <a-descriptions>
          <a-descriptions-item label="项目描述">
            {{ descRecord.describe }}
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'BasicProject',

  data() {
    return {
      // 状态
      state: {
        // 是否表格正在加载
        isTableLoading: false,
        // 是否显示新建modal
        isCreateShow: false,
        // 是否创建按钮加载
        isCreateLoading: false,
        // 是否显示修改modal
        isUpdateShow: false,
        // 是否修改按钮加载
        isUpdateLoading: false,
        // 查看详情是否显示
        isDescShow: false,
      },
      // 表单布局
      labelCol: { xs: { span: 24 }, sm: { span: 7 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 13 } },
      // 表头
      tableColumns: [
        // ID
        {
          title: 'ID',
          dataIndex: 'id',
          scopedSlots: { customRender: 'id' },
          ellipsis: false,
          width: 280,
        },
        // 项目名称
        {
          title: '项目名称',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
          ellipsis: true,
          width: 200,
        },
        // 项目描述
        {
          title: '项目描述',
          dataIndex: 'describe',
          ellipsis: true,
          width: 200,
        },
        // 创建时间
        {
          title: '创建时间',
          dataIndex: 'createdTime',
          align: 'center',
          scopedSlots: { customRender: 'createdTime' },
          ellipsis: false,
          width: 200,
        },
        // 更新时间
        {
          title: '更新时间',

          dataIndex: 'updatedTime',
          align: 'center',
          scopedSlots: { customRender: 'updatedTime' },
          ellipsis: false,
          width: 200,
        },
        // 操作
        {
          title: '操作',
          align: 'center',
          fixed: 'right',
          scopedSlots: { customRender: 'action' },
          ellipsis: false,
          width: 150,
          // width: 200,s
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
            max: 255,
            message: '长度在0-255之间',
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
      // 查看详情条目
      descRecord: {},
      // 表格数据
      tableData: [],
      // 表格分页
      pagination: {
        total: 0,
        pageSize: 10,
        defaultCurrent: 1,
        pageNum: 1,
      },
    }
  },

  methods: {
    // 创建
    async onCreate() {
      this.state.isCreateLoading = true

      this.$refs.createForm.validate(async (valid) => {
        if (valid) {
          const res = await this.$api.createProject(this.createForm)
          if (res.statusCode === 200) {
            this.$notification.success({
              message: '成功',
              description: res.message,
            })
            this.state.isCreateShow = false
            // 添加数据
            this.tableData.push(res.data)
          } else {
            this.$handleError.handleRequestFail(res)
          }
          this.state.isCreateLoading = false
        } else {
          this.state.isCreateLoading = false
        }
      })
    },

    // 删除
    async onDelete(id) {
      const res = await this.$api.deleteProject({
        id: id,
      })
      if (res.statusCode === 200) {
        this.$notification.success({
          message: '成功',
          description: res.message,
        })
        this.onGetList()
      } else {
        this.$handleError.handleRequestFail(res)
      }
    },

    // 更新
    async onUpdate() {
      this.state.isUpdateLoading = true

      this.$refs.updateForm.validate(async (valid) => {
        if (valid) {
          const res = await this.$api.updateProject(this.updateForm)
          if (res.statusCode === 200) {
            this.$notification.success({
              message: '成功',
              description: res.message,
            })
            this.state.isUpdateShow = false
            this.onGetList()
          } else {
            this.$handleError.handleRequestFail(res)
          }
          this.state.isUpdateLoading = false
        } else {
          this.state.isUpdateLoading = false
        }
      })
    },

    // 查询
    async onGetList() {
      this.state.isTableLoading = true
      const res = await this.$api.projects({
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
      })
      if (res.statusCode === 200) {
        this.tableData = res.data.records
        this.pagination.total = res.data.total
      } else {
        this.$handleError.handleRequestFail(res)
      }
      this.state.isTableLoading = false
    },

    // 表格分页改变
    onPageChange(e) {
      this.pagination.pageNum = e.current
      this.onGetList()
    },

    // 点击编辑
    onClickUpdate(record) {
      Object.assign(this.updateForm, record)
      this.state.isUpdateShow = true
    },

    // 点击查看详情
    onClickViewDesc(record) {
      // 合并项
      this.descRecord = Object.assign({}, record)
      // 显示编辑modal
      this.state.isDescShow = true
    },
  },

  mounted() {
    // 获取项目列表
    this.onGetList()
  },
}
</script>
