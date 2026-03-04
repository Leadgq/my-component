# Button 按钮

基于 Element Plus 的自定义按钮组件

## 基础用法

<script setup>
import { ref } from 'vue'
import { MyButton } from '../../packages/dist/index.es.js'
import '../../packages/dist/style.css'
</script>

<div class="demo">
  <MyButton type="primary">主要按钮</MyButton>
  <MyButton type="success">成功按钮</MyButton>
  <MyButton type="danger">超多字超多字超多字超多字超多字超多字超多字超多字</MyButton>
</div>

```vue
<template>
  <MyButton type="primary">主要按钮</MyButton>
  <MyButton type="success">成功按钮</MyButton>
  <MyButton type="danger">危险按钮</MyButton>
</template>
<script setup>
import { MyButton } from "@will-component";
</script>
```

## 不同尺寸

<div class="demo">
  <MyButton size="small" type="primary">小按钮</MyButton>
  <MyButton size="default" type="primary">默认按钮</MyButton>
  <MyButton size="large" type="primary">大按钮</MyButton>
</div>

## 禁用状态

<div class="demo">
  <MyButton disabled type="primary">禁用按钮</MyButton>
</div>

## loading 状态

<div class="demo">
  <MyButton loading type="primary">加载中按钮</MyButton>
</div>

## 朴素按钮禁止状态

<div class="demo">
      <MyButton type="default" disabled >朴素成功</MyButton>
     <MyButton type="default" disabled disableTheme="success">朴素禁止成功</MyButton>
     <MyButton type="default" disabled disableTheme="danger">朴素禁止危险</MyButton>
     <MyButton type="default" disabled disableTheme="warning">朴素禁止警告</MyButton>
</div>

```vue
<template>
  <MyButton type="default" disabled>朴素成功</MyButton>
  <MyButton type="default" disabled disableTheme="success"
    >朴素禁止成功</MyButton
  >
  <MyButton type="default" disabled disableTheme="danger"
    >朴素禁止危险</MyButton
  >
  <MyButton type="default" disabled disableTheme="warning"
    >朴素禁止警告</MyButton
  >
</template>
```

## 新增属性

### 按钮显示标记

<my-button :value="100" :isShowBadge="true" :max="99" :buttonType="'primary'" style="margin-right: 50px;">
主要按钮
</my-button>
<my-button :value="100" :isShowBadge="true" :max="99" :buttonType="'text'" style="margin-right: 50px;">
文本
</my-button>

<my-button :value="11" :isShowBadge="true" :max="99" :buttonType="'default'">朴素级别</my-button>

```vue
<template>
  <my-button
    :value="100"
    :isShowBadge="true"
    :max="99"
    :buttonType="'primary'"
    style="margin-right: 30px;"
  >
    主要按钮
  </my-button>
  <my-button
    :value="100"
    :isShowBadge="true"
    :max="99"
    :buttonType="'text'"
    style="margin-right: 30px;"
  >
    主要按钮
  </my-button>

  <my-button :value="11" :isShowBadge="true" :max="99" :buttonType="'default'"
    >朴素级别</my-button
  >
</template>

<script setup>
import { MyButton } from "@yo-component";
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
