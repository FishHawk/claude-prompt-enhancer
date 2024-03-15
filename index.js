// ==UserScript==
// @name         Claude Predefined Prompt
// @author       FishHawk
// @description  Use predefined prompts in Claude by custom command
// @license      GPL-3.0
// @namespace    https://github.com/FishHawk
// @homepageURL  https://github.com/FishHawk/claude-predefined-prompt
// @version      2024-03-14
// @match        https://claude.ai/chat*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @description:zh-CN 使用自定义命令在Claude中触发预定义的提示语
// ==/UserScript==

(async function () {
  'use strict';

  const prompts = {
    commit: '请帮我写一条Git commit message，内容是如下：\n',
  };

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));

  let content = '';
  while (true) {
    await delay(100);
    const input = document.querySelector("div[enterkeyhint='enter']");
    if (input) {
      const newContent = input.textContent;
      if (newContent !== content) {
        content = newContent;

        for (const key in prompts) {
          if (content.trimStart() === `/${key} `) {
            // Replace content
            input.innerHTML = prompts[key]
              .split('\n')
              .map((it) => `<p>${it}</p>`)
              .join('\n');

            // Set cursor position
            const range = document.createRange();
            range.selectNodeContents(input);
            range.collapse(false);
            const sel = window.getSelection();
            sel.removeAllRanges();
            sel.addRange(range);
          }
        }
      }
    }
  }
})();
