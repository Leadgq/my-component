# 单选框

## 基础用法

<script setup>
import { ref } from 'vue'
import { YoRadioGroup, YoRadioButton,YoRadio } from '../../../packages/dist/index.es.js'
import '../../../packages/dist/style.css'
const radio1 = ref('1')
</script>

<div class="demo">
    <div class="buttron-row">
      <YoRadioGroup v-model="radio1">
      <YoRadio value="1" size="large">Option 1</YoRadio>
      <YoRadio value="2" size="large">Option 2</YoRadio>
      </YoRadioGroup>
    </div>
</div>

```vue
<template>
  <div class="buttron-row">
    <YoRadioGroup v-model="radio1">
      <YoRadio value="1" size="large">Option 1</YoRadio>
      <YoRadio value="2" size="large">Option 2</YoRadio>
    </YoRadioGroup>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { YoRadioGroup, YoRadioButton, YoRadio } from "element-plus-two";
const radio1 = ref("New York");
</script>
```

  <div class="buttron-row">
      <YoRadioGroup v-model="radio1">
          <YoRadioButton label="New York" value="New York" />
          <YoRadioButton label="Washington" value="Washington" />
          <YoRadioButton label="Los Angeles" value="Los Angeles" />
          <YoRadioButton label="Chicago" value="Chicago" />
      </YoRadioGroup>
    </div>

```vue
<template>
  <div class="buttron-row">
    <YoRadioGroup v-model="radio1">
      <YoRadioButton label="New York" value="New York" />
      <YoRadioButton label="Washington" value="Washington" />
      <YoRadioButton label="Los Angeles" value="Los Angeles" />
      <YoRadioButton label="Chicago" value="Chicago" />
    </YoRadioGroup>
  </div>
</template>
```

## 禁用状态

<div>
    <YoRadioGroup v-model="radio1" disabled>
      <YoRadio value="1" size="large">Option 1</YoRadio>
      <YoRadio value="2" size="large">Option 2</YoRadio>
    </YoRadioGroup>
</div>

```vue
<template>
  <div class="buttron-row">
    <YoRadioGroup v-model="radio1" disabled>
      <YoRadio value="1" size="large">Option 1</YoRadio>
      <YoRadio value="2" size="large">Option 2</YoRadio>
    </YoRadioGroup>
  </div>
</template>
```
## tips 

- 和element-plus的radio属性一致

## 属性

| 参数            | 说明         | 类型      | 默认值      |
| --------------- | ------------ | --------- | ----------- |
| v-model         | 绑定值       | string    | -           |
| disabled        | 是否禁用     | boolean   | false       |
| size            | 单选框尺寸   | string    | medium      |
| value           | 单选框的值   | string    | -           |
| border          | 是否显示边框 | boolean   | true        |
| label           | 单选框的标签 | string    | -           |
| name            | 单选框的名称 | string    | -           |

## 事件

| 事件名 | 说明 | 类型 |
| ------ | ---- | ---- |
| change | 当绑定值变化时触发 | (val: string) => void |

## 插槽

| 插槽名 | 说明 |
| ------ | ---- |
| default | 自定义单选框的内容 |