<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2021-04-26 00:46:14
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-09-14 18:43:04
-->
<template>
  <page-header-wrapper>
    <a-card :bordered="false">
      <div class="table-operator">
        <a-row align="middle" type="flex">
          <a-col :xs="24" :md="12">
            <a-button
              type="primary"
              icon="plus"
              @click="onCreateSourceModelOpen"
            >
              新建
            </a-button>
          </a-col>

          <a-col :xs="24" :md="12">
            <a-tabs v-model="sourcesType" size="small" @change="onTagChange">
              <a-tab-pane
                v-for="item of tabs"
                :key="item.key"
                :disabled="state.isTableLoading"
              >
                <span slot="tab">
                  <a-icon :type="item.type" />
                  {{ item.value }}
                </span>
              </a-tab-pane>
            </a-tabs>
          </a-col>
        </a-row>
      </div>

      <!-- 资源表格 -->
      <a-table
        :columns="tableColumns"
        :data-source="tableData"
        :loading="state.isTableLoading"
        rowKey="id"
        :pagination="pagination"
        :scroll="{ x: 1500 }"
        @change="onPageChange"
        :bordered="true"
      >
        <!-- id -->
        <a-tooltip slot="id" slot-scope="id">
          <template slot="title">{{ id }}</template>
          {{ id }}
        </a-tooltip>

        <!-- url -->
        <a-tooltip slot="url" slot-scope="url">
          <template slot="title">{{ url }}</template>
          {{ url }}
        </a-tooltip>

        <!-- 版本号 -->
        <a-tag slot="versionCode" slot-scope="versionCode" color="#87d068">
          {{ versionCode }}
        </a-tag>

        <!-- 原生版本号 -->
        <a-tag slot="nativeVersionCode" slot-scope="text" color="#108ee9">
          {{ text }}
        </a-tag>

        <!-- 版本号 -->
        <!-- <a-tag slot="versionCode" slot-scope="versionCode" color="green">{{ versionCode }}</a-tag> -->

        <!-- 强制更新 -->
        <!-- <span slot="isForceUpdate" slot-scope="isForceUpdate">{{ isForceUpdate === 0 ? '否' : '是' }}</span> -->

        <!-- <template slot="isForceUpdate" slot-scope="text, record">
          <a-switch
            @click="
              checked =>
                onUpdateSwitch({
                  checked,
                  record,
                  key: 'isForceUpdate',
                  loadingKey: 'isForceUpdateLoading',
                })
            "
            :checked="text === 1"
            :loading="record.isForceUpdateLoading"
          />
        </template> -->

        <!-- 类型 -->
        <span slot="sourcesType" slot-scope="text, record">
          {{ handleFormatType(record.type) }}
        </span>

        <!-- 状态 -->
        <template slot="status" slot-scope="text, record">
          <a-switch
            @click="
              checked =>
                onUpdateSwitch({
                  checked,
                  record,
                  key: 'status',
                  loadingKey: 'isStatusLoading',
                })
            "
            :checked="text === 1"
            :loading="record.isStatusLoading"
          />
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
        <template slot="action" slot-scope="text, record, index">
          <a-row>
            <a-col :span="8">
              <a-button
                @click="onClickViewDesc(record)"
                type="primary"
                shape="circle"
                icon="search"
              >
                <!-- 查看详情 -->
              </a-button>
            </a-col>
            <a-col :span="8">
              <a-button
                @click="onEdit(record)"
                shape="circle"
                icon="edit"
              ></a-button>
            </a-col>
            <a-col :span="8">
              <a-popconfirm
                title="确定删除该资源?"
                ok-text="确定"
                cancel-text="取消"
                @confirm="onDelete(record, index)"
              >
                <a-button type="danger" shape="circle" icon="delete"></a-button>
              </a-popconfirm>
            </a-col>
          </a-row>
        </template>
      </a-table>

      <!-- 新建资源 -->
      <a-modal
        title="新建资源"
        :width="640"
        :visible="state.isCreateShow"
        :confirmLoading="state.isCreateLoading"
        @ok="onCreateSource"
        @cancel="state.isCreateShow = false"
      >
        <a-form-model
          ref="createForm"
          :model="form"
          :rules="rules"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="项目ID" ref="projectId" prop="projectId">
            <a-input disabled v-model="form.projectId" prop="projectId" />
          </a-form-model-item>

          <a-form-model-item label="版本" ref="version" prop="version">
            <a-input v-model="form.version" />
          </a-form-model-item>

          <a-form-model-item
            label="版本号"
            ref="versionCode"
            prop="versionCode"
          >
            <a-input
              @change="
                e =>
                  (form.versionCode = Number(e.target.value.replace(/\D/g, '')))
              "
              v-model="form.versionCode"
            />
          </a-form-model-item>

          <a-form-model-item
            v-if="[1, 2].includes(form.type)"
            label="原生版本号"
            ref="nativeVersionCode"
            prop="nativeVersionCode"
          >
            <a-input
              @change="
                e =>
                  (form.nativeVersionCode = Number(
                    e.target.value.replace(/\D/g, ''),
                  ))
              "
              v-model="form.nativeVersionCode"
            />
          </a-form-model-item>

          <!-- <a-form-model-item label="是否强制更新" prop="isForceUpdate">
            <a-switch
              @click="
                checked => {
                  checked ? (form.isForceUpdate = 1) : (form.isForceUpdate = 0)
                }
              "
              :checked="form.isForceUpdate === 1"
            />
          </a-form-model-item> -->

          <a-form-model-item label="更新类型" prop="updateType">
            <a-select v-model="form.updateType" placeholder="请选择更新类型">
              <a-select-option :value="1">
                用户同意更新（用户感知）
              </a-select-option>
              <a-select-option :value="2">
                强制更新（用户感知）
              </a-select-option>
              <a-select-option :value="3">
                静默更新（用户不感知，下次启动生效）
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="是否启用" prop="status">
            <a-switch
              @click="
                checked => {
                  checked ? (form.status = 1) : (form.status = 0)
                }
              "
              :checked="form.status === 1"
            />
          </a-form-model-item>

          <a-form-model-item label="类型" prop="type">
            <a-select v-model="form.type">
              <a-select-option :value="1">wgt-android</a-select-option>
              <a-select-option :value="2">wgt-ios</a-select-option>
              <a-select-option :value="3">android</a-select-option>
              <a-select-option :value="4">ios</a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="更新日志" ref="changelog" prop="changelog">
            <a-textarea
              :auto-size="{ minRows: 9, maxRows: 15 }"
              :maxLength="255"
              v-model="form.changelog"
            />
          </a-form-model-item>

          <a-form-model-item label="备注" ref="remark" prop="remark">
            <a-textarea
              :auto-size="{ minRows: 9, maxRows: 15 }"
              :maxLength="255"
              v-model="form.remark"
            />
          </a-form-model-item>

          <a-form-model-item
            v-if="form.type === 4"
            label="资源链接"
            ref="url"
            prop="url"
          >
            <a-input v-model="form.url" />
          </a-form-model-item>

          <a-form-model-item v-else label="资源包" prop="url">
            <oss-part-upload
              ref="OSSPartUpload"
              @on-upload-complete="onUploadComplete"
              @on-remove="form.url = ''"
            ></oss-part-upload>
          </a-form-model-item>
        </a-form-model>
      </a-modal>

      <!-- 编辑资源 -->
      <a-modal
        title="编辑资源"
        :width="640"
        :visible="state.isEditFormShow"
        :confirmLoading="state.isEditLoading"
        @ok="onUpdate"
        @cancel="state.isEditFormShow = false"
      >
        <a-form-model
          ref="editForm"
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
            <a-input
              @change="
                e =>
                  (editForm.versionCode = Number(
                    e.target.value.replace(/\D/g, ''),
                  ))
              "
              v-model="editForm.versionCode"
            />
          </a-form-model-item>

          <a-form-model-item
            v-if="[1, 2].includes(editForm.type)"
            label="原生版本号"
            ref="nativeVersionCode"
            prop="nativeVersionCode"
          >
            <a-input
              @change="
                e =>
                  (editForm.nativeVersionCode = Number(
                    e.target.value.replace(/\D/g, ''),
                  ))
              "
              v-model="editForm.nativeVersionCode"
            />
          </a-form-model-item>

          <!-- <a-form-model-item label="是否强制更新" prop="isForceUpdate">
            <a-radio-group v-model="editForm.isForceUpdate">
              <a-radio :value="0">否</a-radio>
              <a-radio :value="1">是</a-radio>
            </a-radio-group>
          </a-form-model-item>-->

          <a-form-model-item label="更新类型" prop="updateType">
            <a-select
              v-model="editForm.updateType"
              placeholder="请选择更新类型"
            >
              <a-select-option :value="1">
                用户同意更新（用户感知）
              </a-select-option>
              <a-select-option :value="2">
                强制更新（用户感知）
              </a-select-option>
              <a-select-option :value="3">
                静默更新（用户不感知，下次启动生效）
              </a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="类型" prop="type">
            <a-select disabled v-model="editForm.type">
              <a-select-option :value="1">wgt-android</a-select-option>
              <a-select-option :value="2">wgt-ios</a-select-option>
              <a-select-option :value="3">android</a-select-option>
              <a-select-option :value="4">ios</a-select-option>
            </a-select>
          </a-form-model-item>

          <a-form-model-item label="更新日志" ref="changelog" prop="changelog">
            <a-textarea
              :auto-size="{ minRows: 9, maxRows: 15 }"
              :maxLength="255"
              v-model="editForm.changelog"
            />
          </a-form-model-item>

          <a-form-model-item label="备注" ref="remark" prop="remark">
            <a-textarea
              :auto-size="{ minRows: 9, maxRows: 15 }"
              :maxLength="255"
              v-model="editForm.remark"
            />
          </a-form-model-item>

          <a-form-model-item label="资源包地址" prop="url">
            <a-input v-model="editForm.url" disabled="disabled" />
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
      :footer="null"
    >
      <a-card :bordered="false">
        <a-descriptions :title="`id：${descRecord.id}`">
          <a-descriptions-item label="版本名">
            {{ descRecord.version }}
          </a-descriptions-item>
          <a-descriptions-item label="版本号">
            {{ descRecord.versionCode }}
          </a-descriptions-item>
          <a-descriptions-item
            v-if="[1, 2].includes(sourcesType)"
            label="原生版本号"
          >
            {{ descRecord.nativeVersionCode }}
          </a-descriptions-item>
          <!-- <a-descriptions-item label="更新日志">
            {{ descRecord.changelog }}
          </a-descriptions-item>
          <a-descriptions-item label="下载地址">
            {{ descRecord.url }}
          </a-descriptions-item> -->
        </a-descriptions>

        <a-divider style="margin-bottom: 32px" />

        <a-descriptions title="更新日志">
          <a-descriptions-item>
            <div style="white-space: pre-line;">
              {{ descRecord.changelog }}
            </div>
          </a-descriptions-item>
        </a-descriptions>

        <a-divider style="margin-bottom: 32px" />

        <a-descriptions title="下载地址">
          <a-descriptions-item>
            {{ descRecord.url }}
          </a-descriptions-item>
        </a-descriptions>

        <a-descriptions :column="1">
          <a-descriptions-item label="">
            <img width="200" height="200" :src="descRecord.qrcodeUrl" />
          </a-descriptions-item>
        </a-descriptions>

        <a-divider style="margin-bottom: 32px" />

        <a-descriptions title="备注">
          <a-descriptions-item>
            <div style="white-space: pre-line;">
              {{ descRecord.remark }}
            </div>
          </a-descriptions-item>
        </a-descriptions>
      </a-card>
    </a-modal>
  </page-header-wrapper>
</template>

<script>
import storage from 'store'

import { ACCESS_TOKEN } from '@/store/mutation-types'
import OssPartUpload from '@/components/OSSPartUpload/OSSPartUpload'

export default {
  name: 'BasicSource',

  components: {
    OssPartUpload,
  },

  computed: {
    // 表头
    tableColumns() {
      if ([3, 4].includes(this.sourcesType)) {
        return [
          // ID
          {
            title: 'ID',
            dataIndex: 'id',
            scopedSlots: { customRender: 'id' },
            width: 280,
          },
          // 版本名
          {
            title: '版本名',
            align: 'center',
            dataIndex: 'version',
            width: 80,
          },
          // 版本号
          {
            title: '版本号',
            align: 'center',
            dataIndex: 'versionCode',
            scopedSlots: { customRender: 'versionCode' },
            defaultSortOrder: 'descend',
            sorter: true,
          },
          {
            title: '更新类型',
            align: 'center',
            dataIndex: 'updateType',
            scopedSlots: { customRender: 'isForceUpdate' },
            customRender: text => {
              switch (text) {
                case 1:
                  return '用户同意更新'
                case 2:
                  return '强制更新'
                case 3:
                  return '静默更新'
                default:
                  return ''
              }
            },
          },
          // 状态
          {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
            // ellipsis: false,
            // width: 80,
          },
          // 创建时间
          {
            title: '创建时间',
            dataIndex: 'createdTime',
            align: 'center',
            scopedSlots: { customRender: 'createdTime' },
          },
          // 更新时间
          {
            title: '更新时间',
            dataIndex: 'updatedTime',
            align: 'center',
            scopedSlots: { customRender: 'updatedTime' },
          },
          // 操作
          {
            title: '操作',
            align: 'center',
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
            width: 150,
          },
        ]
      } else {
        return [
          // ID
          {
            title: 'ID',
            dataIndex: 'id',
            scopedSlots: { customRender: 'id' },
            // ellipsis: false,
            width: 280,
          },
          // 版本名
          {
            title: '版本名',
            align: 'center',
            dataIndex: 'version',
            // ellipsis: false,
            width: 80,
          },
          // 版本号
          {
            title: '版本号',
            align: 'center',
            dataIndex: 'versionCode',
            scopedSlots: { customRender: 'versionCode' },
            defaultSortOrder: 'descend',
            // ellipsis: false,
            sorter: true,
            // width: 120,
          },
          // 原生版本号
          {
            title: '原生版本号',
            align: 'center',
            dataIndex: 'nativeVersionCode',
            scopedSlots: { customRender: 'nativeVersionCode' },
            // ellipsis: true,
            // sorter: true,
            // width: 120,
          },
          // 下载地址
          // {
          //   title: '下载地址',
          //   dataIndex: 'url',
          //   scopedSlots: { customRender: 'url' },
          //   ellipsis: true,
          //   width: 150,
          //   // ellipsis: true,
          // },
          // 强制更新
          // {
          //   title: '强制更新',
          //   align: 'center',
          //   dataIndex: 'isForceUpdate',
          //   scopedSlots: { customRender: 'isForceUpdate' },
          //   ellipsis: true,
          //   width: 80,
          // },
          // 更新类型（1：用户同意更新，2：强制更新，3：静默更新）
          {
            title: '更新类型',
            align: 'center',
            dataIndex: 'updateType',
            scopedSlots: { customRender: 'isForceUpdate' },
            customRender: text => {
              switch (text) {
                case 1:
                  return '用户同意更新'
                case 2:
                  return '强制更新'
                case 3:
                  return '静默更新'
                default:
                  return ''
              }
            },
            // ellipsis: false,
            // width: 200,
          },
          // 类型
          // {
          //   title: '类型',
          //   align: 'center',
          //   dataIndex: 'sourcesType',
          //   scopedSlots: { customRender: 'sourcesType' },
          //   ellipsis: true,
          //   width: 100,
          // },
          // 状态
          {
            title: '状态',
            align: 'center',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
            // ellipsis: false,
            // width: 80,
          },
          // 更新日志
          // {
          //   title: '更新日志',
          //   dataIndex: 'changelog',
          //   ellipsis: true,
          //   width: 80,
          // },
          // 备注
          // {
          //   title: '备注',
          //   dataIndex: 'remark',
          //   ellipsis: true,
          //   width: 80,
          // },
          // 创建时间
          {
            title: '创建时间',
            dataIndex: 'createdTime',
            align: 'center',
            scopedSlots: { customRender: 'createdTime' },
            // ellipsis: false,
            // width: 200,
          },
          // 更新时间
          {
            title: '更新时间',
            dataIndex: 'updatedTime',
            align: 'center',
            scopedSlots: { customRender: 'updatedTime' },
            // ellipsis: false,
            // width: 200,
          },
          // 操作
          {
            title: '操作',
            align: 'center',
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
            // ellipsis: false,
            width: 150,
          },
        ]
      }
    },
  },

  data() {
    return {
      // 状态
      state: {
        // 表格是否加载
        isTableLoading: false,
        // 创建表格是否显示
        isCreateShow: false,
        // 创建按钮是否加载
        isCreateLoading: false,
        // 修改表格是否显示
        isEditFormShow: false,
        // 编辑是否加载
        isEditLoading: false,
        // 查看详情是否显示
        isDescShow: false,
      },
      // 表单布局
      labelCol: { xs: { span: 24 }, sm: { span: 7 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 13 } },
      // tabs
      tabs: [
        {
          key: 1,
          type: 'android',
          value: 'WGT',
        },
        {
          key: 2,
          type: 'apple',
          value: 'WGT',
        },
        {
          key: 3,
          type: 'android',
          value: 'Android',
        },
        {
          key: 4,
          type: 'apple',
          value: 'Apple',
        },
      ],
      // 字典
      dict: {
        // 资源类型
        sourcesType: {
          1: 'wgt-android',
          2: 'wgt-ios',
          3: 'android',
          4: 'ios',
        },
      },

      // 资源类型
      sourcesType: 1,
      // 表格数据
      tableData: [],
      // 文件数据
      fileList: [],
      // 分页
      pagination: {
        total: 0,
        pageSize: 10,
        current: 1,
        // defaultCurrent: 1,
        pageNum: 1,
      },
      // 查询参数
      queryParams: {
        sortKey: 'versionCode',
        order: 'DESC',
      },
      // 新增表格
      form: {
        // 项目ID
        projectId: 0,
        // 版本
        version: '',
        // 版本号
        versionCode: 0,
        // 原生版本号
        nativeVersionCode: 0,
        // 是否强制更新
        // isForceUpdate: 0,
        // 更新类型（1：用户同意更新，2：强制更新，3：静默更新）
        updateType: 1,
        // 资源状态（0：禁用 1：启用）
        status: 1,
        // 资源类型（1：wgt-android 2：wgt-ios  3：android，4：ios）
        type: 1,
        // 更新日志
        changelog: '',
        // 备注
        remark: '',
        // 资源包
        url: '',
      },
      // 最新的安卓版本号
      latestAndroidVersionCode: null,
      // 最新的 ios 版本号
      latestIosVersionCode: null,
      // 新增表格rules
      rules: {
        // 项目ID
        projectId: [
          {
            required: true,
            type: 'string',
            message: '请输入正确的项目ID！',
          },
        ],
        // 版本
        version: [{ required: true, type: 'string', message: '请输入版本！' }],
        // 版本号
        versionCode: [
          {
            required: true,
            type: 'integer',
            message: '请输入正确的版本号！',
          },
          {
            type: 'integer',
            min: 1,
            message: '版本号必须大于0！',
          },
        ],
        // 原生版本号
        nativeVersionCode: [
          {
            required: false,
            type: 'integer',
            message: '请输入正确的原生应用版本号！',
          },
          {
            validator: this.handleValideNativeVersionCode,
          },
        ],
        // 更新日志
        changelog: [
          { required: true, type: 'string', message: '请输入更新日志！' },
          {
            min: 1,
            max: 255,
            message: '长度在1-255之间',
            trigger: 'blur',
          },
        ],
        // 备注
        remark: [
          { required: false, type: 'string', message: '请输入备注！' },
          {
            min: 0,
            max: 255,
            message: '长度在0-255之间',
            trigger: 'blur',
          },
        ],
        // 是否强制更新（0：否 1：是）
        // isForceUpdate: [
        //   {
        //     required: true,
        //     message: '请选择是否强制更新！',
        //   },
        // ],
        // 更新类型（1：用户同意更新，2：强制更新，3：静默更新）
        updateType: [
          {
            required: true,
            message: '请选择更新类型！',
          },
        ],
        // 资源类型（1：wgt-android 2：wgt-ios  3：android，4：ios）
        type: [
          {
            required: true,
            message: '请选择类型！',
            trigger: 'change',
          },
        ],
        // 资源状态（0：禁用 1：启用）
        status: [
          {
            required: true,
            message: '请选择资源状态！',
            trigger: 'change',
          },
        ],
        // 下载地址
        url: [
          {
            required: true,
            message: '请上传资源包或填写AppStore地址！',
          },
        ],
      },
      // 上传文件header
      headers: {
        Authorization: `Bearer ${storage.get(ACCESS_TOKEN)}`,
      },
      // 编辑的行数据
      editForm: {},
      // 查看详情条目
      descRecord: {},
      // 编辑表格rules
      editFormRules: {
        // 项目ID
        projectId: [
          {
            required: true,
            type: 'integer',
            message: '请输入正确的项目ID！',
          },
        ],
        // 版本
        version: [{ required: true, type: 'string', message: '请输入版本！' }],
        // 版本号
        versionCode: [
          {
            required: true,
            type: 'integer',
            message: '请输入正确的版本号！',
          },
          {
            type: 'integer',
            min: 1,
            message: '版本号必须大于0！',
          },
        ],
        // 原生版本号
        nativeVersionCode: [
          {
            required: false,
            type: 'integer',
            message: '请输入正确的原生应用版本号！',
          },
          {
            validator: this.handleValideEditNativeVersionCode,
          },
        ],
        // 备注
        remark: [{ required: false, type: 'string', message: '请输入备注！' }],
        // 是否强制更新（0：否 1：是）
        // isForceUpdate: [
        //   {
        //     required: true,
        //     message: '请选择是否强制更新！',
        //   },
        // ],
        // 更新类型（1：用户同意更新，2：强制更新，3：静默更新）
        updateType: [
          {
            required: true,
            message: '请选择更新类型！',
          },
        ],
        // 资源类型（1：wgt-android 2：wgt-ios  3：android，4：ios）
        type: [
          {
            required: true,
            message: '请选择类型！',
            trigger: 'change',
          },
        ],
        // 下载地址
        url: [
          {
            required: true,
            message: '请上传资源包！',
          },
        ],
      },
    }
  },

  watch: {
    'form.type'(newVal, oldVal) {
      if ((oldVal !== 4 && newVal === 4) || oldVal === 4) {
        this.form.url = ''
        this.fileList = []

        // this.$nextTick(() => {
        //   this.$refs?.OSSPartUpload.onClearFile()
        // })

        // this.$nextTick(() => {
        //   this.$refs?.OSSPartUpload.onClearFile()
        // })
        // this.$refs.OSSPartUpload.onCleanFile()
      }

      switch (newVal) {
        case 1:
          if (this.latestAndroidVersionCode) {
            this.form.nativeVersionCode = this.latestAndroidVersionCode
          }
          break
        case 2:
          if (this.latestIosVersionCode) {
            this.form.nativeVersionCode = this.latestIosVersionCode
          }
      }
      // console.log({ newVal })
      // this.form.url = ''
      // this.fileList = []
    },

    sourcesType() {
      this.pagination.pageNum = 1
    },
  },

  methods: {
    // 创建
    async onCreateSource() {
      this.$refs.createForm.validate(async valid => {
        if (valid) {
          this.state.isCreateLoading = true
          const res = await this.$api.createSource(
            Object.assign({}, this.form, {
              nativeVersionCode: [1, 2].includes(this.form.type)
                ? this.form.nativeVersionCode
                : '',
            }),
          )
          if (res.code === 200) {
            this.$notification.success({
              message: '成功',
              description: res.message,
            })
            this.state.isCreateShow = false
            this.state.isCreateLoading = false

            if (this.form.type === Number(this.sourcesType)) {
              // 添加数据
              this.tableData.push(res.data)
            }
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
    async onDelete(record, index) {
      const res = await this.$api.deleteSource({
        id: record.id,
      })

      if (res.code === 200) {
        this.$notification.success({
          message: '成功',
          description: res.message,
        })

        this.tableData.splice(index, 1)
      } else {
        this.$handleError.handleRequestFail(res)
      }
      this.state.isCreateLoading = false
    },

    // 更新
    async onUpdate() {
      this.$refs.editForm.validate(async valid => {
        if (valid) {
          this.state.isEditLoading = true
          const res = await this.$api.updateSource(this.editForm)
          if (res.code === 200) {
            this.$notification.success({
              message: '成功',
              description: res.message,
            })

            this.state.isEditFormShow = false

            this.onGetList()
          } else {
            this.$handleError.handleRequestFail(res)
          }
          this.state.isEditLoading = false
        } else {
          this.state.isEditLoading = false
        }
      })
    },

    // 根据key更新资源开关信息
    async onUpdateSwitch({ checked, record, key, loadingKey }) {
      record[loadingKey] = true
      const res = await this.$api.updateSource({
        id: record.id,
        [key]: checked ? 1 : 0,
      })
      if (res.code === 200) {
        checked ? (record[key] = 1) : (record[key] = 0)
      } else {
        this.$handleError.handleRequestFail(res)
      }
      record[loadingKey] = false
    },

    // 查询
    async onGetList() {
      this.state.isTableLoading = true
      const res = await this.$api.sources({
        id: this.form.projectId,
        type: this.sourcesType,
        pageNum: this.pagination.pageNum,
        pageSize: this.pagination.pageSize,
        sortKey: this.queryParams.sortKey,
        order: this.queryParams.order,
      })
      if (res.code === 200) {
        const records = res.data.records
        for (const item of records) {
          item.isStatusLoading = false
          item.isForceUpdateLoading = false
        }
        this.tableData = records
        this.pagination.total = res.data.total
      } else {
        this.$handleError.handleRequestFail(res)
      }
      this.state.isTableLoading = false
    },

    // 获取最新的原生版本号
    async onGetLatestNativeSource() {
      const res = await this.$api.getLatestNativeSource({
        projectId: this.form.projectId,
      })

      if (res.code === 200) {
        const { android, ios } = res.data
        this.latestAndroidVersionCode = android
        this.latestIosVersionCode = ios
        if (android) {
          this.form.nativeVersionCode = android
        }
      } else {
        this.$handleError.handleRequestFail(res)
      }
    },

    // 新建资源 modal 打开
    async onCreateSourceModelOpen() {
      // 新建资源是否显示
      this.state.isCreateShow = true
      // 验证过期时间
      // this.$nextTick(() => {
      //   this.$refs.OSSPartUpload.handleVerifyExpiration()
      // })
    },

    // 文件上传成功
    onUploadComplete(res) {
      this.form.url = res.name
    },

    // 表格分页改变
    onPageChange(pagination, filters, { order, columnKey }) {
      // console.log({ pagination, filters, sorter: { order, columnKey } })
      // 分页
      this.pagination.pageNum = pagination.current
      this.pagination.current = pagination.current
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

    // tab切换
    onTagChange() {
      this.pagination.pageNum = 1
      this.pagination.current = 1
      this.onGetList()
    },

    // 点击编辑
    onEdit(record) {
      // 合并编辑项
      this.editForm = Object.assign({}, record)
      // 显示编辑modal
      this.state.isEditFormShow = true
    },

    // 点击查看详情
    async onClickViewDesc(record) {
      // 合并项
      this.descRecord = Object.assign({}, record)
      // 创建二维码
      this.descRecord.qrcodeUrl = await this.$util.strToQrcodeBase64(
        record.url,
        {
          colorDark: '#666666',
        },
      )
      // 显示编辑modal
      this.state.isDescShow = true
    },

    // 校验新增原生版本号
    handleValideNativeVersionCode(rule, value, callback) {
      const { type } = this.form
      if (type === 1 || type === 2) {
        if (typeof value !== 'number') {
          callback(new Error('请输入正确的原生版本号！'))
        } else if (value <= 0) {
          callback(new Error('wgt资源的原生版本号必须大于0！'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },

    // 校验编辑原生版本号
    handleValideEditNativeVersionCode(rule, value, callback) {
      const { type } = this.editForm
      if (type === 1 || type === 2) {
        if (typeof value !== 'number') {
          callback(new Error('请输入正确的原生版本号！'))
        } else if (value <= 0) {
          callback(new Error('wgt资源的原生版本号必须大于0！'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    },

    // 格式化表格类型
    handleFormatType(type) {
      if (this.dict.sourcesType[type]) {
        return this.dict.sourcesType[type]
      } else {
        return '未知'
      }
    },
  },

  mounted() {
    // 获取项目id
    this.form.projectId = this.$route.query.id
    // 获取资源列表
    this.onGetList()
    // 获取最新的原生版本号
    this.onGetLatestNativeSource()
  },
}
</script>
