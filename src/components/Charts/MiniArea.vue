<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2021-04-26 00:46:14
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-09-15 00:03:45
-->
<template>
  <div class="antv-chart-mini">
    <div class="chart-wrapper" :style="{ height: 46 }">
      <v-chart :force-fit="true" :height="height" :data="data" :padding="[36, 0, 18, 0]">
        <v-tooltip />
        <v-smooth-area position="x*y" />
      </v-chart>
    </div>
  </div>
</template>

<script>
import dayjs from 'dayjs'
const data = []
const beginDay = new Date().getTime()

for (let i = 0; i < 10; i++) {
  data.push({
    x: dayjs(new Date(beginDay + 1000 * 60 * 60 * 24 * i)).format('YYYY-MM-DD'),
    y: Math.round(Math.random() * 10),
  })
}

const tooltip = [
  'x*y',
  (x, y) => ({
    name: x,
    value: y,
  }),
]
const scale = [
  {
    dataKey: 'x',
    min: 2,
  },
  {
    dataKey: 'y',
    title: '时间',
    min: 1,
    max: 22,
  },
]

export default {
  name: 'MiniArea',
  data() {
    return {
      data,
      tooltip,
      scale,
      height: 100,
    }
  },
}
</script>

<style lang="less" scoped>
@import 'chart';
</style>
