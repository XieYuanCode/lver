<template>
  <div class="welcome">
    <lver-layout style="height: 100%;">
      <lver-layout-header>
        <lver-steps :current="currentStep">
          <lver-step>{{ $t("view.welcome.steper.welcome_step_label_text") }}</lver-step>
          <lver-step>{{ $t("view.welcome.steper.setting_step_label_text") }}</lver-step>
          <lver-step>{{ $t("view.welcome.steper.login_step_label_text") }}</lver-step>
          <lver-step>{{ $t("view.welcome.steper.finish_step_label_text") }}</lver-step>
        </lver-steps>
      </lver-layout-header>
      <lver-layout-content>
        <div class="welcome-content" v-if="currentStep === 1">
          <div class="welcome-content-hearde">
            <img src="src/render/assets/icon.png" class="lver-logo" />
            <div>
              <h1>Lver</h1>
              <h2>{{ $t("view.welcome.welcome_page.description_1") }}</h2>
              <ul>
                <li>
                  <h3>{{ $t("view.welcome.welcome_page.description_2") }}</h3>
                </li>
                <li>
                  <h3>{{ $t("view.welcome.welcome_page.description_3") }}</h3>
                </li>
                <li>
                  <h3>{{ $t("view.welcome.welcome_page.description_4") }}</h3>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="setting-content" v-if="currentStep === 2">
          <div>
            {{ $t('view.setting.theme.header_text') }}
            <lver-radio-group type="button" size="mini" @change="themeChanged" v-model="theme">
              <lver-radio value="Dark">{{ $t('view.setting.theme.theme.dark') }}</lver-radio>
              <lver-radio value="Light">{{ $t('view.setting.theme.theme.light') }}</lver-radio>
              <lver-radio value="System">{{ $t('view.setting.theme.theme.system') }}</lver-radio>
            </lver-radio-group>
          </div>
          <div style="margin-top: 20px;">
            {{ $t('view.setting.general.language_label_text') }}
            <lver-radio-group
              type="button"
              size="mini"
              @change="languageChanged"
              v-model="language"
            >
              <lver-radio value="ch">
                {{
                  $t("view.setting.general.language.ch")
                }}
              </lver-radio>
              <lver-radio value="en">
                {{
                  $t("view.setting.general.language.en")
                }}
              </lver-radio>
              <lver-radio value="jp">
                {{
                  $t("view.setting.general.language.jp")
                }}
              </lver-radio>
              <lver-radio value="kor">
                {{
                  $t("view.setting.general.language.kor")
                }}
              </lver-radio>
            </lver-radio-group>
          </div>
        </div>
        <div class="login-content" v-if="currentStep === 3">
          <div class="login-box" @click="loginWithGitee" v-if="!store.state.user.logined">
            <img
              src="src/render/assets/gitee_logo.png"
              style="height: 150px; width: 150px; margin-bottom: 30px;"
            />
            <lver-link @click="loginWithGitee">{{ $t('view.setting.account.login.gitee') }}</lver-link>
          </div>
          <div class="login-box" @click="loginWithGithub" v-if="!store.state.user.logined">
            <img
              src="src/render/assets/github_logo.png"
              style="height: 150px; width: 150px; margin-bottom: 30px"
            />
            <lver-link @click="loginWithGithub">{{ $t('view.setting.account.login.github') }}</lver-link>
          </div>
          <div class="login-result" v-if="store.state.user.logined">
            <lver-card
              hoverable
              :style="{
                width: '360px',
                marginBottom: '20px'
              }"
            >
              <div
                :style="{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                
                }"
              >
                <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">
                  <lver-avatar :style="{ marginRight: '8px' }" :size="28">
                    <img alt="avatar" :src="store.state.user.avatar || ''" />
                  </lver-avatar>
                  <lver-typography-text>{{ store.state.user.name }}</lver-typography-text>
                  <lver-typography-text>{{ store.state.user.type === LoginType.Gitee ? "(Gitee)" : "(Github)" }}</lver-typography-text>
                </span>
                <div>
                  <lver-link @click="cancelAuth">{{ $t('view.setting.account.cancel_auth_text') }}</lver-link>
                  <lver-link @click="logout">{{ $t('view.setting.account.logout_text') }}</lver-link>
                </div>
              </div>
            </lver-card>
          </div>
        </div>
        <div class="finish-content" v-if="currentStep === 4">
          <lver-result status="success" :title="$t('view.welcome.finish_page.title')">
            <template #subtitle>{{ $t('view.welcome.finish_page.subtitle') }}</template>
            <template #extra>
              <lver-button
                type="primary"
                size="mini"
                @click="gotoHomePage"
              >{{ $t('view.welcome.bottom_button.finish_button_text') }}</lver-button>
            </template>
          </lver-result>
        </div>
      </lver-layout-content>
      <lver-layout-footer class="welcome-footer">
        <lver-button type="primary" size="mini" @click="prevStep" :disabled="currentStep < 2">
          <icon-left />
          {{ $t("view.welcome.bottom_button.prev_button_text") }}
        </lver-button>
        <lver-button
          type="primary"
          size="mini"
          @click="nextStep"
          :style="{ marginLeft: '20px' }"
          v-if="currentStep < 4"
        >
          {{ $t("view.welcome.bottom_button.next_button_text") }}
          <icon-right />
        </lver-button>
        <lver-button
          v-else
          type="primary"
          size="mini"
          @click="gotoHomePage"
          :style="{ marginLeft: '20px' }"
        >
          {{ $t("view.welcome.bottom_button.finish_button_text") }}
          <icon-right />
        </lver-button>
      </lver-layout-footer>
    </lver-layout>
  </div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, ref } from 'vue';
import { useStore } from "../store"
import { useI18n } from "vue-i18n"
import { useRouter } from 'vue-router';
import { LoginType } from '../store/user';


const { shell } = require('electron');

const store = useStore()
const { t } = useI18n()
const router = useRouter()
const internalInstance = getCurrentInstance()

const currentStep = ref(1)
const prevStep = () => currentStep.value--
const nextStep = () => currentStep.value++
const isLogging = ref(false)

const themeChanged = (e: string) => { store.commit("switchTheme", e) }
const languageChanged = (e: string) => { store.commit("switchLanguage", e) }
const theme = ref(store.state.appearance.theme);
const language = ref(store.state.appearance.theme);

const logout = () => {
  store.commit('logout')
  internalInstance && internalInstance.appContext.config.globalProperties.$message.success(t("view.setting.account.logout_success_tip"))
}

// 取消授权
const cancelAuth = () => {
  const cancelAuthUrl = store.state.user.type === LoginType.Github ? "https://github.com/settings/connections/applications/14d1f9d8eaf6722537d1" : "https://gitee.com/oauth/applications/13616/authorized_application"
  shell.openExternal(cancelAuthUrl)
  logout()
}

/**
 * github登陆
 */
const loginWithGithub = async () => {
  isLogging.value = true
  try {
    shell.openExternal('https://github.com/login/oauth/authorize?client_id=14d1f9d8eaf6722537d1&redirect_uri=http://81.70.22.185:3001/login/github_redirect')
    const response = await fetch(`http://81.70.22.185:3001/login/github`)
    const loginResult = await response.json()
    if (loginResult.error && loginResult.error_description) {
      internalInstance && internalInstance.appContext.config.globalProperties.$message.error(loginResult.error_description)
    } else if (loginResult.success) {
      store.commit('login', {
        type: LoginType.Github,
        name: loginResult.login,
        avatar: loginResult.avatar_url,
        html_url: loginResult.html_url,
        bio: loginResult.bio,
        blog: loginResult.blog,
      })
      internalInstance && internalInstance.appContext.config.globalProperties.$message.success(t("view.setting.account.login_success_tip"))
    } else {
      internalInstance && internalInstance.appContext.config.globalProperties.$message.error(t("view.setting.account.login_failed_tip"))
    }
  } catch (error) {
    internalInstance && internalInstance.appContext.config.globalProperties.$message.error(t("view.setting.account.login_failed_tip"))
  } finally {
    isLogging.value = false
  }
}

/**
 * gitee登录
 */
const loginWithGitee = async () => {
  isLogging.value = true
  try {
    shell.openExternal('https://gitee.com/oauth/authorize?client_id=1592815aa8a6d503cd041d93e6273d16f32664f85507d8b1510e43e875b473f3&redirect_uri=http://81.70.22.185:3001/login/gitee_redirect&response_type=code')
    const response = await fetch(`http://81.70.22.185:3001/login/gitee`)
    const loginResult = await response.json()
    if (loginResult.error && loginResult.error_description) {
      internalInstance && internalInstance.appContext.config.globalProperties.$message.error(loginResult.error_description)
    } else if (loginResult.success) {
      store.commit('login', {
        type: LoginType.Gitee,
        name: loginResult.name,
        avatar: loginResult.avatar_url,
        html_url: loginResult.html_url,
        bio: loginResult.bio,
        blog: loginResult.blog,
      })
      internalInstance && internalInstance.appContext.config.globalProperties.$message.success(t("view.setting.account.login_success_tip"))
    } else {
      internalInstance && internalInstance.appContext.config.globalProperties.$message.error(t("view.setting.account.login_failed_tip"))
    }
  } catch (error) {
    internalInstance && internalInstance.appContext.config.globalProperties.$message.error(t("view.setting.account.login_failed_tip"))
  } finally {
    isLogging.value = false
  }
}

const gotoHomePage = () => {
  router.push('/home')
}

</script>

<style scoped>
.welcome {
  user-select: none;
  height: calc(100% - 80px);
  padding: 40px 20px;
}

.welcome {
  background-color: var(--color-neutral-2);
  color: var(--color-text-2);
}

.welcome-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.finish-content {
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.welcome-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.setting-content {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.welcome-content-hearde {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lver-logo {
  width: 200px;
  height: 200px;
}

.login-content {
  height: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.login-box {
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.login-box:hover {
  background-color: var(--color-neutral-3);
  box-shadow: inset 0 0 5px 2px var(--color-neutral-5);
  box-shadow: 0 0 5px 2px var(--color-neutral-5);
}

.login-result {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>