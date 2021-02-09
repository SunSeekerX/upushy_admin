<template>
  <div>
    <a-row :gutter="24">
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card
          :loading="loading"
          title="更新数"
          :total="8846 | NumberFormat"
        >
          <!-- <a-tooltip title="123123123" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <div>
            <mini-area />
          </div>
          <template slot="footer">
            今日日更新次数
            <span>{{ '1234' | NumberFormat }}</span>
          </template>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card
          :loading="loading"
          title="更新数"
          :total="8846 | NumberFormat"
        >
          <!-- <a-tooltip title="123123123" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <div>
            <mini-area />
          </div>
          <template slot="footer">
            今日日更新次数
            <span>{{ '1234' | NumberFormat }}</span>
          </template>
        </chart-card>
      </a-col>

      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card
          :loading="loading"
          title="设备数"
          :total="6560 | NumberFormat"
        >
          <!-- <a-tooltip :title="$t('dashboard.analysis.introduce')" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <div>
            <mini-bar />
          </div>
          <template slot="footer">
            今日新增设备数
            <span>19</span>
          </template>
        </chart-card>
      </a-col>
      <a-col :sm="24" :md="12" :xl="6" :style="{ marginBottom: '24px' }">
        <chart-card
          :loading="loading"
          title="更新数"
          :total="8846 | NumberFormat"
        >
          <!-- <a-tooltip title="123123123" slot="action">
            <a-icon type="info-circle-o" />
          </a-tooltip> -->
          <div>
            <mini-area />
          </div>
          <template slot="footer">
            今日日更新次数
            <span>{{ '1234' | NumberFormat }}</span>
          </template>
        </chart-card>
      </a-col>
    </a-row>

    <a-card :loading="loading" :bordered="false" :body-style="{ padding: '0' }">
      <div class="salesCard">
        <a-tabs
          default-active-key="1"
          size="large"
          :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }"
        >
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <a>今天</a>
              <a>当周</a>
              <a>当月</a>
              <a>今年</a>
            </div>
            <a-range-picker :style="{ width: '256px' }" />
          </div>
          <a-tab-pane loading="true" tab="卖出" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="barData" title="趋势" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="趋势" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="访问者" key="2">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="barData2" title="访问趋势" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="访问排行" :list="rankList" />
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>

    
  </div>
</template>

<script>
import {
  ChartCard,
  MiniArea,
  MiniBar,
  // MiniProgress,
  RankList,
  Bar,
  Trend,
  // NumberInfo,
  // MiniSmoothArea
} from '@/components'

const barData = []
const barData2 = []
for (let i = 0; i < 12; i += 1) {
  barData.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  })
  barData2.push({
    x: `${i + 1}月`,
    y: Math.floor(Math.random() * 1000) + 200,
  })
}

const rankList = []
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: '白鹭岛 ' + (i + 1) + ' 号店',
    total: 1234.56 - i * 100,
  })
}

export default {
  name: 'Charts',
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    RankList,
    Bar,
    Trend,
  },
  data() {
    return {
      loading: true,

      rankList,

      barData,
      barData2,
    }
  },
  created() {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
}
</script>

<style lang="less" scoped>
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}
</style>
