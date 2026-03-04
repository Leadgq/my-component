import type { App } from "vue";

import YoButton from "./button/button.vue";
import YoInput from "./input/input.vue";
import YoSearch from "./search/search.vue";

import "./style/index.scss";

const components = {
  YoButton,
  YoInput,
  YoSearch,
} as const;

export { YoButton, YoInput, YoSearch };

export * from "./button/button.ts";
export * from "./input/input.ts";
export * from "./search/search.ts";

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};

// ============ 导出组件列表（用于文档生成） ============
export const componentList = Object.keys(components);
