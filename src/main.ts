import { createApp } from 'vue';
import './style.css';
import App from './App.vue';

createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    app.setAttribute('id', 'cpe-app');
    document.body.append(app);
    return app;
  })()
);

const prompts: Record<string, string> = {
  commit: '请帮我写一条Git commit message，内容是如下：\n',
};

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const observeInput = async () => {
  let content = '';
  while (true) {
    await delay(100);
    const input = document.querySelector("div[enterkeyhint='enter']");
    if (input !== null) {
      const newContent = input.textContent;
      if (newContent !== null && newContent !== content) {
        content = newContent;
        for (const key in prompts) {
          if (content.trimStart() === `/${key} `) {
            applyCommand(input, key);
          }
          break;
        }
      }
    }
  }
};

const applyCommand = (input: Element, key: string) => {
  // Replace content
  input.innerHTML = prompts[key]
    .split('\n')
    .map((it) => `<p>${it}</p>`)
    .join('\n');

  // Set cursor position
  const sel = window.getSelection();
  if (sel !== null) {
    sel.removeAllRanges();

    const range = document.createRange();
    range.selectNodeContents(input);
    range.collapse(false);
    sel.addRange(range);
  }
};

observeInput();
