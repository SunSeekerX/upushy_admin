<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2020-07-27 09:56:07
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2020-08-04 09:16:22
--> 
<template>
  <a-dropdown v-if="currentUser && currentUser.nickname" placement="bottomRight">
    <span class="ant-pro-account-avatar">
      <a-avatar
        size="small"
        src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
        class="antd-pro-global-header-index-avatar"
      />
      <span>{{ currentUser.nickname }}</span>
    </span>

    <template v-slot:overlay>
      <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
        <a-menu-item key="logout" @click="handleLogout">
          <a-icon type="logout" />退出登录
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
  methods: {
    handleLogout(e) {
      Modal.confirm({
        title: '提示',
        content: '确定退出登录吗？',
        onOk: () => {
          this.$store.commit('LOGIN_OUT')
          
          this.$store.commit('RESET_ROUTER')

          this.$router.push({ name: 'login' })
        },
        onCancel() {},
      })
    },
  },
}
</script>

<style lang="less" scoped>
.ant-pro-drop-down {
  /deep/ .action {
    margin-right: 8px;
  }
  /deep/ .ant-dropdown-menu-item {
    min-width: 160px;
  }
}
</style>
