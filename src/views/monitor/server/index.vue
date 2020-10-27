<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-10-27 18:00:49
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-10-27 22:09:10
-->

<template>
  <page-header-wrapper>
    <a-row :gutter="[16, 16]">
      <a-col :span="12">
        <a-card title="CPU" :bordered="false" :loading="isLoading">
          <a-table
            :columns="cpuColumns"
            :data-source="cpuData"
            :pagination="false"
          ></a-table>
        </a-card>
      </a-col>

      <a-col :span="12">
        <a-card title="内存" :bordered="false" :loading="isLoading">
          <a-table
            :columns="memColumns"
            :data-source="memData"
            :pagination="false"
          ></a-table>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[0, 16]">
      <a-col :span="24">
        <a-card title="服务器信息" :bordered="false" :loading="isLoading">
          <a-descriptions :column="2">
            <a-descriptions-item label="服务器名称">
              {{ systemInfo.hostname }}
            </a-descriptions-item>
            <a-descriptions-item label="操作系统">
              {{ systemInfo.type }}
            </a-descriptions-item>
            <a-descriptions-item label="服务器IP">
              {{ systemInfo.ip }}
            </a-descriptions-item>
            <a-descriptions-item label="系统架构">
              {{ systemInfo.arch }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[0, 16]">
      <a-col :span="24">
        <a-card title="V8虚拟机信息" :bordered="false" :loading="isLoading">
          <a-descriptions :column="2">
            <a-descriptions-item label="NodeJS版本">
              {{ v8Info.version }}
            </a-descriptions-item>
            <a-descriptions-item label="启动时间">
              {{ v8Info.uptime }}
            </a-descriptions-item>
            <a-descriptions-item label="运行时长">
              {{ v8Info.runningTime }}
            </a-descriptions-item>
            <a-descriptions-item label="安装路径">
              {{ v8Info.NODE }}
            </a-descriptions-item>
            <a-descriptions-item label="项目路径">
              {{ v8Info.cwd }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[0, 16]">
      <a-col :span="24">
        <a-card title="磁盘状态" :bordered="false" :loading="isLoading">
          <a-table
            :columns="disksColumns"
            :data-source="disksData"
            :pagination="false"
            rowKey="_mounted"
          ></a-table>
        </a-card>
      </a-col>
    </a-row>
  </page-header-wrapper>
</template>

<script>
import { bytesToSize } from '@/utils/index'
export default {
  name: 'MonitorServer',
  
  data() {
    return {
      // Cpu 表头
      cpuColumns: [
        {
          title: '属性',
          dataIndex: 'name',
          key: 'name',
          // scopedSlots: { customRender: 'name' },
        },
        {
          title: '值',
          dataIndex: 'value',
          key: 'age',
          // width: 80,
        },
      ],
      // Cpu 数据
      cpuData: [],
      // 内存表头
      memColumns: [
        {
          title: '属性',
          dataIndex: 'name',
          key: 'name',
          // scopedSlots: { customRender: 'name' },
        },
        {
          title: '内存',
          dataIndex: 'mem',
          key: 'mem',
          // width: 80,
        },
        {
          title: 'V8',
          dataIndex: 'v8',
          key: 'v8',
          // width: 80,
        },
      ],
      // 内存数据
      memData: [
        {
          key: '1',
          name: '总内存',
          mem: '7.6G',
          v8: '1020M',
        },
        {
          key: '2',
          name: '已用内存',
          mem: '7.6G',
          v8: '1020M',
        },
        {
          key: '3',
          name: '剩余内存',
          mem: '7.6G',
          v8: '1020M',
        },
        {
          key: '4',
          name: '使用率',
          mem: '7.6G',
          v8: '1020M',
        },
      ],
      // 服务器信息
      systemInfo: {
        hostname: '',
        type: '',
        ip: '',
        arch: '',
      },
      v8Info: {
        version: '',
        uptime: '',
        runningTime: '',
        NODE: '',
        cwd: '',
      },
      // 磁盘信息表头
      disksColumns: [
        {
          title: '盘符路径',
          dataIndex: '_mounted',
          key: '_mounted',
        },
        {
          title: '文件系统',
          dataIndex: '_filesystem',
          key: '_filesystem',
        },
        // {
        //   title: '盘符类型',
        //   dataIndex: 'path',
        //   key: 'path',
        // },
        {
          title: '总大小',
          dataIndex: '_blocks',
          key: '_blocks',
          customRender(text) {
            return bytesToSize(text)
          },
        },
        {
          title: '可用大小',
          dataIndex: '_available',
          key: '_available',
          customRender(text) {
            return bytesToSize(text)
          },
        },
        {
          title: '已用大小',
          dataIndex: '_used',
          key: '_used',
          customRender(text) {
            return bytesToSize(text)
          },
        },
        {
          title: '已用百分比',
          dataIndex: '_capacity',
          key: '_capacity',
        },
      ],
      // 磁盘信息状态
      disksData: [],
      // 是否正在加载
      isLoading: true,
      // 定时拉取数据
      timer: null,
      // 是否正在执行计时器
      isRunningTimer: false,
    }
  },

  methods: {
    // 获取系统信息
    async onGetSystemConfig() {
      this.isRunningTimer = true
      try {
        // this.isLoading = true
        const res = await this.$api.Common.getSystemConfig()
        if (res.success) {
          // 处理 Cpu 数据
          const {
            cpus,
            totalmem,
            freemem,
            hostname,
            type,
            ip,
            arch,
          } = res.data.os
          let user = 0
          let sys = 0
          let idle = 0
          for (const cpu of cpus) {
            user += cpu.times.user
            sys += cpu.times.sys
            idle += cpu.times.idle
          }
          const total = user + sys + idle
          this.cpuData = [
            {
              key: '1',
              name: '核心数',
              value: cpus.length,
            },
            {
              key: '2',
              name: '用户使用率',
              value: `${((user / total) * 100).toFixed(2)}%`,
            },
            {
              key: '3',
              name: '系统使用率',
              value: `${((sys / total) * 100).toFixed(2)}%`,
            },
            {
              key: '4',
              name: '当前空闲率',
              value: `${((idle / total) * 100).toFixed(2)}%`,
            },
          ]

          // 处理内存数据
          const { v8 } = res.data
          this.memData = [
            {
              key: '1',
              name: '总内存',
              mem: bytesToSize(totalmem),
              v8: bytesToSize(v8.getHeapStatistics.heap_size_limit),
            },
            {
              key: '2',
              name: '已用内存',
              mem: bytesToSize(totalmem - freemem),
              v8: bytesToSize(v8.getHeapStatistics.used_heap_size),
            },
            {
              key: '3',
              name: '剩余内存',
              mem: bytesToSize(freemem),
              v8: bytesToSize(v8.getHeapStatistics.total_available_size),
            },
            {
              key: '4',
              name: '使用率',
              mem: `${(((totalmem - freemem) / totalmem) * 100).toFixed(2)}%`,
              v8: `${(
                (v8.getHeapStatistics.used_heap_size /
                  v8.getHeapStatistics.heap_size_limit) *
                100
              ).toFixed(2)}%`,
            },
          ]

          // 处理服务器信息
          this.systemInfo = {
            hostname,
            type,
            ip,
            arch,
          }

          // 处理 V8 信息
          const { process, serviceTime } = res.data
          const runningInfo = this.$util.secToTime(process.uptime)

          this.v8Info = {
            version: process.versions.node,
            uptime: this.$util.formatTime(serviceTime - process.uptime * 1000),
            runningTime: `${runningInfo.day}天${runningInfo.hour}时${runningInfo.min}分${runningInfo.sec}秒`,
            NODE: process.NODE,
            cwd: process.cwd,
          }

          // 处理磁盘信息
          this.disksData = res.data.disks
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.isLoading && (this.isLoading = false)
        // 执行完毕
        this.isRunningTimer = false
      }
    },

    // Convert Bytes to Human-Readable Format
    bytesToSize(bytes) {
      return bytesToSize(bytes)
    },
  },

  mounted() {
    // 获取系统信息
    this.onGetSystemConfig()
    this.timer = setInterval(() => {
      if(this.isRunningTimer){
        return
      }
      this.onGetSystemConfig()
    }, 3000)
  },

  destroyed() {
    clearInterval(this.timer)
  },
}
</script>
