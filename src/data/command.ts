import { Store } from './store';

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

const observeUserInput = async () => {
  let content = '';
  while (true) {
    await delay(100);
    const input = document.querySelector("div[enterkeyhint='enter']");
    if (input !== null) {
      const newContent = input.textContent;
      if (newContent !== null && newContent !== content) {
        content = newContent;

        for (const pc of Store.getPromptCommands()) {
          if (content.trimStart() === `/${pc.command} `) {
            applyCommand(input, pc.prompt);
            break;
          }
        }
      }
    }
  }
};

const applyCommand = (input: Element, prompt: string) => {
  // Replace content
  input.innerHTML = prompt
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

export const CommandService = {
  observeUserInput,
};
