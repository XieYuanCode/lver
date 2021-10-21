<template>
  <n-card :title="$t('view.dialog.new_log_rule.title')" :bordered="false" size="huge">
    <n-card hoverable>
      <n-space justify="center" v-if="!pastedString">
        <n-gradient-text
          class="create-rule-placrhole-text"
          :gradient="{
            from: 'rgb(85, 85, 85)',
            to: 'rgb(170, 170, 170)',
          }"
          >{{$t("view.dialog.new_log_rule.create_rule_placrhole_text_press")}}
        </n-gradient-text>
        <n-gradient-text
          class="create-rule-placrhole-text"
          :gradient="commandTextGradient"
        >
          ctrl(command)
        </n-gradient-text>
        <n-gradient-text
          class="create-rule-placrhole-text"
          :gradient="{
            from: 'rgb(85, 85, 85)',
            to: 'rgb(170, 170, 170)',
          }"
        >
          +
        </n-gradient-text>
        <n-gradient-text
          class="create-rule-placrhole-text"
          :gradient="vTextGradient"
        >
          v
        </n-gradient-text>
        <n-gradient-text
          class="create-rule-placrhole-text"
          :gradient="{
            from: 'rgb(85, 85, 85)',
            to: 'rgb(170, 170, 170)',
          }"
        >
          {{$t("view.dialog.new_log_rule.create_rule_placrhole_text_left")}}
        </n-gradient-text>
      </n-space>
      <n-space justify="center" v-else class="create-rule-text-box">
        <n-gradient-text
          class="create-rule-text"
          :gradient="{
            from: 'rgb(85, 85, 85)',
            to: 'rgb(170, 170, 170)',
          }"
          >{{ pastedString }}
        </n-gradient-text>
      </n-space>
    </n-card>

    <template #footer>
      <n-space justify="end">
        <n-button>commit</n-button>
      </n-space>
    </template>
  </n-card>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, reactive, ref } from "vue";

const pastedString = ref<string>("");
let isCommandKeyDown: boolean = false;

const commandTextGradient = reactive({
  from: "rgb(85, 85, 85)",
  to: "rgb(170, 170, 170)",
});
const vTextGradient = reactive({
  from: "rgb(85, 85, 85)",
  to: "rgb(170, 170, 170)",
});

const keydownEventHandler = (e: KeyboardEvent) => {
  switch (e.code) {
    case "MetaLeft":
      isCommandKeyDown = true;
      commandTextGradient.from = "rgb(46, 146, 88)";
      commandTextGradient.to = "rgb(69, 255, 32)";
      break;
    case "KeyV":
      vTextGradient.from = "rgb(46, 146, 88)";
      vTextGradient.to = "rgb(69, 255, 32)";
      if (isCommandKeyDown) {
        navigator.clipboard.readText().then((text) => {
          pastedString.value = text
            .trim()
            .replace("\n", "")
            .replace("\r\n", "");
        });
      }
      break;
  }
};
const keyupEventHandler = (e: KeyboardEvent) => {
  switch (e.code) {
    case "MetaLeft":
      isCommandKeyDown = false;
      commandTextGradient.from = "rgb(85, 85, 85)";
      commandTextGradient.to = "rgb(170, 170, 170)";
      break;
    case "KeyV":
      vTextGradient.from = "rgb(85, 85, 85)";
      vTextGradient.to = "rgb(170, 170, 170)";
      break;
  }
};

onMounted(() => {
  document.addEventListener("keydown", keydownEventHandler);
  document.addEventListener("keyup", keyupEventHandler);
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', keydownEventHandler)
  document.removeEventListener('keyup', keyupEventHandler)
});
</script>

<style scoped>
.create-rule-placrhole-text,
.create-rule-text {
  font-size: 25px;
}

.create-rule-placrhole-text{
  user-select: none;
}

/*选中的是蓝色背景，白色的字体的段落*/
.create-rule-text::selection {
  color: white;
  background-color: gray;
  text-decoration: green wavy underline;
}
.create-rule-text-box {
  overflow-x: scroll;
}
.create-rule-text-selected {
  color: red;
}
</style>