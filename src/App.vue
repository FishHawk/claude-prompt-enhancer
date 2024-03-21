<script setup lang="ts">
import { SettingsOutline } from '@vicons/ionicons5';

import CommandEditor from '@/ui/CommandEditor.vue';

const showCommandEditor = ref(false);

const registClickHandle = () => {
  const root = document.getElementById('cpe-b');
  if (!root) return;
  root.onclick = () => {
    showCommandEditor.value = !showCommandEditor.value;
  };
};

registClickHandle();
</script>

<template>
  <n-icon :component="SettingsOutline" :size="20" />
  <command-editor v-model:show="showCommandEditor" />
</template>
