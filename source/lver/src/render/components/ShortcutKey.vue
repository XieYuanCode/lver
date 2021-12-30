<template>
  <div class="shortcut-key">
    <key-widget
      :style="{ marginRight: '10px' }"
      v-for="singleFunctionalKey in props.shortcutKey?.functionalKeys"
      :keyString="singleFunctionalKey"
      v-if="props.shortcutKey?.functionalKeys"
    ></key-widget>
    <span v-if="props.shortcutKey?.functionalKeys">+</span>
    <key-widget
      :style="{ marginLeft: '10px' }"
      v-for="singleKey in props.shortcutKey.key"
      :keyString="singleKey"
      v-if="props.shortcutKey?.key && showKey"
    ></key-widget>
    <key-widget
      :keyString="$t('view.setting.shortcut.none_key_tip')"
      v-if="!props.shortcutKey?.key"
    ></key-widget>
    <key-widget :style="{ marginLeft: '10px' }" :keyString="extendString" v-if="extendString"></key-widget>
  </div>
</template>

<script setup lang="ts">
import { IShortcut, KeyPair } from '../store/shortcut';
import KeyWidget from './Key.vue';

type ShortcutKeyProps = {
  shortcutKey: KeyPair | undefined;
  showKey: boolean;
  extendString?: string;
}

const props = defineProps<ShortcutKeyProps>()
</script>

<style scoped>
.shortcut-key {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
</style>