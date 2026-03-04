# Button 按钮

基于 Element Plus 的自定义按钮组件

## 基础用法

<script setup>
import { ref } from 'vue'
import { YoButton } from '../../../packages/dist/index.es.js'
import '../../../packages/dist/style.css'
</script>

<div class="demo">
    <div class="button-row">
      <yo-button type="primary">Primary</yo-button>
      <yo-button type="success">Success</yo-button>
      <yo-button type="warning">Warning</yo-button>
      <yo-button type="danger">Danger</yo-button>
    </div>
</div>

```vue
<template>
  <div class="button-row">
    <yo-button type="primary">Primary</yo-button>
    <yo-button type="success">Success</yo-button>
    <yo-button type="warning">Warning</yo-button>
    <yo-button type="danger">Danger</yo-button>
  </div>
</template>
<script setup>
import { YoButton } from "../../packages/dist/index.es.js";
import "../../packages/dist/style.css";
</script>
```

## 朴素按钮

<div>
    <div class="button-row">
      <yo-button type="primary" plain>Primary</yo-button>
      <yo-button type="success" plain>Success</yo-button>
      <yo-button type="warning" plain>Warning</yo-button>
      <yo-button type="danger" plain>Danger</yo-button>
    </div>
</div>

```vue
<template>
  <div class="button-row">
    <yo-button type="primary" plain>Primary</yo-button>
    <yo-button type="success" plain>Success</yo-button>
    <yo-button type="warning" plain>Warning</yo-button>
    <yo-button type="danger" plain>Danger</yo-button>
  </div>
</template>
<script setup>
import { YoButton } from "../../packages/dist/index.es.js"; 
import "../../packages/dist/style.css";
</script>
```

## 朴素按钮禁止

<div>
    <div class="button-row">
      <yo-button type="primary" plain disabled>Primary</yo-button>
      <yo-button type="success" plain disabled>Success</yo-button>
      <yo-button type="warning" plain disabled>Warning</yo-button>
      <yo-button type="danger" plain disabled>Danger</yo-button>
    </div>
</div>

```vue
<template>
  <div class="button-row">
    <yo-button type="primary" plain disabled>Primary</yo-button>
    <yo-button type="success" plain disabled>Success</yo-button>  
    <yo-button type="warning" plain disabled>Warning</yo-button>
    <yo-button type="danger" plain disabled>Danger</yo-button>
  </div>
</template>
<script setup>
import { YoButton } from "../../packages/dist/index.es.js"; 
import "../../packages/dist/style.css";
</script>
```

## loading

<div>
    <div class="button-row">
      <yo-button type="primary" :loading="true">Primary</yo-button>
      <yo-button type="success" :loading="true">Success</yo-button>
      <yo-button type="warning" :loading="true">Warning</yo-button>
      <yo-button type="danger" :loading="true">Danger</yo-button>
    </div>
</div>

## 朴素按钮 loading

<div>
    <div class="button-row">
      <yo-button type="primary" plain :loading="true">Primary</yo-button>
      <yo-button type="success" plain :loading="true">Success</yo-button>
      <yo-button type="warning" plain :loading="true">Warning</yo-button>
      <yo-button type="danger" plain :loading="true">Danger</yo-button>
    </div>
</div>

```vue
<template>
  <div class="button-row">
    <yo-button type="primary" plain :loading="true">Primary</yo-button>
    <yo-button type="success" plain :loading="true">Success</yo-button>
    <yo-button type="warning" plain :loading="true">Warning</yo-button>
    <yo-button type="danger" plain :loading="true">Danger</yo-button>
  </div>
</template>
<script setup>
import { YoButton } from "../../packages/dist/index.es.js"; 
import "../../packages/dist/style.css";
</script>
```

## 新增属性

<yo-button :value="100" :isShowBadge="true" :max="99" :buttonType="'primary'" style="margin-right: 50px;">  
主要按钮
</yo-button>
<yo-button :value="100" :isShowBadge="true" :max="99" :buttonType="'text'" style="margin-right: 50px;">
文本
</yo-button>

<yo-button :value="11" :isShowBadge="true" :max="99" :buttonType="'default'">朴素级别</yo-button>

```vue
<template>
  <yo-button
    :value="100"
    :isShowBadge="true"
    :max="99"
    :buttonType="'primary'"
    style="margin-right: 30px;"
  >
    主要按钮
  </yo-button>
  <yo-button
    :value="100"
    :isShowBadge="true"
    :max="99"
    :buttonType="'text'"
    style="margin-right: 30px;"
  >
    文本按钮
  </yo-button>

  <yo-button :value="11" :isShowBadge="true" :max="99" :buttonType="'default'"
    >朴素级别</yo-button
  >
</template>

<script setup>
import { YoButton } from "../../packages/dist/index.es.js"; 
import "../../packages/dist/style.css";
</script>
```

## API

### Props

| 参数          | 说明                 | 类型                                                                  | 默认值      |
| ------------- | -------------------- | --------------------------------------------------------------------- | ----------- |
| `isShowBadge` | 显示标记             | `boolean`                                                             | `false`     |
| `value`       | 标记内容             | `'number' \| 'string'`                                                | `0`         |
| `max`         | 最大显示值           | `number`                                                              | `0`         |
| `buttonType`  | 按钮类型(显示标记时) | `'primary' \| 'success' \| 'warning' \| 'danger' \| 'info' \| 'text'` | `'primary'` |
| `size`        | 按钮大小             | `'large' \| 'default' \| 'small'`                                     | `'default'` |
| `disabled`    | 禁用状态             | `boolean`                                                             | `false`     |
| `loading`     | 加载状态             | `boolean`                                                             | `false`     |
| `round`       | 圆角按钮             | `boolean`                                                             | `false`     |
| `circle`      | 圆形按钮             | `boolean`                                                             | `false`     |
| `color`       | 自定义颜色           | `string`                                                              | `''`        |

### Events

| 事件名  | 说明     | 回调参数              |
| ------- | -------- | --------------------- |
| `click` | 点击事件 | `(event: MouseEvent)` |

### slot

| 名称    | 说明     |
| ------- | -------- |
| default | 按钮内容 |
