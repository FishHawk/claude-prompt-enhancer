import { App, createApp } from 'vue';

import SettingIcon from '@/App.vue';
import { CommandService } from '@/data/command';
import { repeat } from '@/util';

CommandService.observeUserInput();

const apps: Record<string, App<Element>> = {};
const mountApp = (id: string, app: App<Element>) => {
  apps[id]?.unmount();
  apps[id] = app;
  return app.mount('#' + id);
};

const addButtonToHeader = () => {
  const id = 'cpe-b';
  if (document.getElementById(id)) return;

  const target = document
    .getElementsByClassName('fixed top-2.5 z-10')
    .item(0)
    ?.getElementsByTagName('button')
    ?.item(0)?.parentElement;
  if (!target) return;

  const classes =
    'inline-flex items-center justify-center relative ring-offset-2 ring-offset-bg-300 ring-accent-main-100 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none text-text-200 transition-all font-styrene active:bg-bg-400 hover:bg-bg-300 hover:text-text-100 h-11 w-11 rounded-[0.6rem] active:scale-95 !rounded-full relative'.split(
      ' '
    );
  const button = document.createElement('button');
  button.classList.add(...classes);
  button.setAttribute('id', id);
  if (target.children.length >= 2) {
    target.append(button);
  } else {
    target.prepend(button);
  }
  const app = createApp(SettingIcon);
  mountApp(id, app);
};

repeat(1000, () => {
  addButtonToHeader();
});
