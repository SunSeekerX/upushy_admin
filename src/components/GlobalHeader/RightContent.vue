<!--
 * @name: 
 * @author: SunSeekerX
 * @Date: 2021-02-09 13:29:18
 * @LastEditors: SunSeekerX
 * @LastEditTime: 2021-09-15 00:19:21
-->
<template>
  <div :class="wrpCls">
    <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" />
  </div>
</template>

<script>
import AvatarDropdown from './AvatarDropdown'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action',
    },
    isMobile: {
      type: Boolean,
      default: () => false,
    },
    topMenu: {
      type: Boolean,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      showMenu: true,
    }
  },
  computed: {
    wrpCls() {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${this.isMobile || !this.topMenu ? 'light' : this.theme}`]: true,
      }
    },
    currentUser() {
      return this.$store.getters.userInfo
    },
  },
}
</script>
