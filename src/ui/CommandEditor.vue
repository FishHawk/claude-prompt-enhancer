<script setup lang="ts">
import { TrashOutline } from '@vicons/ionicons5';
import { FormInst, FormItemRule, FormRules } from 'naive-ui';

import { Store } from '@/data/store';

const promptCommands = ref([...Store.getPromptCommands()]);

const formRef = ref<FormInst>();
const model = ref({ command: '', prompt: '' });
const rules: FormRules = {
  command: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        value = value.trim();
        if (value[0] === '/') {
          value = value.substring(1);
        }
        if (value.length === 0) {
          return new Error('Command should not be empty');
        } else if (value.includes(' ')) {
          return new Error('Command should not contain space');
        } else if (
          promptCommands.value.findIndex((it) => it.command === value) !== -1
        ) {
          return new Error('Command already exist');
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
  ],
  prompt: [
    {
      required: true,
      validator(_rule: FormItemRule, value: string) {
        value = value.trim();
        if (value.length === 0) {
          return new Error('Prompt should not be empty');
        }
        return true;
      },
      trigger: ['input', 'blur'],
    },
  ],
};

const addCommand = async (command: string, prompt: string) => {
  await formRef.value?.validate();
  command = command.trim();
  if (command[0] === '/') {
    command = command.substring(1);
  }
  prompt = prompt.trimStart();
  promptCommands.value.push({ command, prompt });
  Store.setPromptCommands(promptCommands.value);
};

const deleteCommand = (command: string) => {
  promptCommands.value = promptCommands.value.filter(
    (it) => it.command !== command
  );
  Store.setPromptCommands(promptCommands.value);
};
</script>

<template>
  <n-drawer :width="500" placement="right" :auto-focus="false">
    <n-drawer-content title="Prompt Commands">
      <n-form ref="formRef" :model="model" :rules="rules" :show-label="false">
        <n-form-item path="command">
          <n-input-group>
            <n-input-group-label>/</n-input-group-label>
            <n-input
              v-model:value="model.command"
              placeholder="Command"
              :input-props="{ spellcheck: false }"
            />
          </n-input-group>
        </n-form-item>
        <n-form-item path="prompt">
          <n-input
            v-model:value="model.prompt"
            placeholder="Prompt"
            :input-props="{ spellcheck: false }"
            type="textarea"
            autosize
            show-count
          />
        </n-form-item>
      </n-form>

      <div>
        <n-button @click="addCommand(model.command, model.prompt)">
          Add
        </n-button>
      </div>

      <n-divider />

      <n-list>
        <n-list-item v-for="pc in promptCommands">
          <n-flex justify="space-between">
            <b>/{{ pc.command }}</b>

            <n-button
              secondary
              type="error"
              size="small"
              @click="deleteCommand(pc.command)"
            >
              <template #icon>
                <n-icon :component="TrashOutline" />
              </template>
            </n-button>
          </n-flex>
          <span style="white-space: pre-wrap">{{ pc.prompt }}</span>
        </n-list-item>
      </n-list>
    </n-drawer-content>
  </n-drawer>
</template>
