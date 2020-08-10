<template>
  <div class="main user-layout-register">
    <h3>
      <span>注册</span>
    </h3>

    <!-- <a-form ref="formRegister" :form="form" id="formRegister">
      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="昵称"
          v-decorator="[
            'nickname',
            {
              rules: [
                { required: true, type: 'string', message: '请输入昵称' },
              ],
              validateTrigger: ['change', 'blur'],
            },
          ]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="账号"
          v-decorator="[
            'username',
            {
              rules: [
                { required: true, type: 'string', message: '请输入账号' },
              ],
              validateTrigger: ['change', 'blur'],
            },
          ]"
        ></a-input>
      </a-form-item>

      <a-form-item>
        <a-input
          size="large"
          type="text"
          placeholder="邮箱"
          v-decorator="[
            'email',
            {
              rules: [
                { required: true, type: 'email', message: '请输入邮箱地址' },
              ],
              validateTrigger: ['change', 'blur'],
            },
          ]"
        ></a-input>
      </a-form-item>

      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="trigger => trigger.parentElement"
        v-model="state.passwordLevelChecked"
      >
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              强度：
              <span>{{ passwordLevelName }}</span>
            </div>
            <a-progress
              :percent="state.percent"
              :showInfo="false"
              :strokeColor="passwordLevelColor"
            />
            <div style="margin-top: 10px;">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>
        <a-form-item>
          <a-input-password
            size="large"
            @click="handlePasswordInputClick"
            placeholder="至少6位密码，区分大小写"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '至少6位密码，区分大小写' },
                  { validator: this.handlePasswordLevel },
                ],
                validateTrigger: ['change', 'blur'],
              },
            ]"
          ></a-input-password>
        </a-form-item>
      </a-popover>

      <a-form-item>
        <a-input-password
          size="large"
          placeholder="确认密码"
          v-decorator="[
            'password2',
            {
              rules: [
                { required: true, message: '至少6位密码，区分大小写' },
                { validator: this.handlePasswordCheck },
              ],
              validateTrigger: ['change', 'blur'],
            },
          ]"
        ></a-input-password>
      </a-form-item>

      <a-form-item>
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          :loading="state.isRegisterBtnLoading"
          @click.stop.prevent="handleSubmit"
          :disabled="state.isRegisterBtnLoading"
        >注册</a-button>
        <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
      </a-form-item>
    </a-form>-->

    <!-- 注册表单 -->
    <a-form-model ref="registerForm" :model="form" :rules="rules">
      <a-form-model-item ref="nickname" prop="nickname">
        <a-input size="large" type="text" placeholder="昵称" v-model="form.nickname"></a-input>
      </a-form-model-item>

      <a-form-model-item ref="username" prop="username">
        <a-input size="large" type="text" placeholder="账号" v-model="form.username"></a-input>
      </a-form-model-item>

      <a-form-model-item ref="email" prop="email">
        <a-input size="large" type="text" placeholder="邮箱" v-model="form.email"></a-input>
      </a-form-model-item>

      <a-popover
        placement="rightTop"
        :trigger="['focus']"
        :getPopupContainer="trigger => trigger.parentElement"
        v-model="state.passwordLevelChecked"
      >
        <template slot="content">
          <div :style="{ width: '240px' }">
            <div :class="['user-register', passwordLevelClass]">
              强度：
              <span>{{ passwordLevelName }}</span>
            </div>

            <a-progress
              :percent="state.percent"
              :showInfo="false"
              :strokeColor="passwordLevelColor"
            />
            <div style="margin-top: 10px;">
              <span>请至少输入 6 个字符。请不要使用容易被猜到的密码。</span>
            </div>
          </div>
        </template>

        <a-form-model-item ref="password" prop="password">
          <a-input-password
            @click="handlePasswordInputClick"
            size="large"
            placeholder="至少6位密码，区分大小写"
            v-model="form.password"
          ></a-input-password>
        </a-form-model-item>

        <!-- <a-form-item>
          <a-input-password
            size="large"
            @click="handlePasswordInputClick"
            placeholder="至少6位密码，区分大小写"
            v-decorator="[
              'password',
              {
                rules: [
                  { required: true, message: '至少6位密码，区分大小写' },
                  { validator: this.handlePasswordLevel },
                ],
                validateTrigger: ['change', 'blur'],
              },
            ]"
          ></a-input-password>
        </a-form-item>-->
      </a-popover>

      <a-form-model-item ref="password2" prop="password2">
        <a-input-password size="large" placeholder="确认密码" v-model="form.password2"></a-input-password>
      </a-form-model-item>

      <a-form-model-item ref="imgCaptcha" prop="imgCaptcha">
        <a-row>
          <a-col :span="14">
            <a-input
              size="large"
              :maxLength="4"
              placeholder="图片验证码"
              type="text"
              v-model="form.imgCaptcha"
            />
          </a-col>

          <a-col :span="10">
            <a-spin :spinning="state.isCaptchaImgLoading">
              <div @click="onGetCaptchaImg" class="captcha-img" v-html="imgCaptchaUrl"></div>
              <!-- <img
                class="captcha-img"
                @click="onGetCaptchaImg"
                :src="imgCaptchaUrl"
                height="40"
                @load="state.isCaptchaImgLoading = false"
              />-->
            </a-spin>
          </a-col>
        </a-row>
      </a-form-model-item>

      <a-form-model-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="register-button"
          @click="onRegister"
          :loading="state.isRegisterBtnLoading"
          :disabled="state.isRegisterBtnLoading"
        >确定</a-button>

        <router-link class="login" :to="{ name: 'login' }">使用已有账户登录</router-link>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { deviceMixin } from '@/utils/mixin/device-mixin'

const levelNames = {
  0: '低',
  1: '低',
  2: '中',
  3: '强',
}
const levelClass = {
  0: 'error',
  1: 'error',
  2: 'warning',
  3: 'success',
}
const levelColor = {
  0: '#ff0000',
  1: '#ff0000',
  2: '#ff7e05',
  3: '#52c41a',
}

export default {
  name: 'Register',

  mixins: [deviceMixin],

  data() {
    return {
      // form: this.$form.createForm(this),

      form: {
        // 昵称
        nickname: '',
        // 账号
        username: '',
        // 邮箱
        email: '',
        // 密码
        password: '',
        // 确认密码
        password2: '',
        // 图片验证码
        imgCaptcha: '',
        // 登录uuidKey
        imgCaptchaKey: '',
      },

      rules: {
        // 昵称
        nickname: [{ required: true, message: '请输入昵称', trigger: 'blur' }],
        // 账号
        // username: [{ required: true, type: 'string', message: '请输入账号' }],
        username: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur',
          },
          {
            min: 1,
            max: 20,
            message: 'Length should be 1 to 20',
            trigger: 'blur',
          },
        ],
        // 邮箱
        email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' }],
        // 密码
        password: [{ required: true, message: '至少6位密码，区分大小写', trigger: 'blur' }, { validator: this.handlePasswordLevel }],
        // 确认密码
        password2: [{ required: true, message: '至少6位密码，区分大小写', trigger: 'blur' }, { validator: this.handlePasswordCheck }],
        // 图片验证码
        imgCaptcha: [
          {
            required: true,
            message: '请输入图片验证码',
            trigger: 'blur',
          },
          {
            len: 4,
            message: 'Length should 4',
            trigger: 'blur',
          },
        ],
      },

      state: {
        time: 60,
        smsSendBtn: false,
        passwordLevel: 0,
        passwordLevelChecked: false,
        percent: 10,
        progressColor: '#FF0000',

        isRegisterBtnLoading: false,
        // 图片验证码是否加载
        isCaptchaImgLoading: true,
      },
      // 图片验证码
      imgCaptchaUrl: '',
    }
  },

  computed: {
    passwordLevelClass() {
      return levelClass[this.state.passwordLevel]
    },
    passwordLevelName() {
      return levelNames[this.state.passwordLevel]
    },
    passwordLevelColor() {
      return levelColor[this.state.passwordLevel]
    },
  },

  methods: {
    handlePasswordLevel(rule, value, callback) {
      let level = 0

      // 判断这个字符串中有没有数字
      if (/[0-9]/.test(value)) {
        level++
      }
      // 判断字符串中有没有字母
      if (/[a-zA-Z]/.test(value)) {
        level++
      }
      // 判断字符串中有没有特殊符号
      if (/[^0-9a-zA-Z_]/.test(value)) {
        level++
      }
      this.state.passwordLevel = level
      this.state.percent = level * 30
      if (level >= 1) {
        if (level >= 3) {
          this.state.percent = 100
        }
        callback()
      } else {
        if (level === 0) {
          this.state.percent = 10
        }
        callback(new Error('密码强度不够'))
      }
    },

    handlePasswordCheck(rule, value, callback) {
      // const password = this.form.getFieldValue('password')
      const { password } = this.form
      if (value === undefined) {
        callback(new Error('请输入密码'))
      }
      if (value && password && value.trim() !== password.trim()) {
        callback(new Error('两次密码不一致'))
      }
      callback()
    },

    handlePasswordInputClick() {
      if (!this.isMobile) {
        this.state.passwordLevelChecked = true
        return
      }
      this.state.passwordLevelChecked = false
    },

    // 获取验证码
    async onGetCaptchaImg() {
      this.state.isCaptchaImgLoading = true

      try {
        const res = await this.$api.Auth.registerCaptcha()
        if (res.success) {
          this.imgCaptchaUrl = res.data.img
          this.form.imgCaptchaKey = res.data.uuid
        } else {
          this.$handleError.handleRequestFail(res.message)
        }
      } catch (error) {
        this.$handleError.handleApiRequestException(error)
      } finally {
        this.state.isCaptchaImgLoading = false
      }
    },

    // 注册
    async onRegister() {
      this.state.isRegisterBtnLoading = true

      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$api.Auth.register(
            Object.assign({}, this.form, {
              imgCaptcha: this.form.imgCaptcha.toLowerCase(),
              password: this.$util.md5(this.form.password),
            }),
          )
            .then(res => {
              if (res.success) {
                this.$notification.success({
                  message: '成功',
                  description: res.message,
                })
              } else {
                this.$handleError.handleRequestFail(res.message)
              }
            })
            .catch(err => this.$handleError.handleApiRequestException(err))
            .finally(() => {
              this.state.isRegisterBtnLoading = false
            })
        } else {
          this.state.isRegisterBtnLoading = false
          return false
        }
      })
    },
  },

  created() {
    this.onGetCaptchaImg()
  },
}
</script>

<style lang="less">
.user-register {
  &.error {
    color: #ff0000;
  }

  &.warning {
    color: #ff7e05;
  }

  &.success {
    color: #52c41a;
  }
}

.user-layout-register {
  .ant-input-group-addon:first-child {
    background-color: #fff;
  }
}
</style>

<style lang="less" scoped>
.user-layout-register {
  & > h3 {
    font-size: 16px;
    margin-bottom: 20px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .register-button {
    width: 50%;
  }

  .login {
    float: right;
    line-height: 40px;
  }

  .captcha-img {
    cursor: pointer;
    width: 120px;
    height: 40px;
    ::v-deep svg {
      height: 40px;
    }
  }
}
</style>
