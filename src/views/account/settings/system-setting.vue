<template>
  <a-list itemLayout="horizontal">
    <a-list-item>
      <a-list-item-meta>
        <template v-slot:title>
          <a>是否允许注册</a>
        </template>
        <template v-slot:description>
          <span> 是否开放注册功能 </span>
        </template>
      </a-list-item-meta>
      <template v-slot:actions>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          :defaultChecked="(navTheme === 'dark' && true) || false"
        />
      </template>
    </a-list-item>

    <a-list-item>
      <a-list-item-meta>
        <template v-slot:title>
          <a>登录日志</a>
        </template>
        <template v-slot:description>
          <span> 非管理员是否可以查看登录日志 </span>
        </template>
      </a-list-item-meta>
      <template v-slot:actions>
        <a-switch
          checkedChildren="开"
          unCheckedChildren="关"
          :defaultChecked="(navTheme === 'dark' && true) || false"
        />
      </template>
    </a-list-item>
  </a-list>
</template>
<script>
import { baseMixin } from '@/store/app-mixin'

export default {
  name: 'AccountBasicSystem',
  mixins: [baseMixin],
  data() {
    return {}
  },
  methods: {},
}
</script>
