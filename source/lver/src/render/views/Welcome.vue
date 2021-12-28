<template>
  <div class="welcome">
    <lver-layout style="height: 100%;">
      <lver-layout-header>
        <lver-steps :current="currentStep">
          <lver-step>{{ $t("view.welcome.steper.welcome_step_label_text") }}</lver-step>
          <lver-step>{{ $t("view.welcome.steper.login_step_label_text") }}</lver-step>
          <lver-step>{{ $t("view.welcome.steper.setting_step_label_text") }}</lver-step>
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
        <div class="login-content" v-if="currentStep === 2">login</div>
        <div class="setting-content" v-if="currentStep === 3">
          {{ $t('view.setting.theme.header_text') }}
          <lver-radio-group type="button" size="mini" @change="themeChanged" v-model="theme">
            <lver-radio value="Dark">{{ $t('view.setting.theme.theme.dark') }}</lver-radio>
            <lver-radio value="Light">{{ $t('view.setting.theme.theme.light') }}</lver-radio>
            <lver-radio value="System">{{ $t('view.setting.theme.theme.system') }}</lver-radio>
          </lver-radio-group>
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
import { ref } from 'vue';
import { useStore } from "../store"
import { useI18n } from "vue-i18n"
import { useRouter } from 'vue-router';

const store = useStore()
const { t } = useI18n()
const router = useRouter()

const currentStep = ref(1)
const prevStep = () => currentStep.value--
const nextStep = () => currentStep.value++
const themeChanged = (e: string) => { store.commit("switchTheme", e) }
const theme = ref(store.state.appearance.theme);

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
  background-color: var(--color-bg-2);
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

.welcome-content-hearde {
  display: flex;
  justify-content: center;
  align-items: center;
}

.lver-logo {
  width: 200px;
  height: 200px;
}
</style>