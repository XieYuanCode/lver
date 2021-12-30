<template>
  <div class="key">{{ keyStringLebel }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { FunctionalKey, Key } from '../model/shortcut';
import { isMac } from '../utils/system';

const keyStringLebel = computed(() => {
  switch (props.keyString) {
    case FunctionalKey.Command:
      return '⌘';
    case FunctionalKey.Control:
      return '⌃';
    case FunctionalKey.CommandOrControl:
      return isMac() ? '⌘' : '⌃';
    case FunctionalKey.Alt:
      return '⌥';
    case FunctionalKey.Shift:
      return '⇧';
    case FunctionalKey.Option:
      return '⌥';
    default:
      return props.keyString;
  }
})

type KeyProps = {
  keyString: Key | string
}

const props = defineProps<KeyProps>()
</script>

<style scoped>
.key {
  width: auto;
  min-width: 20px;
  font-size: 12px;
  padding-left: 5px;
  padding-right: 5px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--color-neutral-3);
  border-radius: 3px;
  margin-right: 5px;
}
</style>