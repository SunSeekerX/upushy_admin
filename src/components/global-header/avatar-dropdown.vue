<template>
  <a-dropdown v-if="displayName" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar size="small" :src="avatar" class="antd-pro-global-header-index-avatar" />
      <span>{{ displayName }}</span>
    </span>

    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item v-if="menu" key="settings" @click="handleToSettings">
          <a-icon type="setting" />
          账号设置
        </a-menu-item>
        <a-menu-divider v-if="menu" />
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />
          退出登录
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
  <span v-else>
    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />
  </span>
</template>

<script>
import { Modal } from 'ant-design-vue'

import avatar from '@/assets/avatar.png'
import { LOGIN_OUT, RESET_ROUTERS } from '@/store/mutation-types'

export default {
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null,
    },
    menu: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    displayName() {
      if (this.currentUser) {
        return this.currentUser?.nickname || this.currentUser?.username
      }
      return ''
    },
  },
  data() {
    return {
      avatar,
    }
  },
  methods: {
    handleLogout() {
      Modal.confirm({
        title: '提示',
        content: '确定退出登录吗？',
        onOk: () => {
          this.$store.commit(LOGIN_OUT)
          this.$store.commit(RESET_ROUTERS)
          this.$router.push({ path: '/auth/login' })
        },
        onCancel() {},
      })
    },
    handleToSettings () {
      this.$router.push({ path: '/account/settings' })
    },
  },
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  :deep(.action) {
    margin-right: 8px;
  }

  :deep(.ant-dropdown-menu-item) {
    min-width: 160px;
  }
}
</style>
