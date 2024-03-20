import { createApp } from 'vue';

import { CommandService } from '@/data/command';
import App from '@/App.vue';

CommandService.observeUserInput();

createApp(App).mount(
  (() => {
    const app = document.createElement('div');
    document.body.append(app);
    return app;
  })()
);
