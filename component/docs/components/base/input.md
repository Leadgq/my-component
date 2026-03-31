# Input 输入框

基于 Element Plus 的自定义输入框组件

## 基础用法

<script setup>
import { ref } from 'vue'
import '../../../packages/dist/style.css'
const basicInput = ref('')

const inputValue2 = ref('处于只读状态')
const inputValue3 = ref('')
const textareaValue = ref('')

const  inputRef = ref(null)
const prefixSuffixInput = ref('')

const input1 = ref('')

function clearInput2() {
    inputValue2.value = ''
}
</script>

<div class="demo">
     <div class="test-section">
            <YoInput v-model="basicInput" placeholder="请输入内容" style="width: 240px" />
            <p>输入值: {{ basicInput }}</p>
   </div>
</div>

```vue
<template>
  <YoInput v-model="inputValue" @input="handleChange" ref="inputRef"></YoInput>
</template>
<script setup></script>
```

## 禁用状态

<div class="demo">
       <YoInput placeholder="禁用输入框" :disabled="true" style="width: 240px" />
</div>

```vue
<template>
  <YoInput v-model="inputValue" placeholder="请输入"></YoInput>
</template>
```

## 只读状态

<div class="demo">
    <YoInput v-model="inputValue2" placeholder="请输入" style="width: 240px" readonly></YoInput>
</div>

```vue
<template>
  <YoInput v-model="inputValue" placeholder="请输入" ref="inputRef"></YoInput>
  <YoButton type="primary" @click="clearInput2">清空</YoButton>
</template>
<script setup>
function clearInput3() {
  inputValue.value = "";
}
</script>
```

## 密码

<div class="demo">
    <YoInput v-model="inputValue3" placeholder="请输入" style="width: 240px" show-password></YoInput>
</div>

```vue
<template>
  <YoInput
    v-model="inputValue"
    placeholder="请输入"
    style="width: 240px"
    show-password
  ></YoInput>
</template>
<script setup></script>
```

## 禁用

<div class="demo">
    <YoInput v-model="inputValue" placeholder="请输入" style="width: 240px" disabled></YoInput>
</div>

```vue
<template>
  <YoInput
    v-model="inputValue"
    placeholder="请输入"
    style="width: 240px"
    disabled
  ></YoInput>
</template>
<script setup></script>
```

## 带前缀和后缀的输入框

<div class="demo">
     <YoInput  placeholder="带前缀和后缀" v-model="prefixSuffixInput">
                <template #prefix>
                    <span>@</span>
                </template>
                <template #suffix>
                    <span>.com</span>
                </template>
            </YoInput>
</div>

```vue
<template>
  <YoInput placeholder="带前缀和后缀" v-model="prefixSuffixInput">
    <template #prefix>
      <span>@</span>
    </template>
    <template #suffix>
      <span>.com</span>
    </template>
  </YoInput>
</template>
<script setup></script>
```

## 大小

<div>
        <YoInput size="small" placeholder="Please Input" />
            <YoInput size="medium" placeholder="Please Input" />
            <YoInput size="large" placeholder="Please Input" />

</div>

```vue
<template>
  <div>
    <YoInput size="small" placeholder="Please Input" />
    <YoInput size="medium" placeholder="Please Input" />
    <YoInput size="large" placeholder="Please Input" />
  </div>
</template>
```

## 文本域

<div class="demo">
    <YoInput v-model="textareaValue" placeholder="请输入" maxlength="30" show-word-limit  style="width: 240px" type="textarea"></YoInput>
</div>

```vue
<template>
  <YoInput
    v-model="textareaValue"
    placeholder="请输入"
    style="width: 240px"
    maxlength="30"
    type="textarea"
  ></YoInput>
</template>
<script setup></script>
```

## tips

- 和element-plus的input属性一致
- 只是样式发生了变化

## 属性

| 属性名                       | 说明                                                                                                           | 类型                                                                                              | 默认值      |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- | ----------- |
| type                         | 输入框类型，详见 [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | [string]`'text' \| 'textarea' \| 'number' \| 'password' \| 'email' \| 'search' \| 'tel' \| 'url'` | text        |
| model-value / v-model        | 绑定值                                                                                                         | [string] / [number]                                                                               | —           |
| model-modifiers (2.11.5)     | v-model 修饰符，参考 [Vue 修饰符](https://vuejs.org/guide/essentials/forms.html#modifiers)                     | [object]`{ lazy?: true, number?: true, trim?: true }`                                             | —           |
| maxlength                    | 与原生 input 的 `maxlength` 属性相同                                                                           | [string] / [number]                                                                               | —           |
| minlength                    | 与原生 input 的 `minlength` 属性相同                                                                           | [string] / [number]                                                                               | —           |
| show-word-limit              | 是否显示字数统计，仅在 `type` 为 'text' 或 'textarea' 时有效                                                   | [boolean]                                                                                         | false       |
| word-limit-position (2.11.5) | 字数统计位置，当 `show-word-limit` 为 true 时有效                                                              | [enum]`'inside' \| 'outside'`                                                                     | "inside"    |
| placeholder                  | 输入框占位文本                                                                                                 | [string]                                                                                          | —           |
| clearable                    | 是否显示清除按钮，仅在 `type` 不为 'textarea' 时有效                                                           | [boolean]                                                                                         | false       |
| clear-icon (2.11.0)          | 自定义清除图标组件                                                                                             | [string] / [object]`Component`                                                                    | CircleClose |
| formatter                    | 格式化输入值的显示（仅在 `type` 为 'text' 时有效）                                                             | [Function]`(value: string \| number) => string`                                                   | —           |
| parser                       | 指定从格式化输入中提取的值（仅在 `type` 为 'text' 时有效）                                                     | [Function]`(value: string) => string`                                                             | —           |
| show-password                | 是否显示切换密码可见性的按钮                                                                                   | [boolean]                                                                                         | false       |
| disabled                     | 是否禁用                                                                                                       | [boolean]                                                                                         | false       |
| size                         | 输入框尺寸，当 `type` 不为 'textarea' 时有效                                                                   | [enum]`'large' \| 'default' \| 'small'`                                                           | —           |
| prefix-icon                  | 前缀图标组件                                                                                                   | [string] / [Component]                                                                            | —           |
| suffix-icon                  | 后缀图标组件                                                                                                   | [string] / [Component]                                                                            | —           |
| rows                         | 文本域的行数，仅在 `type` 为 'textarea' 时有效                                                                 | [number]                                                                                          | 2           |
| autosize                     | 文本域是否自适应高度，仅在 `type` 为 'textarea' 时有效。可接受一个对象，例如 `{ minRows: 2, maxRows: 6 }`      | [boolean] / [object]`{ minRows?: number, maxRows?: number }`                                      | false       |
| autocomplete                 | 与原生 input 的 `autocomplete` 属性相同                                                                        | [string]                                                                                          | off         |
| name                         | 与原生 input 的 `name` 属性相同                                                                                | [string]                                                                                          | —           |
| readonly                     | 与原生 input 的 `readonly` 属性相同                                                                            | [boolean]                                                                                         | false       |
| max                          | 与原生 input 的 `max` 属性相同                                                                                 | —                                                                                                 | —           |
| min                          | 与原生 input 的 `min` 属性相同                                                                                 | —                                                                                                 | —           |
| step                         | 与原生 input 的 `step` 属性相同                                                                                | —                                                                                                 | —           |
| resize                       | 控制拉伸方向                                                                                                   | [enum]`'none' \| 'both' \| 'horizontal' \| 'vertical'`                                            | —           |
| autofocus                    | 与原生 input 的 `autofocus` 属性相同                                                                           | [boolean]                                                                                         | false       |
| form                         | 与原生 input 的 `form` 属性相同                                                                                | `string`                                                                                          | —           |
| aria-label (a11y) (2.7.2)    | 与原生 input 的 `aria-label` 属性相同                                                                          | [string]                                                                                          | —           |
| tabindex                     | 输入框的 tabindex                                                                                              | [string] / [number]                                                                               | —           |
| validate-event               | 是否触发表单验证                                                                                               | [boolean]                                                                                         | true        |
| input-style                  | input 元素或 textarea 元素的样式                                                                               | [string] / [object]`CSSProperties \| CSSProperties[] \| string[]`                                 | {}          |
| label (a11y) (deprecated)    | 与原生 input 的 `aria-label` 属性相同（已废弃）                                                                | [string]                                                                                          | —           |
| inputmode (2.10.3)           | 与原生 input 的 `inputmode` 属性相同                                                                           | [string]                                                                                          | —           |

## 事件

| 名称              | 说明                                                             | 类型                                                                    |
| ----------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| blur              | 输入框失去焦点时触发                                             | [Function]`(event: FocusEvent) => void`                                 |
| focus             | 输入框获得焦点时触发                                             | [Function]`(event: FocusEvent) => void`                                 |
| change            | 当输入框失去焦点或用户按下回车时触发，仅在 modelValue 发生变化时 | [Function]`(value: string \| number, evt?: Event) => void`              |
| input             | 输入框值变化时触发                                               | [Function]`(value: string \| number) => void`                           |
| clear             | 点击清除按钮清空输入框时触发                                     | [Function]`(evt?: MouseEvent) => void (2.13.4 版本后可以接收 evt 参数)` |
| keydown           | 按键按下时触发                                                   | [Function]`(event: KeyboardEvent \| Event) => void`                     |
| mouseleave        | 鼠标离开输入框元素时触发                                         | [Function]`(event: MouseEvent) => void`                                 |
| mouseenter        | 鼠标进入输入框元素时触发                                         | [Function]`(event: MouseEvent) => void`                                 |
| compositionstart  | 组合输入开始时触发                                               | [Function]`(event: CompositionEvent) => void`                           |
| compositionupdate | 组合输入更新时触发                                               | [Function]`(event: CompositionEvent) => void`                           |
| compositionend    | 组合输入结束时触发                                               | [Function]`(event: CompositionEvent) => void`                           |

## 插槽

| 名称    | 说明                                               |
| ------- | -------------------------------------------------- |
| prefix  | 输入框前缀内容，仅在 `type` 不为 'textarea' 时有效 |
| suffix  | 输入框后缀内容，仅在 `type` 不为 'textarea' 时有效 |
| prepend | 输入框前置内容，仅在 `type` 不为 'textarea' 时有效 |
| append  | 输入框后置内容，仅在 `type` 不为 'textarea' 时有效 |

## 暴露的方法及属性

| 名称                | 说明                         | 类型                                                   |
| ------------------- | ---------------------------- | ------------------------------------------------------ |
| blur                | 使输入框失去焦点             | [Function]`() => void`                                 |
| clear               | 清空输入框的值               | [Function]`() => void`                                 |
| focus               | 使输入框获得焦点             | [Function]`() => void`                                 |
| input               | HTML input 元素              | [object]`Ref<HTMLInputElement>`                        |
| ref                 | HTML 元素，input 或 textarea | [object]`Ref<HTMLInputElement \| HTMLTextAreaElement>` |
| resizeTextarea      | 调整文本域大小               | [Function]`() => void`                                 |
| select              | 选中输入框中的文本           | [Function]`() => void`                                 |
| textarea            | HTML textarea 元素           | [object]`Ref<HTMLTextAreaElement>`                     |
| textareaStyle       | 文本域的样式                 | [object]`Ref<StyleValue>`                              |
| isComposing (2.8.0) | 是否正在组合输入             | [object]`Ref<boolean>`                                 |
