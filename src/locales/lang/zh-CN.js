import antd from 'ant-design-vue/es/locale-provider/zh_CN'
import momentCN from 'dayjs/locale/zh-cn'

import menu from './zh-CN/menu'
import setting from './zh-CN/setting'

const components = {
  antLocale: antd,
  momentName: 'zh-cn',
  momentLocale: momentCN,
}

const locale = {
  message: '-',
  'menu.home': '主页',
  'menu.dashboard': '仪表盘',
  'menu.dashboard.analysis': '分析页',
  'menu.dashboard.monitor': '监控页',
  'menu.dashboard.workplace': '工作台',
}

export default {
  ...components,
  ...locale,
  ...menu,
  ...setting,
}
