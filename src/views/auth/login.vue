<template>
  <div class="main">
    <a-form-model class="user-layout-login" ref="loginForm" :model="loginForm" :rules="rules">
      <a-alert
        v-if="isLoginError"
        type="error"
        showIcon
        style="margin-bottom: 24px"
        message="账户或密码错误（admin/ant.design )"
      />

      <a-form-model-item ref="username" prop="username">
        <a-input size="large" type="text" placeholder="用户名" v-model="loginForm.username">
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input>
      </a-form-model-item>

      <a-form-model-item ref="password" prop="password">
        <a-input-password size="large" placeholder="密码" v-model="loginForm.password">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
        </a-input-password>
      </a-form-model-item>

      <a-form-model-item ref="imgCaptcha" prop="imgCaptcha">
        <a-row>
          <a-col :span="14">
            <a-input size="large" :maxLength="4" placeholder="图片验证码" type="text" v-model="loginForm.imgCaptcha" />
          </a-col>

          <a-col :span="10">
            <a-spin :spinning="state.isCaptchaImgLoading">
              <!-- <div @click="onGetCaptchaImg" class="captcha-img" v-html="imgCaptchaUrl"></div> -->
              <img
                class="captcha-img"
                @click="onGetCaptchaImg"
                :src="imgCaptchaUrl"
                height="40"
                @load="state.isCaptchaImgLoading = false"
              />
            </a-spin>
          </a-col>
        </a-row>
      </a-form-model-item>

      <a-form-model-item style="margin-top: 24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          @click="onLogin"
          :loading="state.isLoginBtnLoading"
          :disabled="state.isLoginBtnLoading"
        >
          确定
        </a-button>
      </a-form-model-item>

      <div class="user-login-other">
        <router-link class="register" :to="{ path: '/auth/register' }"> 注册账户 </router-link>
      </div>
    </a-form-model>
  </div>
</template>

<script>
import * as md5 from 'md5'
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'

export default {
  name: 'PageLogin',
  data() {
    return {
      // 登录表单
      loginForm: {
        // 用户名
        username: '',
        // 密码
        password: '',
        // 图片验证码
        imgCaptcha: '',
        // 登录uuidKey
        loginCaptchaKey: '',
      },
      rules: {
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
        password: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'blur',
          },
          {
            min: 6,
            max: 20,
            message: '密码长度为 6 - 20 位',
            trigger: 'blur',
          },
        ],
        imgCaptcha: [
          {
            required: true,
            message: '请输入图片验证码',
            trigger: 'blur',
          },
          {
            len: 4,
            message: '验证码长度为 4 位',
            trigger: 'blur',
          },
        ],
      },
      imgCaptchaUrl: '',
      // login type: 0 email, 1 username, 2 telephone
      isLoginError: false,
      state: {
        isLoginBtnLoading: false,
        isCaptchaImgLoading: true,
      },
    }
  },
  methods: {
    ...mapActions(['Login']),
    // 点击登录
    onLogin() {
      this.state.isLoginBtnLoading = true
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.Login(
            Object.assign({}, this.loginForm, {
              imgCaptcha: this.loginForm.imgCaptcha.toLowerCase(),
              password: md5(`${this.loginForm.password}${process.env.VUE_APP_PASSWORD_SALT}`),
            })
          )
            .then((res) => {
              if (res.statusCode === 200) {
                this.$router.push({ path: '/' })
                // 延迟 1 秒显示欢迎信息
                setTimeout(() => {
                  this.$notification.success({
                    message: '欢迎',
                    description: `${timeFix()}，欢迎回来`,
                  })
                }, 1000)
                this.isLoginError = false
              } else {
                this.isLoginError = true
                this.$handleError.handleRequestFail(res)
              }
            })
            .catch((err) => this.$handleError.handleRequestFail(err))
            .finally(() => {
              this.state.isLoginBtnLoading = false
            })
        } else {
          this.state.isLoginBtnLoading = false
          return false
        }
      })
    },
    // 获取验证码
    async onGetCaptchaImg() {
      this.state.isCaptchaImgLoading = true
      const res = await this.$api.loginCaptchaApi()
      if (res.statusCode === 200) {
        this.imgCaptchaUrl = res.data.img
        this.loginForm.loginCaptchaKey = res.data.uuid
      } else {
        this.$handleError.handleRequestFail(res)
      }
      this.state.isCaptchaImgLoading = false
    },
  },
  created() {
    this.onGetCaptchaImg()
  },
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }

  .captcha-img {
    cursor: pointer;
    width: 120px;
    height: 40px;

    :deep(svg) {
      height: 40px;
    }
  }
}
</style>
