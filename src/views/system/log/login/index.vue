<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2021-09-14 09:56:50
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-09-14 18:43:30
-->
<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <!-- 资源表格 -->
      <a-table
        :columns="tableColumns"
        :data-source="tableData"
        :loading="state.isTableLoading"
        rowKey="id"
        :pagination="pagination"
        @change="onPageChange"
        :bordered="true"
      >
        <!-- 登录日期 -->
        <template slot="loginTime" slot-scope="loginTime">
          {{ $util.formatTime(loginTime) }}
        </template>
      </a-table>
    </a-card>
  </page-header-wrapper>
</template>

<script>
export default {
  name: 'SystemLogLogin',

  data() {
    return {
      // 状态
      state: {
        // 是否表格正在加载
        isTableLoading: false,
      },
      // 表单布局
      labelCol: { xs: { span: 24 }, sm: { span: 7 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 13 } },
      // 表头
      tableColumns: [
        // ID
        {
          title: '访问编号',
          dataIndex: 'id',
          // ellipsis: false,
        },
        // 用户名称
        {
          title: '用户名称',
          dataIndex: 'username',
        },
        // 登录地址
        {
          title: '登录地址',
          dataIndex: 'ipaddr',
        },
        // 登录地点
        {
          title: '登录地点',
          dataIndex: 'loginLocation',
        },
        // 浏览器
        {
          title: '浏览器',
          dataIndex: 'browser',
        },
        // 操作系统
        {
          title: '操作系统',
          dataIndex: 'os',
        },
        // 登录状态
        {
          title: '登录状态',
          dataIndex: 'status',
          customRender(text) {
            return text === '1' ? '成功' : '失败'
          },
        },
        // 操作信息
        {
          title: '操作信息',
          dataIndex: 'msg',
        },
        // 登录日期
        {
          title: '登录日期',
          dataIndex: 'loginTime',
          scopedSlots: { customRender: 'loginTime' },
          defaultSortOrder: 'descend',
          sorter: true,
        },
      ],
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
        'show-size-changer': true,
      },
      // 查询参数
      queryParams: {
        sortKey: 'loginTime',
        order: 'DESC',
      },
    }
  },

  methods: {
    // 查询
    async onGetList() {
      this.state.isTableLoading = true
      const res = await this.$api.logginLogs({
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
        sortKey: this.queryParams.sortKey,
        order: this.queryParams.order,
      })
      if (res.code === 200) {
        this.tableData = res.data.records
        this.pagination.total = res.data.total
      } else {
        this.$handleError.handleRequestFail(res)
      }
      this.state.isTableLoading = false
    },

    // 表格分页改变
    onPageChange(pagination, filters, { order, columnKey }) {
      this.pagination.pageNum = pagination.current
      this.pagination.pageSize = pagination.pageSize
      // 排序
      if (order) {
        this.queryParams.sortKey = columnKey
        this.queryParams.order = order === 'ascend' ? 'ASC' : 'DESC'
      } else {
        this.queryParams.sortKey = ''
        this.queryParams.order = ''
      }
      this.onGetList()
    },
  },

  mounted() {
    // 获取项目列表
    this.onGetList()
  },
}
</script>
