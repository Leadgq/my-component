# 高级搜索

基于 Element Plus 的自定义高级搜索组件

## 基本用法

<script setup>
import { ref } from 'vue'
import { YoSearch } from '../../../packages/dist/index.es.js'
import '../../../packages/dist/style.css'

const handleSearch = (val) => {
    alert(val)
}
function handleAdvancedSearch() {
  alert("高级搜索")
}
</script>

<div class="demo">
    <YoSearch :width="'300px'" @search="handleSearch" placeholder="请输入222"></YoSearch>
</div>

```vue
<template>
  <YoSearch
    :width="'300px'"
    @search="handleSearch"
    placeholder="请输入222"
  ></YoSearch>
</template>
```

## 朴素搜索

<div>
<YoSearch :width="'300px'" @search="handleSearch" placeholder="请输入222" plain></YoSearch>
</div>

```vue
<template>
  <YoSearch
    :width="'300px'"
    @search="handleSearch"
    placeholder="请输入222"
    plain
  ></YoSearch>
</template>
```

## 搜索按钮类型

<div>
<YoSearch :width="'300px'" @search="handleSearch" placeholder="请输入" buttonType="danger"></YoSearch>
</div>

```vue
<template>
  <YoSearch
    :width="'300px'"
    @search="handleSearch"
    placeholder="请输入"
    buttonType="danger"
  ></YoSearch>
</template>

<script setup>
const handleSearch = (val) => {
  alert(val);
};
</script>
```

## 输入框类型

<div>
   <YoSearch :width="'300px'" @search="handleSearch" placeholder="只能输入数字" type="number" :buttonType="'danger'"></YoSearch>
</div>

```vue
<template>
  <YoSearch
    :width="'300px'"
    @search="handleSearch"
    placeholder="请输入"
    type="number"
    :buttonType="'danger'"
  ></YoSearch>
</template>

<script setup>
const handleSearch = (val) => {
  alert(val);
};
</script>
```

## 只有按钮

<div>
   <YoSearch :isSearchModel="false" @advanced-search="handleAdvancedSearch" :buttonType="'danger'"></YoSearch>
</div>

## 禁用状态

<div>
   <YoSearch :isSearchModel="false" @advanced-search="handleAdvancedSearch" :buttonType="'danger'" disabled></YoSearch>
</div>

## 插槽

<div>
   <YoSearch :isSearchModel="false" @advanced-search="handleAdvancedSearch" :buttonType="'danger'">插槽内容</YoSearch>
</div>

<div style="margin-top: 20px;">
   <YoSearch :buttonType="'primary'">插槽内容</YoSearch>
</div>

```vue
<template>
  <YoSearch
    :isSearchModel="false"
    :buttonType="'danger'"
  >
    插槽内容
  </YoSearch>
</template>

<template>
  <YoSearch
    :buttonType="'primary'"
  >
    插槽内容
  </YoSearch>
</template>
```
### Props

| 参数            | 说明         | 类型      | 默认值      |
| --------------- | ------------ | --------- | ----------- |
| `isSearchModel` | 是否搜索模式 | `boolean` | `true`      |
| `width`         | 输入框宽度   | `string`  | `'240px'`   |
| `placeholder`   | 占位符       | `string`  | `''`        |
| `plain`         | 朴素搜索     | `boolean` | `false`     |
| `type`          | 输入框类型   | `string`  | `'text'`    |
| `buttonType`    | 按钮类型     | `string`  | `'primary'` |
| `disabled`      | 禁用状态     | `boolean` | `false`     |
| `loading`       | 加载状态     | `boolean` | `false`     |
| `round`         | 圆角按钮     | `boolean` | `false`     |
| `circle`        | 圆形按钮     | `boolean` | `false`     |
| `color`         | 自定义颜色   | `string`  | `''`        |

### Events

| 事件名            | 说明         | 回调参数        |
| ----------------- | ------------ | --------------- |
| `search`          | 点击事件     | `(val: string)` |
| `advanced-search` | 高级搜索事件 | `()`            |

### Slots

| 插槽名    | 说明               |
| --------- | ------------------ |
| `default` | 搜索按钮的默认内容 |
