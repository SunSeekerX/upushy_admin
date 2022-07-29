<template>
  <pro-layout
    :title="title"
    :menus="menus"
    :collapsed="collapsed"
    :mediaQuery="query"
    :isMobile="isMobile"
    :handleMediaQuery="handleMediaQuery"
    :handleCollapse="handleCollapse"
    :logo="logoRender"
    :i18nRender="i18nRender"
    v-bind="settings"
  >
    <setting-drawer v-if="isDev" :settings="settings" @change="handleSettingChange" />

    <template v-slot:rightContentRender>
      <right-content :top-menu="settings.layout === 'topmenu'" :is-mobile="isMobile" :theme="settings.theme" />
    </template>
    <router-view />
  </pro-layout>
</template>

<script>
import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
import { i18nRender } from '@/locales'
import { mapState } from 'vuex'
import { CONTENT_WIDTH_TYPE, SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types'

import defaultSettings from '@/config/default-settings'
import RightContent from '@/components/global-header/right-content'
import LogoSvg from '../assets/logo.svg?inline'

export default {
  name: 'BasicLayout',
  components: {
    SettingDrawer,
    RightContent,
  },
  data() {
    return {
      // end
      isDev: process.env.NODE_ENV === 'development' || process.env.VUE_APP_PREVIEW === 'true',
      // base
      menus: [],
      // 侧栏收起状态
      collapsed: false,
      title: defaultSettings.title,
      settings: {
        // 布局类型
        layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
        // CONTENT_WIDTH_TYPE
        contentWidth: defaultSettings.layout === 'sidemenu' ? CONTENT_WIDTH_TYPE.Fluid : defaultSettings.contentWidth,
        // 主题 'dark' | 'light'
        theme: defaultSettings.navTheme,
        // 主色调
        primaryColor: defaultSettings.primaryColor,
        fixedHeader: defaultSettings.fixedHeader,
        fixSiderbar: defaultSettings.fixSiderbar,
        colorWeak: defaultSettings.colorWeak,

        hideHintAlert: false,
        hideCopyButton: false,
      },
      // 媒体查询
      query: {},

      // 是否手机模式
      isMobile: false,
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: (state) => state.permission.addRouters,
    }),
  },
  created() {
    const routes = this.mainMenu.find((item) => item.path === '/')
    this.menus = (routes && routes.children) || []
    // 处理侧栏收起状态
    this.$watch('collapsed', () => {
      this.$store.commit(SIDEBAR_TYPE, this.collapsed)
    })
    this.$watch('isMobile', () => {
      this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
    })
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }

    // first update color
    // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
    if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
      updateTheme(this.settings.primaryColor)
    }
  },
  methods: {
    i18nRender,
    handleMediaQuery(val) {
      this.query = val
      if (this.isMobile && !val['screen-xs']) {
        this.isMobile = false
        return
      }
      if (!this.isMobile && val['screen-xs']) {
        this.isMobile = true
        this.collapsed = false
        this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
        // this.settings.fixSiderbar = false
      }
    },
    handleCollapse(val) {
      this.collapsed = val
    },
    handleSettingChange({ type, value }) {
      type && (this.settings[type] = value)
      switch (type) {
        case 'contentWidth':
          this.settings[type] = value
          // this.settings[type] = value === 'Fixed'
          break
        case 'layout':
          if (value === 'sidemenu') {
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fluid
          } else {
            this.settings.fixSiderbar = false
            this.settings.contentWidth = CONTENT_WIDTH_TYPE.Fixed
          }
          break
      }
    },
    logoRender() {
      return <LogoSvg />
    },
  },
}
</script>

<style lang="less">
@import '~ant-design-vue/es/style/themes/default.less';

.ant-pro-global-header-index-right {
  margin-right: 8px;

  &.ant-pro-global-header-index-dark {
    .ant-pro-global-header-index-action {
      color: hsla(0, 0%, 100%, 0.85);

      &:hover {
        background: #1890ff;
      }
    }
  }

  .ant-pro-account-avatar {
    .antd-pro-global-header-index-avatar {
      margin: ~'calc((@{layout-header-height} - 24px) / 2)' 0;
      margin-right: 8px;
      color: @primary-color;
      vertical-align: top;
      background: rgba(255, 255, 255, 0.85);
    }
  }

  .menu {
    .anticon {
      margin-right: 8px;
    }

    .ant-dropdown-menu-item {
      min-width: 100px;
    }
  }
}
</style>
