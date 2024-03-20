<script setup lang="ts">
import { SettingsOutline } from '@vicons/ionicons5';

import CommandEditor from '@/ui/CommandEditor.vue';

const getButtonRight = () => {
  const isChatsPage = window.location.pathname === '/chats';
  return isChatsPage ? '40px' : '110px';
};
const buttonRight = ref(getButtonRight());

const showCommandEditor = ref(false);
</script>

<template>
  <n-button
    secondary
    circle
    style="position: fixed; top: 10px; z-index: 100; width: 44px; height: 44px"
    :style="{ right: buttonRight }"
    @click="showCommandEditor = true"
  >
    <n-icon :component="SettingsOutline" :size="20" />
  </n-button>

  <command-editor v-model:show="showCommandEditor" />
</template>
