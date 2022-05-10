import Vue from 'vue'
import VueI18n from 'vue-i18n'

import enUS from './lang/en-US'
import zhCN from './lang/zh-CN'

Vue.use(VueI18n)

const defaultLang = 'zh-CN'

const messages = {
  'en-US': enUS,
  'zh-CN': zhCN,
}

const i18n = new VueI18n({
  silentTranslationWarn: true,
  locale: defaultLang,
  fallbackLocale: defaultLang,
  messages,
})

export function i18nRender(key) {
  return i18n.t(`${key}`)
}

export default i18n
