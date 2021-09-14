/**
 * @name:
 * @author: SunSeekerX
 * @Date: 2021-02-09 13:29:18
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-09-15 00:04:23
 */

import antdEnUS from 'ant-design-vue/es/locale-provider/en_US'
import momentEU from 'dayjs/locale/eu'

import menu from './en-US/menu'
import setting from './en-US/setting'

const components = {
  antLocale: antdEnUS,
  momentName: 'eu',
  momentLocale: momentEU,
}

const locale = {
  message: '-',
  'menu.home': 'Home',
  'menu.dashboard': 'Dashboard',
  'menu.dashboard.analysis': 'Analysis',
  'menu.dashboard.monitor': 'Monitor',
  'menu.dashboard.workplace': 'Workplace',

  'layouts.usermenu.dialog.title': 'Message',
  'layouts.usermenu.dialog.content': 'Are you sure you would like to logout?',
}

export default {
  ...components,
  ...locale,
  ...menu,
  ...setting,
}
