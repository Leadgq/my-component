import YoButton from "./button/button.vue";
import YoInput from "./input/input.vue";
import YoSearch from "./search/search.vue";
import { YoRadioGroup, YoRadioButton, YoRadio } from "./radio";
import { YoTitle, YoPictureView, YoFileView } from "../businessComponents";
import "./style/index.scss";
import * as ElementPlus from 'element-plus'


const elComponents = {}
for (const key in ElementPlus) {
  if (key.startsWith('El')) {
    const newKey = 'Yo' + key.substring(2) // 将 'El' 前缀替换为 'Yo' 前缀
    elComponents[newKey] = ElementPlus[key]
  }
}



const components = {
  ...elComponents,
  YoRadioGroup,
  YoRadio,
  YoRadioButton,
  YoButton,
  YoInput,
  YoSearch,
  YoTitle,
  YoPictureView,
  YoFileView,
}


export {
  YoButton,
  YoInput,
  YoSearch,
  YoTitle,
  YoRadioGroup,
  YoRadio,
  YoRadioButton,
  YoPictureView,
  YoFileView,
};

export default {
  install(app, options = {}) {
    // 注册所有组件
    Object.entries(components).forEach(([name, component]) => {
      app.component(name, component);
    });

    if (options.locale) {
      app.use(ElementPlus, {
        locale: options.locale, // 传入语言包
      })
    }
  }
};

// ============ 导出组件列表（用于文档生成） ============
export const componentList = Object.keys(components);
