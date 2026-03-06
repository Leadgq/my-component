import type { App } from "vue";

import YoButton from "./button/button.vue";
import YoInput from "./input/input.vue";
import YoSearch from "./search/search.vue";
import { YoRadioGroup, YoRadioButton, YoRadio } from "./radio/index.ts";
import { YoTitle } from "../businessComponents";
import "./style/index.scss";

import * as ElementPlus from 'element-plus'

// 获取所有组件 todo

const elComponents = {}
for (const key in ElementPlus) {
  if (key.startsWith('El')) {
    const newKey = 'Yo' + key.substring(2) // 将 'El' 前缀替换为 'Yo' 前缀
    elComponents[newKey] = ElementPlus[key]
  }
}

console.log(elComponents);

const components = {
  ...elComponents,
  YoRadioGroup,
  YoRadio,
  YoRadioButton,
  YoButton,
  YoInput,
  YoSearch,
  YoTitle,
} as const;

export {
  YoButton,
  YoInput,
  YoSearch,
  YoTitle,
  YoRadioGroup,
  YoRadio,
  YoRadioButton,
};

export * from "./button/button.ts";
export * from "./input/input.ts";
export * from "./search/search.ts";
export * from "./radio/index.ts";
export * from "../businessComponents/index.ts";

export default {
  install(app: App) {
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });
  },
};

// ============ 导出组件列表（用于文档生成） ============
export const componentList = Object.keys(components);
