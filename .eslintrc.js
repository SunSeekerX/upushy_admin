/**
 * Vue eslint 配置
 * @author: SunSeekerX
 * @Date: 2020-04-18 11:43:35
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-09-14 23:44:56
 * "off" 或 0 - 关闭规则
 * "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
 * "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)
 */

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    node: true,
  },
  extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],
  rules: {
    'no-console': 1,
    'no-debugger': 2,
    'prettier/prettier': 0,
    'no-case-declarations': 0,
  },
}
