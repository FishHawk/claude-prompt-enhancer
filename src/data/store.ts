import { PromptCommand } from './model';

interface StoreScheme {
  promptCommands: PromptCommand[];
}

const defaultStore: StoreScheme = {
  promptCommands: [
    {
      command: 'test',
      prompt: "Describe a world where gravity doesn't exist.",
    },
  ],
};

const getStore = () => GM_getValue<StoreScheme>('store', defaultStore);
const setStore = (store: StoreScheme) => GM_setValue('store', store);

let store = getStore();

const getPromptCommands = () => store.promptCommands;
const setPromptCommands = (commands: PromptCommand[]) => {
  store.promptCommands = commands;
  setStore(store);
};

export const Store = {
  getPromptCommands,
  setPromptCommands,
};
